"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type PortfolioWorldProps = {
  reducedMotion?: boolean;
};

const ZONES = [
  { key: "hero", color: 0x72a7ff, label: "SPAWN" },
  { key: "about", color: 0x9b8cff, label: "IDENTITY" },
  { key: "skills", color: 0x49d9a6, label: "STACK" },
  { key: "projects", color: 0xffb45d, label: "PROJECTS" },
  { key: "experience", color: 0xff6f91, label: "FIELD" },
  { key: "contact", color: 0xe7d66f, label: "EXIT" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function makeLineMaterial(color: number, opacity = 0.65) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  });
}

export default function PortfolioWorld({ reducedMotion = false }: PortfolioWorldProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isLowPower =
      isMobile &&
      (window.navigator.hardwareConcurrency ?? 8) <= 4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
      precision: isMobile ? "mediump" : "highp",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.5),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "portfolio-world-canvas";
    renderer.setAnimationLoop(null);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07101d, isMobile ? 0.05 : 0.035);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
    camera.position.set(0, 1.55, 7.5);
    camera.lookAt(0, 1.1, 0);

    const ambient = new THREE.AmbientLight(0x9db8ff, isMobile ? 1.5 : 1.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(3.5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x5d8cff, 2.4, 14, 2);
    rimLight.position.set(-2.5, 2.6, 1.2);
    scene.add(rimLight);

    const dark = new THREE.MeshStandardMaterial({
      color: 0x0b1220,
      roughness: 0.88,
      metalness: 0.08,
    });
    const darkSoft = new THREE.MeshStandardMaterial({
      color: 0x18243a,
      roughness: 0.92,
      metalness: 0.05,
    });
    const skin = new THREE.MeshStandardMaterial({
      color: 0xc78668,
      roughness: 0.98,
      metalness: 0,
    });
    const hoodie = new THREE.MeshStandardMaterial({
      color: 0x477cff,
      roughness: 0.86,
      metalness: 0.04,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: 0x72a7ff,
      emissive: 0x102c66,
      emissiveIntensity: 0.55,
      roughness: 0.55,
      metalness: 0.18,
    });
    const silver = new THREE.MeshStandardMaterial({
      color: 0xdce7ff,
      emissive: 0x0e1930,
      emissiveIntensity: 0.24,
      roughness: 0.33,
      metalness: 0.8,
    });
    const glow = new THREE.MeshBasicMaterial({
      color: 0x79a6ff,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });

    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [
      dark,
      darkSoft,
      skin,
      hoodie,
      accent,
      silver,
      glow,
    ];

    const bodyGeo = new THREE.CapsuleGeometry(0.55, 0.9, 5, 8);
    const headGeo = new THREE.SphereGeometry(0.43, 12, 10);
    const limbGeo = new THREE.CapsuleGeometry(0.14, 0.62, 4, 6);
    const bootGeo = new THREE.BoxGeometry(0.22, 0.14, 0.42);
    const armGeo = new THREE.CapsuleGeometry(0.13, 0.58, 4, 6);
    const hoodGeo = new THREE.TorusGeometry(0.47, 0.08, 5, 12, Math.PI * 1.35);
    const packGeo = new THREE.BoxGeometry(0.56, 0.68, 0.18);
    const screenGeo = new THREE.PlaneGeometry(0.23, 0.14);
    const katanaHandleGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.7, 8);
    const katanaBladeGeo = new THREE.BoxGeometry(0.045, 1.95, 0.035);
    const ringGeo = new THREE.TorusGeometry(0.72, 0.035, 6, 64);
    const nodeGeo = new THREE.IcosahedronGeometry(0.16, 0);
    const pillarGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.35, 6);
    const floorGeo = new THREE.CircleGeometry(2.3, 48);
    const wireGeo = new THREE.CircleGeometry(2.85, 48);
    const slashGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.8, 0, 0),
      new THREE.Vector3(-0.1, 0.28, 0),
      new THREE.Vector3(0.8, 0, 0),
    ]);
    const slashGeo2 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.62, 0.04, -0.02),
      new THREE.Vector3(0, 0.32, -0.02),
      new THREE.Vector3(0.64, 0.04, -0.02),
    ]);

    disposableGeometries.push(
      bodyGeo,
      headGeo,
      limbGeo,
      bootGeo,
      armGeo,
      hoodGeo,
      packGeo,
      screenGeo,
      katanaHandleGeo,
      katanaBladeGeo,
      ringGeo,
      nodeGeo,
      pillarGeo,
      floorGeo,
      wireGeo,
      slashGeo,
      slashGeo2,
    );

    const world = new THREE.Group();
    world.position.set(0, -0.1, 0);
    scene.add(world);

    const character = new THREE.Group();
    character.position.set(0, 0, 0.3);
    world.add(character);

    const body = new THREE.Mesh(bodyGeo, hoodie);
    body.position.y = 1.15;
    character.add(body);

    const head = new THREE.Mesh(headGeo, skin);
    head.position.y = 2.05;
    character.add(head);

    const hood = new THREE.Mesh(hoodGeo, dark);
    hood.rotation.x = Math.PI / 2;
    hood.rotation.z = -0.35;
    hood.position.set(0, 2.08, -0.02);
    character.add(hood);

    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.37, 10, 8), dark);
    hair.scale.set(1.05, 0.55, 1.05);
    hair.position.set(0, 2.3, 0.02);
    character.add(hair);
    disposableGeometries.push(hair.geometry);

    const eyeGeo = new THREE.SphereGeometry(0.035, 7, 6);
    const eyeL = new THREE.Mesh(eyeGeo, dark);
    const eyeR = new THREE.Mesh(eyeGeo, dark);
    eyeL.position.set(-0.12, 2.08, 0.4);
    eyeR.position.set(0.12, 2.08, 0.4);
    character.add(eyeL, eyeR);
    disposableGeometries.push(eyeGeo);

    const pack = new THREE.Mesh(packGeo, darkSoft);
    pack.position.set(0, 1.25, -0.38);
    character.add(pack);

    const chestScreen = new THREE.Mesh(screenGeo, accent);
    chestScreen.position.set(0, 1.23, 0.55);
    chestScreen.rotation.x = -0.06;
    character.add(chestScreen);

    const leftArm = new THREE.Mesh(armGeo, hoodie);
    const rightArm = new THREE.Mesh(armGeo, hoodie);
    leftArm.position.set(-0.67, 1.18, 0);
    rightArm.position.set(0.67, 1.18, 0);
    leftArm.rotation.z = -0.24;
    rightArm.rotation.z = 0.24;
    character.add(leftArm, rightArm);

    const leftLeg = new THREE.Group();
    const rightLeg = new THREE.Group();
    const leftLegMesh = new THREE.Mesh(limbGeo, darkSoft);
    const rightLegMesh = new THREE.Mesh(limbGeo, darkSoft);
    leftLegMesh.position.y = -0.43;
    rightLegMesh.position.y = -0.43;
    leftLeg.add(leftLegMesh);
    rightLeg.add(rightLegMesh);
    leftLeg.position.set(-0.26, 0.58, 0);
    rightLeg.position.set(0.26, 0.58, 0);
    character.add(leftLeg, rightLeg);

    const leftBoot = new THREE.Mesh(bootGeo, dark);
    const rightBoot = new THREE.Mesh(bootGeo, dark);
    leftBoot.position.set(-0.26, -0.02, 0.08);
    rightBoot.position.set(0.26, -0.02, 0.08);
    character.add(leftBoot, rightBoot);

    const katana = new THREE.Group();
    katana.position.set(0.52, 1.0, -0.3);
    katana.rotation.z = -0.58;
    character.add(katana);

    const handle = new THREE.Mesh(katanaHandleGeo, dark);
    handle.rotation.z = Math.PI / 2;
    handle.position.y = -0.32;
    katana.add(handle);

    const blade = new THREE.Mesh(katanaBladeGeo, silver);
    blade.position.y = 0.76;
    katana.add(blade);

    const guard = new THREE.Mesh(
      new THREE.TorusGeometry(0.09, 0.022, 5, 16),
      silver,
    );
    guard.rotation.x = Math.PI / 2;
    guard.position.y = 0.03;
    katana.add(guard);
    disposableGeometries.push(guard.geometry);

    const characterFloor = new THREE.Mesh(
      floorGeo,
      new THREE.MeshBasicMaterial({
        color: 0x203b69,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      }),
    );
    characterFloor.rotation.x = -Math.PI / 2;
    characterFloor.position.y = -0.07;
    character.add(characterFloor);
    disposableMaterials.push(characterFloor.material as THREE.Material);

    const stations = new THREE.Group();
    world.add(stations);

    ZONES.forEach((zone, index) => {
      const zoneGroup = new THREE.Group();
      const x = index * 5.2;
      zoneGroup.position.x = x;
      zoneGroup.position.z = index % 2 === 0 ? -0.1 : -0.7;

      const floor = new THREE.Mesh(
        floorGeo,
        new THREE.MeshBasicMaterial({
          color: zone.color,
          transparent: true,
          opacity: 0.045,
          depthWrite: false,
        }),
      );
      floor.rotation.x = -Math.PI / 2;
      zoneGroup.add(floor);
      disposableMaterials.push(floor.material as THREE.Material);

      const wire = new THREE.Mesh(
        wireGeo,
        new THREE.MeshBasicMaterial({
          color: zone.color,
          wireframe: true,
          transparent: true,
          opacity: 0.16,
        }),
      );
      wire.rotation.x = -Math.PI / 2;
      wire.position.y = 0.01;
      zoneGroup.add(wire);
      disposableMaterials.push(wire.material as THREE.Material);

      const ringMat = new THREE.MeshBasicMaterial({
        color: zone.color,
        transparent: true,
        opacity: 0.54,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.18;
      ring.scale.setScalar(1 + index * 0.035);
      zoneGroup.add(ring);
      disposableMaterials.push(ringMat);

      const core = new THREE.Mesh(nodeGeo, new THREE.MeshStandardMaterial({
        color: zone.color,
        emissive: zone.color,
        emissiveIntensity: 0.42,
        roughness: 0.45,
        metalness: 0.18,
      }));
      core.position.set(0, 1.12 + (index % 2) * 0.15, -0.1);
      zoneGroup.add(core);
      disposableMaterials.push(core.material as THREE.Material);

      const offsets = isMobile ? [-0.95, 0, 0.95] : [-1.25, 0, 1.25];
      offsets.forEach((offset, i) => {
        const pillar = new THREE.Mesh(
          pillarGeo,
          new THREE.MeshBasicMaterial({
            color: zone.color,
            transparent: true,
            opacity: 0.13 + i * 0.04,
          }),
        );
        pillar.position.set(offset, 0.72, -0.3 - i * 0.18);
        pillar.rotation.z = (i - 1) * 0.15;
        zoneGroup.add(pillar);
        disposableMaterials.push(pillar.material as THREE.Material);
      });

      stations.add(zoneGroup);
    });

    const particlesCount = isMobile ? 28 : isLowPower ? 44 : 78;
    const particles = new Float32Array(particlesCount * 3);
    const random = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < particlesCount; i += 1) {
      const seed = i + 1;
      particles[i * 3] = random(seed) * 31 - 2;
      particles[i * 3 + 1] = random(seed + 10) * 3.2 + 0.2;
      particles[i * 3 + 2] = random(seed + 20) * -3.2 - 0.4;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particles, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x82a7ff,
      size: isMobile ? 0.035 : 0.05,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    world.add(particleCloud);
    disposableGeometries.push(particleGeo);
    disposableMaterials.push(particleMat);

    const slash = new THREE.Group();
    const slashLine1 = new THREE.Line(slashGeo, makeLineMaterial(0xc5d8ff, 0.9));
    const slashLine2 = new THREE.Line(slashGeo2, makeLineMaterial(0x6f95ff, 0.75));
    slash.add(slashLine1, slashLine2);
    slash.position.set(0.35, 1.9, 0.1);
    slash.scale.setScalar(0.001);
    slash.visible = false;
    character.add(slash);
    disposableMaterials.push(
      slashLine1.material as THREE.Material,
      slashLine2.material as THREE.Material,
    );

    const scrollState = {
      target: 0,
      current: 0,
      velocity: 0,
      lastZone: 0,
      slash: 0,
      pointerX: 0,
      pointerY: 0,
      visible: true,
      pageVisible: true,
      lastRender: performance.now(),
      lastInteraction: performance.now(),
    };

    const updateScrollTarget = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const next = clamp(window.scrollY / maxScroll, 0, 1);
      scrollState.target = next;
      scrollState.lastInteraction = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => {
      scrollState.pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      scrollState.pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      scrollState.lastInteraction = performance.now();
    };

    const onVisibility = () => {
      scrollState.pageVisible = document.visibilityState === "visible";
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.5),
      );
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        scrollState.visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(host);

    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    updateScrollTarget();

    let rafId = 0;
    const frameMs = reducedMotion ? 1000 / 12 : isMobile ? 1000 / 28 : 1000 / 42;

    const animate = (now: number) => {
      rafId = window.requestAnimationFrame(animate);

      if (!scrollState.pageVisible || !scrollState.visible) return;
      if (now - scrollState.lastRender < frameMs) return;
      scrollState.lastRender = now;

      const before = scrollState.current;
      scrollState.current = lerp(
        scrollState.current,
        scrollState.target,
        reducedMotion ? 0.12 : 0.085,
      );
      scrollState.velocity = Math.abs(scrollState.current - before);

      const zoneFloat = scrollState.current * (ZONES.length - 1);
      const zoneIndex = Math.min(
        ZONES.length - 1,
        Math.floor(zoneFloat + 0.35),
      );
      if (zoneIndex !== scrollState.lastZone && scrollState.velocity > 0.0004) {
        scrollState.lastZone = zoneIndex;
        scrollState.slash = 1;
      }

      const elapsed = now * 0.001;
      const walking = scrollState.velocity > 0.0003;
      const bob = reducedMotion ? 0 : Math.sin(elapsed * (walking ? 10 : 2.8)) * (walking ? 0.055 : 0.024);
      character.position.y = bob;
      character.rotation.y = lerp(
        character.rotation.y,
        scrollState.pointerX * 0.08,
        0.05,
      );

      const progressX = scrollState.current * (ZONES.length - 1) * 5.2;
      stations.position.x = -progressX;
      particleCloud.position.x = -progressX * 0.88;

      const lean = walking ? 0.24 : 0.08;
      leftLeg.rotation.x = Math.sin(elapsed * 11) * lean;
      rightLeg.rotation.x = -Math.sin(elapsed * 11) * lean;
      leftArm.rotation.x = -Math.sin(elapsed * 11) * lean * 0.72;
      rightArm.rotation.x = Math.sin(elapsed * 11) * lean * 0.72;
      katana.rotation.z = -0.58 + Math.sin(elapsed * 7) * 0.03;

      const lookX = scrollState.pointerX * 0.1;
      const lookY = scrollState.pointerY * 0.06;
      camera.position.x = lerp(camera.position.x, lookX, 0.04);
      camera.position.y = lerp(camera.position.y, 1.55 + lookY, 0.04);
      camera.lookAt(0, 1.12, 0);

      if (reducedMotion) {
        slash.visible = false;
      } else if (scrollState.slash > 0) {
        scrollState.slash = Math.max(0, scrollState.slash - 0.075);
        slash.visible = true;
        const p = 1 - scrollState.slash;
        const ease = 1 - Math.pow(1 - p, 3);
        slash.scale.setScalar(0.2 + ease * 1.15);
        slash.rotation.z = -0.35 + ease * 0.5;
        (slashLine1.material as THREE.LineBasicMaterial).opacity = (1 - ease) * 0.9;
        (slashLine2.material as THREE.LineBasicMaterial).opacity = (1 - ease) * 0.65;
      } else {
        slash.visible = false;
      }

      ringGeo.computeBoundingSphere();
      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry && mesh.geometry.dispose) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else if (mesh.material && mesh.material.dispose) {
          mesh.material.dispose();
        }
      });

      disposableGeometries.forEach((geometry) => geometry.dispose());
      disposableMaterials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return <div ref={hostRef} className="portfolio-world" aria-hidden="true" />;
}
