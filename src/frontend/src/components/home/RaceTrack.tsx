import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// 6 platform components — positioned as checkpoints around the oval track
const checkpoints = [
  {
    id: "rcm",
    label: "RCM Solutions",
    stageName: "Stage 1",
    emoji: "⚙️",
    // position on the oval (angle in degrees, 0 = top)
    angle: 0,
    color: "#0d9488",
    description:
      "Automate revenue cycle from billing to final settlement with 95%+ clean claim rates.",
    href: "/hospitals",
  },
  {
    id: "network",
    label: "Healthcare Network",
    stageName: "Stage 2",
    emoji: "🔗",
    angle: 60,
    color: "#1e40af",
    description:
      "Connect hospitals, insurers, vendors, and healthcare professionals seamlessly.",
    href: "/ecosystem",
  },
  {
    id: "command",
    label: "Claim Command Centre",
    stageName: "Stage 3",
    emoji: "🖥️",
    angle: 120,
    color: "#7c3aed",
    description:
      "Real-time claims monitoring, rejection analytics, and department risk intelligence.",
    href: "/command-centre",
  },
  {
    id: "patient",
    label: "Patient Support",
    stageName: "Stage 4",
    emoji: "🏥",
    angle: 180,
    color: "#dc2626",
    description:
      "Full patient lifecycle support from pre-admission to post-discharge care.",
    href: "/patient-support",
  },
  {
    id: "compliance",
    label: "NABH",
    stageName: "Stage 5",
    emoji: "🛡️",
    angle: 240,
    color: "#d97706",
    description:
      "NABH 6th Edition framework, audit readiness, and quality monitoring.",
    href: "/compliance",
  },
  {
    id: "digital",
    label: "ABDM",
    stageName: "Stage 6",
    emoji: "📡",
    angle: 300,
    color: "#059669",
    description:
      "ABDM integration, ABHA ID management, and health information exchange.",
    href: "/digital-health",
  },
];

// Oval track center and radii
const CX = 300;
const CY = 220;
const RX = 210;
const RY = 130;

// Convert angle (degrees, 0=top) to x,y on the oval
function ovalPoint(angleDeg: number): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + RX * Math.cos(rad),
    y: CY + RY * Math.sin(rad),
  };
}

// Get point along the oval for car position (t = 0..1)
function carPosition(t: number): { x: number; y: number; angle: number } {
  const angleDeg = t * 360 - 90;
  const rad = (angleDeg * Math.PI) / 180;
  const x = CX + RX * Math.cos(rad);
  const y = CY + RY * Math.sin(rad);
  // tangent angle for car rotation
  const tangentRad = rad + Math.PI / 2;
  const angle = (tangentRad * 180) / Math.PI;
  return { x, y, angle };
}

interface TooltipState {
  id: string;
  label: string;
  stageName: string;
  description: string;
  color: string;
  href: string;
}

/* ── Inline car SVG ── */
function CarSVG({ rotate }: { rotate: number }) {
  return (
    <g transform={`rotate(${rotate})`}>
      {/* Body */}
      <rect x="-14" y="-7" width="28" height="14" rx="4" fill="#c0a060" />
      {/* Cabin */}
      <path d="M -7 -7 C -5 -14 5 -14 7 -7 Z" fill="#c0a060" />
      {/* Windshield */}
      <path d="M -5 -7 C -3 -12 3 -12 5 -7 Z" fill="rgba(150,220,255,0.6)" />
      {/* Headlights */}
      <rect x="12" y="-5" width="4" height="3" rx="1" fill="#fde68a" />
      <rect x="12" y="2" width="4" height="3" rx="1" fill="#fde68a" />
      {/* Wheels */}
      <circle
        cx="-7"
        cy="-8"
        r="3.5"
        fill="#1a1a2e"
        stroke="#888"
        strokeWidth="1"
      />
      <circle
        cx="7"
        cy="-8"
        r="3.5"
        fill="#1a1a2e"
        stroke="#888"
        strokeWidth="1"
      />
      <circle
        cx="-7"
        cy="8"
        r="3.5"
        fill="#1a1a2e"
        stroke="#888"
        strokeWidth="1"
      />
      <circle
        cx="7"
        cy="8"
        r="3.5"
        fill="#1a1a2e"
        stroke="#888"
        strokeWidth="1"
      />
      {/* Speed lines */}
      <line
        x1="-18"
        y1="-3"
        x2="-24"
        y2="-3"
        stroke="rgba(253,230,138,0.5)"
        strokeWidth="1"
      />
      <line
        x1="-18"
        y1="0"
        x2="-26"
        y2="0"
        stroke="rgba(253,230,138,0.5)"
        strokeWidth="1"
      />
      <line
        x1="-18"
        y1="3"
        x2="-24"
        y2="3"
        stroke="rgba(253,230,138,0.5)"
        strokeWidth="1"
      />
    </g>
  );
}

export function RaceTrack() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Stage-by-stage reveal: add one checkpoint every 800ms
  const [activeStages, setActiveStages] = useState<Set<string>>(new Set());
  const [raceStarted, setRaceStarted] = useState(false);
  const [raceComplete, setRaceComplete] = useState(false);
  const [lapCount, setLapCount] = useState(0);

  // Car animation
  const [carT, setCarT] = useState(0); // 0..1 around the oval
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lapDuration = 3500; // ms per lap

  // Add checkpoints stage by stage
  useEffect(() => {
    const ids = checkpoints.map((c) => c.id);
    let i = 0;
    const interval = setInterval(() => {
      if (i < ids.length) {
        setActiveStages((prev) => new Set([...prev, ids[i]]));
        i++;
      } else {
        clearInterval(interval);
        // All stages added — start the race after a short pause
        setTimeout(() => setRaceStarted(true), 600);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Car laps the track once all stages are active
  useEffect(() => {
    if (!raceStarted || raceComplete) return;

    function tick(now: number) {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = (elapsed % lapDuration) / lapDuration;
      setCarT(progress);

      // Count laps
      const lapsDone = Math.floor(elapsed / lapDuration);
      setLapCount(lapsDone);

      if (lapsDone >= 2) {
        // Complete after 2 laps
        setRaceComplete(true);
        setCarT(0);
        return;
      }
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [raceStarted, raceComplete]);

  const car = carPosition(carT);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Light background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.97 0.025 188) 0%, oklch(0.96 0.03 200) 50%, oklch(0.97 0.02 185) 100%)",
        }}
      />
      {/* Subtle decorative circles */}
      <div
        className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.12 188) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.14 200) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 bg-white border border-border rounded-full text-health-blue text-xs font-medium mb-4 tracking-wider uppercase shadow-sm">
            India's Premier Healthcare Platform
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            India's Healthcare
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.38 0.14 188), oklch(0.45 0.16 200))",
              }}
            >
              Digital Ecosystem
            </span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-6">
            AI-powered solutions connecting hospitals, insurers, professionals
            and patients — driving better outcomes through technology.
          </p>

          {/* Taglines */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            {[
              "We focus on what matters Most to Hospital",
              "Faster Claim, Better Revenue",
              "Unlock future Healthcare Innovations & Opportunities",
            ].map((tagline, i) => (
              <motion.div
                key={tagline}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white shadow-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      i === 0 ? "#0d9488" : i === 1 ? "#0891b2" : "#059669",
                  }}
                />
                <span className="text-foreground text-sm font-medium">
                  {tagline}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Race Status Bar */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {checkpoints.map((cp, i) => {
            const isActive = activeStages.has(cp.id);
            return (
              <motion.div
                key={cp.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-500"
                  style={{
                    borderColor: isActive ? cp.color : "oklch(0.85 0.04 188)",
                    background: isActive
                      ? `${cp.color}22`
                      : "oklch(0.96 0.02 188)",
                  }}
                >
                  {isActive ? (
                    cp.emoji
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      {i + 1}
                    </span>
                  )}
                </div>
                <span
                  className="text-xs font-medium transition-all duration-500"
                  style={{
                    color: isActive ? cp.color : "oklch(0.65 0.06 188)",
                  }}
                >
                  S{i + 1}
                </span>
              </motion.div>
            );
          })}
          {raceStarted && !raceComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-700 text-xs font-bold"
            >
              🏁 RACING...
            </motion.div>
          )}
          {raceComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-2 px-3 py-1 rounded-full bg-green-50 border border-green-300 text-green-700 text-xs font-bold"
            >
              🏆 RACE COMPLETE!
            </motion.div>
          )}
        </div>

        {/* ── Race Track SVG ── */}
        <div className="relative w-full max-w-2xl mx-auto">
          <svg
            viewBox="0 0 600 460"
            className="w-full"
            style={{ filter: "drop-shadow(0 8px 24px rgba(13,148,136,0.15))" }}
            role="img"
            aria-label="AI Health Zon Race Track"
          >
            <title>AI Health Zon Race Track</title>
            <defs>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  stopColor="oklch(0.97 0.025 188)"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor="oklch(0.95 0.03 200)"
                  stopOpacity="1"
                />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#c0a060" />
                <stop offset="100%" stopColor="#92702a" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="carGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="trackClip">
                <rect x="0" y="0" width="600" height="460" rx="16" />
              </clipPath>
            </defs>

            {/* Background */}
            <rect
              x="0"
              y="0"
              width="600"
              height="460"
              fill="url(#bgGrad)"
              rx="16"
            />

            {/* Grid lines */}
            {[100, 200, 300, 400, 500].map((x) => (
              <line
                key={`vg${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="460"
                stroke="rgba(0,0,0,0.04)"
                strokeWidth="1"
              />
            ))}
            {[80, 160, 240, 320, 400].map((y) => (
              <line
                key={`hg${y}`}
                x1="0"
                y1={y}
                x2="600"
                y2={y}
                stroke="rgba(0,0,0,0.04)"
                strokeWidth="1"
              />
            ))}

            {/* ── OUTER TRACK BORDER ── */}
            {/* Outer oval (grass/runoff area) — light green tint */}
            <ellipse
              cx={CX}
              cy={CY}
              rx={RX + 28}
              ry={RY + 28}
              fill="oklch(0.92 0.06 145)"
              stroke="oklch(0.82 0.08 145)"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Track surface (light teal-grey asphalt) */}
            <ellipse
              cx={CX}
              cy={CY}
              rx={RX + 20}
              ry={RY + 20}
              fill="oklch(0.88 0.04 188)"
              stroke="oklch(0.78 0.06 188)"
              strokeWidth="1"
            />

            {/* Track road — outer edge */}
            <ellipse
              cx={CX}
              cy={CY}
              rx={RX + 20}
              ry={RY + 20}
              fill="none"
              stroke="oklch(0.82 0.05 188)"
              strokeWidth="40"
            />

            {/* Track road — inner edge + lane lines */}
            <ellipse
              cx={CX}
              cy={CY}
              rx={RX}
              ry={RY}
              fill="none"
              stroke="oklch(0.55 0.12 188)"
              strokeWidth="1.5"
              strokeDasharray="10 8"
              opacity="0.4"
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx={RX + 20}
              ry={RY + 20}
              fill="none"
              stroke="oklch(0.55 0.12 188)"
              strokeWidth="1.5"
              strokeDasharray="10 8"
              opacity="0.25"
            />

            {/* Active track glow when racing */}
            {raceStarted && !raceComplete && (
              <ellipse
                cx={CX}
                cy={CY}
                rx={RX + 10}
                ry={RY + 10}
                fill="none"
                stroke="oklch(0.68 0.17 60)"
                strokeWidth="2"
                opacity="0.35"
              >
                <animate
                  attributeName="opacity"
                  from="0.35"
                  to="0.1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </ellipse>
            )}

            {/* Inner infield — light muted teal */}
            <ellipse
              cx={CX}
              cy={CY}
              rx={RX - 20}
              ry={RY - 20}
              fill="oklch(0.94 0.04 188)"
              stroke="oklch(0.82 0.06 188)"
              strokeWidth="1"
            />

            {/* Infield logo/text */}
            <text
              x={CX}
              y={CY - 18}
              textAnchor="middle"
              fontSize="22"
              dominantBaseline="central"
            >
              🏎️
            </text>
            <text
              x={CX}
              y={CY + 10}
              textAnchor="middle"
              fontSize="9"
              fill="oklch(0.30 0.12 188)"
              fontWeight="700"
              letterSpacing="1"
            >
              AI HEALTH ZON
            </text>
            <text
              x={CX}
              y={CY + 24}
              textAnchor="middle"
              fontSize="7"
              fill="oklch(0.50 0.08 188)"
            >
              Healthcare Race to Excellence
            </text>

            {/* Lap counter inside infield */}
            {raceStarted && (
              <g>
                <text
                  x={CX}
                  y={CY + 40}
                  textAnchor="middle"
                  fontSize="7"
                  fill="oklch(0.55 0.14 60)"
                >
                  Lap {Math.min(lapCount + 1, 2)} / 2
                </text>
              </g>
            )}

            {/* ── START/FINISH LINE ── */}
            {(() => {
              const startPt = ovalPoint(0);
              return (
                <g>
                  <rect
                    x={startPt.x - 2}
                    y={startPt.y - 24}
                    width="4"
                    height="48"
                    fill="oklch(0.25 0.05 188)"
                    opacity="0.9"
                  />
                  {/* Checkered flag effect */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <rect
                      key={i}
                      x={startPt.x - 2 + (i % 2 === 0 ? 0 : 2)}
                      y={startPt.y - 24 + i * 8}
                      width="2"
                      height="8"
                      fill={i % 2 === 0 ? "oklch(0.15 0.04 188)" : "white"}
                      opacity="0.9"
                    />
                  ))}
                  <text
                    x={startPt.x + 10}
                    y={startPt.y - 8}
                    fontSize="7"
                    fill="oklch(0.35 0.1 188)"
                    fontWeight="600"
                  >
                    START
                  </text>
                  <text
                    x={startPt.x + 10}
                    y={startPt.y + 4}
                    fontSize="7"
                    fill="oklch(0.35 0.1 188)"
                    fontWeight="600"
                  >
                    FINISH
                  </text>
                </g>
              );
            })()}

            {/* ── CHECKPOINT NODES (pit stops) ── */}
            {checkpoints.map((cp) => {
              const pos = ovalPoint(cp.angle);
              const isActive = activeStages.has(cp.id);
              const isHovered = hoveredNode === cp.id;

              // Pit stop lane direction (outward from track)
              const radOut = ((cp.angle - 90) * Math.PI) / 180;
              const pitX = pos.x + Math.cos(radOut) * 38;
              const pitY = pos.y + Math.sin(radOut) * 38;

              return (
                <g key={cp.id}>
                  {/* Pit lane line */}
                  {isActive && (
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={pitX}
                      y2={pitY}
                      stroke={cp.color}
                      strokeWidth="2"
                      strokeDasharray="3 3"
                      opacity="0.7"
                    />
                  )}

                  {/* Checkpoint node on track */}
                  <g
                    transform={`translate(${pitX}, ${pitY})`}
                    onMouseEnter={() => {
                      setHoveredNode(cp.id);
                      setTooltip({ ...cp });
                    }}
                    onMouseLeave={() => {
                      setHoveredNode(null);
                      setTooltip(null);
                    }}
                    className="cursor-pointer"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 0 10px ${cp.color})`
                        : undefined,
                      opacity: isActive ? 1 : 0.25,
                      transition: "opacity 0.5s",
                    }}
                  >
                    {/* Pulse ring on hover */}
                    {isHovered && (
                      <circle
                        r="36"
                        fill="none"
                        stroke={cp.color}
                        strokeWidth="1.5"
                        opacity="0.4"
                      >
                        <animate
                          attributeName="r"
                          from="26"
                          to="44"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.4"
                          to="0"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Node background */}
                    <circle
                      r="22"
                      fill={isActive ? `${cp.color}22` : "oklch(0.95 0.02 188)"}
                      stroke={cp.color}
                      strokeWidth={isActive ? "2.5" : "1"}
                      style={{ transition: "all 0.5s" }}
                    />
                    <circle
                      r="16"
                      fill={
                        isHovered ? `${cp.color}33` : "rgba(255,255,255,0.6)"
                      }
                    />

                    {/* Emoji */}
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="12"
                    >
                      {cp.emoji}
                    </text>

                    {/* Stage label */}
                    <text
                      y="30"
                      textAnchor="middle"
                      fontSize="6.5"
                      fill="oklch(0.25 0.08 188)"
                      fontWeight="700"
                      opacity={isActive ? "0.9" : "0.3"}
                    >
                      {cp.stageName}
                    </text>

                    {/* Platform name */}
                    <text
                      y="40"
                      textAnchor="middle"
                      fontSize="5.5"
                      fill={cp.color}
                      fontWeight="600"
                      opacity={isActive ? "0.9" : "0.2"}
                    >
                      {cp.label.length > 14
                        ? `${cp.label.slice(0, 13)}…`
                        : cp.label}
                    </text>

                    {/* Active tick */}
                    {isActive && (
                      <motion.text
                        y="-28"
                        textAnchor="middle"
                        fontSize="10"
                        fill="oklch(0.55 0.14 145)"
                      >
                        ✓
                      </motion.text>
                    )}
                  </g>

                  {/* Track marker dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5"
                    fill={isActive ? cp.color : "oklch(0.75 0.06 188)"}
                    stroke="white"
                    strokeWidth="1.5"
                    style={{ transition: "fill 0.5s" }}
                  />
                </g>
              );
            })}

            {/* ── RACING CAR ── */}
            {raceStarted && !raceComplete && (
              <g
                transform={`translate(${car.x}, ${car.y})`}
                filter="url(#carGlow)"
              >
                {/* Exhaust trail */}
                <ellipse
                  cx={-Math.cos(((car.angle - 90) * Math.PI) / 180) * 18}
                  cy={-Math.sin(((car.angle - 90) * Math.PI) / 180) * 18}
                  rx="12"
                  ry="5"
                  fill="rgba(192,160,96,0.25)"
                  transform={`rotate(${car.angle})`}
                />
                <CarSVG rotate={car.angle} />
              </g>
            )}

            {/* Race complete — static car at finish */}
            {raceComplete &&
              (() => {
                const finishPt = ovalPoint(0);
                return (
                  <g
                    transform={`translate(${finishPt.x}, ${finishPt.y})`}
                    filter="url(#carGlow)"
                  >
                    <CarSVG rotate={90} />
                    <text y="-18" textAnchor="middle" fontSize="10">
                      🏆
                    </text>
                  </g>
                );
              })()}
          </svg>

          {/* Tooltip overlay */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                key={tooltip.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-white border border-border rounded-xl p-3 text-center max-w-xs pointer-events-none z-20 shadow-lg"
                style={{ borderColor: `${tooltip.color}60` }}
              >
                <p className="font-heading font-bold text-foreground text-sm mb-0.5">
                  {tooltip.stageName} — {tooltip.label}
                </p>
                <p className="text-muted-foreground text-xs">
                  {tooltip.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            onClick={() => setIsDemoOpen(true)}
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 font-semibold shadow-lg px-8"
          >
            Book a Free Demo
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Link to="/hospitals">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 w-full sm:w-auto"
            >
              Explore Platform
            </Button>
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Network Entities" },
            { value: "50+", label: "Cities Covered" },
            { value: "10K+", label: "Monthly Claims" },
            { value: "95%", label: "Clean Claim Rate" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-3 bg-white rounded-xl border border-border shadow-sm"
            >
              <div className="font-heading text-2xl font-bold text-health-blue">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <DemoBookingDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </section>
  );
}
