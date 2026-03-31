import { Layout } from "@/components/layout/Layout";
import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Mic,
  MonitorSmartphone,
  Radio,
  TrendingUp,
  Wifi,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const innovations = [
  {
    num: "01",
    Icon: Brain,
    title: "HIMS Powered by AI",
    tagline: "The brain of the smart hospital.",
    desc: "Full Hospital Information Management System integrated with AI — predictive patient analytics, automated billing & coding, real-time bed management, and clinical decision support.",
    features: [
      "Predictive patient analytics & readmission scoring",
      "Automated billing & procedure coding (AI-ICD)",
      "Real-time bed management & allocation engine",
      "Clinical decision support for doctors",
    ],
  },
  {
    num: "02",
    Icon: Wifi,
    title: "IoT-Connected Hospital Infrastructure",
    tagline: "Eyes and ears of the intelligent hospital.",
    desc: "Smart IoT sensors across hospital floors, connected medical devices, real-time vitals monitoring, predictive equipment maintenance, and automated inventory alerts.",
    features: [
      "Smart bedside vitals monitoring sensors",
      "Predictive equipment maintenance scheduling",
      "Automated pharmacy & inventory alerts",
      "Connected devices: BP, ECG, SpO2, glucometer",
    ],
  },
  {
    num: "03",
    Icon: Zap,
    title: "AI Claims Intelligence Engine",
    tagline: "Zero leakage from ward to payout.",
    desc: "End-to-end auto-adjudication, ML fraud detection, NLP-based claim parsing, NHCX-ready pipeline, and denial pattern prediction for maximum revenue capture.",
    features: [
      "Auto-adjudication engine (97% clean claim rate)",
      "ML-based fraud & anomaly detection",
      "NLP claim parsing & coding validation",
      "NHCX-native pipeline with denial prediction",
    ],
  },
  {
    num: "04",
    Icon: TrendingUp,
    title: "Predictive Revenue Analytics",
    tagline: "Revenue intelligence at your fingertips.",
    desc: "ML-powered revenue forecasting, denial probability scoring, revenue leakage heat maps, and payer behavior prediction for an informed financial strategy.",
    features: [
      "5-year ARR forecasting with scenario modeling",
      "Per-scheme denial probability scoring",
      "Revenue leakage heat maps by department",
      "Payer behavior & settlement prediction",
    ],
  },
  {
    num: "05",
    Icon: Mic,
    title: "Voice-Enabled Clinical Documentation",
    tagline: "Doctors speak, AI records.",
    desc: "AI-powered doctor dictation with auto-structured SOAP notes, ABDM-compliant record generation, and 10x faster documentation workflow for busy clinicians.",
    features: [
      "Indian-accented speech-to-text engine",
      "Auto-structured SOAP notes generation",
      "ABDM-compliant EHR record creation",
      "10x faster documentation vs manual entry",
    ],
  },
  {
    num: "06",
    Icon: MonitorSmartphone,
    title: "Telemedicine + Remote Monitoring",
    tagline: "Care without boundaries.",
    desc: "Integrated teleconsult platform with IoT wearable data ingestion, remote ICU monitoring, and rural reach via ABDM for seamless digital healthcare delivery.",
    features: [
      "HD teleconsultation with digital prescription",
      "IoT wearable data ingestion & smart alerts",
      "Remote ICU monitoring dashboard",
      "ABDM-linked rural patient outreach",
    ],
  },
];

const stateExpansion = [
  {
    name: "Rajasthan",
    emoji: "🔵",
    status: "Launched",
    statusColor: "bg-green-100 text-green-700 border-green-200",
    quarter: "Q1 2025",
    hq: "Jaipur (Home Base)",
    target: "200+ hospitals",
    schemes: ["RGHS", "MAA Yojana", "PMJAY"],
    focus: "Government hospital digital transformation & Claim compliance",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    highlight: null,
    cardBg: "bg-green-50",
    borderColor: "border-l-4 border-l-green-500",
  },
  {
    name: "Madhya Pradesh",
    emoji: "🟡",
    status: "Expanding",
    statusColor: "bg-amber-100 text-amber-700 border-amber-200",
    quarter: "Q2 2025",
    hq: "Bhopal & Indore",
    target: "180+ hospitals",
    schemes: ["Ayushman Bharat", "MP CM Health Insurance"],
    focus: "Central India expansion, Tier-2 private hospitals",
    cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    highlight: null,
    cardBg: "bg-amber-50",
    borderColor: "border-l-4 border-l-amber-500",
  },
  {
    name: "Punjab",
    emoji: "🟠",
    status: "Planned",
    statusColor: "bg-blue-100 text-blue-700 border-blue-200",
    quarter: "Q3 2025",
    hq: "Chandigarh, Ludhiana, Amritsar",
    target: "150+ hospitals",
    schemes: ["Sarbat Sehat Bima Yojana", "PMJAY"],
    focus: "North India private hospital chains, Premium healthcare segment",
    cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    highlight: null,
    cardBg: "bg-blue-50",
    borderColor: "border-l-4 border-l-blue-500",
  },
  {
    name: "Uttar Pradesh",
    emoji: "🔴",
    status: "Planned",
    statusColor: "bg-blue-100 text-blue-700 border-blue-200",
    quarter: "Q3 2025",
    hq: "Lucknow & Noida",
    target: "400+ hospitals",
    schemes: ["PMJAY", "AB-PMJAY", "UP Mukhyamantri Jan Arogya"],
    focus: "Largest state by volume — District hospitals + private chains",
    cities: ["Lucknow", "Noida", "Agra", "Varanasi", "Kanpur", "Prayagraj"],
    highlight: "Highest Priority",
    cardBg: "bg-red-50",
    borderColor: "border-l-4 border-l-red-500",
  },
  {
    name: "Maharashtra",
    emoji: "🟣",
    status: "Planned",
    statusColor: "bg-blue-100 text-blue-700 border-blue-200",
    quarter: "Q4 2025",
    hq: "Mumbai, Pune & Nagpur",
    target: "300+ hospitals",
    schemes: ["MH MJPJAY", "PMJAY", "Corporate TPA Networks"],
    focus:
      "Metro + Tier-2 private hospitals, Highest private sector penetration",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    highlight: null,
    cardBg: "bg-purple-50",
    borderColor: "border-l-4 border-l-purple-500",
  },
];

const timeline = [
  {
    period: "Q1 2025",
    title: "Rajasthan Launch",
    desc: "200 hospitals, RGHS + MAA Yojana, Jaipur HQ established as operations base",
    status: "active" as const,
  },
  {
    period: "Q2 2025",
    title: "MP Expansion",
    desc: "180 hospitals, Ayushman Bharat integration, Central India hub in Bhopal & Indore",
    status: "active" as const,
  },
  {
    period: "Q3 2025",
    title: "Punjab + UP Entry",
    desc: "550 hospitals combined — North India breakthrough, district hospitals and premium chains",
    status: "upcoming" as const,
  },
  {
    period: "Q4 2025",
    title: "Maharashtra Go-Live",
    desc: "300 hospitals, 1,230 total across 5 states, Metro private market penetration",
    status: "upcoming" as const,
  },
  {
    period: "2026",
    title: "South India Expansion",
    desc: "Karnataka, Tamil Nadu, Telangana — 1,000+ new hospitals, RSBY & state scheme integration",
    status: "planned" as const,
  },
  {
    period: "2027",
    title: "Pan-India Presence",
    desc: "3,000+ hospitals across all major Indian states, full NHCX + ABDM ecosystem coverage",
    status: "planned" as const,
  },
  {
    period: "2028",
    title: "ASEAN Market Entry",
    desc: "Singapore, Malaysia — bringing India's healthcare AI excellence to Southeast Asia",
    status: "planned" as const,
  },
  {
    period: "2030",
    title: "Global Healthcare AI Leader",
    desc: "10,000+ hospitals worldwide, recognized as the global standard for AI-powered healthcare revenue intelligence",
    status: "vision" as const,
  },
];

type TimelineStatus = "active" | "upcoming" | "planned" | "vision";

const statusStyles: Record<
  TimelineStatus,
  { circle: string; text: string; badge: string; label: string }
> = {
  active: {
    circle: "bg-teal-500 ring-teal-200",
    text: "text-teal-700",
    badge: "bg-teal-100 text-teal-700",
    label: "Live",
  },
  upcoming: {
    circle: "bg-blue-500 ring-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    label: "Upcoming",
  },
  planned: {
    circle: "bg-amber-500 ring-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    label: "Planned",
  },
  vision: {
    circle: "bg-purple-500 ring-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-700",
    label: "Vision 2030",
  },
};

const archLayers = [
  {
    label: "Hospital Users",
    sublabel: "Doctors · Nurses · Admin · Finance · Management",
    colorClass: "bg-blue-800/60 border-blue-600",
    icon: "👥",
  },
  {
    label: "AI Health Zon Platform",
    sublabel: "HIMS Core · Claims AI · Revenue Analytics · Voice Documentation",
    colorClass: "bg-teal-800/60 border-teal-500",
    icon: "🧠",
  },
  {
    label: "IoT Layer",
    sublabel:
      "Connected Devices · Smart Sensors · Wearables · Medical Equipment",
    colorClass: "bg-amber-900/60 border-amber-600",
    icon: "📡",
  },
  {
    label: "Integration Layer",
    sublabel: "ABDM / NHCX / PMJAY / RGHS / MAA Yojana / Government Schemes",
    colorClass: "bg-green-900/60 border-green-600",
    icon: "🔗",
  },
  {
    label: "Foundation",
    sublabel:
      "ICP Blockchain · Secure Cloud · Zero-Trust Security · 99.9% Uptime",
    colorClass: "bg-slate-700/80 border-slate-500",
    icon: "🏛️",
  },
];

export function FutureInnovation() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <Layout>
      <DemoBookingDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />

      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/future-innovation-hero.dim_1200x600.jpg"
            alt="Future Innovation at AI Health Zon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-6">
              <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase">
                2025–2030 Roadmap
              </span>
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase">
                AI + IoT + HIMS
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              Future of Healthcare
              <br />
              <span className="text-teal-400">Innovation</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl"
            >
              AI Health Zon is building tomorrow's hospital ecosystem today —
              HIMS powered by AI and IoT, state-wise digital health
              infrastructure, and intelligent revenue systems that transform
              care delivery across India.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-6 text-base"
                onClick={() => setIsDemoOpen(true)}
                data-ocid="future.hero_demo_button"
              >
                Book Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="#innovations">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-base"
                  data-ocid="future.hero_explore_button"
                >
                  Explore Innovations
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Innovation Showcase ── */}
      <section id="innovations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Innovation Pipeline
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              Our Innovation Pipeline
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-600 max-w-3xl"
            >
              Six transformative technologies reshaping how India's hospitals
              operate, earn, and deliver care.
            </motion.p>
          </motion.div>

          {/* Stats Band */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-900 rounded-xl overflow-hidden mb-16"
            data-ocid="future.innovation_stats"
          >
            {[
              { value: "6", label: "Innovations in Development" },
              { value: "5", label: "States Targeted" },
              { value: "1,000+", label: "Hospitals by 2027" },
              { value: "₹500 Cr+", label: "Revenue Impact" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-slate-800 p-8 text-center"
              >
                <p className="text-3xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Innovation Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {innovations.map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeUp}
                className="bg-white border border-slate-200 border-t-4 border-t-teal-500 rounded-xl p-8 hover:shadow-xl transition-all duration-300 group"
                data-ocid={`future.innovation.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <item.Icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <span className="text-4xl font-black text-slate-100 group-hover:text-teal-100 transition-colors">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-teal-600 text-xs font-semibold uppercase tracking-wider mb-3 italic">
                  {item.tagline}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>
                <ul className="space-y-2">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-slate-600"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Technology Architecture ── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3"
            >
              System Architecture
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Integrated Technology Architecture
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-400 max-w-3xl mx-auto"
            >
              AI + IoT + HIMS + ABDM + NHCX — all in one intelligent ecosystem
            </motion.p>
          </motion.div>

          {/* Layered Architecture */}
          <div className="space-y-4 mb-12">
            {archLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`${layer.colorClass} border rounded-xl px-8 py-5 flex items-center gap-6`}
                data-ocid={`future.arch_layer.${i + 1}`}
              >
                <span className="text-3xl shrink-0">{layer.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">
                    {layer.label}
                  </h3>
                  <p className="text-slate-300 text-sm mt-0.5">
                    {layer.sublabel}
                  </p>
                </div>
                {i < archLayers.length - 1 && (
                  <div className="shrink-0 text-slate-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 5v14M5 12l7 7 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Arch Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700 rounded-xl overflow-hidden"
          >
            {[
              { value: "5", label: "Technology Layers" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "< 100ms", label: "API Response Time" },
              { value: "256-bit", label: "AES Encryption" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-slate-800 p-6 text-center"
              >
                <p className="text-2xl font-bold text-teal-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── State-Wise Expansion ── */}
      <section id="expansion" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3"
            >
              State-Wise Expansion
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              State-Wise Expansion Plan
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-600 max-w-3xl"
            >
              Strategic rollout across 5 major Indian states — 1,230+ hospitals,
              ₹200 Crore+ in recoverable revenue by 2025.
            </motion.p>
          </motion.div>

          {/* State Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {stateExpansion.map((state, i) => (
              <motion.div
                key={state.name}
                variants={fadeUp}
                className={`${state.cardBg} ${state.borderColor} rounded-xl p-8 relative overflow-hidden hover:shadow-lg transition-all duration-300`}
                data-ocid={`future.state.${i + 1}`}
              >
                {state.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-500 text-white text-xs font-black px-3 py-1.5 rounded tracking-wider uppercase">
                      {state.highlight}
                    </span>
                  </div>
                )}

                {/* State Header */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{state.emoji}</span>
                  <h3 className="font-playfair text-2xl font-bold text-slate-900">
                    {state.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${state.statusColor}`}
                  >
                    {state.status}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    {state.quarter}
                  </span>
                </div>

                {/* Hub + Target */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                      Hub
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {state.hq}
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                      Target
                    </p>
                    <p className="text-sm font-bold text-teal-700">
                      {state.target}
                    </p>
                  </div>
                </div>

                {/* Key Schemes */}
                <div className="mb-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                    Key Schemes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {state.schemes.map((scheme) => (
                      <span
                        key={scheme}
                        className="bg-white/80 text-slate-600 text-xs px-2 py-1 rounded border border-slate-200 font-medium"
                      >
                        {scheme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Focus */}
                <div className="mb-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                    Focus Area
                  </p>
                  <p className="text-sm text-slate-600">{state.focus}</p>
                </div>

                {/* Cities */}
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                    Key Cities
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {state.cities.map((city) => (
                      <span
                        key={city}
                        className="flex items-center gap-1 text-xs text-slate-500"
                      >
                        <MapPin className="h-3 w-3 text-teal-500" />
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Stats Band */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-900 rounded-xl overflow-hidden"
            data-ocid="future.expansion_stats"
          >
            {[
              { value: "1,230+", label: "Total Target Hospitals" },
              { value: "5", label: "States Covered (2025)" },
              { value: "₹200 Cr+", label: "Recoverable Revenue" },
              { value: "8+", label: "Government Schemes" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-slate-800 p-8 text-center"
              >
                <p className="text-3xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2025–2030 Timeline ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Strategic Roadmap
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              2025–2030: The Road Ahead
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-600 max-w-3xl"
            >
              From Jaipur to the world — a clear, milestone-driven expansion
              roadmap built on execution.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-blue-500 to-purple-400 hidden md:block" />

            <div className="space-y-6">
              {timeline.map((item, i) => {
                const s = statusStyles[item.status];
                return (
                  <motion.div
                    key={item.period}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex gap-6 items-start"
                    data-ocid={`future.timeline.${i + 1}`}
                  >
                    {/* Circle node */}
                    <div
                      className={`shrink-0 w-16 h-16 rounded-full ${s.circle} ring-4 flex items-center justify-center z-10 relative hidden md:flex`}
                    >
                      <span className="text-white font-black text-sm">
                        {i + 1}
                      </span>
                    </div>
                    {/* Content card */}
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`text-sm font-bold ${s.text}`}>
                          {item.period}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${s.badge}`}
                        >
                          {s.label}
                        </span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-slate-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-4"
            >
              Join the Revolution
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Be Part of India's Healthcare Future
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
            >
              Partner with AI Health Zon to transform your hospital with HIMS,
              AI, and IoT — and secure your place in the next-generation
              healthcare ecosystem.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-6 text-base shadow-xl"
                onClick={() => setIsDemoOpen(true)}
                data-ocid="future.cta_demo_button"
              >
                Book Free Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a
                href="https://wa.me/918696766966?text=I%20want%20to%20know%20about%20AI%20Health%20Zon%20Future%20Innovations"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="future.cta_whatsapp_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-base"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </Button>
              </a>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm"
            >
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-teal-400" />
                info@aihealthzon.com
              </span>
              <span className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-teal-400" />
                +91-8696766966
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
