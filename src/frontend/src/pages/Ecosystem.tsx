import { Layout } from "@/components/layout/Layout";
import {
  BarChart3,
  Building2,
  Heart,
  Monitor,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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
    label: "Digital Health",
    icon: Smartphone,
    color: "#059669",
    angle: 205.7,
    description:
      "ABDM-compliant digital health infrastructure connecting all stakeholders.",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: ShieldCheck,
    color: "#d97706",
    angle: 257.1,
    description:
      "NABH, ISO, NHA standards ensuring quality and regulatory adherence.",
  },
  {
    id: "command",
    label: "Command Centre",
    icon: Monitor,
    color: "#6d28d9",
    angle: 308.5,
    description:
      "Real-time operational intelligence for claims, denials, and financial performance.",
  },
];

const pillars = [
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
    title: "Digital Health (ABDM)",
    icon: Smartphone,
    color: "text-green-600",
    bg: "bg-green-50",
    description:
      "Full ABDM ecosystem: Health Facility Registry, Healthcare Professionals Registry, ABHA, PHR, and HIE-CM.",
  },
  {
    title: "Quality & Compliance",
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

export function Ecosystem() {
  return (
    <Layout section="ecosystem">
      {/* Hero */}
      <section className="pt-20 pb-12 health-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              Platform Overview
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-5">
              The AI Health Zon Ecosystem
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              An interconnected healthcare network where hospitals, insurers,
              government schemes, patients, and digital health converge for
              seamless care delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Diagram */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Interactive Ecosystem Map
              </h2>
              <p className="text-muted-foreground text-sm">
                Hover over any node to explore stakeholder connections
              </p>
            </div>
            <EcosystemDiagram />
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Ecosystem Pillars
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Seven interconnected pillars form the foundation of India's most
              comprehensive healthcare digital ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs card-hover"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${pillar.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${pillar.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Ready to Join the Ecosystem?
          </h2>
          <p className="text-muted-foreground mb-6">
            Become part of India's largest healthcare digital network and
            transform how you deliver care.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/join-network"
              className="inline-flex items-center justify-center px-6 py-3 bg-health-blue text-white rounded-lg font-semibold text-sm hover:bg-health-blue/90 transition-colors"
            >
              Join the Network
            </a>
            <a
              href="/hospitals"
              className="inline-flex items-center justify-center px-6 py-3 border border-health-blue text-health-blue rounded-lg font-semibold text-sm hover:bg-health-blue-light transition-colors"
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
