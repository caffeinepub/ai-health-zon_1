import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Database,
  Heart,
  Shield,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";

const abdmCards = [
  {
    icon: CreditCard,
    title: "ABHA ID Creation & Management",
    description:
      "Create and manage Ayushman Bharat Health Accounts (14-digit unique health IDs) for patients. Link existing records and enable digital health data ownership.",
    features: [
      "Aadhaar/Mobile-based enrollment",
      "14-digit unique health ID",
      "QR code-based identification",
      "Profile management portal",
    ],
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Database,
    title: "Personal Health Records (PHR)",
    description:
      "Enable patients to access and manage their complete digital health records — prescriptions, lab reports, discharge summaries, and imaging.",
    features: [
      "Consent-based record sharing",
      "Lifetime health data storage",
      "FHIR R4 compliant records",
      "Cross-provider record view",
    ],
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: ArrowRight,
    title: "Health Information Exchange",
    description:
      "Seamless health information exchange between hospitals, labs, pharmacies, and patients using standardized ABDM protocols.",
    features: [
      "HL7 FHIR standard",
      "Real-time data exchange",
      "Multi-provider connectivity",
      "Audit trail for all shares",
    ],
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Consent Management Framework",
    description:
      "Patient-controlled consent management ensuring data privacy and regulatory compliance under DPDP Act 2023.",
    features: [
      "Granular consent controls",
      "Time-bound consent grants",
      "Revocable permissions",
      "Consent audit logs",
    ],
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Smartphone,
    title: "Healthcare Interoperability",
    description:
      "Full interoperability with NHA-registered Health Information Providers (HIP) and Health Information Users (HIU).",
    features: [
      "HIP/HIU certified platform",
      "HFRID facility registry",
      "HPRID professional registry",
      "UHI protocol support",
    ],
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const implementationChecklist = [
  {
    phase: "Phase 1: Foundation",
    items: [
      "ABDM sandbox testing complete",
      "ABHA enrollment workflow built",
      "Patient consent UI implemented",
      "FHIR R4 data models mapped",
    ],
  },
  {
    phase: "Phase 2: Integration",
    items: [
      "HIS/EMR FHIR API integration",
      "Lab & imaging report digitization",
      "Pharmacy record digitization",
      "OPD prescription digitization",
    ],
  },
  {
    phase: "Phase 3: Go-Live",
    items: [
      "Staff training on ABDM workflows",
      "Patient awareness campaigns",
      "ABHA enrollment drives",
      "HIE-CM testing complete",
    ],
  },
  {
    phase: "Phase 4: Scale",
    items: [
      "Cross-department rollout",
      "Data quality monitoring",
      "Interoperability testing",
      "Analytics and reporting",
    ],
  },
];

const benefits = [
  {
    stakeholder: "Hospitals",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: [
      "Reduce redundant diagnostics by 30%",
      "Faster patient registration",
      "Paperless medical records",
      "Improved care coordination",
    ],
  },
  {
    stakeholder: "Patients",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-50",
    items: [
      "Own and control health data",
      "Access records anywhere",
      "Avoid repeated tests",
      "Better continuity of care",
    ],
  },
  {
    stakeholder: "Insurers",
    icon: Shield,
    color: "text-teal-600",
    bg: "bg-teal-50",
    items: [
      "Faster claims processing",
      "Reduced fraud with verified records",
      "Pre-auth with digital records",
      "Better risk profiling",
    ],
  },
];

export function DigitalHealth() {
  return (
    <Layout section="digital-health">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              ABDM Compliant
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Ayushman Bharat
              <br />
              Digital Mission
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Comprehensive ABDM integration enabling digital health
              transformation across India's healthcare ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ABDM Cards */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              ABDM Coverage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full-stack ABDM ecosystem implementation covering all five pillars
              of India's National Digital Health Mission.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {abdmCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs card-hover"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <ul className="space-y-1.5">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${card.color} shrink-0`}
                        />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABDM Architecture Diagram */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Integration Architecture
            </h2>
            <p className="text-muted-foreground">
              AI Health Zon's ABDM integration layer bridging all healthcare
              participants.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <svg
              viewBox="0 0 800 400"
              className="w-full"
              role="img"
              aria-label="ABDM integration architecture diagram"
            >
              <title>ABDM Integration Architecture</title>
              <defs>
                <linearGradient id="abdmBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eff6ff" />
                  <stop offset="100%" stopColor="#ecfdf5" />
                </linearGradient>
              </defs>
              <rect width="800" height="400" fill="url(#abdmBg)" />

              {/* NHA Central Box */}
              <rect
                x="300"
                y="30"
                width="200"
                height="60"
                rx="10"
                fill="#1e40af"
              />
              <text
                x="400"
                y="55"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="700"
              >
                NHA / ABDM Gateway
              </text>
              <text
                x="400"
                y="72"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9"
              >
                National Health Authority
              </text>

              {/* AI Health Zon Central */}
              <rect
                x="275"
                y="160"
                width="250"
                height="70"
                rx="12"
                fill="#0d9488"
              />
              <text
                x="400"
                y="190"
                textAnchor="middle"
                fill="white"
                fontSize="13"
                fontWeight="800"
              >
                AI Health Zon Platform
              </text>
              <text
                x="400"
                y="207"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9"
              >
                HIP + HIU + Consent Manager
              </text>
              <text
                x="400"
                y="220"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="8"
              >
                FHIR R4 • HL7 • ABDM Compliant
              </text>

              {/* Connecting line NHA to Platform */}
              <line
                x1="400"
                y1="90"
                x2="400"
                y2="160"
                stroke="#1e40af"
                strokeWidth="2"
                strokeDasharray="5 3"
              />

              {/* Stakeholder Boxes */}
              {[
                {
                  x: 30,
                  y: 280,
                  label: "Hospitals",
                  sub: "HIS/EMR",
                  color: "#1e40af",
                },
                {
                  x: 170,
                  y: 280,
                  label: "Labs",
                  sub: "LIMS",
                  color: "#0d9488",
                },
                {
                  x: 310,
                  y: 280,
                  label: "Pharmacies",
                  sub: "PMS",
                  color: "#059669",
                },
                {
                  x: 450,
                  y: 280,
                  label: "Insurers",
                  sub: "Claims",
                  color: "#d97706",
                },
                {
                  x: 590,
                  y: 280,
                  label: "Patients",
                  sub: "PHR App",
                  color: "#dc2626",
                },
                {
                  x: 700,
                  y: 280,
                  label: "Govt",
                  sub: "PM-JAY",
                  color: "#7c3aed",
                },
              ].map((box) => (
                <g key={box.label}>
                  <rect
                    x={box.x}
                    y={box.y}
                    width="100"
                    height="60"
                    rx="8"
                    fill="white"
                    stroke={box.color}
                    strokeWidth="1.5"
                  />
                  <text
                    x={box.x + 50}
                    y={box.y + 28}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={box.color}
                  >
                    {box.label}
                  </text>
                  <text
                    x={box.x + 50}
                    y={box.y + 44}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#6b7280"
                  >
                    {box.sub}
                  </text>
                  {/* Connecting line to platform */}
                  <line
                    x1={box.x + 50}
                    y1={box.y}
                    x2={400}
                    y2={230}
                    stroke={box.color}
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                </g>
              ))}

              {/* ABHA Badge */}
              <rect
                x="30"
                y="160"
                width="120"
                height="50"
                rx="8"
                fill="#f0fdf4"
                stroke="#16a34a"
                strokeWidth="1.5"
              />
              <text
                x="90"
                y="182"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#16a34a"
              >
                ABHA Registry
              </text>
              <text
                x="90"
                y="198"
                textAnchor="middle"
                fontSize="8"
                fill="#6b7280"
              >
                14-digit Health ID
              </text>
              <line
                x1="150"
                y1="185"
                x2="275"
                y2="195"
                stroke="#16a34a"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* HFR + HPR */}
              <rect
                x="650"
                y="160"
                width="120"
                height="50"
                rx="8"
                fill="#fffbeb"
                stroke="#d97706"
                strokeWidth="1.5"
              />
              <text
                x="710"
                y="180"
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="#d97706"
              >
                HFR + HPR
              </text>
              <text
                x="710"
                y="196"
                textAnchor="middle"
                fontSize="7.5"
                fill="#6b7280"
              >
                Facility & Professional Registry
              </text>
              <line
                x1="650"
                y1="185"
                x2="525"
                y2="195"
                stroke="#d97706"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Implementation Checklist */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Implementation Checklist
            </h2>
            <p className="text-muted-foreground">
              Step-by-step ABDM implementation roadmap for healthcare
              organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {implementationChecklist.map((phase, pi) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pi * 0.1 }}
                className="bg-white rounded-xl p-6 border border-border shadow-xs"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-health-blue text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {pi + 1}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {phase.phase}
                  </h3>
                </div>
                <div className="space-y-2">
                  {phase.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-health-green shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              ABDM Benefits by Stakeholder
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.stakeholder}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${b.color}`} />
                    </div>
                    <h3 className="font-heading font-bold text-foreground">
                      {b.stakeholder}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 ${b.color} mt-0.5 shrink-0`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
