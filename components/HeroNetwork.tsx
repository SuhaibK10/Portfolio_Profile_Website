"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroNetwork — a slowly rotating constellation of nodes behind the hero.
 * Nearby nodes link up; violet "signals" hop node-to-node, each hop
 * spawning the next — a visual for systems that compound.
 *
 * - Leans toward the cursor, fades + recedes as you scroll past the hero
 * - Pauses when offscreen / tab hidden; static frame for reduced motion
 * - Renders nothing if WebGL is unavailable
 */

const ACCENT = new THREE.Color("#A78BFA");
const NODE = new THREE.Color("#AEBBCE");

export default function HeroNetwork() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;

    /* ── Renderer ─────────────────────────────────────────────────── */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // no WebGL — the static background still looks fine
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const group = new THREE.Group();
    scene.add(group);

    /* ── Nodes: jittered Fibonacci shell ──────────────────────────── */
    const N = isSmall ? 90 : 150;
    const RADIUS = isSmall ? 3.4 : 4.3;
    const LINK = isSmall ? 1.75 : 1.6;
    const LINK2 = LINK * LINK;

    const base = new Float32Array(N * 3);
    const pos = new Float32Array(N * 3);
    const phase = new Float32Array(N);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const rr = RADIUS * (0.82 + Math.random() * 0.3);
      base[i * 3] = Math.cos(th) * r * rr;
      base[i * 3 + 1] = y * rr * 0.86;
      base[i * 3 + 2] = Math.sin(th) * r * rr;
      phase[i] = Math.random() * Math.PI * 2;
    }
    pos.set(base);

    const pointTex = makeDotTexture();

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: isSmall ? 0.09 : 0.08,
      map: pointTex,
      color: NODE,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    /* ── Links (rebuilt each frame from proximity) ────────────────── */
    const MAX_SEG = N * 8;
    const linePos = new Float32Array(MAX_SEG * 6);
    const lineCol = new Float32Array(MAX_SEG * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    const neighbours: number[][] = Array.from({ length: N }, () => []);

    /* ── Signals hopping across links ─────────────────────────────── */
    const S = isSmall ? 6 : 10;
    type Signal = { a: number; b: number; t: number; speed: number; hops: number };
    const signals: Signal[] = [];
    const sigPos = new Float32Array(S * 3);
    const sigGeo = new THREE.BufferGeometry();
    sigGeo.setAttribute("position", new THREE.BufferAttribute(sigPos, 3).setUsage(THREE.DynamicDrawUsage));
    const sigMat = new THREE.PointsMaterial({
      size: 0.26,
      map: pointTex,
      color: ACCENT,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(sigGeo, sigMat));

    const spawn = (): Signal => {
      const a = (Math.random() * N) | 0;
      const nb = neighbours[a];
      const b = nb.length ? nb[(Math.random() * nb.length) | 0] : (a + 1) % N;
      return { a, b, t: 0, speed: 0.6 + Math.random() * 0.5, hops: 3 + ((Math.random() * 5) | 0) };
    };

    /* ── Frame update ─────────────────────────────────────────────── */
    const tmpA = new THREE.Color();
    const updateGraph = (time: number) => {
      // gentle breathing drift
      for (let i = 0; i < N; i++) {
        const p = phase[i];
        const s = 1 + Math.sin(time * 0.35 + p) * 0.035;
        pos[i * 3] = base[i * 3] * s;
        pos[i * 3 + 1] = base[i * 3 + 1] * s + Math.sin(time * 0.5 + p) * 0.04;
        pos[i * 3 + 2] = base[i * 3 + 2] * s;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      for (let i = 0; i < N; i++) neighbours[i].length = 0;
      let seg = 0;
      for (let i = 0; i < N && seg < MAX_SEG; i++) {
        const ix = pos[i * 3], iy = pos[i * 3 + 1], iz = pos[i * 3 + 2];
        for (let j = i + 1; j < N; j++) {
          const dx = ix - pos[j * 3], dy = iy - pos[j * 3 + 1], dz = iz - pos[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 > LINK2) continue;
          neighbours[i].push(j);
          neighbours[j].push(i);
          const f = 1 - Math.sqrt(d2) / LINK; // fade with length
          const k = f * f * 0.5;
          const o = seg * 6;
          linePos[o] = ix; linePos[o + 1] = iy; linePos[o + 2] = iz;
          linePos[o + 3] = pos[j * 3]; linePos[o + 4] = pos[j * 3 + 1]; linePos[o + 5] = pos[j * 3 + 2];
          tmpA.copy(NODE).multiplyScalar(k);
          lineCol[o] = lineCol[o + 3] = tmpA.r;
          lineCol[o + 1] = lineCol[o + 4] = tmpA.g;
          lineCol[o + 2] = lineCol[o + 5] = tmpA.b;
          if (++seg >= MAX_SEG) break;
        }
      }
      lineGeo.setDrawRange(0, seg * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
    };

    const updateSignals = (dt: number) => {
      while (signals.length < S) signals.push(spawn());
      for (let s = 0; s < S; s++) {
        const g = signals[s];
        g.t += dt * g.speed;
        if (g.t >= 1) {
          // arrive → hop onward (avoid going straight back)
          const nb = neighbours[g.b].filter((n) => n !== g.a);
          if (g.hops-- <= 0 || nb.length === 0) {
            signals[s] = spawn();
          } else {
            g.a = g.b;
            g.b = nb[(Math.random() * nb.length) | 0];
            g.t = 0;
          }
        }
        const h = signals[s];
        const t = easeInOut(Math.min(h.t, 1));
        for (let c = 0; c < 3; c++) {
          sigPos[s * 3 + c] = pos[h.a * 3 + c] + (pos[h.b * 3 + c] - pos[h.a * 3 + c]) * t;
        }
      }
      sigGeo.attributes.position.needsUpdate = true;
    };

    /* ── Interaction ──────────────────────────────────────────────── */
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 12.5 : 10; // pull back on portrait screens
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    /* ── Loop ─────────────────────────────────────────────────────── */
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let elapsed = 0;

    const render = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;

      // scroll: fade and recede as the hero leaves
      const p = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
      renderer.domElement.style.opacity = String(1 - p);
      group.position.y = p * 1.2;

      tilt.x += (pointer.y * 0.18 - tilt.x) * 0.04;
      tilt.y += (pointer.x * 0.28 - tilt.y) * 0.04;
      group.rotation.x = tilt.x + 0.12;
      group.rotation.y = elapsed * 0.045 + tilt.y;

      updateGraph(elapsed);
      updateSignals(dt);
      renderer.render(scene, camera);

      if (visible && p < 1) raf = requestAnimationFrame(render);
      else raf = 0;
    };

    const start = () => {
      if (raf || reduceMotion || document.hidden || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // restart when scrolling back up into the hero
    const onScroll = () => {
      if (!raf && window.scrollY < window.innerHeight * 0.85) start();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(mount);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    if (reduceMotion) {
      updateGraph(0);
      updateSignals(0);
      group.rotation.set(0.12, 0.4, 0);
      renderer.render(scene, camera);
    } else {
      start();
    }

    // fade in after the hero text has landed
    requestAnimationFrame(() => mount.setAttribute("data-ready", ""));

    /* ── Cleanup ──────────────────────────────────────────────────── */
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      nodeGeo.dispose(); lineGeo.dispose(); sigGeo.dispose();
      nodeMat.dispose(); lineMat.dispose(); sigMat.dispose();
      pointTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="hero-network pointer-events-none absolute inset-0 z-0 [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** Soft round sprite so points render as glowing dots, not squares. */
function makeDotTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
