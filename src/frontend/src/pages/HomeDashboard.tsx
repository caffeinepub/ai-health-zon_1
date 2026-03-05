import { Layout } from "@/components/layout/Layout";
import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cloud,
  Database,
  FileCheck,
  FileX,
  FlaskConical,
  Heart,
  HeartHandshake,
  Lock,
  Monitor,
  Quote,
  Shield,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Floating Particle Shapes ────────────────────────────────────────────────
const heroParticles = [
  {
    x: "8%",
    y: "12%",
    size: 18,
    shape: "hex",
    delay: 0,
    dur: 12,
    opacity: 0.07,
  },
  {
    x: "92%",
    y: "8%",
    size: 12,
    shape: "dot",
    delay: 1.5,
    dur: 9,
    opacity: 0.1,
  },
  {
    x: "18%",
    y: "78%",
    size: 22,
    shape: "hex",
    delay: 2,
    dur: 14,
    opacity: 0.06,
  },
  {
    x: "85%",
    y: "65%",
    size: 16,
    shape: "dot",
    delay: 0.5,
    dur: 10,
    opacity: 0.09,
  },
  {
    x: "45%",
    y: "88%",
    size: 10,
    shape: "dot",
    delay: 3,
    dur: 8,
    opacity: 0.08,
  },
  {
    x: "72%",
    y: "22%",
    size: 20,
    shape: "hex",
    delay: 1,
    dur: 16,
    opacity: 0.06,
  },
  {
    x: "30%",
    y: "15%",
    size: 8,
    shape: "dot",
    delay: 2.5,
    dur: 11,
    opacity: 0.1,
  },
  {
    x: "58%",
    y: "40%",
    size: 14,
    shape: "hex",
    delay: 4,
    dur: 13,
    opacity: 0.05,
  },
  {
    x: "5%",
    y: "50%",
    size: 10,
    shape: "dot",
    delay: 0.8,
    dur: 10,
    opacity: 0.08,
  },
  {
    x: "96%",
    y: "42%",
    size: 18,
    shape: "hex",
    delay: 3.5,
    dur: 15,
    opacity: 0.06,
  },
  {
    x: "22%",
    y: "38%",
    size: 6,
    shape: "dot",
    delay: 1.2,
    dur: 9,
    opacity: 0.12,
  },
  {
    x: "65%",
    y: "80%",
    size: 16,
    shape: "hex",
    delay: 2.8,
    dur: 17,
    opacity: 0.05,
  },
  {
    x: "40%",
    y: "5%",
    size: 12,
    shape: "dot",
    delay: 0.3,
    dur: 12,
    opacity: 0.09,
  },
  {
    x: "78%",
    y: "90%",
    size: 8,
    shape: "dot",
    delay: 4.5,
    dur: 8,
    opacity: 0.08,
  },
  {
    x: "12%",
    y: "92%",
    size: 20,
    shape: "hex",
    delay: 1.8,
    dur: 14,
    opacity: 0.06,
  },
  {
    x: "50%",
    y: "58%",
    size: 10,
    shape: "dot",
    delay: 3.2,
    dur: 10,
    opacity: 0.07,
  },
  {
    x: "88%",
    y: "55%",
    size: 14,
    shape: "hex",
    delay: 0.6,
    dur: 18,
    opacity: 0.05,
  },
  {
    x: "35%",
    y: "60%",
    size: 8,
    shape: "dot",
    delay: 2.2,
    dur: 11,
    opacity: 0.1,
  },
  {
    x: "62%",
    y: "10%",
    size: 18,
    shape: "hex",
    delay: 4.2,
    dur: 13,
    opacity: 0.06,
  },
  {
    x: "2%",
    y: "25%",
    size: 12,
    shape: "dot",
    delay: 1.6,
    dur: 9,
    opacity: 0.09,
  },
];

const floatAnims = ["float1", "float2", "float3", "float4", "float5"];

function HexShape({ size, opacity }: { size: number; opacity: number }) {
  const s = size;
  const h = (s * Math.sqrt(3)) / 2;
  const pts = [
    `${s / 2},0`,
    `${s},${h / 2}`,
    `${s},${(3 * h) / 2}`,
    `${s / 2},${2 * h}`,
    `0,${(3 * h) / 2}`,
    `0,${h / 2}`,
  ].join(" ");
  return (
    <svg
      width={s}
      height={2 * h}
      viewBox={`0 0 ${s} ${2 * h}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <polygon
        points={pts}
        fill="none"
        stroke="oklch(0.65 0.18 200)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ParticleField() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {heroParticles.map((p, i) => (
        <div
          key={`particle-${p.x}-${p.y}`}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            animationName: floatAnims[i % floatAnims.length],
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        >
          {p.shape === "hex" ? (
            <HexShape size={p.size} opacity={p.opacity} />
          ) : (
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: "oklch(0.65 0.18 200)",
                opacity: p.opacity,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Animated KPI Counter ─────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  duration = 1600,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

// ─── Clean Claim Gauge SVG ────────────────────────────────────────────────────
function CleanClaimGauge({ pct }: { pct: number }) {
  const r = 52;
  const cx = 70;
  const cy = 70;
  const circ = Math.PI * r;
  const filled = (pct / 100) * circ;
  return (
    <svg
      viewBox="0 0 140 80"
      className="w-full max-w-[180px]"
      aria-label={`Clean claim gauge ${pct}%`}
    >
      <title>Clean Claim Gauge {pct}%</title>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="oklch(0.92 0.04 188)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="oklch(0.38 0.14 188)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
      />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        fill="oklch(0.25 0.1 188)"
        fontFamily="Bricolage Grotesque, sans-serif"
      >
        {pct}%
      </text>
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fontSize="7"
        fill="oklch(0.50 0.08 188)"
      >
        Clean Claim Rate
      </text>
    </svg>
  );
}

// ─── Section Heading with accent underline ────────────────────────────────────
function SectionHeading({
  badge,
  title,
  accentWord,
  subtitle,
  center,
  light,
}: {
  badge?: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  const titleParts = accentWord ? title.split(accentWord) : [title];

  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {badge && (
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider border"
          style={{
            background: "oklch(0.92 0.05 188)",
            color: "oklch(0.30 0.14 188)",
            borderColor: "oklch(0.78 0.10 188)",
          }}
        >
          {badge}
        </span>
      )}
      <h2
        className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${light ? "text-white" : "text-foreground"}`}
      >
        {accentWord ? (
          <>
            {titleParts[0]}
            <span
              className="relative inline-block"
              style={{ color: "oklch(0.55 0.18 200)" }}
            >
              {accentWord}
              <span
                className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                style={{ background: "oklch(0.55 0.18 200)" }}
                aria-hidden="true"
              />
            </span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-2xl"} ${light ? "text-white/65" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Ecosystem Diagram ────────────────────────────────────────────────────────
const ecosystemNodes = [
  {
    id: "hospitals",
    label: "Hospitals",
    icon: Building2,
    color: "#1e40af",
    angle: 0,
    description:
      "500+ partner hospitals leveraging RCM, NABH compliance, and digital health tools.",
  },
  {
    id: "insurers",
    label: "Insurers",
    icon: ShieldCheck,
    color: "#0d9488",
    angle: 51.4,
    description:
      "Insurance companies connected for faster pre-auth, real-time claim updates, and reconciliation.",
  },
  {
    id: "government",
    label: "Government Schemes",
    icon: BarChart3,
    color: "#7c3aed",
    angle: 102.8,
    description:
      "Ayushman Bharat PM-JAY, CGHS, ECHS, and state government health schemes integration.",
  },
  {
    id: "patients",
    label: "Patients",
    icon: Heart,
    color: "#dc2626",
    angle: 154.2,
    description:
      "Patients supported with ABHA enrollment, care navigation, and digital health records.",
  },
  {
    id: "digital",
    label: "ABDM",
    icon: Smartphone,
    color: "#059669",
    angle: 205.7,
    description:
      "ABDM-compliant digital health infrastructure connecting all stakeholders.",
  },
  {
    id: "compliance",
    label: "NABH",
    icon: ShieldCheck,
    color: "#d97706",
    angle: 257.1,
    description:
      "NABH, ISO, NHA standards ensuring quality and regulatory adherence.",
  },
  {
    id: "command",
    label: "Claim Command Centre",
    icon: Monitor,
    color: "#6d28d9",
    angle: 308.5,
    description:
      "Real-time operational intelligence for claims, denials, and financial performance.",
  },
];

const ecosystemPillars = [
  {
    title: "Hospital Operations",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description:
      "Complete hospital management: RCM automation, pre-authorization, claim tracking, NABH compliance, and financial analytics.",
  },
  {
    title: "Insurance Integration",
    icon: ShieldCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
    description:
      "Seamless insurer connectivity: automated pre-auth, real-time claim status, fraud detection, and settlement reconciliation.",
  },
  {
    title: "Government Schemes",
    icon: BarChart3,
    color: "text-purple-600",
    bg: "bg-purple-50",
    description:
      "PM-JAY, CGHS, ECHS, and state scheme management with automated eligibility verification and package-based billing.",
  },
  {
    title: "Patient Empowerment",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-50",
    description:
      "ABHA ID management, health records, patient counseling, grievance redressal, and care continuity support.",
  },
  {
    title: "ABDM",
    icon: Smartphone,
    color: "text-green-600",
    bg: "bg-green-50",
    description:
      "Full ABDM ecosystem: Health Facility Registry, Healthcare Professionals Registry, ABHA, PHR, and HIE-CM.",
  },
  {
    title: "Quality & NABH",
    icon: ShieldCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
    description:
      "NABH 6th Edition framework, audit management, quality indicators, and continuous improvement programs.",
  },
  {
    title: "Analytics & Intelligence",
    icon: Monitor,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    description:
      "Real-time claims dashboard, rejection analytics, department risk index, and financial performance reporting.",
  },
];

function EcosystemDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  const cx = 300;
  const cy = 280;
  const radius = 180;

  return (
    <div className="relative bg-white rounded-2xl border border-border shadow-xl overflow-hidden p-4">
      <svg
        viewBox="0 0 600 560"
        className="w-full max-w-2xl mx-auto block"
        role="img"
        aria-label="AI Health Zon ecosystem diagram"
      >
        <title>AI Health Zon Healthcare Ecosystem Diagram</title>
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="oklch(0.45 0.15 200)"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.45 0.15 200)"
              stopOpacity="0"
            />
          </radialGradient>
          {ecosystemNodes.map((node) => (
            <radialGradient
              key={`grad-${node.id}`}
              id={`grad-${node.id}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor={node.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0.4" />
            </radialGradient>
          ))}
        </defs>

        <circle cx={cx} cy={cy} r="90" fill="url(#centerGlow)" />

        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="oklch(0.8 0.05 240)"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity="0.5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`360 ${cx} ${cy}`}
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>

        {ecosystemNodes.map((node) => {
          const rad = (node.angle - 90) * (Math.PI / 180);
          const nx = cx + radius * Math.cos(rad);
          const ny = cy + radius * Math.sin(rad);
          const isHov = hovered === node.id;
          return (
            <line
              key={`line-${node.id}`}
              x1={cx}
              y1={cy}
              x2={nx}
              y2={ny}
              stroke={isHov ? node.color : "oklch(0.7 0.08 240)"}
              strokeWidth={isHov ? "2.5" : "1.5"}
              strokeDasharray={isHov ? undefined : "5 3"}
              opacity={isHov ? "0.9" : "0.5"}
              style={{ transition: "all 0.3s" }}
            >
              {!isHov && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}

        {ecosystemNodes.map((node) => {
          const rad = (node.angle - 90) * (Math.PI / 180);
          const nx = cx + radius * Math.cos(rad);
          const ny = cy + radius * Math.sin(rad);
          const isHov = hovered === node.id;

          return (
            <g
              key={node.id}
              transform={`translate(${nx}, ${ny})`}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                r={isHov ? "34" : "30"}
                fill={`url(#grad-${node.id})`}
                stroke={node.color}
                strokeWidth={isHov ? "3" : "2"}
                style={{
                  transition: "all 0.3s",
                  filter: isHov
                    ? `drop-shadow(0 0 8px ${node.color})`
                    : undefined,
                }}
              />
              <text
                textAnchor="middle"
                y="4"
                fontSize="11"
                fill="white"
                fontWeight="600"
                style={{ pointerEvents: "none" }}
              >
                {node.label.split(" ")[0]}
              </text>
              {node.label.includes(" ") && (
                <text
                  textAnchor="middle"
                  y="16"
                  fontSize="8"
                  fill="white"
                  opacity="0.85"
                  style={{ pointerEvents: "none" }}
                >
                  {node.label.split(" ").slice(1).join(" ")}
                </text>
              )}
            </g>
          );
        })}

        <circle
          cx={cx}
          cy={cy}
          r="55"
          fill="oklch(0.35 0.14 240)"
          stroke="oklch(0.65 0.18 200)"
          strokeWidth="3"
        />
        <circle
          cx={cx}
          cy={cy}
          r="45"
          fill="oklch(0.28 0.12 240)"
          opacity="0.8"
        />
        <text
          textAnchor="middle"
          x={cx}
          y={cy - 8}
          fontSize="11"
          fill="white"
          fontWeight="800"
          letterSpacing="1"
        >
          AI HEALTH
        </text>
        <text
          textAnchor="middle"
          x={cx}
          y={cy + 7}
          fontSize="11"
          fill="white"
          fontWeight="800"
          letterSpacing="1"
        >
          ZON
        </text>
        <text
          textAnchor="middle"
          x={cx}
          y={cy + 22}
          fontSize="7"
          fill="rgba(255,255,255,0.6)"
        >
          Ecosystem Hub
        </text>

        {hovered &&
          (() => {
            const node = ecosystemNodes.find((n) => n.id === hovered);
            if (!node) return null;
            return (
              <g>
                <rect
                  x="40"
                  y="480"
                  width="520"
                  height="60"
                  rx="10"
                  fill="white"
                  stroke={node.color}
                  strokeWidth="1.5"
                  opacity="0.96"
                />
                <text
                  x="60"
                  y="505"
                  fontSize="12"
                  fontWeight="700"
                  fill={node.color}
                >
                  {node.label}
                </text>
                <foreignObject x="55" y="510" width="490" height="30">
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#666",
                      lineHeight: "1.4",
                    }}
                  >
                    {node.description}
                  </div>
                </foreignObject>
              </g>
            );
          })()}
      </svg>
    </div>
  );
}

// ─── Mock Dashboard Card (reusable) ──────────────────────────────────────────
function MockDashboardCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40 ${className}`}
      style={{
        background:
          "linear-gradient(145deg, oklch(0.18 0.06 188) 0%, oklch(0.14 0.04 200) 100%)",
      }}
    >
      <div
        className="px-5 py-3 border-b border-white/10 flex items-center gap-2"
        style={{ background: "oklch(0.12 0.05 188)" }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-white/40 text-xs font-mono">
          AI Health Zon — Command Centre
        </span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "Total Claims", value: "1,234" },
            { label: "Clean Claim Rate", value: "95%" },
            { label: "Revenue Recovered", value: "₹2.4Cr" },
            { label: "Approvals Today", value: "187" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-lg p-3 border border-white/[0.08]"
              style={{ background: "oklch(0.16 0.05 188)" }}
            >
              <div className="text-white/50 text-xs mb-1 truncate">
                {m.label}
              </div>
              <div
                className="font-heading font-bold text-base"
                style={{ color: "oklch(0.72 0.18 200)" }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>
        <div
          className="rounded-xl p-4 border border-white/[0.08] mb-4"
          style={{ background: "oklch(0.16 0.05 188)" }}
        >
          <div className="text-white/60 text-xs mb-3 font-medium">
            Claim Status Distribution
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Approved", pct: 80, color: "oklch(0.52 0.16 145)" },
              { label: "Pending", pct: 14, color: "oklch(0.68 0.17 60)" },
              { label: "Denied", pct: 6, color: "oklch(0.55 0.2 25)" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">{b.label}</span>
                  <span className="text-white/70 font-semibold">{b.pct}%</span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "oklch(0.22 0.06 188)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${b.pct}%`, background: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { dept: "Cardiology", risk: "Low", dot: "bg-green-500" },
            { dept: "Orthopedics", risk: "Low", dot: "bg-green-500" },
            { dept: "Emergency", risk: "Med", dot: "bg-amber-400" },
            { dept: "Gen. Med", risk: "High", dot: "bg-red-500" },
          ].map((d) => (
            <div
              key={d.dept}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 text-xs"
              style={{ background: "oklch(0.16 0.05 188)" }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${d.dot}`} />
              <span className="text-white/60">{d.dept}</span>
              <span className="text-white/40">{d.risk}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const painPoints = [
  {
    num: "01",
    icon: XCircle,
    title: "Claim Denials",
    impact: "Lost Revenue",
    description:
      "30–40% of initial claims are denied, costing hospitals millions in lost reimbursements annually.",
    accentColor: "oklch(0.55 0.2 25)",
    borderColor: "border-l-red-400",
  },
  {
    num: "02",
    icon: FileX,
    title: "Manual Billing",
    impact: "Slow Processing",
    description:
      "Manual processes introduce errors and delays, stretching payment cycles from days to months.",
    accentColor: "oklch(0.65 0.18 55)",
    borderColor: "border-l-orange-400",
  },
  {
    num: "03",
    icon: Database,
    title: "Data Silos",
    impact: "Poor Decision Making",
    description:
      "Disconnected systems prevent real-time insights, leaving executives flying blind on revenue.",
    accentColor: "oklch(0.68 0.17 60)",
    borderColor: "border-l-amber-400",
  },
  {
    num: "04",
    icon: Clock,
    title: "Delayed Approvals",
    impact: "Cash Flow Issues",
    description:
      "Insurance pre-auth delays extend patient stays and create downstream billing complications.",
    accentColor: "oklch(0.45 0.18 295)",
    borderColor: "border-l-purple-400",
  },
];

const coreModules = [
  {
    num: "01",
    icon: Activity,
    title: "Hospital Revenue Management",
    description:
      "End-to-end revenue cycle automation from registration to payment reconciliation.",
    href: "/hospitals",
    borderColor: "border-l-sky-500",
    accentColor: "oklch(0.55 0.18 200)",
    features: [
      "Claim submission automation",
      "Insurance eligibility verification",
      "Medical coding support",
      "Payment reconciliation",
      "Denial management",
    ],
  },
  {
    num: "02",
    icon: Monitor,
    title: "AI Command Centre",
    description:
      "Live operational dashboard giving complete visibility into claims and revenue.",
    href: "/command-centre",
    borderColor: "border-l-indigo-500",
    accentColor: "oklch(0.50 0.20 265)",
    features: [
      "Real-time operational dashboard",
      "Claims tracking & analytics",
      "Revenue performance metrics",
      "Risk alerts & notifications",
      "Executive insights reports",
    ],
  },
  {
    num: "03",
    icon: Heart,
    title: "Patient Financial Support",
    description:
      "AI-powered assistance for patients navigating insurance and billing.",
    href: "/patient-support",
    borderColor: "border-l-rose-500",
    accentColor: "oklch(0.55 0.22 15)",
    features: [
      "AI chatbot for billing queries",
      "Flexible payment plans",
      "Insurance assistance",
      "ABHA ID creation & linking",
      "Grievance resolution",
    ],
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Predictive analytics and financial forecasting for smarter hospital decisions.",
    href: "/insights",
    borderColor: "border-l-emerald-500",
    accentColor: "oklch(0.50 0.18 155)",
    features: [
      "Claim approval rate analytics",
      "Revenue trends & forecasting",
      "Denial prediction engine",
      "Department risk heatmap",
      "Benchmark comparisons",
    ],
  },
];

const kpiData = [
  {
    label: "Total Claims",
    target: 1234,
    icon: FileCheck,
    color: "oklch(0.38 0.14 188)",
    iconBg: "bg-sky-50",
    border: "border-l-4 border-l-sky-500",
  },
  {
    label: "Approved",
    target: 987,
    icon: CheckCircle2,
    color: "oklch(0.50 0.16 145)",
    iconBg: "bg-green-50",
    border: "border-l-4 border-l-green-500",
  },
  {
    label: "Pending",
    target: 167,
    icon: Clock,
    color: "oklch(0.60 0.17 60)",
    iconBg: "bg-amber-50",
    border: "border-l-4 border-l-amber-500",
  },
  {
    label: "Denied",
    target: 80,
    icon: XCircle,
    color: "oklch(0.55 0.20 25)",
    iconBg: "bg-red-50",
    border: "border-l-4 border-l-red-500",
  },
];

const claimBars = [
  { label: "Approved", pct: 80, color: "bg-green-500", text: "text-green-700" },
  { label: "Pending", pct: 14, color: "bg-amber-400", text: "text-amber-700" },
  { label: "Denied", pct: 6, color: "bg-red-400", text: "text-red-700" },
];

const workflowSteps = [
  {
    step: 1,
    title: "Patient Registration",
    ai: "AI verifies insurance eligibility in seconds",
    icon: Users,
  },
  {
    step: 2,
    title: "Insurance Verification",
    ai: "Automated policy validity & coverage limit check",
    icon: ShieldCheck,
  },
  {
    step: 3,
    title: "Treatment",
    ai: "Real-time clinical documentation support",
    icon: Heart,
  },
  {
    step: 4,
    title: "Medical Coding",
    ai: "Automated coding reduces errors by 40%",
    icon: FileCheck,
  },
  {
    step: 5,
    title: "Claim Submission",
    ai: "Smart claim validation before submission",
    icon: Activity,
  },
  {
    step: 6,
    title: "Insurance Processing",
    ai: "AI tracks status and flags risk claims early",
    icon: Monitor,
  },
  {
    step: 7,
    title: "Payment Reconciliation",
    ai: "Automated matching cuts reconciliation time by 60%",
    icon: TrendingUp,
  },
];

const beneficiaries = [
  {
    icon: Building2,
    title: "Hospitals",
    description:
      "Improve revenue cycle efficiency, reduce denials, and achieve 95%+ clean claim rates with our integrated RCM platform.",
    gradient: "from-sky-500/10 to-sky-500/0",
    accent: "text-sky-600",
    iconBg: "bg-sky-50",
  },
  {
    icon: Activity,
    title: "Clinics",
    description:
      "Automate billing workflows, eliminate paperwork, and accelerate reimbursements for multi-specialty clinics.",
    gradient: "from-indigo-500/10 to-indigo-500/0",
    accent: "text-indigo-600",
    iconBg: "bg-indigo-50",
  },
  {
    icon: HeartHandshake,
    title: "Insurance Partners",
    description:
      "Streamline claim processing with structured data, reducing adjudication time and administrative overhead.",
    gradient: "from-emerald-500/10 to-emerald-500/0",
    accent: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    icon: Brain,
    title: "Healthcare Administrators",
    description:
      "Gain complete operational visibility with executive dashboards and AI-powered risk intelligence.",
    gradient: "from-purple-500/10 to-purple-500/0",
    accent: "text-purple-600",
    iconBg: "bg-purple-50",
  },
];

const securityCards = [
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Enterprise-grade data protection with multi-layer access controls and audit trails.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: CheckCircle2,
    title: "HIPAA Readiness",
    description:
      "Platform designed around HIPAA compliance principles with regular security assessments.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Resilient cloud infrastructure with 99.9% uptime SLA and disaster recovery.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Lock,
    title: "AES-256 Encryption",
    description:
      "AES-256 encryption at rest and TLS 1.3 in transit for all healthcare data.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const marqueeText =
  "✦ Faster Claims  ·  Better Revenue  ·  500+ Hospitals  ·  95% Clean Claims  ·  18 Day Settlement  ·  ABDM Compliant  ·  NABH Ready  ·  Real-Time Insights  ·  Zero Revenue Leakage  ·  ";

const complianceTicker =
  "✦ HIPAA Ready  ·  NABH Aligned  ·  ABDM / FHIR R4  ·  DPDP Act 2023  ·  ISO 27001  ·  TLS 1.3 Encrypted  ·  AES-256 Encryption  ·  ";

// ─── Main Component ───────────────────────────────────────────────────────────
export function HomeDashboard() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <Layout section="home">
      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO — Full dark, GenLab-style                         */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 pt-24 pb-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.10 0.06 188) 0%, oklch(0.15 0.07 195) 50%, oklch(0.12 0.05 205) 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 94%, 0 100%)",
        }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.9 0.05 188) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        {/* Animated gradient glow blobs */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "oklch(0.55 0.16 200)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "oklch(0.48 0.16 155)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 12,
            ease: "easeInOut",
            delay: 3,
          }}
          aria-hidden="true"
        />

        {/* Floating particles */}
        <ParticleField />

        <div className="max-w-7xl mx-auto w-full relative z-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                  style={{
                    background: "oklch(0.20 0.06 188)",
                    borderColor: "oklch(0.35 0.10 188)",
                    color: "oklch(0.72 0.18 200)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "oklch(0.65 0.18 200)" }}
                  />
                  AI-Powered
                  <span className="text-white/40">·</span>
                  Healthcare
                  <span className="text-white/40">·</span>
                  Revenue Intelligence
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05]"
              >
                AI Health Zon
                <br />
                <span
                  className="relative inline-block"
                  style={{ color: "oklch(0.65 0.18 200)" }}
                >
                  Revenue Intelligence
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 rounded-full"
                    style={{ background: "oklch(0.65 0.18 200)" }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    aria-hidden="true"
                  />
                </span>
                <br />
                <span className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold">
                  Platform
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/65 text-lg mb-5 leading-relaxed max-w-xl"
              >
                Optimize hospital revenue cycle, reduce claim denials, and
                manage healthcare operations through an intelligent command
                center.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="space-y-2 mb-8"
              >
                {[
                  "We focus on what matters most to hospitals",
                  "Faster Claims. Better Revenue.",
                  "Unlock future Healthcare Innovations & Opportunities",
                ].map((tagline, i) => (
                  <div
                    key={tagline}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "oklch(0.65 0.18 200)" }}
                    />
                    <span
                      className={i === 1 ? "font-semibold" : "text-white/60"}
                      style={i === 1 ? { color: "oklch(0.72 0.18 200)" } : {}}
                    >
                      {tagline}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.35 0.16 188) 0%, oklch(0.55 0.18 200) 100%)",
                    boxShadow: "0 8px 32px oklch(0.35 0.16 188 / 0.4)",
                  }}
                  onClick={() => setIsDemoOpen(true)}
                  data-ocid="hero.primary_button"
                >
                  Book a Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <a href="#ecosystem-section" data-ocid="hero.secondary_button">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/10 hover:border-white/50 px-8"
                  >
                    Explore Platform
                  </Button>
                </a>
              </motion.div>

              {/* Floating stat badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                {[
                  "+127% Revenue Recovery",
                  "95% Clean Claim Rate",
                  "500+ Hospitals",
                ].map((stat) => (
                  <span
                    key={stat}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{
                      background: "oklch(0.18 0.06 188)",
                      borderColor: "oklch(0.35 0.10 188)",
                      color: "oklch(0.72 0.18 200)",
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {stat}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Mock dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="hidden lg:block"
            >
              <MockDashboardCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. MARQUEE TICKER STRIP                                   */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-3.5 relative z-10"
        style={{ background: "oklch(0.13 0.06 188)" }}
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-marquee gap-0">
          {/* Duplicated content for seamless loop */}
          <span className="inline-flex gap-0 shrink-0">
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {marqueeText}
            </span>
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {marqueeText}
            </span>
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. PROBLEM SECTION — Numbered cards with left borders     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="The Problem"
              title="Why Hospitals Lose Revenue"
              accentWord="Lose"
              subtitle="Healthcare organizations lose billions annually due to preventable revenue cycle failures. These are the four biggest culprits."
              center
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((pain, i) => {
              const Icon = pain.icon;
              return (
                <motion.div
                  key={pain.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`relative bg-white rounded-xl border border-l-4 ${pain.borderColor} border-border shadow-sm hover:shadow-lg transition-all p-6 overflow-hidden`}
                  data-ocid={`problem.item.${i + 1}`}
                >
                  {/* Faded background number */}
                  <span
                    className="absolute top-2 right-3 font-heading font-black text-7xl leading-none select-none pointer-events-none"
                    style={{ color: pain.accentColor, opacity: 0.07 }}
                    aria-hidden="true"
                  >
                    {pain.num}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${pain.accentColor}18`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: pain.accentColor }}
                    />
                  </div>

                  <h3 className="font-heading font-bold text-foreground mb-2 text-base leading-tight">
                    {pain.title}
                  </h3>
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3"
                    style={{
                      background: `${pain.accentColor}15`,
                      color: pain.accentColor,
                      border: `1px solid ${pain.accentColor}30`,
                    }}
                  >
                    ↓ {pain.impact}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pain.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. DARK STATS COUNTER BAND                               */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-4 relative overflow-hidden"
        style={{ background: "oklch(0.10 0.06 188)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.9 0.05 188) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/[0.08]">
            {[
              { num: 1234, suffix: "+", label: "Claims Processed" },
              { num: 95, suffix: "%", label: "Clean Claim Rate" },
              { num: 500, suffix: "+", label: "Hospitals Connected" },
              { num: 18, suffix: "", label: "Days Avg. Settlement" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center px-6 py-4"
              >
                <div
                  className="font-heading text-4xl sm:text-5xl font-black mb-2"
                  style={{ color: "white" }}
                >
                  <AnimatedCounter target={stat.num} />
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.65 0.18 200 / 0.7)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. CORE MODULES — Numbered service cards                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 md:px-8 lg:px-16"
        style={{ background: "oklch(0.975 0.018 188)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider border"
              style={{
                background: "oklch(0.92 0.05 188)",
                color: "oklch(0.30 0.14 188)",
                borderColor: "oklch(0.78 0.10 188)",
              }}
            >
              Core Product
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
              One Platform for{" "}
              <span
                className="relative inline-block"
                style={{ color: "oklch(0.38 0.14 188)" }}
              >
                Hospital Revenue Intelligence
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                  style={{ background: "oklch(0.55 0.18 200)" }}
                  aria-hidden="true"
                />
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              AI Health Zon connects hospital operations, billing teams, and
              patient services into one unified AI-driven ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreModules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 48px oklch(0.38 0.14 188 / 0.12)",
                    transition: { duration: 0.25 },
                  }}
                  className={`bg-white rounded-2xl border border-l-4 ${mod.borderColor} border-border shadow-sm p-7 flex flex-col relative overflow-hidden`}
                  data-ocid={`modules.item.${i + 1}`}
                >
                  {/* Faded background number */}
                  <span
                    className="absolute top-3 right-4 font-heading font-black text-8xl leading-none select-none pointer-events-none"
                    style={{ color: mod.accentColor, opacity: 0.06 }}
                    aria-hidden="true"
                  >
                    {mod.num}
                  </span>

                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${mod.accentColor}18` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: mod.accentColor }}
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground text-base leading-tight">
                        {mod.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5 flex-1 relative z-10">
                    {mod.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: mod.accentColor }}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={mod.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto relative z-10"
                    style={{ color: mod.accentColor }}
                    data-ocid={`modules.link.${i + 1}`}
                  >
                    Learn More →
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 6. FEATURE HIGHLIGHT — Asymmetric layout                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: Mock dashboard with tilt hover */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{
                rotateY: 3,
                rotateX: -2,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: "1000px" }}
            >
              <MockDashboardCard />
            </motion.div>

            {/* Right: Platform at a Glance */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <SectionHeading
                badge="Platform Dashboard"
                title="Platform at a Glance"
                accentWord="Glance"
                subtitle="Real-time metrics from the AI Health Zon command centre — powering smarter decisions across India's hospitals."
              />

              {/* KPI rows */}
              <div className="space-y-3 mb-6">
                {kpiData.map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-center gap-4 bg-white rounded-xl border ${kpi.border} border-border shadow-sm p-4`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg ${kpi.iconBg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: kpi.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">
                          {kpi.label}
                        </div>
                      </div>
                      <div
                        className="font-heading text-2xl font-bold"
                        style={{ color: kpi.color }}
                      >
                        <AnimatedCounter target={kpi.target} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bars */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-5">
                <div className="text-sm font-semibold text-foreground mb-4">
                  Claim Status Distribution
                </div>
                <div className="space-y-4">
                  {claimBars.map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-foreground">
                          {bar.label}
                        </span>
                        <span className={`font-bold ${bar.text}`}>
                          {bar.pct}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${bar.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <CleanClaimGauge pct={95} />
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    <div className="font-semibold text-foreground text-sm mb-1">
                      95% Clean Claim Rate
                    </div>
                    5% above industry target of 90%
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7. HOW IT WORKS — Workflow timeline                       */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 md:px-8 lg:px-16"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.965 0.025 195) 0%, white 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="How It Works"
              title="Hospital Revenue Cycle"
              accentWord="Revenue Cycle"
              subtitle="AI Health Zon enhances every step with intelligent automation and real-time insights."
              center
            />
          </motion.div>

          <div className="relative">
            {/* Connecting line desktop */}
            <div
              className="hidden lg:block absolute top-8 left-[7%] right-[7%] h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.78 0.10 188), transparent)",
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {workflowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex flex-col items-center text-center relative"
                    data-ocid={`workflow.item.${i + 1}`}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2 z-10 relative shadow-md"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.35 0.14 188) 0%, oklch(0.55 0.18 200) 100%)",
                        borderColor: "oklch(0.55 0.18 200)",
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-heading font-bold text-foreground text-xs mb-2 leading-tight">
                      {step.title}
                    </div>
                    <div
                      className="px-2 py-1.5 rounded-lg border text-xs leading-snug w-full"
                      style={{
                        background: "oklch(0.96 0.04 188)",
                        borderColor: "oklch(0.88 0.05 188)",
                        color: "oklch(0.35 0.14 188)",
                      }}
                    >
                      <span
                        className="font-semibold"
                        style={{ color: "oklch(0.55 0.18 200)" }}
                      >
                        AI:{" "}
                      </span>
                      {step.ai}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 8. HEALTHCARE ECOSYSTEM                                   */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="ecosystem-section"
        className="py-24 px-4 md:px-8 lg:px-16 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span
                  className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider border"
                  style={{
                    background: "oklch(0.92 0.05 188)",
                    color: "oklch(0.30 0.14 188)",
                    borderColor: "oklch(0.78 0.10 188)",
                  }}
                >
                  Healthcare Ecosystem
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                  India's Connected{" "}
                  <span
                    className="relative inline-block"
                    style={{ color: "oklch(0.38 0.14 188)" }}
                  >
                    Healthcare Ecosystem
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                      style={{ background: "oklch(0.55 0.18 200)" }}
                      aria-hidden="true"
                    />
                  </span>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-lg">
                  AI Health Zon is the central intelligence hub connecting every
                  stakeholder in India's healthcare value chain — hospitals,
                  insurers, government schemes, and patients.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { label: "500+ Hospitals", color: "oklch(0.38 0.14 188)" },
                    { label: "50+ Insurers", color: "oklch(0.50 0.14 185)" },
                    {
                      label: "10+ Govt Schemes",
                      color: "oklch(0.45 0.18 295)",
                    },
                    { label: "1M+ Patients", color: "oklch(0.52 0.22 15)" },
                  ].map((pill) => (
                    <span
                      key={pill.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                      style={{
                        background: `${pill.color}12`,
                        color: pill.color,
                        borderColor: `${pill.color}30`,
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {pill.label}
                    </span>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <EcosystemDiagram />
                  <p className="text-muted-foreground text-xs text-center mt-3 italic">
                    Hover over any node to explore stakeholder connections
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: "99.9%",
                    label: "Platform Uptime",
                    color: "oklch(0.50 0.16 145)",
                  },
                  {
                    value: "<2s",
                    label: "Claim Validation",
                    color: "oklch(0.38 0.14 188)",
                  },
                  {
                    value: "95%",
                    label: "Clean Claim Rate",
                    color: "oklch(0.55 0.18 200)",
                  },
                  {
                    value: "18 days",
                    label: "Avg. Settlement",
                    color: "oklch(0.45 0.18 295)",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl border border-border shadow-sm p-5 text-center"
                  >
                    <div
                      className="font-heading text-2xl font-bold mb-1"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Seven Pillars compact list */}
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <div className="text-sm font-bold text-foreground mb-4 font-heading">
                  Seven Pillars of Healthcare Intelligence
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {ecosystemPillars.map((pillar, i) => {
                    const Icon = pillar.icon;
                    return (
                      <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                        data-ocid={`ecosystem.item.${i + 1}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg ${pillar.bg} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className={`w-4 h-4 ${pillar.color}`} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-foreground">
                            {pillar.title}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {pillar.description.split(":")[0]}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 9. WHO BENEFITS — Gradient hover cards                    */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 md:px-8 lg:px-16"
        style={{ background: "oklch(0.975 0.018 188)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Who Benefits"
              title="Designed for Every Healthcare Stakeholder"
              accentWord="Every Healthcare"
              subtitle="Whether you run a 1,000-bed hospital or a specialist clinic, AI Health Zon scales to your needs."
              center
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {beneficiaries.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all p-6 text-center relative overflow-hidden group"
                  data-ocid={`benefits.item.${i + 1}`}
                >
                  {/* Bottom gradient fill on hover */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t ${b.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl ${b.iconBg} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`w-7 h-7 ${b.accent}`} />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 10. TRUST & SECURITY                                      */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Security & Compliance"
              title="Enterprise-Grade Security for Healthcare"
              accentWord="Security"
              subtitle="Your healthcare data is protected with enterprise-grade security. AI Health Zon is built for the trust demands of regulated healthcare environments."
              center
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {securityCards.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={sec.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-border shadow-sm p-6 text-center hover:shadow-md transition-shadow"
                  data-ocid={`security.item.${i + 1}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${sec.bg} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-7 h-7 ${sec.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2 text-sm">
                    {sec.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {sec.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Compliance ticker strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.78 0.10 188)" }}
          >
            <div
              className="py-3.5 overflow-hidden"
              style={{ background: "oklch(0.95 0.04 188)" }}
              aria-hidden="true"
            >
              <div className="flex whitespace-nowrap animate-marquee gap-0">
                <span className="inline-flex gap-0 shrink-0">
                  <span
                    className="text-sm font-semibold tracking-wide"
                    style={{ color: "oklch(0.30 0.14 188)" }}
                  >
                    {complianceTicker}
                    {complianceTicker}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 11. CASE STUDY                                            */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 md:px-8 lg:px-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.04 188) 0%, oklch(0.95 0.04 195) 50%, oklch(0.94 0.04 200) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Proven Results"
              title="What Our Clients Achieve"
              accentWord="Clients Achieve"
              subtitle="Real-world outcomes from hospitals using AI Health Zon across India."
              center
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-border shadow-xl overflow-hidden"
          >
            <div
              className="h-1.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.38 0.14 188) 0%, oklch(0.55 0.16 200) 100%)",
              }}
            />

            <div className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <Quote
                  className="w-10 h-10 opacity-20 flex-shrink-0 mt-1"
                  style={{ color: "oklch(0.38 0.14 188)" }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-lg text-foreground leading-relaxed font-medium mb-4">
                    "AI Health Zon transformed our revenue cycle. Within 6
                    months, we achieved a{" "}
                    <strong style={{ color: "oklch(0.38 0.14 188)" }}>
                      35% improvement
                    </strong>{" "}
                    in claim approval rates, reduced our denial rate by{" "}
                    <strong style={{ color: "oklch(0.38 0.14 188)" }}>
                      20%
                    </strong>
                    , and accelerated our payment cycle from 45 days to under 18
                    days."
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "oklch(0.92 0.05 188)" }}
                    >
                      <Building2
                        className="w-5 h-5"
                        style={{ color: "oklch(0.38 0.14 188)" }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        Medical Director
                      </div>
                      <div className="text-muted-foreground text-xs">
                        500-bed Multi-Specialty Hospital, Jaipur
                      </div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="w-4 h-4 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    metric: "+35%",
                    label: "Claim Approval Rate",
                    sub: "Improved from 68% to 92%",
                    color: "oklch(0.50 0.16 145)",
                    bg: "bg-green-50",
                    border: "border-green-200",
                  },
                  {
                    metric: "−20%",
                    label: "Denial Rate Reduced",
                    sub: "From 18% down to 4.5%",
                    color: "oklch(0.38 0.14 188)",
                    bg: "bg-sky-50",
                    border: "border-sky-200",
                  },
                  {
                    metric: "2.4×",
                    label: "Faster Payment Cycle",
                    sub: "45 days → 18 days average",
                    color: "oklch(0.55 0.18 200)",
                    bg: "bg-indigo-50",
                    border: "border-indigo-200",
                  },
                ].map((r) => (
                  <div
                    key={r.label}
                    className={`rounded-xl border ${r.border} ${r.bg} p-5 text-center`}
                    data-ocid="casestudy.card"
                  >
                    <div
                      className="font-heading text-3xl font-bold mb-1"
                      style={{ color: r.color }}
                    >
                      {r.metric}
                    </div>
                    <div className="font-semibold text-foreground text-sm mb-0.5">
                      {r.label}
                    </div>
                    <div className="text-muted-foreground text-xs">{r.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 12. SIMULATION LAB TEASER                                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.12 0.06 188) 0%, oklch(0.18 0.08 200) 60%, oklch(0.14 0.05 220) 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, oklch(0.9 0.05 188) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 text-white/80 text-xs font-semibold rounded-full"
                  style={{ background: "oklch(0.20 0.06 188)" }}
                >
                  <FlaskConical
                    className="w-3.5 h-3.5"
                    style={{ color: "oklch(0.65 0.18 200)" }}
                  />
                  Unique Platform Feature
                </span>
                <Badge className="bg-sky-500 text-white border-0 text-xs">
                  Only Platform with a Training Simulation
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                    AI Health Zon
                    <span
                      className="block mt-1"
                      style={{ color: "oklch(0.65 0.18 200)" }}
                    >
                      Simulation Lab
                    </span>
                  </h2>
                  <p className="text-white/65 text-base leading-relaxed mb-6">
                    Experience a 45-minute leadership simulation where hospital
                    teams manage claims, billing, and revenue decisions in real
                    time — across 10 escalating RCM stages.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-7">
                    {[
                      { icon: Users, text: "3–6 Players" },
                      { icon: Clock, text: "45–60 Minutes" },
                      { icon: BookOpen, text: "10 Stages" },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                        style={{
                          background: "oklch(0.18 0.06 188)",
                          border: "1px solid oklch(0.30 0.08 188)",
                          color: "rgba(255,255,255,0.65)",
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: "oklch(0.65 0.18 200)" }}
                        />
                        {text}
                      </div>
                    ))}
                  </div>
                  <Link to="/training-game" data-ocid="simlab.primary_button">
                    <Button
                      size="lg"
                      className="text-white font-semibold px-8 shadow-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.35 0.16 188) 0%, oklch(0.55 0.18 200) 100%)",
                        boxShadow: "0 8px 32px oklch(0.35 0.16 188 / 0.4)",
                      }}
                    >
                      Enter Simulation Lab
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="hidden lg:grid grid-cols-2 gap-3">
                  {[
                    {
                      num: 1,
                      name: "Smart Registration",
                      pts: "+10",
                      color: "bg-green-500",
                    },
                    {
                      num: 3,
                      name: "Pre-Auth Power Play",
                      pts: "+20",
                      color: "bg-amber-500",
                    },
                    {
                      num: 7,
                      name: "Denial Defense",
                      pts: "+30",
                      color: "bg-red-500",
                    },
                    {
                      num: 10,
                      name: "Revenue Board Review",
                      pts: "+85",
                      color: "bg-purple-500",
                    },
                  ].map((stage) => (
                    <div
                      key={stage.num}
                      className="rounded-xl border border-white/10 p-4"
                      style={{ background: "oklch(0.18 0.06 188)" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`w-6 h-6 rounded-full ${stage.color} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {stage.num}
                        </span>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.25 0.08 188)",
                            color: "oklch(0.72 0.18 200)",
                          }}
                        >
                          {stage.pts}
                        </span>
                      </div>
                      <div className="text-white/80 text-xs font-medium leading-snug">
                        {stage.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 13. FINAL CTA — Dark gradient with particles              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="py-28 px-4 md:px-8 lg:px-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.10 0.06 188) 0%, oklch(0.15 0.07 200) 50%, oklch(0.12 0.05 215) 100%)",
        }}
      >
        {/* Particles */}
        <ParticleField />

        {/* Glow blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: "oklch(0.45 0.16 200)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-5 uppercase tracking-wider border"
              style={{
                background: "oklch(0.20 0.06 188)",
                color: "oklch(0.65 0.18 200)",
                borderColor: "oklch(0.35 0.10 188)",
              }}
            >
              Get Started
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
              Transform Your Hospital
              <br />
              <span style={{ color: "oklch(0.65 0.18 200)" }}>
                Revenue Cycle
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Join 500+ hospitals across India using AI Health Zon to achieve
              95%+ clean claim rates, reduce denials, and unlock revenue growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-white font-semibold px-10 shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.35 0.16 188) 0%, oklch(0.55 0.18 200) 100%)",
                  boxShadow: "0 12px 40px oklch(0.35 0.16 188 / 0.5)",
                }}
                onClick={() => setIsDemoOpen(true)}
                data-ocid="cta.primary_button"
              >
                Schedule Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Link to="/join-network" data-ocid="cta.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/10">
              {[
                { icon: Shield, text: "HIPAA Ready" },
                { icon: CheckCircle2, text: "Free Demo" },
                { icon: Zap, text: "2-Hour Onboarding" },
                { icon: Users, text: "500+ Hospitals" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "oklch(0.65 0.18 200)" }}
                  />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <DemoBookingDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </Layout>
  );
}
