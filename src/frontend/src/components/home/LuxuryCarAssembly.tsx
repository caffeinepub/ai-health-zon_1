import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Car assembly parts — mapped to the same 6 health platform nodes
const parts = [
  {
    id: "rcm",
    label: "RCM Solutions",
    partName: "Engine",
    emoji: "⚙️",
    x: 120,
    y: 155,
    color: "#0d9488",
    description:
      "Automate revenue cycle from billing to final settlement with 95%+ clean claim rates.",
    href: "/hospitals",
  },
  {
    id: "network",
    label: "Healthcare Network",
    partName: "Chassis",
    emoji: "🔩",
    x: 90,
    y: 275,
    color: "#1e40af",
    description:
      "Connect hospitals, insurers, vendors, and healthcare professionals seamlessly.",
    href: "/ecosystem",
  },
  {
    id: "command",
    label: "Claim Command Centre",
    partName: "Dashboard",
    emoji: "🖥️",
    x: 480,
    y: 155,
    color: "#7c3aed",
    description:
      "Real-time claims monitoring, rejection analytics, and department risk intelligence.",
    href: "/command-centre",
  },
  {
    id: "patient",
    label: "Patient Support",
    partName: "Interior",
    emoji: "🪑",
    x: 510,
    y: 275,
    color: "#dc2626",
    description:
      "Full patient lifecycle support from pre-admission to post-discharge care.",
    href: "/patient-support",
  },
  {
    id: "compliance",
    label: "NABH",
    partName: "Safety Systems",
    emoji: "🛡️",
    x: 148,
    y: 385,
    color: "#d97706",
    description:
      "NABH 6th Edition framework, audit readiness, and quality monitoring.",
    href: "/compliance",
  },
  {
    id: "digital",
    label: "ABDM",
    partName: "Smart Sensors",
    emoji: "📡",
    x: 452,
    y: 385,
    color: "#059669",
    description:
      "ABDM integration, ABHA ID management, and health information exchange.",
    href: "/digital-health",
  },
];

interface TooltipData {
  id: string;
  x: number;
  y: number;
  label: string;
  partName: string;
  description: string;
  color: string;
  href: string;
}

/* ─── Luxury Car SVG (inline, viewBox 0 0 160 80) ─── */
function CarSVG({ color = "#c0a060" }: { color?: string }) {
  return (
    <g>
      {/* Shadow */}
      <ellipse cx="80" cy="74" rx="56" ry="7" fill="rgba(0,0,0,0.35)" />

      {/* Body */}
      <rect x="18" y="42" width="124" height="24" rx="6" fill={color} />

      {/* Cabin */}
      <path
        d="M 46 42 C 50 20 110 20 114 42 Z"
        fill={color}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />

      {/* Windshield */}
      <path d="M 52 42 C 55 26 88 24 90 42 Z" fill="rgba(150,220,255,0.55)" />
      {/* Rear glass */}
      <path d="M 92 42 C 96 24 108 26 112 42 Z" fill="rgba(150,220,255,0.45)" />

      {/* Grill & headlights */}
      <rect x="132" y="48" width="10" height="6" rx="2" fill="#fde68a" />
      <rect x="18" y="50" width="6" height="4" rx="1" fill="#fca5a5" />

      {/* Door line */}
      <line
        x1="90"
        y1="44"
        x2="90"
        y2="66"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
      />

      {/* Wheels */}
      <circle
        cx="48"
        cy="66"
        r="12"
        fill="#1a1a2e"
        stroke="#888"
        strokeWidth="2"
      />
      <circle cx="48" cy="66" r="6" fill="#555" />
      <circle cx="48" cy="66" r="2.5" fill="#aaa" />

      <circle
        cx="112"
        cy="66"
        r="12"
        fill="#1a1a2e"
        stroke="#888"
        strokeWidth="2"
      />
      <circle cx="112" cy="66" r="6" fill="#555" />
      <circle cx="112" cy="66" r="2.5" fill="#aaa" />

      {/* Brand badge */}
      <ellipse
        cx="80"
        cy="53"
        rx="10"
        ry="6"
        fill="rgba(255,255,255,0.12)"
        stroke={color}
        strokeWidth="1"
      />
      <text
        x="80"
        y="56"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontWeight="bold"
      >
        AIHz
      </text>
    </g>
  );
}

/* ─── Assembly track SVG paths ─── */
function AssemblyLines({ assembledIds }: { assembledIds: Set<string> }) {
  // Lines from central node (300,215) to each part node
  const lines = [
    { id: "rcm", d: "M 300 215 C 265 210 200 185 155 165" },
    { id: "network", d: "M 300 215 C 255 215 185 270 125 280" },
    { id: "command", d: "M 300 215 C 335 210 400 185 445 165" },
    { id: "patient", d: "M 300 215 C 345 215 415 270 475 280" },
    { id: "compliance", d: "M 300 215 C 270 240 220 310 182 392" },
    { id: "digital", d: "M 300 215 C 330 240 380 310 418 392" },
  ];

  return (
    <>
      {lines.map((line) => (
        <path
          key={line.id}
          d={line.d}
          fill="none"
          stroke={
            assembledIds.has(line.id) ? "#fde68a" : "rgba(255,255,255,0.12)"
          }
          strokeWidth={assembledIds.has(line.id) ? "2" : "1.5"}
          strokeDasharray={assembledIds.has(line.id) ? "none" : "4 4"}
          style={{ transition: "stroke 0.4s" }}
        />
      ))}
    </>
  );
}

export function LuxuryCarAssembly() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [assembled, setAssembled] = useState<Set<string>>(new Set());
  // Car on track
  const [carX, setCarX] = useState(-180);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const trackWidth = 700; // wider than SVG for entry/exit

  // Sequentially "assemble" parts every 600ms on mount
  useEffect(() => {
    const ids = parts.map((p) => p.id);
    let i = 0;
    const interval = setInterval(() => {
      if (i < ids.length) {
        setAssembled((prev) => new Set([...prev, ids[i]]));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Car drives along track after all parts assembled (~4.5s delay)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    timeout = setTimeout(() => {
      const duration = 4000; // ms to cross
      const travel = trackWidth + 160;

      function tick(now: number) {
        if (!startTimeRef.current) startTimeRef.current = now;
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        // ease in-out
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
        setCarX(-160 + ease * travel);
        if (progress < 1) {
          animRef.current = requestAnimationFrame(tick);
        } else {
          // reset and loop
          startTimeRef.current = null;
          setCarX(-180);
          animRef.current = requestAnimationFrame(() => {
            timeout = setTimeout(() => {
              animRef.current = requestAnimationFrame(tick);
            }, 1500);
          });
        }
      }
      animRef.current = requestAnimationFrame(tick);
    }, 4200);

    return () => {
      clearTimeout(timeout);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleNodeHover = (part: (typeof parts)[0]) => {
    setHoveredNode(part.id);
    setTooltip({ ...part });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0a1428 0%, #0a1923 50%, #051219 100%)",
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
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-medium mb-4 tracking-wider uppercase">
            India's Premier Healthcare Platform
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            India's Healthcare
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.75 0.18 185), oklch(0.75 0.15 145))",
              }}
            >
              Digital Ecosystem
            </span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto mb-8">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      i === 0 ? "#0d9488" : i === 1 ? "#60a5fa" : "#34d399",
                  }}
                />
                <span className="text-white/85 text-sm font-medium">
                  {tagline}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Assembly Diagram ── */}
        <div className="relative w-full max-w-2xl mx-auto">
          <svg
            viewBox="0 0 600 500"
            className="w-full"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.45))" }}
            role="img"
            aria-label="AI Health Zon luxury car assembly diagram"
          >
            <title>AI Health Zon Luxury Car Assembly</title>
            <defs>
              {/* Factory floor gradient */}
              <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0d0d1a" stopOpacity="0.95" />
              </linearGradient>
              {/* Gold gradient for central car */}
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#c0a060" />
                <stop offset="100%" stopColor="#92702a" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Track gradient */}
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a3a10" />
                <stop offset="50%" stopColor="#6b5218" />
                <stop offset="100%" stopColor="#3a2c08" />
              </linearGradient>
            </defs>

            {/* Factory floor background */}
            <rect
              x="0"
              y="0"
              width="600"
              height="500"
              fill="url(#floorGrad)"
              rx="16"
              opacity="0.6"
            />

            {/* Assembly floor grid lines */}
            {[100, 200, 300, 400, 500].map((x) => (
              <line
                key={x}
                x1={x}
                y1="0"
                x2={x}
                y2="500"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
            ))}
            {[100, 200, 300, 400].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="600"
                y2={y}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
            ))}

            {/* Assembly connection lines */}
            <AssemblyLines assembledIds={assembled} />

            {/* ── Track at bottom ── */}
            {/* Track bed */}
            <rect
              x="10"
              y="456"
              width="580"
              height="18"
              rx="4"
              fill="url(#trackGrad)"
            />
            {/* Track rails */}
            <rect x="10" y="456" width="580" height="3" rx="1" fill="#a0820a" />
            <rect x="10" y="471" width="580" height="3" rx="1" fill="#a0820a" />
            {/* Track ties */}
            <rect
              x="20"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="48"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="76"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="104"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="132"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="160"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="188"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="216"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="244"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="272"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="300"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="328"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="356"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="384"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="412"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="440"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="468"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="496"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="524"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            <rect
              x="552"
              y="458"
              width="10"
              height="13"
              rx="1"
              fill="#7a5a08"
              opacity="0.7"
            />
            {/* Track direction arrow */}
            <text
              x="550"
              y="452"
              fontSize="10"
              fill="rgba(253,230,138,0.5)"
              textAnchor="middle"
            >
              ▶▶
            </text>

            {/* ── Moving car on track ── */}
            {assembled.size === parts.length && (
              <g transform={`translate(${carX}, 392)`}>
                <CarSVG color="url(#goldGrad)" />
              </g>
            )}

            {/* ── Part Nodes (like tree branches) ── */}
            {parts.map((part) => {
              const isHovered = hoveredNode === part.id;
              const isAssembled = assembled.has(part.id);
              return (
                <g
                  key={part.id}
                  transform={`translate(${part.x}, ${part.y})`}
                  onMouseEnter={() => handleNodeHover(part)}
                  onMouseLeave={() => {
                    setHoveredNode(null);
                    setTooltip(null);
                  }}
                  className="cursor-pointer"
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 12px ${part.color})`
                      : undefined,
                  }}
                >
                  {/* Pulse ring */}
                  {isHovered && (
                    <circle
                      r="36"
                      fill="none"
                      stroke={part.color}
                      strokeWidth="2"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        from="28"
                        to="48"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  {/* Node circle */}
                  <circle
                    r="28"
                    fill={
                      isHovered
                        ? part.color
                        : isAssembled
                          ? `${part.color}44`
                          : "rgba(255,255,255,0.06)"
                    }
                    stroke={part.color}
                    strokeWidth={isAssembled ? "2.5" : "1.5"}
                    style={{ transition: "fill 0.4s" }}
                  />
                  <circle
                    r="22"
                    fill={
                      isHovered
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.04)"
                    }
                  />
                  {/* Part emoji */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="14"
                  >
                    {part.emoji}
                  </text>
                  {/* Part name label */}
                  <text
                    y="40"
                    textAnchor="middle"
                    fontSize="8"
                    fill="white"
                    fontWeight="700"
                    opacity="0.9"
                  >
                    {part.partName}
                  </text>
                  {/* Assembled tick */}
                  {isAssembled && (
                    <text
                      y="-34"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#fde68a"
                    >
                      ✓
                    </text>
                  )}
                </g>
              );
            })}

            {/* ── Central node — assembled car badge ── */}
            <g transform="translate(300, 215)" filter="url(#nodeGlow)">
              {/* Outer ring animates when fully assembled */}
              {assembled.size === parts.length && (
                <circle
                  r="44"
                  fill="none"
                  stroke="#fde68a"
                  strokeWidth="1.5"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    from="36"
                    to="56"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.4"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                r="34"
                fill="rgba(192,160,96,0.25)"
                stroke="url(#goldGrad)"
                strokeWidth="3"
              />
              <circle r="26" fill="rgba(192,160,96,0.15)" />
              {/* Mini car icon */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                y="-4"
                fontSize="18"
              >
                🏎️
              </text>
              <text
                textAnchor="middle"
                y="16"
                fontSize="7"
                fill="rgba(253,230,138,0.9)"
                fontWeight="700"
                letterSpacing="0.5"
              >
                AI HEALTH ZON
              </text>
            </g>
          </svg>

          {/* Tooltip overlay */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                key={tooltip.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center max-w-xs pointer-events-none z-20"
                style={{ borderColor: `${tooltip.color}60` }}
              >
                <p className="font-heading font-bold text-white text-sm mb-0.5">
                  {tooltip.partName}
                </p>
                <p className="text-yellow-300/80 text-xs font-medium mb-1">
                  {tooltip.label}
                </p>
                <p className="text-white/70 text-xs">{tooltip.description}</p>
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
            className="bg-white text-health-blue hover:bg-white/90 font-semibold shadow-xl px-8"
          >
            Book a Free Demo
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Link to="/hospitals">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8 backdrop-blur-sm bg-white/5 w-full sm:w-auto"
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
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Network Entities" },
            { value: "50+", label: "Cities Covered" },
            { value: "10K+", label: "Monthly Claims" },
            { value: "95%", label: "Clean Claim Rate" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-3 bg-white/8 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="font-heading text-2xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <DemoBookingDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </section>
  );
}
