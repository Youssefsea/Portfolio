/**
 * Soft colored glow behind the page that shifts per section. Each section has
 * its own static gradient layer and only `opacity` is cross-faded, which the
 * browser does on the compositor without repainting.
 */
const SECTIONS = ["about", "skills", "projects", "experience", "contact"] as const;

export default function SectionAura({ section }: { section: string }) {
  return (
    <div className="section-aura" data-section={section} aria-hidden="true">
      {SECTIONS.map((name) => (
        <div key={name} className={`aura-layer aura-${name}`} />
      ))}
    </div>
  );
}