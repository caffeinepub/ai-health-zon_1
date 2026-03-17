import { Layout } from "@/components/layout/Layout";
import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  FileCheck,
  FileX,
  Globe,
  Network,
  RefreshCw,
  Shield,
  Smartphone,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const painPoints = [
  {
    icon: FileX,
    title: "Manual Document Submission",
    impact: "Hours wasted on paperwork per claim",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Database,
    title: "Multiple Insurer Portals",
    impact: "Each insurer has different formats & workflows",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Timer,
    title: "Claim Delays & Rejections",
    impact: "Revenue blocked for weeks or months",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Users,
    title: "High Administrative Workload",
    impact: "Large teams needed just for billing",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: AlertTriangle,
    title: "Lack of Standardization",
    impact: "No uniform data formats across ecosystem",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Patient Admission",
    description:
      "Patient arrives with insurance policy or health scheme coverage",
    icon: Users,
    color: "bg-teal-500",
  },
  {
    number: "02",
    title: "Hospital Submits Digital Claim",
    description: "Hospital Information System (HIS) sends claim data to NHCX",
    icon: FileCheck,
    color: "bg-blue-500",
  },
  {
    number: "03",
    title: "Standardized Validation",
    description: "NHCX validates claim information against standards",
    icon: Shield,
    color: "bg-teal-600",
  },
  {
    number: "04",
    title: "Insurer / TPA Review",
    description:
      "Insurer or TPA receives the claim digitally and performs adjudication",
    icon: Building2,
    color: "bg-blue-600",
  },
  {
    number: "05",
    title: "Approval / Query / Settlement",
    description: "Response is sent back via NHCX to the hospital",
    icon: CheckCircle2,
    color: "bg-teal-500",
  },
  {
    number: "06",
    title: "Patient Discharge",
    description: "Claim settlement and discharge approval completed faster",
    icon: Zap,
    color: "bg-green-500",
  },
];

const stakeholders = [
  {
    title: "Healthcare Providers",
    items: ["Hospitals", "Clinics", "Diagnostic Labs"],
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    title: "Payers",
    items: [
      "Insurance Companies",
      "Third Party Administrators (TPAs)",
      "Government Health Schemes",
    ],
    icon: Shield,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  {
    title: "Government & Regulators",
    items: [
      "National Health Authority (NHA)",
      "Insurance Regulatory and Development Authority (IRDAI)",
    ],
    icon: Globe,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    title: "Citizens",
    items: ["Policyholders", "Beneficiaries of Health Schemes"],
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Faster Claim Approval",
    description:
      "Standardized digital workflows reduce delays in pre-authorization and claim settlement.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: RefreshCw,
    title: "Reduced Manual Work",
    description:
      "Automated claim exchange eliminates repetitive data entry across multiple portals.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: FileCheck,
    title: "Lower Claim Errors",
    description:
      "Structured claim formats improve accuracy and reduce rejections across the board.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Activity,
    title: "Real-Time Communication",
    description:
      "Hospitals and insurers can exchange claim data instantly through NHCX.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "Improved Patient Experience",
    description:
      "Faster approvals mean quicker discharge and fewer billing disputes for patients.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: TrendingUp,
    title: "Lower Processing Costs",
    description:
      "Automation reduces administrative and operational costs across the ecosystem.",
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
];

const integrations = [
  {
    title: "Ayushman Bharat Digital Mission",
    subtitle: "ABDM",
    description:
      "NHCX is a key pillar of ABDM — India's national digital health infrastructure initiative.",
    icon: Globe,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Ayushman Bharat Health Account",
    subtitle: "ABHA",
    description:
      "Patient identity linked via ABHA ensures authenticated and consent-based data exchange.",
    icon: Users,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    title: "Hospital Information Systems",
    subtitle: "HIS",
    description:
      "Hospital HIS integrates via NHCX APIs to automate claim submission workflows.",
    icon: Database,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Health Insurance Platforms",
    subtitle: "Insurers & TPAs",
    description:
      "All major insurers and TPAs connect through NHCX for standardized claims exchange.",
    icon: Shield,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const readinessItems = [
  "Digital Hospital Information System (HIS)",
  "Standardized claim data formats",
  "Electronic medical documentation",
  "API integration with NHCX",
  "Digital pre-authorization workflows",
  "Real-time claim status tracking",
];

const capabilities = [
  { icon: FileCheck, title: "NHCX Compliant Claim Workflows" },
  { icon: Zap, title: "Digital Claim Submission" },
  { icon: Shield, title: "Automated Document Validation" },
  { icon: Clock, title: "Pre-Authorization Automation" },
  { icon: BarChart3, title: "Claim Analytics Dashboard" },
  { icon: Network, title: "Integration with Multiple Insurers" },
];

const aiCapabilities = [
  {
    icon: Brain,
    title: "Denial Risk Scoring",
    description: "AI predicts likelihood of claim denial before submission",
    stat: "85%",
    statLabel: "accuracy",
  },
  {
    icon: FileCheck,
    title: "Pre-Submission Audit",
    description: "Automated review of claim completeness and compliance",
    stat: "3x",
    statLabel: "faster",
  },
  {
    icon: Activity,
    title: "Real-Time Validation",
    description: "Instant checks against NHCX standards during submission",
    stat: "<2s",
    statLabel: "validation",
  },
  {
    icon: TrendingUp,
    title: "Revenue Forecasting",
    description:
      "Predictive analytics for expected claim approvals and revenue",
    stat: "94%",
    statLabel: "approval rate",
  },
];

const futureItems = [
  { icon: Smartphone, text: "Fully digital insurance claims across India" },
  { icon: Network, text: "Interoperable healthcare data nationwide" },
  { icon: Zap, text: "Faster patient discharge through real-time processing" },
  {
    icon: BadgeCheck,
    text: "Transparent insurance processing for all stakeholders",
  },
];

export function NHCX() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 pt-32 pb-24">
        {/* Animated orbs */}
        <motion.div
          className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.15 195), transparent)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-60 h-60 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.12 240), transparent)",
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Floating particles */}
        {(
          [
            { top: "15%", left: "5%", dur: 3, delay: 0 },
            { top: "22%", left: "13%", dur: 4, delay: 0.4 },
            { top: "29%", left: "21%", dur: 5, delay: 0.8 },
            { top: "36%", left: "29%", dur: 3, delay: 1.2 },
            { top: "43%", left: "37%", dur: 4, delay: 1.6 },
            { top: "50%", left: "45%", dur: 5, delay: 2.0 },
            { top: "57%", left: "53%", dur: 3, delay: 2.4 },
            { top: "64%", left: "61%", dur: 4, delay: 2.8 },
            { top: "71%", left: "69%", dur: 5, delay: 3.2 },
            { top: "78%", left: "77%", dur: 3, delay: 3.6 },
            { top: "15%", left: "85%", dur: 4, delay: 4.0 },
            { top: "22%", left: "13%", dur: 5, delay: 4.4 },
          ] as const
        ).map((p) => (
          <motion.div
            key={`${p.top}-${p.left}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-teal-300 opacity-30"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: p.dur,
              repeat: Number.POSITIVE_INFINITY,
              delay: p.delay,
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-teal-400/20 text-teal-200 border-teal-400/30 text-sm px-4 py-1">
              National Health Claims Exchange
            </Badge>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Be Ready for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">
                NHCX
              </span>
            </h1>
            <p className="text-xl text-teal-100 font-medium mb-4">
              The Future of Health Insurance Claims in India
            </p>
            <p className="text-teal-200/80 text-base leading-relaxed mb-10 max-w-3xl mx-auto">
              Healthcare claim processing in India is entering a new digital era
              with the National Health Authority initiative — the National
              Health Claims Exchange (NHCX). A national digital infrastructure
              that enables seamless exchange of health insurance claims data
              between hospitals, insurers, TPAs, and government schemes.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                data-ocid="nhcx.hero.primary_button"
                size="lg"
                onClick={() => setIsDemoOpen(true)}
                className="bg-white text-teal-900 hover:bg-teal-50 font-bold px-8 shadow-xl"
              >
                Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                data-ocid="nhcx.hero.secondary_button"
                size="lg"
                variant="outline"
                className="border-teal-300 text-teal-100 hover:bg-teal-800 bg-transparent"
                onClick={() =>
                  document
                    .getElementById("what-is-nhcx")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>

            {/* UPI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4"
            >
              <Zap className="w-6 h-6 text-yellow-300" />
              <span className="text-white font-semibold text-lg">
                "UPI for Health Insurance Claims"
              </span>
              <Zap className="w-6 h-6 text-yellow-300" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="bg-gradient-to-b from-teal-900 to-teal-800 px-4 pb-10">
        <img
          src="/assets/generated/hero-nhcx-ai-health-zon.dim_1200x600.jpg"
          alt="National Health Claims Exchange digital infrastructure"
          className="w-full max-w-4xl mx-auto rounded-2xl object-cover shadow-2xl"
          style={{ aspectRatio: "16/7" }}
        />
      </div>

      {/* ── What is NHCX ── */}
      <section id="what-is-nhcx" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-teal-100 text-teal-700 border-teal-200">
                About NHCX
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                What is NHCX?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Implemented as part of the Ayushman Bharat Digital Mission
                (ABDM)
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-teal-200 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="p-8 bg-gradient-to-br from-teal-50 to-blue-50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center">
                          <Network className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-slate-900">
                          Single-Window Platform
                        </h3>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-6">
                        The National Health Claims Exchange is a{" "}
                        <strong>single-window digital platform</strong> that
                        connects healthcare providers, insurers, third-party
                        administrators (TPAs), and government health schemes to
                        exchange claim information in a standardized format.
                      </p>
                      <p className="text-slate-600 leading-relaxed">
                        Implemented as part of the{" "}
                        <strong>Ayushman Bharat Digital Mission (ABDM)</strong>{" "}
                        to digitize India's healthcare infrastructure and enable
                        secure, real-time communication between all
                        stakeholders.
                      </p>
                    </div>
                    <div className="p-8 flex flex-col justify-center gap-6">
                      {[
                        {
                          label: "1 Platform",
                          sub: "Unified claims exchange",
                          icon: Network,
                          color: "text-teal-600",
                          bg: "bg-teal-50",
                        },
                        {
                          label: "All Stakeholders",
                          sub: "Hospitals, Insurers, TPAs, Govt",
                          icon: Users,
                          color: "text-blue-600",
                          bg: "bg-blue-50",
                        },
                        {
                          label: "Real-Time Exchange",
                          sub: "Instant data & document transfer",
                          icon: Zap,
                          color: "text-green-600",
                          bg: "bg-green-50",
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className={`flex items-center gap-4 p-4 rounded-xl ${stat.bg}`}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm">
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                          </div>
                          <div>
                            <div className={`font-bold text-lg ${stat.color}`}>
                              {stat.label}
                            </div>
                            <div className="text-slate-500 text-sm">
                              {stat.sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-red-100 text-red-700 border-red-200">
                The Problem
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                Why Hospitals Struggle Without NHCX
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Currently, hospitals must submit claims to multiple insurer
                portals, each with different formats and workflows.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
              {painPoints.map((point) => (
                <motion.div key={point.title} variants={itemVariants}>
                  <Card className="h-full border border-slate-200 hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-5">
                      <div
                        className={`w-10 h-10 rounded-lg ${point.bg} flex items-center justify-center mb-3`}
                      >
                        <point.icon className={`w-5 h-5 ${point.color}`} />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-2">
                        {point.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {point.impact}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How NHCX Works ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-14">
              <Badge className="mb-3 bg-teal-100 text-teal-700 border-teal-200">
                Workflow
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                How NHCX Works
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                A seamless 6-step digital claims journey — from patient
                admission to discharge
              </p>
            </motion.div>

            {/* Steps */}
            <div className="relative">
              {/* Connecting line - desktop */}
              <div
                className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-blue-300 to-green-300"
                style={{ top: "64px" }}
              />

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              >
                {workflowSteps.map((step, idx) => (
                  <motion.div
                    key={step.number}
                    variants={itemVariants}
                    custom={idx}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`relative w-14 h-14 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-lg z-10`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Architecture Diagram ── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-blue-100 text-blue-700 border-blue-200">
                Architecture
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                NHCX Architecture Diagram
              </h2>
              <p className="text-slate-600">
                How NHCX connects all healthcare stakeholders
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8"
            >
              {/* Top Layer */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
                  Healthcare Providers
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                  {[
                    { label: "Hospital / HIS", icon: Building2 },
                    { label: "Clinic / Lab", icon: Activity },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl"
                    >
                      <item.icon className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800 font-medium text-sm">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated dashes down */}
              <div className="flex justify-center mb-4">
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                  <ArrowRight className="w-4 h-4 text-teal-500 rotate-90" />
                </motion.div>
              </div>

              {/* NHCX Gateway */}
              <div className="mb-4">
                <motion.div
                  className="max-w-sm mx-auto p-5 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl shadow-lg text-center"
                  whileHover={{ scale: 1.02 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(20,184,166,0)",
                      "0 0 0 8px rgba(20,184,166,0.15)",
                      "0 0 0 0 rgba(20,184,166,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Network className="w-8 h-8 text-teal-200 mx-auto mb-2" />
                  <div className="font-bold text-white text-lg">
                    NHCX Gateway
                  </div>
                  <div className="text-teal-200 text-sm">
                    National Health Claims Exchange
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    {["ABDM", "FHIR", "API"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Animated dashes down */}
              <div className="flex justify-center mb-4">
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-teal-500 rotate-90" />
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-teal-400 rounded-full" />
                </motion.div>
              </div>

              {/* Bottom Layer */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
                  Payers & Government
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Insurer",
                      icon: Shield,
                      color: "bg-green-50 border-green-200 text-green-700",
                    },
                    {
                      label: "TPA",
                      icon: Users,
                      color: "bg-teal-50 border-teal-200 text-teal-700",
                    },
                    {
                      label: "Govt Scheme (PMJAY/RGHS)",
                      icon: Globe,
                      color: "bg-purple-50 border-purple-200 text-purple-700",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 border rounded-xl ${item.color}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium text-xs text-center">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stakeholders ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-teal-100 text-teal-700 border-teal-200">
                Ecosystem
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                Key Stakeholders in NHCX
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                NHCX connects multiple healthcare stakeholders across India's
                health ecosystem
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stakeholders.map((s) => (
                <motion.div key={s.title} variants={itemVariants}>
                  <Card
                    className={`h-full border ${s.border} hover:shadow-lg transition-all hover:-translate-y-1`}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-4`}
                      >
                        <s.icon className={`w-6 h-6 ${s.color}`} />
                      </div>
                      <h3
                        className={`font-heading font-bold text-lg ${s.color} mb-3`}
                      >
                        {s.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <span className="text-slate-600 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-green-100 text-green-700 border-green-200">
                Benefits
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                Benefits of NHCX
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                NHCX transforms claim processing for every stakeholder in the
                ecosystem
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {benefits.map((b) => (
                <motion.div key={b.title} variants={itemVariants}>
                  <Card className="h-full border border-slate-200 hover:shadow-md transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div
                        className={`w-11 h-11 rounded-xl ${b.bg} flex items-center justify-center mb-4`}
                      >
                        <b.icon className={`w-5 h-5 ${b.color}`} />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {b.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {b.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Digital Health Integration ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-blue-100 text-blue-700 border-blue-200">
                Integration
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                Part of India's Digital Health Ecosystem
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                NHCX is aligned with India's national digital health
                architecture
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {integrations.map((intg) => (
                <motion.div key={intg.title} variants={itemVariants}>
                  <Card className="h-full border border-slate-200 hover:shadow-md transition-all hover:-translate-y-1 text-center">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-xl ${intg.bg} flex items-center justify-center mx-auto mb-4`}
                      >
                        <intg.icon className={`w-6 h-6 ${intg.color}`} />
                      </div>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {intg.subtitle}
                      </Badge>
                      <h3 className="font-semibold text-slate-900 text-sm mb-2">
                        {intg.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {intg.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── NHCX Readiness Checklist ── */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-teal-100 text-teal-700 border-teal-200">
                Readiness
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                What Hospitals Must Do to Be NHCX Ready
              </h2>
              <p className="text-slate-600">
                Key readiness steps hospitals must complete to integrate with
                NHCX
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-4"
            >
              {readinessItems.map((item, idx) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  custom={idx}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  </div>
                  <span className="text-slate-800 font-medium text-sm">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How Our Platform Makes Hospitals NHCX Ready ── */}
      <section className="py-20 bg-gradient-to-br from-teal-800 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-teal-600/50 text-teal-200 border-teal-600/50">
                Our Platform
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                How AI Health Zon Makes Hospitals NHCX Ready
              </h2>
              <p className="text-teal-200/80 max-w-2xl mx-auto">
                Our Hospital Revenue Management Platform helps healthcare
                providers integrate seamlessly with NHCX
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {capabilities.map((cap) => (
                <motion.div key={cap.title} variants={itemVariants}>
                  <div className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-teal-400/30 flex items-center justify-center shrink-0">
                      <cap.icon className="w-5 h-5 text-teal-200" />
                    </div>
                    <span className="text-white font-medium">{cap.title}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AI Claims Prediction Module ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-purple-100 text-purple-700 border-purple-200">
                AI Module
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                NHCX + AI Claims Prediction
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our AI engine analyzes claim patterns before submission,
                predicting approval likelihood and flagging risk factors —
                maximizing your clean claim rate.
              </p>
            </motion.div>

            {/* Big stat */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex flex-col items-center gap-2 p-8 bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl border border-teal-100">
                <div className="text-6xl font-heading font-black text-teal-600">
                  94%
                </div>
                <div className="text-slate-700 font-semibold text-lg">
                  Claim Approval Rate Predicted
                </div>
                <div className="text-slate-400 text-sm">
                  Based on AI pre-submission analysis
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {aiCapabilities.map((cap) => (
                <motion.div key={cap.title} variants={itemVariants}>
                  <Card className="h-full border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                        <cap.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold text-teal-600 mb-1">
                        {cap.stat}
                      </div>
                      <div className="text-slate-400 text-xs mb-3">
                        {cap.statLabel}
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {cap.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Future of Healthcare Claims ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <Badge className="mb-3 bg-blue-100 text-blue-700 border-blue-200">
                Future
              </Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                The Future of Healthcare Claims
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                With NHCX, India's healthcare system is moving toward a fully
                digital, interoperable ecosystem
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-5 mb-10"
            >
              {futureItems.map((item) => (
                <motion.div key={item.text} variants={itemVariants}>
                  <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-slate-800 font-medium">
                      {item.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="text-center p-6 bg-teal-50 rounded-2xl border border-teal-100">
                <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                <p className="text-teal-800 font-semibold text-lg">
                  Hospitals that prepare early will gain faster revenue cycles
                  and better patient experience.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 relative overflow-hidden">
        {/* Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.15 195), transparent)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-4 bg-teal-400/20 text-teal-200 border-teal-400/30">
              Get Started Today
            </Badge>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-6">
              Be NHCX Ready Today
            </h2>
            <p className="text-teal-200 text-lg leading-relaxed mb-10">
              Future-proof your hospital with an NHCX-ready revenue management
              platform. Join hospitals across India already preparing for the
              digital claims era.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                data-ocid="nhcx.cta.primary_button"
                size="lg"
                onClick={() => setIsDemoOpen(true)}
                className="bg-white text-teal-900 hover:bg-teal-50 font-bold px-10 py-6 text-base shadow-xl"
              >
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                data-ocid="nhcx.cta.secondary_button"
                size="lg"
                variant="outline"
                asChild
                className="border-teal-300 text-teal-100 hover:bg-teal-800 bg-transparent px-10 py-6 text-base"
              >
                <a href="mailto:info@aihealthzon.com">Contact Us</a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {[
                { icon: Shield, text: "ABDM Compliant" },
                { icon: BadgeCheck, text: "NHCX Ready" },
                { icon: Cpu, text: "AI-Powered" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-teal-300"
                >
                  <badge.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{badge.text}</span>
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
