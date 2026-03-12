import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Brain,
  Building2,
  CheckCircle2,
  Cpu,
  Globe,
  Heart,
  Lightbulb,
  Radio,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────
// Animated count-up hook
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// Stat card with count-up
// ──────────────────────────────────────────────
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
    <div className="text-center p-5 bg-white rounded-2xl shadow-sm border border-teal-100 hover:shadow-md transition-shadow">
      <div className="text-2xl md:text-3xl font-bold text-health-blue tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1 leading-snug">
        {label}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Intersection observer helper
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────
export function CurrentAffairs() {
  const statsSection = useVisible();

  const stats = [
    { value: 30, suffix: "L Cr+", label: "Market Size (₹) by 2030" },
    { value: 140, suffix: "Cr+", label: "Population Covered" },
    { value: 500, suffix: "M+", label: "ABHA IDs Issued" },
    { value: 25000, suffix: "+", label: "NABH Accredited Hospitals" },
    { value: 55, suffix: "Cr", label: "PM-JAY Beneficiaries" },
    { value: 89155, suffix: "Cr", label: "Health Budget FY25 (₹)" },
  ];

  const drivers = [
    {
      icon: Shield,
      color: "text-blue-600",
      bg: "bg-blue-50",
      title: "Ayushman Bharat PM-JAY",
      desc: "World's largest government health insurance scheme covering 55 crore beneficiaries, providing cashless treatment up to ₹5 lakh per family per year.",
    },
    {
      icon: Globe,
      color: "text-teal-600",
      bg: "bg-teal-50",
      title: "ABDM & Digital Health ID",
      desc: "Unified digital health ecosystem under NHA linking every citizen's health records via ABHA ID for seamless, interoperable healthcare delivery.",
    },
    {
      icon: Zap,
      color: "text-amber-600",
      bg: "bg-amber-50",
      title: "NHCX — UPI for Insurance",
      desc: "National Health Claims Exchange enables single-window digital claims processing between hospitals, insurers, and TPAs with real-time status tracking.",
    },
    {
      icon: Activity,
      color: "text-purple-600",
      bg: "bg-purple-50",
      title: "National Digital Health Mission",
      desc: "Interoperable EHR systems, telemedicine integration, and digital prescriptions across 1.5 lakh+ Health and Wellness Centres nationwide.",
    },
    {
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
      title: "Health-Tech Investment Surge",
      desc: "₹30,000 Cr+ invested in Indian health-tech from 2021–24, fuelling a new generation of digital health unicorns.",
    },
    {
      icon: Brain,
      color: "text-rose-600",
      bg: "bg-rose-50",
      title: "AI & ML in Diagnostics",
      desc: "AI-powered screening tools deployed across PHCs for TB, cancer detection, and diabetic retinopathy, dramatically improving rural diagnostic accuracy.",
    },
  ];

  const news = [
    {
      date: "Mar 2025",
      title: "NHCX Goes Live",
      body: "NHA's National Health Claims Exchange begins live operations connecting hospitals, insurers, and TPAs for paperless, real-time claims adjudication.",
      tag: "Digital Infrastructure",
      tagColor: "bg-blue-100 text-blue-700",
    },
    {
      date: "Feb 2025",
      title: "ABHA ID Crosses 500 Million",
      body: "India's digital health ID milestone reached, enabling universal patient identification and seamless cross-hospital health record sharing.",
      tag: "Digital Health",
      tagColor: "bg-teal-100 text-teal-700",
    },
    {
      date: "Jan 2025",
      title: "AI Diagnostics in Rural India",
      body: "Government deploys AI tools in Primary Health Centres for TB and cervical cancer screening, covering 2 lakh+ villages.",
      tag: "AI & Technology",
      tagColor: "bg-purple-100 text-purple-700",
    },
    {
      date: "Dec 2024",
      title: "Telemedicine Regulation 2.0",
      body: "New guidelines expand telehealth access to tier-2 and tier-3 cities, standardising remote consultation protocols for all registered practitioners.",
      tag: "Policy",
      tagColor: "bg-green-100 text-green-700",
    },
    {
      date: "Nov 2024",
      title: "NABH Accreditation Surge",
      body: "3,200+ hospitals now NABH accredited, representing a 40% increase since 2022 driven by government incentives and insurance scheme mandates.",
      tag: "Quality",
      tagColor: "bg-amber-100 text-amber-700",
    },
    {
      date: "Oct 2024",
      title: "Health-Tech Unicorns Club",
      body: "India's digital health companies lead a growing unicorn club as investor confidence in health-tech reaches all-time high.",
      tag: "Investment",
      tagColor: "bg-rose-100 text-rose-700",
    },
  ];

  const timeline = [
    {
      year: "2017",
      title: "NABH Digital Standards",
      desc: "National Accreditation Board for Hospitals launches digital hospital standards framework, setting quality benchmarks for 6,000+ hospitals.",
    },
    {
      year: "2019",
      title: "Ayushman Bharat PM-JAY",
      desc: "World's largest health insurance scheme launched, targeting 10.74 crore vulnerable families with ₹5 lakh annual coverage.",
    },
    {
      year: "2021",
      title: "ABDM Operationalized",
      desc: "National Digital Health Mission goes live, creating India's digital health infrastructure with ABHA ID, Health Facility Registry, and Consent Manager.",
    },
    {
      year: "2023",
      title: "NHCX Beta Launch",
      desc: "National Health Authority launches NHCX beta, piloting standardised digital claim exchange with 100+ hospitals and 30+ insurers.",
    },
    {
      year: "2025",
      title: "NHCX Full Roll-out",
      desc: "NHCX goes live nationally; ABHA becomes mandatory for all government scheme claims, completing India's healthcare digitisation loop.",
    },
  ];

  const techPillars = [
    {
      icon: Brain,
      title: "AI & ML",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      points: [
        "AI-driven claim fraud detection",
        "Predictive denial management",
        "Automated ICD-10 medical coding",
        "NLP-based clinical documentation",
      ],
    },
    {
      icon: Smartphone,
      title: "Telemedicine",
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200",
      points: [
        "e-Sanjeevani 250M+ consultations",
        "Rural PHC video consultations",
        "Specialist tele-ICU services",
        "Mental health digital platforms",
      ],
    },
    {
      icon: Cpu,
      title: "IoT & Wearables",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      points: [
        "Remote patient monitoring",
        "Smart hospital bed management",
        "Continuous glucose monitors",
        "Real-time vitals dashboards",
      ],
    },
    {
      icon: Shield,
      title: "Blockchain",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      points: [
        "Immutable health record audit trails",
        "Secure consent management",
        "Drug supply chain traceability",
        "Cross-hospital data sharing",
      ],
    },
  ];

  const funding = [
    { year: "2020", label: "₹10K Cr", bar: 28 },
    { year: "2021", label: "₹17.5K Cr", bar: 50 },
    { year: "2022", label: "₹30K Cr", bar: 86 },
    { year: "2023", label: "₹23K Cr", bar: 67 },
    { year: "2024", label: "₹35K Cr", bar: 100 },
  ];

  const startups = [
    {
      name: "Online Pharmacy Platform",
      segment: "Online Pharmacy",
      valuation: "₹46,500 Cr+",
    },
    {
      name: "Doctor Discovery Platform",
      segment: "Doctor Consultation",
      valuation: "₹4,600 Cr+",
    },
    {
      name: "AI Health Platform",
      segment: "AI-Powered Care",
      valuation: "₹1,660 Cr+",
    },
    {
      name: "Diagnostics Platform",
      segment: "Diagnostics & Pharmacy",
      valuation: "₹3,700 Cr+",
    },
  ];

  return (
    <Layout>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* YouTube video background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/jh5U5BnpGN8?autoplay=1&mute=1&start=0&end=123&rel=0&modestbranding=1&playsinline=1&controls=0&loop=1&playlist=jh5U5BnpGN8"
            title="Indian Healthcare Revolution"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full"
            style={{ border: "none" }}
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 text-center">
          <div
            data-ocid="current_affairs.hero.section"
            className="animate-fade-in-up"
          >
            <Badge className="mb-4 bg-red-500 text-white border-0 animate-pulse px-4 py-1 text-xs font-semibold">
              <Radio className="w-3 h-3 mr-1.5 inline" />
              Live Updates 2025
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Current Affairs in Healthcare
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-teal-300 mb-5">
              Indian Healthcare Revolution
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Tracking the seismic shifts reshaping India's ₹9 lakh crore
              healthcare industry — from digital health IDs and AI diagnostics
              to national claims exchanges and universal coverage.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <Button
                data-ocid="current_affairs.explore.primary_button"
                onClick={() =>
                  document
                    .getElementById("revolution-drivers")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-health-teal hover:bg-health-teal/90 text-white px-6"
              >
                Explore Revolution <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                data-ocid="current_affairs.demo.secondary_button"
                asChild
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/join-network">Join the Ecosystem</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1: Stats ── */}
      <section
        ref={statsSection.ref}
        className="py-16 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-2">
              India Healthcare at a Glance
            </h2>
            <p className="text-muted-foreground text-sm">
              The numbers behind the world's most ambitious healthcare
              transformation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                started={statsSection.visible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Revolution Drivers ── */}
      <section id="revolution-drivers" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-health-blue-light text-health-blue border-0">
              Key Drivers
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              What's Powering the Revolution
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Six convergent forces transforming how 1.4 billion Indians access,
              pay for, and experience healthcare
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((d, i) => (
              <div
                key={d.title}
                data-ocid={`current_affairs.driver.card.${i + 1}`}
                className="p-6 rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white"
              >
                <div
                  className={`w-11 h-11 ${d.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <d.icon className={`w-5 h-5 ${d.color}`} />
                </div>
                <h3 className="font-semibold text-health-blue mb-2 text-sm">
                  {d.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Trending Now ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-red-100 text-red-600 border-0">
              <Radio className="w-3 h-3 mr-1 inline" /> Trending Now
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Current Affairs — Top Stories
            </h2>
            <p className="text-muted-foreground text-sm">
              The most impactful developments shaping Indian healthcare in
              2024–25
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <article
                key={n.title}
                data-ocid={`current_affairs.news.item.${i + 1}`}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${n.tagColor}`}
                  >
                    {n.tag}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {n.date}
                  </span>
                </div>
                <h3 className="font-bold text-health-blue text-sm mb-2">
                  {n.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {n.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Policy Timeline ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-health-blue-light text-health-blue border-0">
              Policy Journey
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Regulatory Milestones 2017–2025
            </h2>
            <p className="text-muted-foreground text-sm">
              Eight years that redefined India's healthcare policy landscape
            </p>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-health-blue hidden md:block" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  data-ocid={`current_affairs.timeline.item.${i + 1}`}
                  className="flex gap-6 items-start"
                >
                  <div className="shrink-0 w-[88px] text-right">
                    <span className="inline-block bg-health-blue text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {t.year}
                    </span>
                  </div>
                  <div className="relative pt-0.5">
                    <div className="absolute -left-[1.65rem] top-2 w-3 h-3 rounded-full bg-teal-400 border-2 border-white hidden md:block" />
                    <h3 className="font-semibold text-health-blue text-sm mb-1">
                      {t.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Technology Pillars ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-purple-100 text-purple-700 border-0">
              Tech Transformation
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Technology Reshaping Indian Healthcare
            </h2>
            <p className="text-muted-foreground text-sm">
              Four technology pillars driving the clinical and operational
              revolution
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techPillars.map((p, i) => (
              <div
                key={p.title}
                data-ocid={`current_affairs.tech.card.${i + 1}`}
                className={`p-5 rounded-2xl border ${p.border} ${p.bg} hover:shadow-md transition-shadow`}
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <h3 className={`font-bold text-sm mb-3 ${p.color}`}>
                  {p.title}
                </h3>
                <ul className="space-y-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-700 leading-snug">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Challenges & Opportunities ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Challenges & Opportunities
            </h2>
            <p className="text-muted-foreground text-sm">
              The two sides of India's healthcare transformation
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenges */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
              <div className="flex items-center gap-2 mb-5">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-red-700">Challenges</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Rural healthcare access gap — 65% population, 35% doctors",
                  "Doctor-patient ratio 1:1700 vs WHO norm of 1:1000",
                  "Health insurance penetration only 37%",
                  "Data privacy and cybersecurity vulnerabilities",
                  "Infrastructure gaps in tier-3 cities and districts",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span className="text-xs text-red-900 leading-relaxed">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Opportunities */}
            <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
              <div className="flex items-center gap-2 mb-5">
                <Lightbulb className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-green-700">Opportunities</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Digital health corridor connecting 1.5 lakh+ PHCs",
                  "Value-based care models driven by outcome data",
                  "Preventive health analytics from wearable & IoT data",
                  "Cross-border medical tourism — India's ₹75,000 Cr sector",
                  "PPP in healthcare infrastructure for tier-2/3 cities",
                ].map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-green-900 leading-relaxed">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Investment Ecosystem ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-green-100 text-green-700 border-0">
              Investment Landscape
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Health-Tech Funding 2020–2024
            </h2>
            <p className="text-muted-foreground text-sm">
              India's health-tech investment trajectory (₹ Crore)
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Bar chart */}
            <div
              data-ocid="current_affairs.funding.chart_point"
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="flex items-end gap-4 h-48 mb-4">
                {funding.map((f) => (
                  <div
                    key={f.year}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-xs font-bold text-health-blue">
                      {f.label}
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-health-blue to-teal-400 transition-all duration-700"
                      style={{ height: `${f.bar}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {f.year}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-health-blue" />
                <span className="text-xs text-muted-foreground">
                  Health-tech VC & PE investment in India (₹ Crore)
                </span>
              </div>
            </div>
            {/* Startup cards */}
            <div className="grid grid-cols-2 gap-4">
              {startups.map((s, i) => (
                <div
                  key={s.name}
                  data-ocid={`current_affairs.startup.card.${i + 1}`}
                  className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 bg-health-blue-light rounded-xl flex items-center justify-center mb-3">
                    <Building2 className="w-4 h-4 text-health-blue" />
                  </div>
                  <h3 className="font-bold text-health-blue text-sm">
                    {s.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.segment}
                  </p>
                  <p className="text-xs font-semibold text-teal-600 mt-2">
                    {s.valuation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: Future Outlook ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-health-blue-light text-health-blue border-0">
              2025–2030 Vision
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Future Outlook
            </h2>
            <p className="text-muted-foreground text-sm">
              Three transformative goals India is racing to achieve
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Universal Health Coverage",
                desc: "100% of India's population under some form of health financial protection by 2030, eliminating catastrophic out-of-pocket expenditure.",
                stat: "100%",
                statLabel: "Population Target",
                color: "text-blue-600",
                bg: "from-blue-50 to-white",
                border: "border-blue-100",
              },
              {
                icon: Globe,
                title: "Digital-First Healthcare",
                desc: "All government hospitals on ABDM by 2027 — interoperable records, digital prescriptions, and e-referrals as standard of care.",
                stat: "2027",
                statLabel: "Target Year",
                color: "text-teal-600",
                bg: "from-teal-50 to-white",
                border: "border-teal-100",
              },
              {
                icon: Brain,
                title: "AI-Augmented Care",
                desc: "AI integrated in 50% of diagnostic workflows by 2030 — from radiology reads to drug dispensing and surgical assistance.",
                stat: "50%",
                statLabel: "Diagnostic AI Adoption",
                color: "text-purple-600",
                bg: "from-purple-50 to-white",
                border: "border-purple-100",
              },
            ].map((v, i) => (
              <div
                key={v.title}
                data-ocid={`current_affairs.vision.card.${i + 1}`}
                className={`p-6 rounded-2xl border ${v.border} bg-gradient-to-b ${v.bg} hover:shadow-lg transition-shadow`}
              >
                <div className="text-3xl font-black text-slate-100 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <v.icon className={`w-5 h-5 ${v.color}`} />
                </div>
                <div className={`text-2xl font-black ${v.color} mb-1`}>
                  {v.stat}
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  {v.statLabel}
                </div>
                <h3 className="font-bold text-health-blue text-sm mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: AI Health Zon Fit ── */}
      <section className="py-16 bg-gradient-to-br from-health-blue to-teal-700">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Heart className="w-3 h-3 mr-1 inline" /> Platform Partnership
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            How AI Health Zon Fits Into the Revolution
          </h2>
          <p className="text-white/80 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            As India's healthcare ecosystem accelerates, hospitals need a single
            platform to stay compliant, maximise revenue, and deliver better
            patient outcomes. AI Health Zon is built precisely for this moment.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: Zap,
                label: "NHCX-Ready Claims",
                desc: "Compliant digital claim workflows",
              },
              {
                icon: Globe,
                label: "ABDM Integration",
                desc: "ABHA-linked patient records",
              },
              {
                icon: BarChart3,
                label: "Revenue Command",
                desc: "Real-time financial analytics",
              },
              {
                icon: Shield,
                label: "NABH Compliance",
                desc: "Audit-ready documentation",
              },
            ].map((f, i) => (
              <div
                key={f.label}
                data-ocid={`current_affairs.platform.card.${i + 1}`}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
              >
                <f.icon className="w-5 h-5 text-teal-300 mb-2" />
                <h3 className="text-white font-semibold text-xs mb-1">
                  {f.label}
                </h3>
                <p className="text-white/60 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
          <Button
            data-ocid="current_affairs.cta.primary_button"
            asChild
            size="lg"
            className="bg-white text-health-blue hover:bg-white/90 font-bold px-8"
          >
            <Link to="/join-network">
              Book a Free Demo <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
