import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
  Pause,
  Play,
  Search,
  Shield,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────── data ─────────────────────────── */
interface Scene {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string; // tailwind bg class for badges
  accentText: string; // tailwind text class for tagline
  accentBorder: string; // tailwind border class for active film frame
  accentGlow: string; // inline CSS glow colour
  bgGlow: string; // radial glow behind the main card (rgba)
  Icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
}

const scenes: Scene[] = [
  {
    number: "01",
    title: "DISCOVERY",
    tagline: "The Search Begins",
    description:
      "Identifying the right healthcare provider and verifying insurance coverage.",
    tags: ["Provider Search", "Insurance Check", "Eligibility"],
    accent: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-400",
    accentGlow: "rgba(34,211,238,0.35)",
    bgGlow: "rgba(34,211,238,0.08)",
    Icon: Search,
  },
  {
    number: "02",
    title: "REGISTRATION",
    tagline: "A New Chapter Opens",
    description:
      "ABHA enrollment, demographic capture, and insurance verification at admission.",
    tags: ["ABHA Enrollment", "KYC", "Insurance Verify"],
    accent: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    accentText: "text-blue-300",
    accentBorder: "border-blue-400",
    accentGlow: "rgba(96,165,250,0.35)",
    bgGlow: "rgba(96,165,250,0.08)",
    Icon: UserCheck,
  },
  {
    number: "03",
    title: "PRE-AUTHORIZATION",
    tagline: "Approval is the Gateway",
    description:
      "Clinical documentation submission and insurance pre-approval for treatment.",
    tags: ["Clinical Docs", "Pre-auth Request", "Approval"],
    accent: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    accentText: "text-violet-300",
    accentBorder: "border-violet-400",
    accentGlow: "rgba(167,139,250,0.35)",
    bgGlow: "rgba(167,139,250,0.08)",
    Icon: Shield,
  },
  {
    number: "04",
    title: "TREATMENT",
    tagline: "The Healing Unfolds",
    description:
      "Clinical care delivery with real-time documentation and coding support.",
    tags: ["ICD Coding", "CPT Coding", "Documentation"],
    accent: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-400",
    accentGlow: "rgba(52,211,153,0.35)",
    bgGlow: "rgba(52,211,153,0.08)",
    Icon: Stethoscope,
  },
  {
    number: "05",
    title: "CLAIM SUBMISSION",
    tagline: "Precision at Every Step",
    description:
      "Seamless digital claim submission with automated validation and tracking.",
    tags: ["UB-04/CMS-1500", "E-Submission", "Acknowledgment"],
    accent: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    accentText: "text-amber-300",
    accentBorder: "border-amber-400",
    accentGlow: "rgba(251,191,36,0.35)",
    bgGlow: "rgba(251,191,36,0.08)",
    Icon: FileText,
  },
  {
    number: "06",
    title: "RECONCILIATION",
    tagline: "The Journey Complete",
    description:
      "Payment posting, denial management, and financial reconciliation.",
    tags: ["Payment Posting", "Denial Mgmt", "Reconciliation"],
    accent: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    accentText: "text-rose-300",
    accentBorder: "border-rose-400",
    accentGlow: "rgba(251,113,133,0.35)",
    bgGlow: "rgba(251,113,133,0.08)",
    Icon: DollarSign,
  },
];

const SCENE_DURATION = 5000; // ms

/* ─────────────────── sprocket hole row ──────────────────────── */
// Static positional ids for decorative sprocket holes (never reordered)
const SPROCKET_IDS = [
  "s01",
  "s02",
  "s03",
  "s04",
  "s05",
  "s06",
  "s07",
  "s08",
  "s09",
  "s10",
  "s11",
  "s12",
  "s13",
  "s14",
  "s15",
  "s16",
  "s17",
  "s18",
  "s19",
  "s20",
  "s21",
  "s22",
  "s23",
  "s24",
] as const;

function SprocketRow({ count = 10 }: { count?: number }) {
  return (
    <div className="flex items-center gap-[6px] px-3 py-[3px]">
      {SPROCKET_IDS.slice(0, count).map((id) => (
        <div
          key={id}
          className="w-[10px] h-[7px] rounded-[2px] bg-[#0a0a0a] shrink-0"
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── page ─────────────────────────── */
export function JourneyFilm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const goTo = useCallback((index: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrentIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % scenes.length, 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + scenes.length) % scenes.length, -1);
  }, [currentIndex, goTo]);

  /* auto-advance */
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run on scene change to reset timers
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    setProgress(0);

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / SCENE_DURATION) * 100, 100));
    }, 40);

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % scenes.length);
      setProgress(0);
      startTimeRef.current = Date.now();
    }, SCENE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, currentIndex]);

  const scene = scenes[currentIndex];

  /* scene card variants */
  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 28 : -28,
    }),
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden select-none"
      style={{ background: "#0a0a0a", color: "#f0f0f0" }}
    >
      {/* ── Film grain overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          animation: "grainShift 0.5s steps(2) infinite",
        }}
      />

      {/* ── Top letterbox bar ── */}
      <div
        className="w-full shrink-0 flex items-center justify-between px-4"
        style={{ height: 32, background: "#000", zIndex: 10 }}
      >
        <Link
          to="/hospitals"
          data-ocid="journey_film.back.link"
          className="text-[10px] uppercase tracking-widest text-amber-400/70 hover:text-amber-300 transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-3 h-3" />
          Hospital Revenue Management
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.2em] font-semibold"
          style={{ color: "rgba(251,191,36,0.7)" }}
        >
          AI Health Zon Pictures Presents
        </span>
        <span className="w-40" />
      </div>

      {/* ── NOW PLAYING header ── */}
      <div className="text-center py-5 shrink-0" style={{ zIndex: 5 }}>
        <div
          className="inline-block px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
          style={{
            background: "rgba(251,191,36,0.15)",
            border: "1px solid rgba(251,191,36,0.4)",
            color: "#fbbf24",
          }}
        >
          NOW PLAYING
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-1"
          style={{
            fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
            color: "#f8f8f8",
          }}
        >
          Healthcare Journey
        </h1>
        <p
          className="text-xs uppercase tracking-[0.2em] mb-4"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          A Complete Patient Revenue Story — 6 Scenes
        </p>
        <button
          type="button"
          data-ocid="journey_film.play_toggle.button"
          onClick={() => setIsPlaying((p) => !p)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all hover:scale-105"
          style={{
            background: isPlaying
              ? "rgba(251,191,36,0.12)"
              : "rgba(251,191,36,0.25)",
            border: "1px solid rgba(251,191,36,0.45)",
            color: "#fbbf24",
          }}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      {/* ── Main scene stage ── */}
      <div
        className="flex-1 flex items-center relative px-4 md:px-8 min-h-0"
        style={{ minHeight: "56vh" }}
      >
        {/* Ambient glow behind card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-[500px] h-[500px] rounded-full blur-[120px] opacity-60 transition-all duration-1000"
            style={{ background: scene.bgGlow }}
          />
        </div>

        {/* Prev arrow */}
        <button
          type="button"
          data-ocid="journey_film.prev_scene.button"
          onClick={goPrev}
          className="shrink-0 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Previous scene"
        >
          <ChevronLeft className="w-5 h-5 text-white/60" />
        </button>

        {/* Scene card */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl"
            >
              {/* large faded watermark number */}
              <motion.div
                key={`wm-${currentIndex}`}
                initial={{ scale: 1, opacity: 0.06 }}
                animate={{ scale: 1.05, opacity: 0.09 }}
                transition={{ duration: 5, ease: "easeInOut" }}
                aria-hidden="true"
                className="absolute -top-6 -left-4 font-bold leading-none pointer-events-none"
                style={{
                  fontSize: "clamp(120px, 22vw, 220px)",
                  color: "#ffffff",
                  fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
                  userSelect: "none",
                }}
              >
                {scene.number}
              </motion.div>

              {/* Card content */}
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  background: "rgba(20,20,20,0.85)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 0 60px ${scene.accentGlow}, 0 40px 80px rgba(0,0,0,0.6)`,
                }}
              >
                {/* Clapperboard scene counter — top bar */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="text-[11px] font-bold tracking-[0.25em] uppercase"
                    style={{
                      color: "rgba(251,191,36,0.8)",
                      fontFamily: '"Sora", monospace',
                    }}
                  >
                    SCENE {scene.number} / 06
                  </span>
                  <div className="flex gap-1">
                    {scenes.map((s, i) => (
                      <div
                        key={s.number}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i === currentIndex
                              ? "#fbbf24"
                              : "rgba(255,255,255,0.2)",
                          transform:
                            i === currentIndex ? "scale(1.4)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                    style={{
                      background: `${scene.accentGlow.replace("0.35", "0.15")}`,
                      border: `1px solid ${scene.accentGlow.replace("0.35", "0.4")}`,
                    }}
                  >
                    <scene.Icon
                      className="w-6 h-6"
                      style={{ color: "#fbbf24" }}
                    />
                  </div>

                  {/* Title */}
                  <h2
                    className="font-bold mb-2 leading-none tracking-tight"
                    style={{
                      fontFamily:
                        '"Bricolage Grotesque", system-ui, sans-serif',
                      fontSize: "clamp(2rem, 5vw, 3.2rem)",
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {scene.title}
                  </h2>

                  {/* Tagline */}
                  <p
                    className={`text-base md:text-lg italic mb-5 font-medium ${scene.accentText}`}
                    style={{ opacity: 0.9 }}
                  >
                    "{scene.tagline}"
                  </p>

                  {/* Description */}
                  <p
                    className="text-sm md:text-base leading-relaxed mb-6"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {scene.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {scene.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-sm text-xs font-semibold tracking-wide ${scene.accent}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next arrow */}
        <button
          type="button"
          data-ocid="journey_film.next_scene.button"
          onClick={goNext}
          className="shrink-0 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Next scene"
        >
          <ChevronRight className="w-5 h-5 text-white/60" />
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="w-full px-6 md:px-16 py-3 shrink-0" style={{ zIndex: 5 }}>
        <div
          className="w-full h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
              transition: isPlaying ? "none" : "width 0.2s ease",
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            {isPlaying ? "AUTO-ADVANCING" : "PAUSED"}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            {scene.number} / 06
          </span>
        </div>
      </div>

      {/* ── Film reel strip ── */}
      <div
        className="shrink-0"
        style={{
          background: "#111",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Top sprocket row */}
        <div style={{ background: "#1a1a1a", overflowX: "auto" }}>
          <div style={{ display: "flex", minWidth: "max-content" }}>
            <SprocketRow count={24} />
          </div>
        </div>

        {/* Frames row */}
        <div className="overflow-x-auto" style={{ background: "#1a1a1a" }}>
          <div
            className="flex items-stretch gap-0 px-3 py-2"
            style={{ minWidth: "max-content" }}
          >
            {scenes.map((s, i) => {
              const isActive = i === currentIndex;
              return (
                <button
                  type="button"
                  key={s.number}
                  data-ocid={`journey_film.scene_frame.${i + 1}`}
                  onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                  className="flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-sm transition-all duration-300 hover:bg-white/5"
                  style={{
                    minWidth: 100,
                    border: isActive
                      ? "2px solid #fbbf24"
                      : "2px solid transparent",
                    background: isActive
                      ? "rgba(251,191,36,0.08)"
                      : "transparent",
                  }}
                  aria-label={`Jump to Scene ${s.number}: ${s.title}`}
                  aria-pressed={isActive}
                >
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: '"Sora", monospace',
                      fontSize: 13,
                      color: isActive ? "#fbbf24" : "rgba(255,255,255,0.35)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {s.number}
                  </span>
                  <span
                    className="text-center leading-tight"
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: isActive
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(255,255,255,0.3)",
                      maxWidth: 80,
                    }}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom sprocket row */}
        <div style={{ background: "#1a1a1a", overflowX: "auto" }}>
          <div style={{ display: "flex", minWidth: "max-content" }}>
            <SprocketRow count={24} />
          </div>
        </div>
      </div>

      {/* ── Bottom letterbox bar ── */}
      <div
        className="w-full shrink-0 flex items-center justify-center"
        style={{ height: 32, background: "#000", zIndex: 10 }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          © AI Health Zon — Hospital Revenue Management Platform
        </span>
      </div>

      {/* ── CSS for grain shift ── */}
      <style>{`
        @keyframes grainShift {
          0%   { background-position: 0 0; }
          25%  { background-position: 30px 15px; }
          50%  { background-position: -15px 30px; }
          75%  { background-position: 20px -10px; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
}
