import { Layout } from "@/components/layout/Layout";
import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Shield,
  TrendingUp,
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

export function ABDMCompliance() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <Layout>
      <DemoBookingDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/abdm-compliance-hero.dim_1200x600.jpg"
            alt="ABDM Compliance"
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
            <motion.div variants={fadeUp} className="flex gap-3 mb-6">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase">
                NHA Mandate 2024
              </span>
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase animate-pulse">
                Compliance Deadline Active
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              ABDM Compliance:
              <br />
              <span className="text-teal-400">The New Healthcare Mandate</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl"
            >
              Hospitals not aligned with ABDM risk losing Government Scheme
              empanelments — and crores in annual revenue
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-6 text-base"
                onClick={() => setIsDemoOpen(true)}
                data-ocid="abdm.compliance_check_button"
              >
                Check Your Compliance Status
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-base"
                data-ocid="abdm.download_guide_button"
              >
                Download Compliance Guide
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Milestone Roadmap */}
      <section className="py-24 bg-white">
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
              Compliance Roadmap
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              The Compliance Journey: M1 → M2 → M3 → NHCX
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-600 max-w-3xl"
            >
              ABDM compliance is structured in progressive milestones. Each
              phase builds upon the previous — hospitals must achieve M1 before
              M2, and M2 before M3.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
          >
            {[
              {
                phase: "M1",
                title: "Foundation",
                phase_label: "Phase 1",
                badge: "Entry Level Compliance",
                badge_color: "bg-blue-100 text-blue-700",
                border_color: "border-t-blue-500",
                icon_bg: "bg-blue-50",
                icon_color: "text-blue-600",
                items: [
                  "HFR Registration (Health Facility Registry)",
                  "HPR Registration (Healthcare Professionals Registry)",
                  "ABHA Creation & Linking",
                  "Basic digital patient registration",
                ],
              },
              {
                phase: "M2",
                title: "Data Sharing",
                phase_label: "Phase 2",
                badge: "Intermediate Compliance",
                badge_color: "bg-amber-100 text-amber-700",
                border_color: "border-t-amber-500",
                icon_bg: "bg-amber-50",
                icon_color: "text-amber-600",
                items: [
                  "Consent Manager Integration",
                  "HIP capability (Health Information Provider)",
                  "HIU capability (Health Information User)",
                  "Secure health record exchange",
                ],
              },
              {
                phase: "M3",
                title: "Full Ecosystem",
                phase_label: "Phase 3",
                badge: "Full Compliance",
                badge_color: "bg-green-100 text-green-700",
                border_color: "border-t-green-500",
                icon_bg: "bg-green-50",
                icon_color: "text-green-600",
                items: [
                  "Digital prescriptions",
                  "Telemedicine integration",
                  "AI-powered health analytics",
                  "Automated insurance claim integration",
                ],
              },
              {
                phase: "NHCX",
                title: "Claims Exchange",
                phase_label: "Revenue Layer",
                badge: "Revenue Ready",
                badge_color: "bg-teal-100 text-teal-700",
                border_color: "border-t-teal-500",
                icon_bg: "bg-teal-50",
                icon_color: "text-teal-600",
                items: [
                  "National Health Claims Exchange",
                  "Digital claim submission",
                  "Real-time insurer communication",
                  "Faster discharge & settlement",
                ],
              },
            ].map((milestone, i) => (
              <motion.div
                key={milestone.phase}
                variants={fadeUp}
                className={`bg-white border border-slate-200 border-t-4 ${milestone.border_color} p-8 relative`}
                data-ocid={`abdm.milestone.${i + 1}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${milestone.icon_bg} mb-4`}
                >
                  <span className={`font-bold text-sm ${milestone.icon_color}`}>
                    {milestone.phase}
                  </span>
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">
                  {milestone.phase_label}
                </div>
                <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-4">
                  {milestone.title}
                </h3>
                <ul className="space-y-3 mb-6">
                  {milestone.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${milestone.badge_color}`}
                >
                  {milestone.badge}
                </span>
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CRITICAL FINANCIAL IMPACT */}
      <section
        className="py-24 bg-red-950"
        data-ocid="abdm.financial_alert_section"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <span className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded tracking-widest uppercase flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Financial Alert
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4"
            >
              ⚠️ Financial Alert: What Hospitals Stand to Lose
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-red-200 max-w-3xl mx-auto"
            >
              Government schemes cannot operate in non-ABDM compliant hospitals.
              This is not a warning — it's already happening.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                scheme: "MAA Yojana",
                full: "Mukhyamantri Ayushman Arogya Yojana",
                status: "SCHEME SUSPENDED",
                revenue: "₹50–80 Lakh",
                detail: "NHA Circular: Compliance mandatory from 2024",
                impact:
                  "Rajasthan hospitals lose state government health scheme revenue",
              },
              {
                scheme: "RGHS",
                full: "Rajasthan Government Health Scheme",
                status: "EMPANELMENT CANCELLED",
                revenue: "₹40–60 Lakh",
                detail:
                  "Mandatory ABDM compliance for all empanelled hospitals",
                impact:
                  "Government employees & families redirect to compliant hospitals",
              },
              {
                scheme: "PMJAY",
                full: "Pradhan Mantri Jan Arogya Yojana — Ayushman Bharat",
                status: "CLAIMS REJECTED",
                revenue: "₹1–5 Crore",
                detail:
                  "NHA directive: ABDM compliance mandatory for all PMJAY empanelled hospitals",
                impact:
                  "55 Crore beneficiaries cannot be treated at non-compliant hospitals",
              },
            ].map((card, i) => (
              <motion.div
                key={card.scheme}
                variants={fadeUp}
                className="bg-red-900/60 border border-red-700 rounded-lg p-8 relative overflow-hidden"
                data-ocid={`abdm.scheme_card.${i + 1}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/20 rounded-full -translate-y-8 translate-x-8" />
                <div className="inline-block bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded mb-4 tracking-widest uppercase">
                  {card.status}
                </div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                  {card.scheme}
                </h3>
                <p className="text-red-300 text-sm mb-4">{card.full}</p>
                <div className="bg-red-800/60 rounded p-4 mb-4">
                  <p className="text-xs text-red-300 uppercase tracking-wide mb-1">
                    Average Annual Revenue at Risk
                  </p>
                  <p className="text-3xl font-bold text-amber-400">
                    {card.revenue}
                  </p>
                  <p className="text-xs text-red-300 mt-1">per hospital</p>
                </div>
                <p className="text-red-200 text-sm mb-3">{card.detail}</p>
                <p className="text-red-300 text-sm italic">{card.impact}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats band */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-red-800 rounded-lg overflow-hidden"
          >
            {[
              {
                value: "₹2–7 Crore",
                label: "Average Annual Revenue Risk Per Hospital",
              },
              { value: "3 Schemes", label: "Suspended for Non-Compliance" },
              { value: "55 Crore", label: "PMJAY Beneficiaries Lost" },
              { value: "Immediate", label: "Action Required" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-red-900 p-8 text-center"
              >
                <p className="text-3xl font-bold text-amber-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-red-300 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Hospitals Must Act Now */}
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
              Urgency Framework
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900"
            >
              Why Hospitals Must Act Now
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                num: "01",
                title: "NHA Mandate is Active",
                desc: "ABDM is no longer optional — it is regulatory. The National Health Authority has issued binding circulars requiring all government-scheme empanelled hospitals to achieve ABDM compliance. Non-compliance results in immediate empanelment suspension.",
              },
              {
                num: "02",
                title: "Revenue at Risk",
                desc: "Crores in government scheme billing (MAA Yojana, RGHS, PMJAY) are under immediate threat. Hospitals dependent on government scheme revenue face existential financial risk if they do not act. Average exposure: ₹2–7 Crore per year.",
              },
              {
                num: "03",
                title: "Competitor Advantage",
                desc: "Compliant hospitals receive priority empanelment, faster scheme approvals, and preferential patient routing from government health portals. Your competitor's compliance becomes your revenue loss.",
              },
              {
                num: "04",
                title: "Patient Trust & Digital Health",
                desc: "ABHA-linked hospitals are preferred for digital health records, telemedicine, and insurance paperless claims. Patients and referring doctors increasingly choose ABDM-compliant facilities for seamless continuity of care.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.num}
                variants={fadeUp}
                className="flex gap-8 py-8 border-b border-slate-200 last:border-b-0 group"
                data-ocid={`abdm.pillar.${i + 1}`}
              >
                <div className="shrink-0">
                  <span className="text-6xl font-black text-slate-100 group-hover:text-teal-100 transition-colors">
                    {pillar.num}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed max-w-3xl">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chikitsa Section */}
      <section className="py-24 bg-white">
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
              Recommended ABDM-Compliant HIS
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900"
            >
              Meet Chikitsa — Built for Full ABDM & NHCX Compliance
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Features list */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-2"
            >
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Chikitsa is a fully NHA-certified Hospital Information System
                (HIS) designed from the ground up for ABDM compliance. It is the
                only software that covers all three compliance milestones — M1,
                M2, and M3 — plus complete NHCX integration out of the box.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "ABHA Creation & Linking (M1)",
                  "HFR & HPR Registry Integration (M1)",
                  "Consent Manager Integration (M2)",
                  "HIP & HIU Capability (M2)",
                  "Digital Health Records (EHR) — FHIR Standard",
                  "NHCX Claim Exchange Integration",
                  "Digital Prescriptions (M3)",
                  "Insurance Pre-Authorization",
                  "Real-time Claim Tracking",
                  "NHA Certified & Approved",
                  "Used in 200+ Hospitals across India",
                  "24/7 Helpdesk & Implementation Support",
                ].map((feature) => (
                  <motion.div
                    key={feature}
                    variants={fadeUp}
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-teal-500 rounded-2xl p-8 shadow-xl sticky top-24"
              data-ocid="abdm.chikitsa_pricing_card"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-100 rounded-full mb-4">
                  <Shield className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-1">
                  Chikitsa
                </h3>
                <p className="text-slate-500 text-sm">ABDM Compliant HIS</p>
              </div>
              <div className="text-center py-6 border-y border-teal-100 mb-6">
                <p className="text-5xl font-black text-teal-600">₹1,500</p>
                <p className="text-slate-500 text-sm mt-1">
                  Per Bed / Per Year
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Full ABDM M1 + M2 + M3 compliance",
                  "NHCX integration included",
                  "NHA certified software",
                  "Implementation support",
                  "Training included",
                  "24/7 helpdesk",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a
                  href="https://www.chikitsa.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="abdm.chikitsa_visit_button"
                >
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Visit chikitsa.io
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="w-full border-teal-500 text-teal-600 hover:bg-teal-50"
                  onClick={() => setIsDemoOpen(true)}
                  data-ocid="abdm.chikitsa_demo_button"
                >
                  Book Demo
                </Button>
              </div>
              <div className="mt-6 p-3 bg-green-50 rounded-lg text-center">
                <p className="text-xs text-green-700 font-semibold">
                  ✅ NHA Certified & Approved
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Health Zon Intelligence Layer */}
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
              The Intelligence Layer
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6"
            >
              AI Health Zon: The AI Intelligence Layer
              <br />
              <span className="text-teal-400">on Top of Compliance</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-2xl text-slate-300 font-light"
            >
              Chikitsa makes you{" "}
              <span className="text-white font-semibold">compliant</span>. AI
              Health Zon makes you{" "}
              <span className="text-teal-400 font-semibold">profitable</span>.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: <Shield className="h-7 w-7" />,
                title: "ABDM Compliance Monitor",
                color: "text-blue-400",
                bg: "bg-blue-900/40",
                border: "border-blue-700",
                items: [
                  "Real-time compliance status dashboard",
                  "M1/M2/M3 milestone tracker",
                  "Automated alerts for non-compliance risks",
                ],
              },
              {
                icon: <TrendingUp className="h-7 w-7" />,
                title: "AI Revenue Intelligence",
                color: "text-teal-400",
                bg: "bg-teal-900/40",
                border: "border-teal-700",
                items: [
                  "Claim prediction engine (97% clean claim rate)",
                  "Scheme-wise revenue analytics (MAA, RGHS, PMJAY)",
                  "Denial management & recovery",
                ],
              },
              {
                icon: <Zap className="h-7 w-7" />,
                title: "NHCX + AI Claims",
                color: "text-amber-400",
                bg: "bg-amber-900/40",
                border: "border-amber-700",
                items: [
                  "AI-powered pre-authorization",
                  "Automated claim validation before NHCX submission",
                  "Revenue forecasting by scheme",
                ],
              },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                variants={fadeUp}
                className={`${col.bg} border ${col.border} rounded-xl p-8`}
                data-ocid={`abdm.ai_feature.${i + 1}`}
              >
                <div className={`${col.color} mb-5`}>{col.icon}</div>
                <h3
                  className={`font-playfair text-xl font-bold ${col.color} mb-5`}
                >
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-slate-300 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats band */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700 rounded-xl overflow-hidden"
          >
            {[
              { value: "97%", label: "Clean Claim Rate" },
              { value: "₹500 Cr+", label: "Revenue Recovered" },
              { value: "5,00,000+", label: "Claims Processed" },
              { value: "200+", label: "Hospitals" },
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

      {/* Combined Solution Flow */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-3xl md:text-4xl font-bold text-slate-900"
            >
              Compliance + AI: The Complete Revenue Stack
            </motion.h2>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 flex-wrap">
            {[
              {
                label: "Your Hospital",
                color: "bg-slate-700",
                sub: "Current State",
              },
              {
                label: "Chikitsa",
                color: "bg-teal-600",
                sub: "ABDM Compliance",
              },
              {
                label: "AI Health Zon",
                color: "bg-blue-700",
                sub: "Revenue Intelligence",
              },
              {
                label: "MAA / RGHS / PMJAY",
                color: "bg-green-700",
                sub: "Government Schemes Active",
              },
              {
                label: "Revenue Secured",
                color: "bg-amber-600",
                sub: "₹ Crores Protected",
              },
            ].map((item, i, arr) => (
              <div key={item.label} className="flex items-center">
                <motion.div
                  variants={fadeUp}
                  className={`${item.color} text-white px-5 py-4 rounded-lg text-center min-w-[130px]`}
                >
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-xs opacity-75 mt-1">{item.sub}</p>
                </motion.div>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-slate-400 mx-1 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-teal-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Don't Let Non-Compliance Cost You Crores
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto"
            >
              Get ABDM Compliance Assessment — Free for Your Hospital
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50 font-bold px-8 py-6 text-base shadow-xl"
                onClick={() => setIsDemoOpen(true)}
                data-ocid="abdm.cta_consult_button"
              >
                Book Compliance Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a
                href="https://wa.me/918696766966?text=Hi%2C%20I%20want%20to%20get%20ABDM%20Compliance%20Assessment%20for%20my%20hospital"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="abdm.cta_whatsapp_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-base"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us Now
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
