import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  DollarSign,
  Heart,
  Monitor,
  Network,
  Shield,
  Smartphone,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const branches = [
  {
    id: "rcm",
    label: "RCM Solutions",
    icon: DollarSign,
    x: 120,
    y: 160,
    color: "#0d9488",
    description:
      "Automate revenue cycle from billing to final settlement with 95%+ clean claim rates.",
    href: "/hospitals",
  },
  {
    id: "network",
    label: "Healthcare Network",
    icon: Network,
    x: 90,
    y: 280,
    color: "#1e40af",
    description:
      "Connect hospitals, insurers, vendors, and healthcare professionals seamlessly.",
    href: "/ecosystem",
  },
  {
    id: "command",
    label: "Command Centre",
    icon: Monitor,
    x: 480,
    y: 160,
    color: "#7c3aed",
    description:
      "Real-time claims monitoring, rejection analytics, and department risk intelligence.",
    href: "/command-centre",
  },
  {
    id: "patient",
    label: "Patient Support",
    icon: Heart,
    x: 510,
    y: 280,
    color: "#dc2626",
    description:
      "Full patient lifecycle support from pre-admission to post-discharge care.",
    href: "/patient-support",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: Shield,
    x: 150,
    y: 390,
    color: "#d97706",
    description:
      "NABH 6th Edition framework, audit readiness, and quality monitoring.",
    href: "/compliance",
  },
  {
    id: "digital",
    label: "Digital Health",
    icon: Smartphone,
    x: 450,
    y: 390,
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
  description: string;
  color: string;
  href: string;
}

export function HealthGardenTree() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleNodeHover = (branch: (typeof branches)[0]) => {
    setHoveredNode(branch.id);
    setTooltip({ ...branch });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.14 0.08 240) 0%, oklch(0.18 0.1 200) 40%, oklch(0.12 0.06 170) 100%)",
        }}
      />
      {/* Decorative mesh */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 85%, oklch(0.55 0.18 185 / 0.4) 0%, transparent 45%), radial-gradient(circle at 85% 15%, oklch(0.45 0.15 240 / 0.3) 0%, transparent 45%), radial-gradient(circle at 50% 50%, oklch(0.4 0.12 145 / 0.2) 0%, transparent 60%)",
        }}
      />

      {/* Leaf particles */}
      {["l0", "l1", "l2", "l3", "l4", "l5", "l6", "l7"].map((id, i) => (
        <div
          key={id}
          className="absolute w-2 h-2 rounded-full opacity-30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            backgroundColor:
              i % 3 === 0 ? "#0d9488" : i % 3 === 1 ? "#1e40af" : "#16a34a",
            animation: `leaf-fall ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Hero Text Above Tree */}
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
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto">
            AI-powered solutions connecting hospitals, insurers, professionals
            and patients — driving better outcomes through technology.
          </p>
        </motion.div>

        {/* SVG Tree */}
        <div className="relative w-full max-w-2xl mx-auto">
          <svg
            viewBox="0 0 600 500"
            className="w-full"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
            role="img"
            aria-label="AI Health Zon interactive tree diagram"
          >
            <title>AI Health Zon Healthcare Ecosystem Tree</title>
            {/* Trunk */}
            <defs>
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a2c0d" />
                <stop offset="50%" stopColor="#6b3a12" />
                <stop offset="100%" stopColor="#4a2c0d" />
              </linearGradient>
              <linearGradient id="branchGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5a3510" />
                <stop offset="100%" stopColor="#7a4a18" />
              </linearGradient>
              <radialGradient id="glowTeal" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ground / Roots */}
            <ellipse
              cx="300"
              cy="490"
              rx="80"
              ry="12"
              fill="oklch(0.3 0.08 145 / 0.4)"
            />

            {/* Trunk */}
            <path
              d="M 285 490 C 285 490 280 430 285 380 C 290 330 295 310 300 290 C 305 270 310 250 308 220"
              fill="none"
              stroke="url(#trunkGrad)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 315 490 C 315 490 318 430 315 380 C 312 330 308 310 300 290 C 292 270 290 250 292 220"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Main Branches */}
            {/* Left top branch — RCM */}
            <path
              d="M 305 250 C 280 230 220 200 160 180"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Left mid branch — Network */}
            <path
              d="M 300 310 C 260 300 190 290 130 295"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Right top branch — Command */}
            <path
              d="M 305 250 C 330 230 390 195 445 178"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Right mid branch — Patient */}
            <path
              d="M 300 310 C 340 300 410 290 470 298"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Left bottom branch — Compliance */}
            <path
              d="M 295 360 C 265 360 210 370 188 398"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Right bottom branch — Digital */}
            <path
              d="M 305 360 C 335 360 390 370 415 398"
              fill="none"
              stroke="url(#branchGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Foliage background blob */}
            <ellipse
              cx="300"
              cy="230"
              rx="140"
              ry="110"
              fill="oklch(0.28 0.1 145 / 0.35)"
            />
            <ellipse
              cx="280"
              cy="200"
              rx="90"
              ry="70"
              fill="oklch(0.25 0.12 160 / 0.3)"
            />

            {/* Branch Nodes */}
            {branches.map((branch) => {
              const isHovered = hoveredNode === branch.id;
              return (
                <g
                  key={branch.id}
                  transform={`translate(${branch.x}, ${branch.y})`}
                  onMouseEnter={() => handleNodeHover(branch)}
                  onMouseLeave={() => {
                    setHoveredNode(null);
                    setTooltip(null);
                  }}
                  className="cursor-pointer"
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 10px ${branch.color})`
                      : undefined,
                  }}
                >
                  {/* Pulse ring when hovered */}
                  {isHovered && (
                    <circle
                      r="36"
                      fill="none"
                      stroke={branch.color}
                      strokeWidth="2"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        from="28"
                        to="46"
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
                  {/* Node background */}
                  <circle
                    r="28"
                    fill={isHovered ? branch.color : "rgba(255,255,255,0.08)"}
                    stroke={branch.color}
                    strokeWidth="2.5"
                  />
                  <circle
                    r="22"
                    fill={
                      isHovered
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.05)"
                    }
                  />
                  {/* Icon placeholder (using text) */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="12"
                    fill="white"
                    fontWeight="bold"
                  >
                    {branch.id === "rcm"
                      ? "₹"
                      : branch.id === "network"
                        ? "⬡"
                        : branch.id === "command"
                          ? "⊞"
                          : branch.id === "patient"
                            ? "♥"
                            : branch.id === "compliance"
                              ? "⚑"
                              : "📱"}
                  </text>
                  {/* Label */}
                  <text
                    y="40"
                    textAnchor="middle"
                    fontSize="9"
                    fill="white"
                    fontWeight="600"
                    opacity="0.9"
                  >
                    {branch.label}
                  </text>
                </g>
              );
            })}

            {/* Central node */}
            <g transform="translate(300, 215)">
              <circle
                r="32"
                fill="oklch(0.45 0.15 200 / 0.9)"
                stroke="oklch(0.75 0.18 185)"
                strokeWidth="3"
              />
              <circle r="24" fill="oklch(0.35 0.12 200 / 0.8)" />
              <text
                textAnchor="middle"
                y="-4"
                fontSize="11"
                fill="white"
                fontWeight="bold"
              >
                AI
              </text>
              <text
                textAnchor="middle"
                y="9"
                fontSize="8"
                fill="rgba(255,255,255,0.8)"
                fontWeight="600"
              >
                HEALTH
              </text>
              <text
                textAnchor="middle"
                y="20"
                fontSize="8"
                fill="rgba(255,255,255,0.8)"
                fontWeight="600"
              >
                ZON
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
                <p className="font-heading font-bold text-white text-sm mb-1">
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
          <Link to="/ecosystem">
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
