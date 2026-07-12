"use client";

import { useEffect, useState } from "react";

function useNoiseTexture(): string {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const size   = 256;
    const canvas = document.createElement("canvas");
    canvas.width  = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(size, size);
    const d   = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    setUrl(canvas.toDataURL("image/png"));
  }, []);

  return url;
}

export function Atmosphere() {
  const noiseUrl = useNoiseTexture();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      {/* Layer 1 — Dot grid: 32 px cells, brighter dots for more presence */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 3 — Film grain at 2.5 % opacity */}
      {noiseUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:  `url(${noiseUrl})`,
            backgroundRepeat: "repeat",
            backgroundSize:   "256px 256px",
            opacity:           0.025,
          }}
        />
      )}

      {/* Layer 4 — Edge vignette, lightened so corners don't feel heavy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 115% 85% at 50% 35%, transparent 60%, rgba(0,0,0,0.2) 100%)",
        }}
      />
    </div>
  );
}
