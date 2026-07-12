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
      {/* Layer 1 — Dot grid: 32 px cells, 1 px dots at 6.5 % white */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.065) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 2 — Single indigo bloom from top-center.
          One hue only — no competing sky-blue accent. */}
      <div
        className="absolute inset-x-0 -top-px"
        style={{
          height: 680,
          background:
            "radial-gradient(ellipse 75% 90% at 50% 0%, rgba(99,102,241,0.11) 0%, transparent 70%)",
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

      {/* Layer 4 — Edge vignette, subtle darkening only at the far corners */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 115% 85% at 50% 35%, transparent 55%, rgba(0,0,0,0.32) 100%)",
        }}
      />
    </div>
  );
}
