import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  CreditCard,
  FileSearch,
  LineChart,
  Shield,
  TrendingDown,
  TrendingUp,
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
  prefix,
  value,
  suffix,
  label,
  started,
}: {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="text-center p-5 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
      <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-xs text-blue-200 mt-1 leading-snug">{label}</div>
    </div>
  );
}

const pillars = [
  {
    num: "01",
    icon: <Zap className="w-6 h-6" />,
    title: "Pre-Authorization Intelligence",
    desc: "AI-driven pre-authorization with real-time insurer connect, eligibility verification, and instant approval status tracking.",
    points: [
      "AI pre-auth submission",
      "Real-time eligibility check",
      "Insurer API integration",
      "Auto-approval tracking",
    ],
    accent: "text-blue-600",
    border: "border-blue-100",
    bg: "bg-blue-50",
    numColor: "text-blue-200",
  },
  {
    num: "02",
    icon: <FileSearch className="w-6 h-6" />,
    title: "Claim Submission Engine",
    desc: "Automated ICD-10/DRG coding with zero-error claim generation, NHCX-ready formats, and multi-payer connectivity.",
    points: [
      "Auto ICD-10 & DRG coding",
      "Error-free NHCX formats",
      "Batch & real-time submission",
      "Multi-TPA integration",
    ],
    accent: "text-teal-600",
    border: "border-teal-100",
    bg: "bg-teal-50",
    numColor: "text-teal-200",
  },
  {
    num: "03",
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Denial Management",
    desc: "AI root-cause analysis of every denial, automated appeal generation, and pattern tracking to prevent future rejections.",
    points: [
      "AI denial root-cause",
      "Automated appeal letters",
      "Denial pattern analytics",
      "90-day AR follow-up",
    ],
    accent: "text-red-600",
    border: "border-red-100",
    bg: "bg-red-50",
    numColor: "text-red-200",
  },
  {
    num: "04",
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment Posting & Reconciliation",
    desc: "Automated ERA/EFT processing with variance detection, real-time bank reconciliation, and zero-touch payment posting.",
    points: [
      "ERA/EFT auto-processing",
      "Variance detection AI",
      "Bank reconciliation",
      "Patient balance posting",
    ],
    accent: "text-green-600",
    border: "border-green-100",
    bg: "bg-green-50",
    numColor: "text-green-200",
  },
  {
    num: "05",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Revenue Analytics Dashboard",
    desc: "Department-wise P&L, payer mix analysis, AR aging reports, and predictive revenue forecasting in real time.",
    points: [
      "Dept-wise P&L reports",
      "Payer mix analytics",
      "AR aging & follow-up",
      "Revenue forecasting",
    ],
    accent: "text-purple-600",
    border: "border-purple-100",
    bg: "bg-purple-50",
    numColor: "text-purple-200",
  },
  {
    num: "06",
    icon: <Shield className="w-6 h-6" />,
    title: "Compliance & Audit Shield",
    desc: "NABH documentation automation, IRDAI compliance monitoring, and AI-powered fraud detection across all payer channels.",
    points: [
      "NABH auto-documentation",
      "IRDAI compliance alerts",
      "Fraud detection AI",
      "Audit trail & export",
    ],
    accent: "text-amber-600",
    border: "border-amber-100",
    bg: "bg-amber-50",
    numColor: "text-amber-200",
  },
];

const challenges = [
  {
    category: "Cash Flow",
    color: "red",
    title: "Delayed Claim Settlements",
    desc: "Insurers take 45–90 days to settle claims, creating severe working capital shortfalls for hospitals of all sizes.",
    stat: "45–90 days avg",
  },
  {
    category: "Coding",
    color: "amber",
    title: "Manual Coding Errors",
    desc: "15–25% of claims require rework due to ICD coding mistakes, leading to delays, denials, and compliance risk.",
    stat: "15–25% rework rate",
  },
  {
    category: "Liquidity",
    color: "orange",
    title: "Cash Flow Gaps",
    desc: "Average hospital carries ₹50L+ in pending receivables, tying up capital that could fund operations and expansion.",
    stat: "₹50L+ avg pending",
  },
  {
    category: "Operations",
    color: "blue",
    title: "Multi-Payer Complexity",
    desc: "Managing 20+ insurance TPAs, government schemes, and corporate health plans with different formats and portals.",
    stat: "20+ payer formats",
  },
  {
    category: "Compliance",
    color: "purple",
    title: "NABH Documentation Burden",
    desc: "Manual NABH documentation consumes 30–40% of billing staff time, diverting resources from revenue-generating tasks.",
    stat: "30–40% staff time",
  },
];

const comparison = [
  {
    label: "Claim Submission",
    traditional: "3–5 days manual",
    ai: "< 4 hours automated",
  },
  {
    label: "Coding Accuracy",
    traditional: "75–85% manual",
    ai: "99.2% AI-assisted",
  },
  { label: "Denial Rate", traditional: "18–25%", ai: "< 2% (1.8%)" },
  { label: "Settlement Time", traditional: "45–90 days", ai: "7–14 days NHCX" },
  { label: "Staff Required", traditional: "15–25 FTEs", ai: "4–6 FTEs" },
  {
    label: "Revenue Recovery",
    traditional: "Reactive",
    ai: "₹2Cr+ annual AI recovery",
  },
];

const outlook = [
  {
    year: "2025",
    title: "NHCX Full Mandate",
    desc: "All insurance claims routed via National Health Claims Exchange for standardized processing.",
  },
  {
    year: "2026",
    title: "AI Underwriting",
    desc: "Real-time AI risk assessment enables dynamic premium pricing and instant pre-authorization.",
  },
  {
    year: "2027",
    title: "Value-Based Care",
    desc: "Outcome-linked payment models replace fee-for-service; hospitals paid for health outcomes.",
  },
  {
    year: "2028",
    title: "Unified Patient Wallet",
    desc: "ABHA-linked patient health wallet consolidates insurance, PM-JAY, and OOP payments.",
  },
  {
    year: "2030",
    title: "Blockchain Claims",
    desc: "Immutable blockchain audit trails eliminate claim fraud and enable instant multi-party settlement.",
  },
];

export function Hospitals() {
  const heroVis = useVisible();
  const statsVis = useVisible();
  const pillarsVis = useVisible();
  const challengesVis = useVisible();
  const aiVis = useVisible();
  const roiVis = useVisible();
  const outlookVis = useVisible();
  const ctaVis = useVisible();

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        ref={heroVis.ref}
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      >
        <img
          src="/assets/generated/hero-hospital-ai-health-zon.dim_1200x600.jpg"
          alt="AI Health Zon Hospital Revenue Management"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, oklch(0.55 0.18 240), transparent 55%), radial-gradient(circle at 80% 25%, oklch(0.45 0.15 275), transparent 50%)",
          }}
        />
        <div
          className={`relative z-10 max-w-4xl mx-auto px-6 py-24 text-center transition-all duration-700 ${
            heroVis.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Badge className="mb-5 bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs tracking-widest uppercase px-4 py-1">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
            RCM Intelligence 2025
          </Badge>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Revenue Cycle Management:
            <br />
            <span className="text-blue-300">Transforming Hospital Finance</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            AI Health Zon's RCM Intelligence platform reduces claim denials by
            35%, accelerates settlements by 40%, and recovers ₹2Cr+ in annual
            revenue for Indian hospitals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/join-network">
              <Button
                data-ocid="rcm.primary_button"
                size="lg"
                className="bg-blue-500 hover:bg-blue-400 text-white rounded-full px-8"
              >
                Start RCM Transformation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button
                data-ocid="rcm.secondary_button"
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
        className="bg-gradient-to-r from-slate-900 to-blue-900 py-14"
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
              prefix="₹"
              value={25}
              suffix=" L Cr+"
              label="Health Insurance Market"
              started={statsVis.visible}
            />
            <StatCard
              value={500000}
              suffix="+"
              label="Claims Processed"
              started={statsVis.visible}
            />
            <StatCard
              value={97}
              suffix="%"
              label="Clean Claim Rate"
              started={statsVis.visible}
            />
            <StatCard
              value={2}
              suffix="%"
              label="Rejection Rate (Industry Low)"
              started={statsVis.visible}
            />
          </div>
        </div>
      </section>

      {/* ── 6 Revenue Pillars ── */}
      <section
        ref={pillarsVis.ref}
        className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`mb-12 transition-all duration-700 ${
              pillarsVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
              Core Modules
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              6 Revenue Cycle Pillars
            </h2>
            <p className="text-slate-500 max-w-xl">
              End-to-end revenue intelligence from pre-authorization to final
              settlement, powered by AI at every step.
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
                data-ocid={`rcm.pillar.card.${i + 1}`}
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

      {/* ── Hospital Challenges ── */}
      <section ref={challengesVis.ref} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`transition-all duration-700 ${
              challengesVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
              Industry Pain Points
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Challenges Hospitals Face Today
            </h2>
            <div className="divide-y divide-slate-100">
              {challenges.map((c, i) => (
                <div
                  key={c.title}
                  className={`py-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-500 ${
                    challengesVis.visible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="sm:w-28 flex-shrink-0">
                    <Badge
                      className={`text-xs bg-${c.color}-50 text-${c.color}-700 border border-${c.color}-200`}
                    >
                      {c.category}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 mb-1">
                      {c.title}
                    </div>
                    <div className="text-sm text-slate-500">{c.desc}</div>
                  </div>
                  <div className="sm:w-36 text-right">
                    <span className="text-sm font-bold text-slate-700 bg-slate-100 rounded-full px-3 py-1">
                      {c.stat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Transformation Before/After ── */}
      <section
        ref={aiVis.ref}
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={`transition-all duration-700 ${
              aiVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
              Transformation
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-10"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Traditional vs AI-Powered RCM
            </h2>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="grid grid-cols-3 bg-slate-800 text-white text-sm font-semibold">
                <div className="p-4">Metric</div>
                <div className="p-4 border-x border-slate-700 text-center text-red-300">
                  Traditional RCM
                </div>
                <div className="p-4 text-center text-green-300">
                  AI Health Zon
                </div>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 text-sm border-t border-slate-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } transition-all duration-500 ${
                    aiVis.visible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="p-4 font-medium text-slate-700">
                    {row.label}
                  </div>
                  <div className="p-4 border-x border-slate-100 text-center text-red-600">
                    {row.traditional}
                  </div>
                  <div className="p-4 text-center text-green-700 font-semibold">
                    {row.ai}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI Band ── */}
      <section
        ref={roiVis.ref}
        className="py-20 bg-gradient-to-r from-slate-900 to-blue-900"
      >
        <div
          className={`max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${
            roiVis.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <TrendingUp className="w-12 h-12 text-blue-300 mx-auto mb-5" />
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Measurable ROI from Day One
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Hospitals see{" "}
            <span className="text-white font-bold">
              35% reduction in denials
            </span>
            ,{" "}
            <span className="text-white font-bold">40% faster settlements</span>
            , and{" "}
            <span className="text-white font-bold">
              ₹2Cr+ annual revenue recovery
            </span>{" "}
            within 6 months of going live.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingDown className="w-6 h-6" />,
                stat: "35%",
                label: "Fewer Claim Denials",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                stat: "40%",
                label: "Faster Settlements",
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                stat: "₹2Cr+",
                label: "Annual Recovery",
              },
            ].map((r) => (
              <div
                key={r.stat}
                className="bg-white/10 rounded-2xl border border-white/20 p-6"
              >
                <div className="text-blue-300 mb-3">{r.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {r.stat}
                </div>
                <div className="text-sm text-blue-200">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2025–2030 Future Outlook ── */}
      <section
        ref={outlookVis.ref}
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/20"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`transition-all duration-700 ${
              outlookVis.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
              What&apos;s Next
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Future Outlook 2025–2030
            </h2>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-blue-200" />
              <div className="space-y-8">
                {outlook.map((item, i) => (
                  <div
                    key={item.year}
                    className={`flex gap-6 transition-all duration-500 ${
                      outlookVis.visible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="w-14 flex-shrink-0 text-right">
                      <span className="text-sm font-bold text-blue-600">
                        {item.year}
                      </span>
                    </div>
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />
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

      {/* ── CTA ── */}
      <section ref={ctaVis.ref} className="py-24 bg-white">
        <div
          className={`max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${
            ctaVis.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-5" />
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Transform Your Revenue Cycle
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            Join 500+ hospitals already running on AI Health Zon's RCM
            Intelligence. Schedule a free 30-minute revenue audit today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/join-network">
              <Button
                data-ocid="rcm.cta.primary_button"
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8"
              >
                Book Free Revenue Audit <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/nhcx">
              <Button
                data-ocid="rcm.cta.secondary_button"
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Explore NHCX Integration
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
