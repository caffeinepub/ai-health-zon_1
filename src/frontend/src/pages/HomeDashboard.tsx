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
      aria-label="Clean claim gauge"
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

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({
  badge,
  title,
  subtitle,
  center,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {badge && (
        <span className="inline-block px-3 py-1 bg-health-blue-light text-health-blue text-xs font-semibold rounded-full mb-3 uppercase tracking-wider border border-health-blue/20">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-muted-foreground mt-3 text-base leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-2xl"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Animated KPI Counter ─────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  duration = 1500,
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
      // easeOutQuart
      const eased = 1 - (1 - progress) ** 4;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
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

        {/* Background glow at center */}
        <circle cx={cx} cy={cy} r="90" fill="url(#centerGlow)" />

        {/* Orbit ring */}
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

        {/* Connecting lines */}
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

        {/* Satellite nodes */}
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

        {/* Center node */}
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

        {/* Tooltip box */}
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const painPoints = [
  {
    icon: XCircle,
    title: "Claim Denials",
    impact: "Lost Revenue",
    description:
      "30–40% of initial claims are denied, costing hospitals millions in lost reimbursements annually.",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    impactColor: "text-red-600 bg-red-50 border-red-200",
  },
  {
    icon: FileX,
    title: "Manual Billing",
    impact: "Slow Processing",
    description:
      "Manual processes introduce errors and delays, stretching payment cycles from days to months.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    impactColor: "text-orange-600 bg-orange-50 border-orange-200",
  },
  {
    icon: Database,
    title: "Data Silos",
    impact: "Poor Decision Making",
    description:
      "Disconnected systems prevent real-time insights, leaving executives flying blind on revenue.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    impactColor: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    icon: Clock,
    title: "Delayed Approvals",
    impact: "Cash Flow Issues",
    description:
      "Insurance pre-auth delays extend patient stays and create downstream billing complications.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    impactColor: "text-purple-600 bg-purple-50 border-purple-200",
  },
];

const pillars = [
  {
    emoji: "🏥",
    title: "Revenue Cycle Intelligence",
    description:
      "Automated claims submission, billing optimization, and intelligent denial management — all in one workflow.",
    topBorder: "border-t-health-blue",
    textColor: "text-health-blue",
  },
  {
    emoji: "🧠",
    title: "AI Command Centre",
    description:
      "Real-time monitoring of hospital financial performance with risk alerts and executive-level insights.",
    topBorder: "border-t-sky-500",
    textColor: "text-sky-600",
  },
  {
    emoji: "🤝",
    title: "Patient Support System",
    description:
      "Insurance guidance, billing assistance, and engagement tools that improve patient financial experience.",
    topBorder: "border-t-green-500",
    textColor: "text-green-600",
  },
];

const coreModules = [
  {
    icon: Activity,
    title: "Hospital Revenue Management",
    description:
      "End-to-end revenue cycle automation from registration to payment reconciliation.",
    href: "/hospitals",
    color: "text-health-blue",
    bg: "bg-health-blue-light",
    features: [
      "Claim submission automation",
      "Insurance eligibility verification",
      "Medical coding support",
      "Payment reconciliation",
      "Denial management",
    ],
  },
  {
    icon: Monitor,
    title: "AI Command Centre",
    description:
      "Live operational dashboard giving complete visibility into claims and revenue.",
    href: "/command-centre",
    color: "text-sky-600",
    bg: "bg-sky-50",
    features: [
      "Real-time operational dashboard",
      "Claims tracking & analytics",
      "Revenue performance metrics",
      "Risk alerts & notifications",
      "Executive insights reports",
    ],
  },
  {
    icon: Heart,
    title: "Patient Financial Support",
    description:
      "AI-powered assistance for patients navigating insurance and billing.",
    href: "/patient-support",
    color: "text-rose-600",
    bg: "bg-rose-50",
    features: [
      "AI chatbot for billing queries",
      "Flexible payment plans",
      "Insurance assistance",
      "ABHA ID creation & linking",
      "Grievance resolution",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Predictive analytics and financial forecasting for smarter hospital decisions.",
    href: "/insights",
    color: "text-purple-600",
    bg: "bg-purple-50",
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
    color: "text-health-blue",
    bg: "bg-health-blue-light",
    border: "border-l-4 border-l-health-blue",
  },
  {
    label: "Approved",
    target: 987,
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-l-4 border-l-green-500",
  },
  {
    label: "Pending",
    target: 167,
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-l-4 border-l-amber-500",
  },
  {
    label: "Denied",
    target: 80,
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
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
    color: "text-health-blue",
    bg: "bg-health-blue-light",
  },
  {
    icon: Activity,
    title: "Clinics",
    description:
      "Automate billing workflows, eliminate paperwork, and accelerate reimbursements for multi-specialty clinics.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: HeartHandshake,
    title: "Insurance Partners",
    description:
      "Streamline claim processing with structured data, reducing adjudication time and administrative overhead.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Brain,
    title: "Healthcare Administrators",
    description:
      "Gain complete operational visibility with executive dashboards and AI-powered risk intelligence.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const securityBadges = [
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Enterprise-grade data protection with multi-layer access controls and audit trails.",
    color: "text-health-blue",
    bg: "bg-health-blue-light",
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
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Lock,
    title: "Encryption",
    description:
      "AES-256 encryption at rest and TLS 1.3 in transit for all healthcare data.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function HomeDashboard() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <Layout section="home">
      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 lg:px-16 pt-24 pb-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.06 188) 0%, oklch(0.18 0.08 200) 40%, oklch(0.14 0.05 210) 100%)",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.9 0.05 188) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0.05 188) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Hero command centre image overlay (right side, lg+) */}
        <div className="absolute inset-0 hidden lg:block overflow-hidden">
          <img
            src="/assets/generated/hero-command-centre.dim_1200x600.jpg"
            alt=""
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-10"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 40%)",
            }}
          />
        </div>

        {/* Animated glow blobs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.55 0.16 200)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.52 0.16 145)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-56 h-56 rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.60 0.18 220)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 12,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full blur-2xl pointer-events-none"
          style={{ background: "oklch(0.65 0.20 170)" }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 text-white/80 text-xs font-semibold rounded-full mb-6 backdrop-blur-sm bg-white/5">
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  AI-Powered Healthcare Revenue Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                AI Health Zon
                <br />
                <span
                  style={{ color: "oklch(0.72 0.18 200)" }}
                  className="block mt-1"
                >
                  Revenue Intelligence
                </span>
                <span className="text-white">Platform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/70 text-lg mb-4 leading-relaxed max-w-xl"
              >
                Optimize hospital revenue cycle, reduce claim denials, and
                manage healthcare operations through an intelligent command
                center.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-1.5 mb-8"
              >
                {[
                  "We focus on what matters most to hospitals",
                  "Faster Claims. Better Revenue.",
                  "Unlock future Healthcare Innovations & Opportunities",
                ].map((tagline, i) => (
                  <div
                    key={tagline}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "oklch(0.72 0.18 200)" }}
                    />
                    <span
                      className={
                        i === 1 ? "text-sky-300 font-semibold" : "text-white/60"
                      }
                    >
                      {tagline}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 shadow-lg shadow-sky-900/40"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.38 0.14 188) 0%, oklch(0.55 0.16 200) 100%)",
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
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 backdrop-blur-sm"
                  >
                    Explore Platform
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right: Mock dashboard card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div
                className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.18 0.06 188) 0%, oklch(0.14 0.04 200) 100%)",
                }}
              >
                {/* Mock header bar */}
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

                {/* Mock dashboard content */}
                <div className="p-5">
                  {/* KPI row */}
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {[
                      { label: "Total Claims", value: "1,234", up: true },
                      { label: "Clean Claim Rate", value: "95%", up: true },
                      { label: "Revenue Recovered", value: "₹2.4Cr", up: true },
                      { label: "Approvals Today", value: "187", up: false },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg p-3 border border-white/8"
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

                  {/* Mock chart bars */}
                  <div
                    className="rounded-xl p-4 border border-white/8 mb-4"
                    style={{ background: "oklch(0.16 0.05 188)" }}
                  >
                    <div className="text-white/60 text-xs mb-3 font-medium">
                      Claim Status Distribution
                    </div>
                    <div className="space-y-2.5">
                      {[
                        {
                          label: "Approved",
                          pct: 80,
                          color: "oklch(0.52 0.16 145)",
                        },
                        {
                          label: "Pending",
                          pct: 14,
                          color: "oklch(0.68 0.17 60)",
                        },
                        {
                          label: "Denied",
                          pct: 6,
                          color: "oklch(0.55 0.2 25)",
                        },
                      ].map((b) => (
                        <div key={b.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/50">{b.label}</span>
                            <span className="text-white/70 font-semibold">
                              {b.pct}%
                            </span>
                          </div>
                          <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{
                              background: "oklch(0.22 0.06 188)",
                            }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${b.pct}%`,
                                background: b.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Department risk strip */}
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { dept: "Cardiology", risk: "Low", dot: "bg-green-500" },
                      {
                        dept: "Orthopedics",
                        risk: "Low",
                        dot: "bg-green-500",
                      },
                      {
                        dept: "Emergency",
                        risk: "Med",
                        dot: "bg-amber-400",
                      },
                      {
                        dept: "Gen. Med",
                        risk: "High",
                        dot: "bg-red-500",
                      },
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. PROBLEM SECTION                                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="The Problem"
              title="Why Hospitals Lose Revenue"
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-2xl border ${pain.border} bg-white p-6 shadow-sm hover:shadow-md transition-shadow`}
                  data-ocid={`problem.item.${i + 1}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${pain.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${pain.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1.5 text-base">
                    {pain.title}
                  </h3>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${pain.impactColor} mb-3`}
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
      {/* 3. SOLUTION SECTION                                       */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 health-gradient-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="The Solution"
              title="One Platform for Hospital Revenue Intelligence"
              subtitle="AI Health Zon connects hospital operations, billing teams, and patient services into one unified AI-driven ecosystem."
              center
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white rounded-2xl border border-border border-t-4 ${pillar.topBorder} shadow-sm p-7`}
              >
                <span className="text-4xl mb-4 block">{pillar.emoji}</span>
                <h3
                  className={`font-heading font-bold text-lg mb-3 ${pillar.textColor}`}
                >
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. PLATFORM MODULES                                       */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Core Product"
              title="Core Platform Modules"
              subtitle="Four powerful modules working together to eliminate revenue leakage and optimize every step of the healthcare revenue cycle."
              center
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreModules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-7 flex flex-col"
                  data-ocid={`modules.item.${i + 1}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${mod.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-6 h-6 ${mod.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-foreground text-base leading-tight mb-1">
                        {mod.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {mod.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 ${mod.color}`}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={mod.href}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${mod.color} mt-auto`}
                    data-ocid={`modules.link.${i + 1}`}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. PLATFORM DASHBOARD                                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 health-gradient-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Platform Dashboard"
              title="Platform at a Glance"
              subtitle="Real-time metrics from the AI Health Zon command centre — powering smarter decisions across India's hospitals."
              center
            />
          </motion.div>

          {/* Animated KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpiData.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`bg-white rounded-xl border border-border ${kpi.border} shadow-sm p-5 flex items-center gap-4`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <div>
                    <div
                      className={`font-heading text-2xl font-bold ${kpi.color}`}
                    >
                      <AnimatedCounter target={kpi.target} />
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {kpi.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 3-column dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Claim status bar chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-border shadow-sm p-6"
            >
              <h3 className="font-heading font-bold text-foreground mb-5 text-sm">
                Claim Status Distribution
              </h3>
              <div className="space-y-5">
                {claimBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-foreground">
                        {bar.label}
                      </span>
                      <span className={`font-bold ${bar.text}`}>
                        {bar.pct}%
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${bar.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground">
                Total: <strong className="text-foreground">1,234 claims</strong>{" "}
                · This month
              </div>
            </motion.div>

            {/* Clean Claim Gauge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center"
            >
              <h3 className="font-heading font-bold text-foreground mb-4 text-sm w-full">
                Clean Claim Rate
              </h3>
              <CleanClaimGauge pct={95} />
              <div className="flex gap-2 mt-4 w-full justify-center flex-wrap">
                {[
                  {
                    label: "Target",
                    value: "90%",
                    cls: "bg-muted text-muted-foreground",
                  },
                  {
                    label: "Current",
                    value: "95%",
                    cls: "bg-green-50 text-green-700 border border-green-200",
                  },
                  {
                    label: "Trend",
                    value: "↑ 3%",
                    cls: "bg-health-blue-light text-health-blue border border-health-blue/20",
                  },
                ].map((pill) => (
                  <div
                    key={pill.label}
                    className={`px-3 py-1.5 rounded-lg text-center ${pill.cls}`}
                  >
                    <div className="text-xs font-medium">{pill.label}</div>
                    <div className="font-bold text-sm">{pill.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Revenue trend mini-chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-border shadow-sm p-6"
            >
              <h3 className="font-heading font-bold text-foreground mb-5 text-sm">
                Revenue Recovery Trend
              </h3>
              {/* SVG sparkline bars */}
              <div className="flex items-end gap-2 h-24 mb-3">
                {(
                  [
                    { month: "Jan", pct: 42 },
                    { month: "Feb", pct: 58 },
                    { month: "Mar", pct: 51 },
                    { month: "Apr", pct: 67 },
                    { month: "May", pct: 72 },
                    { month: "Jun", pct: 65 },
                    { month: "Jul", pct: 80 },
                    { month: "Aug", pct: 75 },
                    { month: "Sep", pct: 88 },
                    { month: "Oct", pct: 82 },
                    { month: "Nov", pct: 92 },
                    { month: "Dec", pct: 95 },
                  ] as { month: string; pct: number }[]
                ).map(({ month, pct }, i) => (
                  <motion.div
                    key={month}
                    className="flex-1 rounded-t"
                    style={{ background: "oklch(0.38 0.14 188)" }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold font-heading text-health-blue">
                  +127%
                </div>
                <div className="text-xs text-muted-foreground">
                  Revenue recovery improvement YoY
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 6. HOW IT WORKS                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="How It Works"
              title="Hospital Revenue Cycle"
              subtitle="AI Health Zon enhances every step of the revenue cycle with intelligent automation and real-time insights."
              center
            />
          </motion.div>

          {/* RCM image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <img
              src="/assets/generated/hospital-rcm.dim_800x500.jpg"
              alt="AI Health Zon Hospital Revenue Cycle Management workflow"
              className="w-full rounded-2xl shadow-lg object-cover"
              style={{ maxHeight: "340px" }}
            />
            <p className="text-center text-muted-foreground text-sm mt-3 italic">
              AI Health Zon enhances every step of your revenue cycle with
              intelligent automation.
            </p>
          </motion.div>

          {/* Workflow steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
              {workflowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex flex-col items-center text-center relative"
                    data-ocid={`workflow.item.${i + 1}`}
                  >
                    {/* Step circle */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2 z-10 relative shadow-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.38 0.14 188) 0%, oklch(0.55 0.16 200) 100%)",
                        borderColor: "oklch(0.38 0.14 188)",
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-heading font-bold text-foreground text-xs mb-2 leading-tight">
                      {step.title}
                    </div>
                    {/* AI annotation */}
                    <div
                      className="px-2 py-1.5 rounded-lg border text-xs leading-snug"
                      style={{
                        background: "oklch(0.96 0.04 188)",
                        borderColor: "oklch(0.88 0.05 188)",
                        color: "oklch(0.38 0.14 188)",
                      }}
                    >
                      <span className="font-semibold text-sky-600">AI: </span>
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
      {/* 7. WHO BENEFITS                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 health-gradient-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Who Benefits"
              title="Designed for Every Healthcare Stakeholder"
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-6 text-center"
                  data-ocid={`benefits.item.${i + 1}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${b.bg} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-7 h-7 ${b.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {b.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {b.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7B. HEALTHCARE ECOSYSTEM OVERVIEW (from Ecosystem page)   */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="ecosystem-section"
        className="py-20 px-4 md:px-8 lg:px-16 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text + diagram */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-3 py-1 bg-health-blue-light text-health-blue text-xs font-semibold rounded-full mb-3 uppercase tracking-wider border border-health-blue/20">
                  Healthcare Ecosystem
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                  India's Connected Healthcare Ecosystem
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-lg">
                  AI Health Zon is the central intelligence hub connecting every
                  stakeholder in India's healthcare value chain — hospitals,
                  insurers, government schemes, and patients — enabling seamless
                  data exchange, faster claims, and better outcomes for all.
                </p>

                {/* Stat pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    {
                      label: "500+ Hospitals",
                      color:
                        "text-health-blue bg-health-blue-light border-health-blue/20",
                    },
                    {
                      label: "50+ Insurers",
                      color: "text-teal-700 bg-teal-50 border-teal-200",
                    },
                    {
                      label: "10+ Govt Schemes",
                      color: "text-purple-700 bg-purple-50 border-purple-200",
                    },
                    {
                      label: "1M+ Patients",
                      color: "text-rose-700 bg-rose-50 border-rose-200",
                    },
                  ].map((pill) => (
                    <span
                      key={pill.label}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${pill.color}`}
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

            {/* Right: ecosystem network image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <img
                  src="/assets/generated/ecosystem-network.dim_800x500.jpg"
                  alt="AI Health Zon healthcare network connecting hospitals, insurers, government and patients"
                  className="w-full rounded-2xl shadow-2xl object-cover"
                  style={{ maxHeight: "360px" }}
                />
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">
                    Network Status
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-semibold text-foreground text-sm">
                      All Systems Active
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: "99.9%",
                    label: "Platform Uptime",
                    color: "text-green-600",
                  },
                  {
                    value: "<2s",
                    label: "Claim Validation",
                    color: "text-health-blue",
                  },
                  {
                    value: "95%",
                    label: "Clean Claim Rate",
                    color: "text-sky-600",
                  },
                  {
                    value: "18 days",
                    label: "Avg. Settlement",
                    color: "text-purple-600",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl border border-border shadow-sm p-4 text-center"
                  >
                    <div
                      className={`font-heading text-2xl font-bold ${stat.color} mb-1`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7C. SEVEN PILLARS OF HEALTHCARE INTELLIGENCE             */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Ecosystem Pillars"
              title="Seven Pillars of Healthcare Intelligence"
              subtitle="Seven interconnected pillars form the foundation of India's most comprehensive healthcare digital ecosystem."
              center
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ecosystemPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-6"
                  data-ocid={`ecosystem.item.${i + 1}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${pillar.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${pillar.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2 text-sm">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 8. TRUST & SECURITY                                      */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Security & Compliance"
              title="Enterprise-Grade Security for Healthcare"
              subtitle="Your healthcare data is protected with enterprise-grade security. AI Health Zon is built for the trust demands of regulated healthcare environments."
              center
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {securityBadges.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={sec.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-border shadow-sm p-6 text-center"
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

          {/* Compliance strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-health-blue/20 bg-health-blue-light p-5 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              "HIPAA Ready",
              "NABH Aligned",
              "ABDM / FHIR R4",
              "DPDP Act 2023",
              "ISO 27001",
              "TLS 1.3 Encrypted",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-health-blue/20 text-health-blue text-xs font-semibold rounded-full shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 9. CASE STUDY                                            */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 health-gradient-light">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Proven Results"
              title="What Our Clients Achieve"
              subtitle="Real-world outcomes from hospitals using AI Health Zon across India."
              center
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl border border-border shadow-lg overflow-hidden"
          >
            {/* Top accent bar */}
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
                  className="w-10 h-10 text-health-blue opacity-30 flex-shrink-0 mt-1"
                  aria-hidden
                />
                <div>
                  <p className="text-lg text-foreground leading-relaxed font-medium mb-3">
                    "AI Health Zon transformed our revenue cycle. Within 6
                    months, we achieved a{" "}
                    <strong className="text-health-blue">
                      35% improvement
                    </strong>{" "}
                    in claim approval rates, reduced our denial rate by{" "}
                    <strong className="text-health-blue">20%</strong>, and
                    accelerated our payment cycle from 45 days to under 18
                    days."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-health-blue-light flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-health-blue" />
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

              {/* Result metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    metric: "+35%",
                    label: "Claim Approval Rate",
                    sub: "Improved from 68% to 92%",
                    color: "text-green-600",
                    bg: "bg-green-50",
                    border: "border-green-200",
                  },
                  {
                    metric: "−20%",
                    label: "Denial Rate Reduced",
                    sub: "From 18% down to 4.5%",
                    color: "text-health-blue",
                    bg: "bg-health-blue-light",
                    border: "border-health-blue/20",
                  },
                  {
                    metric: "2.4×",
                    label: "Faster Payment Cycle",
                    sub: "45 days → 18 days average",
                    color: "text-sky-600",
                    bg: "bg-sky-50",
                    border: "border-sky-200",
                  },
                ].map((r) => (
                  <div
                    key={r.label}
                    className={`rounded-xl border ${r.border} ${r.bg} p-5 text-center`}
                    data-ocid="casestudy.card"
                  >
                    <div
                      className={`font-heading text-3xl font-bold ${r.color} mb-1`}
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
      {/* 10. SIMULATION LAB TEASER                               */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
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
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.9 0.05 188) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0.05 188) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 text-white/80 text-xs font-semibold rounded-full bg-white/5">
                  <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
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
                      style={{ color: "oklch(0.72 0.18 200)" }}
                    >
                      Simulation Lab
                    </span>
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed mb-6">
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
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white/70 text-sm"
                      >
                        <Icon className="w-4 h-4 text-sky-400" />
                        {text}
                      </div>
                    ))}
                  </div>
                  <Link to="/training-game" data-ocid="simlab.primary_button">
                    <Button
                      size="lg"
                      className="text-white font-semibold px-8 shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.38 0.14 188) 0%, oklch(0.55 0.16 200) 100%)",
                      }}
                    >
                      Enter Simulation Lab
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Simulation stage preview */}
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
                            color: "oklch(0.75 0.14 200)",
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
      {/* 11. CTA SECTION                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-8 lg:px-16 health-gradient-light">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-health-blue-light text-health-blue text-xs font-semibold rounded-full mb-5 uppercase tracking-wider border border-health-blue/20">
              Get Started
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
              Transform Your Hospital
              <span className="block text-health-blue">Revenue Cycle</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Join 500+ hospitals across India using AI Health Zon to achieve
              95%+ clean claim rates, reduce denials, and unlock revenue growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-white font-semibold px-10 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.38 0.14 188) 0%, oklch(0.55 0.16 200) 100%)",
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
                  className="border-primary text-primary hover:bg-health-blue-light px-10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-border">
              {[
                { icon: Shield, text: "HIPAA Ready" },
                { icon: CheckCircle2, text: "Free Demo" },
                { icon: Zap, text: "2-Hour Onboarding" },
                { icon: Users, text: "500+ Hospitals" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-muted-foreground text-sm"
                >
                  <Icon className="w-4 h-4 text-health-blue" />
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
