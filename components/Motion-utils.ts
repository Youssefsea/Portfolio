import {
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

/* ------------------------------------------------------------------
   Shared scroll bus: ONE passive scroll listener and ONE rAF per frame
   for every subscriber (page progress bar, active section, mascot...).
------------------------------------------------------------------ */

const subscribers = new Set<() => void>();
let scrollRaf = 0;
let attached = false;

const flush = () => {
  scrollRaf = 0;
  subscribers.forEach((fn) => fn());
};

const onScroll = () => {
  if (!scrollRaf) scrollRaf = requestAnimationFrame(flush);
};

export function subscribeScroll(fn: () => void): () => void {
  subscribers.add(fn);

  if (!attached) {
    window.addEventListener("scroll", onScroll, { passive: true });
    attached = true;
  }

  return () => {
    subscribers.delete(fn);

    if (subscribers.size === 0 && attached) {
      window.removeEventListener("scroll", onScroll);
      attached = false;

      if (scrollRaf) {
        cancelAnimationFrame(scrollRaf);
        scrollRaf = 0;
      }
    }
  };
}

/* ------------------------------------------------------------------
   Shared IntersectionObservers (one per option set, not one per element)
------------------------------------------------------------------ */

type ObserveOptions = { threshold?: number; rootMargin?: string };

const onceObservers = new Map<
  string,
  { io: IntersectionObserver; callbacks: Map<Element, () => void> }
>();

/** Calls `callback` the first time `element` intersects, then stops watching. */
export function observeOnce(
  element: Element,
  callback: () => void,
  options: ObserveOptions = {},
): () => void {
  const key = `${options.threshold ?? 0}|${options.rootMargin ?? ""}`;
  let entry = onceObservers.get(key);

  if (!entry) {
    const callbacks = new Map<Element, () => void>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const item of entries) {
          if (!item.isIntersecting) continue;

          const fn = callbacks.get(item.target);

          if (!fn) continue;

          callbacks.delete(item.target);
          io.unobserve(item.target);
          fn();
        }
      },
      { threshold: options.threshold ?? 0, rootMargin: options.rootMargin },
    );

    entry = { io, callbacks };
    onceObservers.set(key, entry);
  }

  const { io, callbacks } = entry;

  callbacks.set(element, callback);
  io.observe(element);

  return () => {
    if (callbacks.delete(element)) io.unobserve(element);
  };
}

const visibilityCallbacks = new Map<Element, (visible: boolean) => void>();
let visibilityObserver: IntersectionObserver | null = null;

/** Reports visible/hidden changes for as long as the element is observed. */
export function observeVisibility(
  element: Element,
  callback: (visible: boolean) => void,
): () => void {
  if (!visibilityObserver) {
    visibilityObserver = new IntersectionObserver((entries) => {
      for (const item of entries) {
        visibilityCallbacks.get(item.target)?.(item.isIntersecting);
      }
    });
  }

  visibilityCallbacks.set(element, callback);
  visibilityObserver.observe(element);

  return () => {
    visibilityCallbacks.delete(element);
    visibilityObserver?.unobserve(element);
  };
}

/** True while the element (or its closest `closest` ancestor) is on screen. */
export function useOnScreen(
  ref: RefObject<Element | null>,
  closest?: string,
): boolean {
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const base = ref.current;
    const target = closest ? base?.closest(closest) : base;

    if (!target) return;

    return observeVisibility(target, setOnScreen);
  }, [ref, closest]);

  return onScreen;
}

/* ------------------------------------------------------------------
   Reduced motion
------------------------------------------------------------------ */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(REDUCED_QUERY);

      query.addEventListener("change", notify);

      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}