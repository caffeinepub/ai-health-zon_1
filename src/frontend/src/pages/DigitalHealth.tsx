import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  Globe,
  Lock,
  Network,
  Shield,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function StatCard({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="text-center p-5 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
      <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-teal-200 mt-1 leading-snug">{label}</div>
    </div>
  );
}

const pillars = [
  {
    num: "01",
    color: "blue",
    icon: <Smartphone className="w-6 h-6" />,
    title: "ABHA Identity Layer",
    desc: "Ayushman Bharat Health Account — a unique 14-digit health ID for every Indian citizen, enabling lifelong health record access.",
    points: [
      "14-digit unique health identifier",
      "OTP & biometric authentication",
      "PHR mobile app integration",
      "Linked to Aadhaar & mobile",
    ],
    accent: "text-blue-600",
    border: "border-blue-100",
    bg: "bg-blue-50",
    numColor: "text-blue-200",
  },
  {
    num: "02",
    color: "amber",
    icon: <Lock className="w-6 h-6" />,
    title: "Consent Management",
    desc: "Patient-controlled data sharing framework aligned with the Digital Personal Data Protection Act, giving individuals full sovereignty over health records.",
    points: [
      "Granular consent per record type",
      "DPDP Act 2023 compliant",
      "Complete audit trail",
      "Time-bound access control",
    ],
    accent: "text-amber-600",
    border: "border-amber-100",
    bg: "bg-amber-50",
    numColor: "text-amber-200",
  },
  {
    num: "03",
    color: "teal",
    icon: <Network className="w-6 h-6" />,
    title: "Health Information Exchange",
    desc: "HIP/HIU architecture enabling seamless health data flow across facilities using globally interoperable FHIR R4 standards.",
    points: [
      "FHIR R4 & HL7 standards",
      "HIP/HIU dual-role support",
      "Real-time data fetch API",
      "Cross-facility interoperability",
    ],
    accent: "text-teal-600",
    border: "border-teal-100",
    bg: "bg-teal-50",
    numColor: "text-teal-200",
  },
  {
    num: "04",
    color: "green",
    icon: <Database className="w-6 h-6" />,
    title: "National Health Registries",
    desc: "Central registries for health facilities and professionals — the foundational infrastructure for India's digital health ecosystem.",
    points: [
      "HFR — Health Facility Registry",
      "HPR — Health Professional Registry",
      "Facility verification & NABH link",
      "Real-time registry updates",
    ],
    accent: "text-green-600",
    border: "border-green-100",
    bg: "bg-green-50",
    numColor: "text-green-200",
  },
  {
    num: "05",
    color: "purple",
    icon: <FileText className="w-6 h-6" />,
    title: "NHCX Claims Integration",
    desc: "National Health Claims Exchange integration for standardized, real-time insurance claim submission and adjudication.",
    points: [
      "Standardized claim formats",
      "Real-time adjudication",
      "Multi-insurer connectivity",
      "PM-JAY & TPA compatible",
    ],
    accent: "text-purple-600",
    border: "border-purple-100",
    bg: "bg-purple-50",
    numColor: "text-purple-200",
  },
];

const timeline = [
  {
    year: "2017",
    title: "National Health Policy",
    desc: "NHP 2017 laid the vision for universal health coverage and digital health infrastructure.",
  },
  {
    year: "2018",
    title: "NDHB Draft Released",
    desc: "National Digital Health Blueprint proposed ABHA, HIE, and national registries as core pillars.",
  },
  {
    year: "2019",
    title: "NDHM Announced",
    desc: "PM Modi announced the National Digital Health Mission at Independence Day address.",
  },
  {
    year: "2021",
    title: "ABDM Official Launch",
    desc: "Ayushman Bharat Digital Mission formally launched; ABHA ID generation begins at scale.",
  },
  {
    year: "2022",
    title: "ABHA Mass Rollout",
    desc: "50 Cr+ ABHA IDs created; health facility and professional registries go live nationwide.",
  },
  {
    year: "2023",
    title: "NHCX Beta Launch",
    desc: "National Health Claims Exchange beta launched; standardized claim formats adopted.",
  },
  {
    year: "2024",
    title: "FHIR Mandate",
    desc: "NHA mandates FHIR R4 compliance for all healthcare providers integrating with ABDM.",
  },
  {
    year: "2025",
    title: "Full Interoperability",
    desc: "Complete HIE network operational; real-time cross-facility health data exchange at scale.",
  },
];

const phases = [
  {
    phase: "Phase 1",
    timeline: "Month 1–3",
    color: "teal",
    steps: [
      "Register on ABDM sandbox",
      "Generate ABHA IDs for patients",
      "Basic API integration",
      "Staff training on consent flow",
    ],
  },
  {
    phase: "Phase 2",
    timeline: "Month 3–6",
    color: "blue",
    steps: [
      "HIP/HIU dual-role setup",
      "Consent workflow integration",
      "EMR/HIS system linkage",
      "FHIR R4 data mapping",
    ],
  },
  {
    phase: "Phase 3",
    timeline: "Month 6–12",
    color: "purple",
    steps: [
      "Full interoperability live",
      "NHCX claims integration",
      "HIE analytics dashboard",
      "Go-live & audit compliance",
    ],
  },
];

const benefits = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Faster Claims",
    desc: "Real-time NHCX integration cuts claim settlement from 45 days to under 7 days.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Zero Paperwork",
    desc: "Digital consent and FHIR records eliminate manual documentation entirely.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Patient Trust",
    desc: "Transparent consent management builds patient confidence in data privacy.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Regulatory Compliance",
    desc: "DPDP Act, NABH, and NHA compliance in a single integrated platform.",
  },
];

export function DigitalHealth() {
  const heroVis = useVisible();
  const statsVis = useVisible();
  const pillarsVis = useVisible();
  const archVis = useVisible();
  const timelineVis = useVisible();
  const roadmapVis = useVisible();
  const benefitsVis = useVisible();
  const ctaVis = useVisible();

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        ref={heroVis.ref}
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-blue-900"
      >
        <img
          src="/assets/generated/hero-digital-health-ai-health-zon.dim_1200x600.jpg"
          alt="AI Health Zon ABDM Digital Health"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.65 0.18 195), transparent 55%), radial-gradient(circle at 75% 20%, oklch(0.55 0.15 240), transparent 50%)",
          }}
        />
        <div
          className={`relative z-10 max-w-4xl mx-auto px-6 py-24 text-center transition-all duration-700 ${
            heroVis.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Badge className="mb-5 bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs tracking-widest uppercase px-4 py-1">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse" />
            ABDM Live 2025
          </Badge>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            ABDM: India&apos;s Digital
            <br />
            <span className="text-teal-300">Health Revolution</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Ayushman Bharat Digital Mission is transforming 140 Crore Indians'
            health records into a unified, secure, patient-controlled digital
            ecosystem — powering the world's largest public health network.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/join-network">
              <Button
                data-ocid="abdm.primary_button"
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-white rounded-full px-8"
              >
                Start ABDM Integration <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button
                data-ocid="abdm.secondary_button"
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
              >
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <section
        ref={statsVis.ref}
        className="bg-gradient-to-r from-slate-900 to-teal-900 py-14"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 ${
              statsVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <StatCard
              value={64}
              suffix=" Cr+"
              label="ABHA IDs Created"
              started={statsVis.visible}
            />
            <StatCard
              value={170000}
              suffix="+"
              label="Health & Wellness Centres"
              started={statsVis.visible}
            />
            <StatCard
              value={300000}
              suffix="+"
              label="Registered Health Facilities"
              started={statsVis.visible}
            />
            <StatCard
              value={50}
              suffix=" Cr+"
              label="Consent Transactions"
              started={statsVis.visible}
            />
          </div>
        </div>
      </section>

      {/* ── 5 ABDM Building Blocks ── */}
      <section
        ref={pillarsVis.ref}
        className="py-20 bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`mb-12 transition-all duration-700 ${
              pillarsVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase mb-3">
              Architecture
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              5 Core ABDM Building Blocks
            </h2>
            <p className="text-slate-500 max-w-xl text-base">
              The five foundational pillars that make India's digital health
              infrastructure interoperable, secure, and patient-centric.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className={`relative bg-white rounded-2xl border ${p.border} p-6 hover:shadow-lg transition-all duration-500 ${
                  pillarsVis.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
                data-ocid={`abdm.pillar.card.${i + 1}`}
              >
                <div
                  className={`absolute top-4 right-4 text-6xl font-black leading-none ${p.numColor} select-none`}
                >
                  {p.num}
                </div>
                <div
                  className={`inline-flex p-2 rounded-xl ${p.bg} ${p.accent} mb-4`}
                >
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  {p.desc}
                </p>
                <ul className="space-y-1">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2 text-xs text-slate-600"
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${p.accent}`}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture Visual ── */}
      <section ref={archVis.ref} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={`transition-all duration-700 ${
              archVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase mb-3">
              System Design
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-10"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              ABDM Architecture: 3-Tier Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="bg-teal-900 text-white p-8">
                <div className="text-xs tracking-widest text-teal-300 uppercase mb-3">
                  Layer 1
                </div>
                <div
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  Hospital Systems
                </div>
                <ul className="space-y-2 text-sm text-teal-100">
                  {[
                    "HIS / EMR",
                    "Laboratory Systems",
                    "Pharmacy Mgmt",
                    "PACS / Radiology",
                    "Billing & Claims",
                  ].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-800 text-white p-8 border-x border-blue-700">
                <div className="text-xs tracking-widest text-blue-300 uppercase mb-3">
                  Layer 2
                </div>
                <div
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  ABDM Gateway
                </div>
                <ul className="space-y-2 text-sm text-blue-100">
                  {[
                    "ABHA Identity API",
                    "Consent Manager",
                    "HIE-CM Bridge",
                    "FHIR Translator",
                    "Audit & Logging",
                  ].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 text-white p-8">
                <div className="text-xs tracking-widest text-slate-300 uppercase mb-3">
                  Layer 3
                </div>
                <div
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  National Services
                </div>
                <ul className="space-y-2 text-sm text-slate-200">
                  {[
                    "NHA ABDM Platform",
                    "NHCX Exchange",
                    "HFR / HPR Registries",
                    "PHR App Ecosystem",
                    "NHA Analytics",
                  ].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Policy Timeline ── */}
      <section
        ref={timelineVis.ref}
        className="py-20 bg-gradient-to-br from-slate-50 to-teal-50/20"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`transition-all duration-700 ${
              timelineVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase mb-3">
              Policy Journey
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              India&apos;s Digital Health Timeline
            </h2>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-teal-200" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    className={`flex gap-6 transition-all duration-500 ${
                      timelineVis.visible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="w-14 flex-shrink-0 text-right">
                      <span className="text-sm font-bold text-teal-600">
                        {item.year}
                      </span>
                    </div>
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-3 h-3 rounded-full bg-teal-500 ring-4 ring-teal-100" />
                    </div>
                    <div className="pb-2">
                      <div className="font-semibold text-slate-900 text-sm mb-1">
                        {item.title}
                      </div>
                      <div className="text-slate-500 text-sm leading-relaxed">
                        {item.desc}
                      </div>
                      <div className="border-t border-slate-100 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Integration Roadmap ── */}
      <section ref={roadmapVis.ref} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={`mb-12 transition-all duration-700 ${
              roadmapVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase mb-3">
              Implementation Guide
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Hospital Integration Roadmap
            </h2>
            <p className="text-slate-500 max-w-xl">
              A phased approach designed for minimal disruption while achieving
              full ABDM compliance within 12 months.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((ph, i) => (
              <div
                key={ph.phase}
                className={`bg-gradient-to-br from-slate-50 to-${ph.color}-50/50 rounded-2xl border border-${ph.color}-100 p-6 transition-all duration-500 ${
                  roadmapVis.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
                data-ocid={`abdm.roadmap.card.${i + 1}`}
              >
                <div
                  className={`text-xs font-bold tracking-widest text-${ph.color}-600 uppercase mb-1`}
                >
                  {ph.phase}
                </div>
                <div
                  className="text-xl font-bold text-slate-900 mb-1"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  {ph.timeline}
                </div>
                <div className="border-t border-slate-200 my-4" />
                <ul className="space-y-2">
                  {ph.steps.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 text-${ph.color}-500`}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Benefits Band ── */}
      <section
        ref={benefitsVis.ref}
        className="py-20 bg-gradient-to-r from-slate-900 to-teal-900"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={`transition-all duration-700 ${
              benefitsVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-teal-300 uppercase mb-3">
              Why It Matters
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-12"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Business Benefits for Hospitals
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className={`bg-white/10 rounded-2xl border border-white/20 p-6 transition-all duration-500 ${
                    benefitsVis.visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="text-teal-300 mb-3">{b.icon}</div>
                  <div className="font-bold text-white mb-2">{b.title}</div>
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {b.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaVis.ref} className="py-24 bg-white">
        <div
          className={`max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${
            ctaVis.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Globe className="w-12 h-12 text-teal-500 mx-auto mb-5" />
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Start Your ABDM Integration Journey
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            Join 3,00,000+ registered facilities on India's national digital
            health backbone. Our certified team handles end-to-end ABDM
            compliance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/join-network">
              <Button
                data-ocid="abdm.cta.primary_button"
                size="lg"
                className="bg-teal-600 hover:bg-teal-500 text-white rounded-full px-8"
              >
                Book a Free Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/nhcx">
              <Button
                data-ocid="abdm.cta.secondary_button"
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Explore NHCX Page
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
