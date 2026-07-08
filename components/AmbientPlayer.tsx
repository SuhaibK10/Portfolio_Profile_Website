"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, CloudRain, Music2, Coffee } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */

type Mode = "rain" | "piano" | "coffee" | "off";

const OPTIONS: { id: Mode; label: string; icon: typeof CloudRain }[] = [
  { id: "rain",   label: "Rain",        icon: CloudRain },
  { id: "piano",  label: "Piano",       icon: Music2 },
  { id: "coffee", label: "Coffee Shop", icon: Coffee },
  { id: "off",    label: "Off",         icon: VolumeX },
];

const STORAGE_KEY = "ambient-mode";
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ─── Audio synthesis ───────────────────────────────────────────────── */

function buildPinkNoise(ctx: AudioContext, secs: number): AudioBuffer {
  const len  = ctx.sampleRate * secs;
  const buf  = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179;
    b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.96900 * b2 + w * 0.1538520;
    b3 = 0.86650 * b3 + w * 0.3104856;
    b4 = 0.55000 * b4 + w * 0.5329522;
    b5 = -0.7616 * b5 - w * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
    b6 = w * 0.115926;
  }
  return buf;
}

function startRain(ctx: AudioContext, dest: AudioNode): () => void {
  const src    = ctx.createBufferSource();
  src.buffer   = buildPinkNoise(ctx, 6);
  src.loop     = true;

  const filter       = ctx.createBiquadFilter();
  filter.type        = "bandpass";
  filter.frequency.value = 420;
  filter.Q.value     = 0.35;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2.0);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  src.start();

  return () => {
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9);
    setTimeout(() => { try { src.stop(); } catch { /* already stopped */ } }, 1000);
  };
}

function startPiano(ctx: AudioContext, dest: AudioNode): () => void {
  // C-major pentatonic across two octaves
  const FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  let stopped = false;
  let tid: ReturnType<typeof setTimeout> | null = null;

  function playNote() {
    if (stopped) return;
    const freq = FREQS[Math.floor(Math.random() * FREQS.length)];
    const now  = ctx.currentTime;

    // Fundamental + two harmonic overtones
    const harmonics: [number, number][] = [[1, 0.08], [2, 0.022], [3, 0.009]];
    for (const [mult, amp] of harmonics) {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.type  = "sine";
      osc.frequency.value = freq * mult;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(amp, now + 0.22);
      g.gain.linearRampToValueAtTime(amp * 0.65, now + 1.1);
      g.gain.linearRampToValueAtTime(0, now + 4.5);
      osc.connect(g);
      g.connect(dest);
      osc.start(now);
      osc.stop(now + 5.0);
    }

    tid = setTimeout(playNote, 900 + Math.random() * 2700);
  }

  tid = setTimeout(playNote, 350);
  return () => {
    stopped = true;
    if (tid !== null) clearTimeout(tid);
  };
}

function startCoffee(ctx: AudioContext, dest: AudioNode): () => void {
  const stoppers: Array<() => void> = [];

  // Low rumble layer (background hum / crowd)
  {
    const src    = ctx.createBufferSource();
    src.buffer   = buildPinkNoise(ctx, 5);
    src.loop     = true;
    const filter = ctx.createBiquadFilter();
    filter.type  = "lowpass";
    filter.frequency.value = 280;
    const gain   = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 2.0);
    src.connect(filter); filter.connect(gain); gain.connect(dest);
    src.start();
    stoppers.push(() => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9);
      setTimeout(() => { try { src.stop(); } catch { /* stopped */ } }, 1000);
    });
  }

  // Soft mid-range texture (chatter)
  {
    const src    = ctx.createBufferSource();
    src.buffer   = buildPinkNoise(ctx, 7);
    src.loop     = true;
    const filter = ctx.createBiquadFilter();
    filter.type  = "bandpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.9;
    const gain   = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2.0);
    src.connect(filter); filter.connect(gain); gain.connect(dest);
    src.start();
    stoppers.push(() => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9);
      setTimeout(() => { try { src.stop(); } catch { /* stopped */ } }, 1000);
    });
  }

  return () => stoppers.forEach((s) => s());
}

/* ─── Component ─────────────────────────────────────────────────────── */

interface AmbientPlayerProps {
  /** Override the wrapper element's className. Defaults to fixed top-right positioning. */
  className?: string;
}

export function AmbientPlayer({ className }: AmbientPlayerProps = {}) {
  const [open,      setOpen]      = useState(false);
  const [selected,  setSelected]  = useState<Mode>("off");
  const [isPlaying, setIsPlaying] = useState(false);

  const ctxRef    = useRef<AudioContext | null>(null);
  const destRef   = useRef<GainNode | null>(null);
  const stopRef   = useRef<(() => void) | null>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  /* ── Resume saved ambient mode on first user interaction (off by default) ── */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;

    // No saved preference, or previously turned off — stay off, no autoplay
    if (!saved || saved === "off") {
      setSelected("off");
      return;
    }

    const mode: Mode = saved;
    setSelected(mode);

    function startOnInteraction() {
      cleanup(); // remove listeners immediately (one-time)

      const ctx  = new AudioContext();
      ctxRef.current = ctx;

      const dest = ctx.createGain();
      dest.gain.value = 1;
      dest.connect(ctx.destination);
      destRef.current = dest;

      if (mode === "rain")   stopRef.current = startRain(ctx, dest);
      if (mode === "piano")  stopRef.current = startPiano(ctx, dest);
      if (mode === "coffee") stopRef.current = startCoffee(ctx, dest);
      setIsPlaying(true);
    }

    const events = ["click", "touchstart", "keydown", "scroll"] as const;
    function cleanup() {
      events.forEach((e) => document.removeEventListener(e, startOnInteraction));
    }
    events.forEach((e) =>
      document.addEventListener(e, startOnInteraction, { once: true, passive: true })
    );

    return cleanup;
  }, []);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ── Escape to close ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  /* ── Audio lifecycle ── */
  const stopAudio = useCallback(() => {
    if (stopRef.current) { stopRef.current(); stopRef.current = null; }
  }, []);

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const getDest = useCallback((ctx: AudioContext): GainNode => {
    if (!destRef.current) {
      destRef.current = ctx.createGain();
      destRef.current.gain.value = 1;
      destRef.current.connect(ctx.destination);
    }
    return destRef.current;
  }, []);

  const handleSelect = useCallback((mode: Mode) => {
    setSelected(mode);
    localStorage.setItem(STORAGE_KEY, mode);
    setOpen(false);
    stopAudio();

    if (mode === "off") {
      setIsPlaying(false);
      return;
    }

    const ctx  = getCtx();
    const dest = getDest(ctx);

    if (mode === "rain")   stopRef.current = startRain(ctx, dest);
    if (mode === "piano")  stopRef.current = startPiano(ctx, dest);
    if (mode === "coffee") stopRef.current = startCoffee(ctx, dest);
    setIsPlaying(true);
  }, [stopAudio, getCtx, getDest]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      stopAudio();
      ctxRef.current?.close().catch(() => {});
    };
  }, [stopAudio]);

  return (
    <div ref={wrapRef} className={className ?? "fixed right-5 top-5 z-50"}>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? "Ambient sound — playing, click to change or turn off" : "Ambient sound — off, click to turn on"}
        aria-expanded={open}
        title={isPlaying ? "Ambient sound on — click to turn off" : "Ambient sound off — click to turn on"}
        className={`relative flex h-11 w-11 items-center justify-center rounded-full
                   border backdrop-blur-sm transition-all duration-300
                   ${
                     isPlaying
                       ? "border-gold/50 bg-card/90 text-gold shadow-[0_0_20px_rgba(201,168,92,0.18)]"
                       : "border-border/70 bg-card/90 text-foreground-secondary"
                   }
                   hover:border-gold/60 hover:text-gold`}
      >
        {isPlaying ? <Volume2 size={18} strokeWidth={2} /> : <VolumeX size={18} strokeWidth={2} />}

        {/* Breathing ring — visible only when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              key="ring"
              className="pointer-events-none absolute inset-0 rounded-full
                         border border-gold/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{    opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="absolute right-0 bottom-full mb-2 w-44 origin-bottom-right overflow-hidden
                       rounded-xl border border-border/60 bg-card/95 p-1.5
                       shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm"
          >
            {OPTIONS.map(({ id, label, icon: Icon }, i) => {
              const active = selected === id;
              const isOff  = id === "off";
              return (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: i * 0.04, duration: 0.18, ease: EASE }}
                  onClick={() => handleSelect(id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2
                             text-left transition-colors duration-150
                             hover:bg-white/8
                             ${isOff ? "mt-1 border-t border-border/40 pt-2.5" : ""}`}
                >
                  <Icon
                    size={15}
                    strokeWidth={1.8}
                    className={
                      active
                        ? isOff ? "text-foreground-secondary" : "text-gold"
                        : "text-muted/60"
                    }
                  />

                  <span
                    className={`font-body text-sm transition-colors duration-200 ${
                      active ? "text-foreground font-medium" : "text-foreground-secondary"
                    }`}
                  >
                    {label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
