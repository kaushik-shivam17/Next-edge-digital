import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;

    // Skip 3D scene on mobile entirely — major LCP & FID win
    if (isMobile) return;

    // Bail out gracefully when WebGL is unavailable (e.g. sandboxed preview)
    const testCanvas = document.createElement("canvas");
    const testCtx = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!testCtx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 7;

    // ── Materials ────────────────────────────────────────────────────────
    const goldWire = new THREE.MeshBasicMaterial({ color: 0xCAA353, wireframe: true, transparent: true, opacity: 0.14, depthWrite: false });
    const goldWireFaint = new THREE.MeshBasicMaterial({ color: 0xF0C97A, wireframe: true, transparent: true, opacity: 0.09, depthWrite: false });
    const darkWire = new THREE.MeshBasicMaterial({ color: 0x8B6914, wireframe: true, transparent: true, opacity: 0.07, depthWrite: false });

    // ── Main icosahedron ────────────────────────────────────────────────
    const icosaGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icosa = new THREE.Mesh(icosaGeo, goldWire);
    scene.add(icosa);

    // ── Orbit ring ──────────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(3.2, 0.007, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xCAA353, transparent: true, opacity: 0.09, depthWrite: false });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // ── Floating octahedra ────────────────────────────────────────────
    const floatData: { mesh: THREE.Mesh; speed: number; phase: number; baseY: number }[] = [];
    const octaGeo = new THREE.OctahedronGeometry(1, 0);
    const shapes: [number, number, number, number, number, THREE.Material][] = [
      [-4.5, 1.8, -3, 0.65, 0.09, goldWireFaint],
      [4.2, -1.4, -2, 0.5, 0.07, goldWire],
      [2.8, 2.8, -1.5, 0.38, 0.12, goldWireFaint],
      [-3.5, -2.2, -1, 0.55, 0.08, goldWire],
      [0.5, -3.2, -2.5, 0.42, 0.10, darkWire],
    ];
    for (const [x, y, z, scale, speed, mat] of shapes) {
      const mesh = new THREE.Mesh(octaGeo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(scale);
      scene.add(mesh);
      floatData.push({ mesh, speed: speed as number, phase: Math.random() * Math.PI * 2, baseY: y });
    }

    // ── Particles ────────────────────────────────────────────────────────
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0xCAA353, size: 0.024, transparent: true, opacity: 0.45, sizeAttenuation: true, depthWrite: false });
    const particles = new THREE.Points(ptGeo, ptMat);
    scene.add(particles);

    // ── Scene group for mouse parallax ─────────────────────────────────
    const group = new THREE.Group();
    group.add(icosa);
    group.add(ring);
    for (const d of floatData) group.add(d.mesh);
    group.add(particles);
    scene.add(group);

    // ── Mouse tracking ───────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // ── Resize ───────────────────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Animation loop ───────────────────────────────────────────────────
    let animId = 0;
    const t0 = performance.now();

    // Throttle to ~30fps on low-end devices
    let lastFrame = 0;
    const targetFPS = prefersReducedMotion ? 10 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      const t = (performance.now() - t0) / 1000;

      if (!prefersReducedMotion) {
        // Icosahedron spin
        icosa.rotation.x = t * 0.07;
        icosa.rotation.y = t * 0.11;

        // Ring drift
        ring.rotation.z = t * 0.05;

        // Floating shapes
        for (const d of floatData) {
          d.mesh.rotation.x += d.speed * 0.016;
          d.mesh.rotation.z += d.speed * 0.7 * 0.016;
          d.mesh.position.y = d.baseY + Math.sin(t * 0.35 + d.phase) * 0.35;
        }

        // Particles slow drift
        particles.rotation.y = t * 0.011;
        particles.rotation.x = t * 0.004;

        // Mouse parallax — smooth lerp
        target.x += (mouse.x * 0.3 - target.x) * 0.045;
        target.y += (mouse.y * 0.15 - target.y) * 0.045;
        group.rotation.y = target.x;
        group.rotation.x = target.y;
      }

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer?.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      icosaGeo.dispose();
      ringGeo.dispose();
      octaGeo.dispose();
      ptGeo.dispose();
      goldWire.dispose();
      goldWireFaint.dispose();
      darkWire.dispose();
      ringMat.dispose();
      ptMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
