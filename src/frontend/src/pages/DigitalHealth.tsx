import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Database,
  FileText,
  Heart,
  Hospital,
  Key,
  Lock,
  Network,
  Server,
  Shield,
  Smartphone,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─────────────────── Data ───────────────────

const buildingBlocks = [
  {
    icon: CreditCard,
    title: "Patient Identity Layer (ABHA)",
    description:
      "Use ABHA (Ayushman Bharat Health Account) for patient identification with secure OTP and biometric authentication.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    requirements: [
      "ABHA creation",
      "ABHA linking with hospital patient ID",
      "ABHA authentication (OTP / biometrics)",
    ],
    workflow: [
      "Patient arrives at registration desk",
      "Enters mobile number in the system",
      "System fetches or creates ABHA",
      "Patient profile linked to hospital system",
    ],
  },
  {
    icon: Shield,
    title: "Digital Consent Management",
    description:
      "ABDM requires patient permission before sharing records. Hospitals must integrate with a Consent Manager to ensure privacy and control of data.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    requirements: [
      "Consent request workflows",
      "Patient approval via mobile",
      "Granular data sharing controls",
    ],
    workflow: [
      "Hospital A wants to view reports from Hospital B",
      "System sends consent request to patient",
      "Patient approves via mobile",
      "Records become accessible — privacy protected",
    ],
  },
  {
    icon: ArrowRight,
    title: "Health Information Exchange (HIE)",
    description:
      "Hospitals act as HIP (Health Information Provider) sharing records and HIU (Health Information User) requesting records from other providers.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    requirements: [
      "HIP — Health Information Provider: shares patient records",
      "HIU — Health Information User: requests patient records",
    ],
    workflow: [
      "Lab reports shared in real-time",
      "Radiology reports exchanged digitally",
      "Prescriptions transferred securely",
      "Discharge summaries available across providers",
    ],
  },
  {
    icon: Database,
    title: "National Registries Integration",
    description:
      "Hospitals must register in national registries — HFR and HPR — to enable verified identification of facilities and healthcare professionals.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    requirements: [
      "HFR — Health Facility Registry",
      "HPR — Healthcare Professionals Registry",
    ],
    workflow: [
      "Hospital registered and verified via HFR",
      "Doctors registered and verified via HPR",
      "Clinics and healthcare professionals verified",
      "Credentialed network enables trusted data exchange",
    ],
  },
  {
    icon: Network,
    title: "ABDM Gateway Integration",
    description:
      "The ABDM Gateway connects all digital health applications. Your platform communicates through ABDM APIs, secure authentication, and FHIR health data standards.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    requirements: [
      "ABDM API integration",
      "Secure token-based authentication",
      "FHIR healthcare data standards",
    ],
    workflow: [
      "Platform connects to ABDM Gateway",
      "Authenticated via secure tokens",
      "Health records exchanged in FHIR format",
      "Full ecosystem interoperability achieved",
    ],
  },
];

const essentialModules = [
  {
    icon: Users,
    title: "Patient Registration Module",
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: ["ABHA creation", "ABHA linking", "Demographic capture"],
  },
  {
    icon: FileText,
    title: "Electronic Health Record (EHR)",
    color: "text-teal-600",
    bg: "bg-teal-50",
    items: [
      "Consultation notes",
      "Lab results",
      "Prescriptions",
      "Discharge summary",
      "FHIR health data standards",
    ],
  },
  {
    icon: Shield,
    title: "Consent Manager Integration",
    color: "text-amber-600",
    bg: "bg-amber-50",
    items: [
      "Consent requests",
      "Approval workflows",
      "Data sharing permissions",
    ],
  },
  {
    icon: ArrowRight,
    title: "Health Record Sharing Engine",
    color: "text-green-600",
    bg: "bg-green-50",
    items: ["Secure record transfer", "HIP/HIU communication"],
  },
  {
    icon: Hospital,
    title: "Doctor Registry Integration",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    items: [
      "Doctors verified through HPR",
      "Professional credential checks",
      "HPR registry synchronization",
    ],
  },
  {
    icon: Building2,
    title: "Facility Registry Integration",
    color: "text-purple-600",
    bg: "bg-purple-50",
    items: [
      "Hospital verified through HFR",
      "Facility credential management",
      "HFR registry synchronization",
    ],
  },
];

const techRequirements = [
  {
    icon: Server,
    title: "APIs",
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: [
      "ABHA creation API",
      "ABHA verification API",
      "Consent management API",
      "Health record exchange API",
    ],
  },
  {
    icon: Lock,
    title: "Security",
    color: "text-amber-600",
    bg: "bg-amber-50",
    items: [
      "End-to-end encryption",
      "Token authentication",
      "Patient consent logs",
    ],
  },
  {
    icon: Database,
    title: "Data Standards (FHIR)",
    color: "text-teal-600",
    bg: "bg-teal-50",
    items: [
      "Patient resource",
      "Encounter resource",
      "Observation resource",
      "Medication resource",
      "DiagnosticReport resource",
    ],
  },
];

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    milestone: "M1 Milestone",
    color: "bg-blue-600",
    light: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    items: [
      "Register hospital in HFR",
      "Register doctors in HPR",
      "Integrate ABHA creation",
    ],
  },
  {
    phase: "Phase 2",
    title: "Data Sharing",
    milestone: "M2 Milestone",
    color: "bg-teal-600",
    light: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-600",
    items: [
      "Implement consent manager",
      "Enable record sharing",
      "HIP and HIU capability",
    ],
  },
  {
    phase: "Phase 3",
    title: "Full Ecosystem",
    milestone: "M3 Milestone",
    color: "bg-indigo-600",
    light: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    items: [
      "Digital prescriptions",
      "Telemedicine",
      "AI analytics",
      "Automated insurance integration",
    ],
  },
];

const businessBenefits = [
  {
    icon: CreditCard,
    title: "Revenue Cycle Management",
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: [
      "Faster insurance claims",
      "Fewer claim rejections",
      "Verified patient identity",
    ],
  },
  {
    icon: Heart,
    title: "Clinical Quality",
    color: "text-teal-600",
    bg: "bg-teal-50",
    items: [
      "Doctors get complete patient history",
      "Better diagnosis accuracy",
      "Improved care continuity",
    ],
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    color: "text-green-600",
    bg: "bg-green-50",
    items: [
      "Reduces paperwork",
      "Eliminates duplicate tests",
      "No manual record transfers",
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

const commandCentreFeatures = [
  "ABDM integration",
  "Hospital revenue analytics",
  "Claim automation",
  "Patient support services",
  "AI diagnosis assistance",
];

// ─────────────────── Accordion Block ───────────────────
function BuildingBlockAccordion({
  block,
  index,
}: {
  block: (typeof buildingBlocks)[0];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const Icon = block.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-xl border ${block.border} bg-white shadow-xs overflow-hidden`}
    >
      <button
        type="button"
        data-ocid={`abdm.block.${index + 1}.toggle`}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl ${block.bg} flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-5 h-5 ${block.color}`} />
          </div>
          <div>
            <span className="font-heading font-semibold text-foreground">
              {block.title}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
              {block.description.slice(0, 60)}…
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {block.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Requirements
                  </p>
                  <ul className="space-y-1.5">
                    {block.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 ${block.color} mt-0.5 shrink-0`}
                        />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Workflow Steps
                  </p>
                  <ol className="space-y-1.5">
                    {block.workflow.map((step, si) => (
                      <li key={step} className="flex items-start gap-2 text-sm">
                        <span
                          className={`w-5 h-5 rounded-full ${block.bg} ${block.color} text-xs font-bold flex items-center justify-center shrink-0`}
                        >
                          {si + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────── Page ───────────────────
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
              ABDM
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Building an ABDM-ready hospital platform — connecting your HIS/RCM
              to the Ayushman Bharat Digital Mission ecosystem for secure,
              standards-based health data exchange.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — 5 Core ABDM Building Blocks */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-teal-50 text-teal-700 border-teal-200">
              Core Architecture
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              5 Core ABDM Building Blocks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every ABDM-ready hospital platform must support these five main
              building blocks to participate in India's National Digital Health
              Mission.
            </p>
          </motion.div>
          <div className="space-y-3">
            {buildingBlocks.map((block, i) => (
              <BuildingBlockAccordion
                key={block.title}
                block={block}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Recommended Platform Architecture */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 195) 0%, white 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
              Architecture
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Recommended Platform Architecture
            </h2>
            <p className="text-muted-foreground">
              A simplified three-tier architecture for an ABDM-ready hospital
              platform.
            </p>
          </motion.div>

          {/* Layered Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {/* Tier 1 */}
            <div className="rounded-xl border border-blue-200 bg-blue-600 p-4 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-100 mb-1">
                Tier 1 — Entry Layer
              </p>
              <p className="text-white font-heading font-bold text-lg">
                Patient App / Registration Desk
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-0.5 h-4 bg-gray-300" />
                <ChevronDown className="w-5 h-5 text-gray-400 -mt-1" />
              </div>
            </div>

            {/* Tier 2 */}
            <div className="rounded-xl border border-teal-200 bg-teal-600 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-100 mb-2 text-center">
                Tier 2 — Hospital Information System (HIS) Layer
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "ABHA Management Module",
                  "Consent Manager Integration",
                  "Health Records Module (EHR)",
                  "ABDM API Gateway",
                ].map((m) => (
                  <div
                    key={m}
                    className="bg-white/15 rounded-lg px-3 py-2 text-center"
                  >
                    <p className="text-white text-xs font-medium">{m}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-0.5 h-4 bg-gray-300" />
                <ChevronDown className="w-5 h-5 text-gray-400 -mt-1" />
              </div>
            </div>

            {/* Tier 3 */}
            <div className="rounded-xl border border-indigo-200 bg-indigo-600 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100 mb-2 text-center">
                Tier 3 — ABDM Network Layer
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "HIE — Health Information Exchange",
                  "HFR Registry",
                  "HPR Registry",
                  "Consent Manager",
                ].map((m) => (
                  <div
                    key={m}
                    className="bg-white/15 rounded-lg px-3 py-2 text-center"
                  >
                    <p className="text-white text-xs font-medium">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Existing SVG Diagram */}
          <div className="mt-10 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 pt-5 pb-2 border-b border-border">
              <h3 className="font-heading font-semibold text-foreground">
                Integration Architecture
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                AI Health Zon's ABDM integration layer bridging all healthcare
                participants.
              </p>
            </div>
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

      {/* Section 4 — 6 Essential Modules */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-green-50 text-green-700 border-green-200">
              Platform Modules
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              6 Essential Modules
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To be ABDM compliant, your hospital system should include these
              core modules covering every aspect of digital health integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {essentialModules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${mod.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${mod.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-3">
                    {mod.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {mod.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${mod.color} shrink-0`}
                        />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — Technical Requirements */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.015 240) 0%, oklch(0.97 0.015 195) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-amber-50 text-amber-700 border-amber-200">
              Technical
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Technical Requirements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Developers must support these APIs, security protocols, and data
              standards to build a fully ABDM-compliant platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techRequirements.map((req, i) => {
              const Icon = req.icon;
              return (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${req.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${req.color}`} />
                  </div>
                  <h3
                    className={`font-heading font-bold text-lg mb-4 ${req.color}`}
                  >
                    {req.title}
                  </h3>
                  <ul className="space-y-2">
                    {req.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 ${req.color} mt-0.5 shrink-0`}
                        />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {req.title === "Data Standards (FHIR)" && (
                    <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-100">
                      <p className="text-xs font-semibold text-teal-700 mb-1">
                        FHIR Record Structure
                      </p>
                      <code className="text-xs text-teal-600 font-mono block">
                        Patient → Encounter → Observation → Medication →
                        DiagnosticReport
                      </code>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6 — Implementation Roadmap */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-indigo-50 text-indigo-700 border-indigo-200">
              Roadmap
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Implementation Roadmap
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A phased approach to ABDM integration — from foundation to full
              digital health ecosystem.
            </p>
          </motion.div>

          {/* Phase timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-blue-300 via-teal-300 to-indigo-300" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmapPhases.map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-white rounded-xl border ${phase.border} p-6 shadow-xs relative`}
                >
                  {/* Phase badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full ${phase.color} text-white text-sm font-bold flex items-center justify-center shadow-sm`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${phase.text}`}>
                        {phase.phase}
                      </p>
                      <p className="font-heading font-bold text-foreground">
                        {phase.title}
                      </p>
                    </div>
                  </div>

                  {/* Milestone badge */}
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${phase.light} ${phase.text} border ${phase.border} mb-4`}
                  >
                    {phase.milestone}
                  </span>

                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 ${phase.text} mt-0.5 shrink-0`}
                        />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Business Benefits */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 195) 0%, white 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-teal-50 text-teal-700 border-teal-200">
              Business Impact
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Business Benefits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ABDM integration delivers measurable improvements across revenue,
              clinical quality, and operational efficiency.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${b.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-3">
                    {b.title}
                  </h3>
                  <ul className="space-y-2">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 ${b.color} mt-0.5 shrink-0`}
                        />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 8 — Opportunity: Digital Health Command Centre */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-teal-200 shadow-md"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)",
            }}
          >
            <div className="p-8 sm:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white/80 text-xs font-semibold uppercase tracking-wider mb-2">
                    Opportunity
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    Your AI Health Zon Platform as a Digital Health Command
                    Centre
                  </h2>
                </div>
              </div>

              <p className="text-white/80 text-base mb-6 leading-relaxed">
                Your platform could become a{" "}
                <strong className="text-white">
                  Digital Health Command Centre
                </strong>{" "}
                — a national healthcare infrastructure platform for hospitals,
                providing end-to-end digital health services.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {commandCentreFeatures.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2.5 bg-white/10 rounded-lg px-4 py-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                    <span className="text-white text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/15 rounded-xl p-4 border border-white/20">
                <p className="text-white font-semibold text-sm">
                  🚀 This could become a national healthcare infrastructure
                  platform for hospitals — combining ABDM compliance with
                  AI-powered revenue intelligence.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="/join-network"
                  data-ocid="abdm.command_centre.primary_button"
                  className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/claim-command-centre"
                  data-ocid="abdm.command_centre.secondary_button"
                  className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/30 transition-colors text-sm border border-white/30"
                >
                  Explore Command Centre
                  <Key className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9 — Benefits by Stakeholder (existing) */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              ABDM Benefits by Stakeholder
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              How ABDM integration delivers value across the entire healthcare
              ecosystem.
            </p>
          </motion.div>
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
