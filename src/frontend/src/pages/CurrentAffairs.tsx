import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Building,
  Building2,
  CheckCircle2,
  Cpu,
  Globe,
  Heart,
  Landmark,
  Lightbulb,
  Radio,
  Shield,
  Smartphone,
  Star,
  Target,
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

  // ── Section A: 6-Pillar Transformation Framework
  const transformationPillars = [
    {
      num: "01",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50",
      title: "Primary Care Strengthening",
      desc: "Building India's frontline health defence through extensive community-level infrastructure.",
      points: [
        "1.5 lakh+ Health & Wellness Centres operational",
        "10 lakh ASHA workers as community health linchpins",
        "PM-ABHIM primary care expansion across rural India",
        "Community Health Officer deployment at sub-centre level",
      ],
    },
    {
      num: "02",
      icon: Globe,
      color: "text-teal-600",
      bg: "bg-teal-50",
      title: "Integrated Care Networks",
      desc: "Seamless patient journeys from village health centres to apex hospitals via structured referral chains.",
      points: [
        "Ayushman Arogya Mandir hubs anchoring local networks",
        "PHC → District Hospital → Tertiary referral linkage",
        "Chronic disease management programmes (DM, HTN, Cancer)",
        "Continuity of care enabled by universal ABHA linkage",
      ],
    },
    {
      num: "03",
      icon: Cpu,
      color: "text-blue-600",
      bg: "bg-blue-50",
      title: "Digital Health Infrastructure",
      desc: "A nationally interoperable digital backbone connecting every facility, clinician and patient.",
      points: [
        "ABDM interoperability layer enabling data exchange",
        "ABHA ID universal adoption — 500M+ registered",
        "NHCX standardising health insurance claims exchange",
        "e-Sanjeevani telemedicine — 250M+ consultations delivered",
      ],
    },
    {
      num: "04",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
      title: "Health Financing Reform",
      desc: "Shifting India toward strategic purchasing and blended financing to close coverage gaps.",
      points: [
        "PM-JAY: ₹5 lakh/family/year for 55 Cr beneficiaries",
        "State schemes — RGHS, Chiranjeevi, MAA complementing central cover",
        "Blended public-private financing models being piloted",
        "DRG-based payment systems under active development",
      ],
    },
    {
      num: "05",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      title: "Healthcare Workforce Development",
      desc: "Addressing critical skill gaps to staff a modernised, expanded health system.",
      points: [
        "NMC reforms standardising medical education quality",
        "PM-AYUSH Mission expanding alternative medicine practitioners",
        "22 new AIIMS — doubling apex training capacity",
        "Community health workforce training addressing nursing shortfalls",
      ],
    },
    {
      num: "06",
      icon: Star,
      color: "text-amber-600",
      bg: "bg-amber-50",
      title: "Quality & Patient Safety",
      desc: "Raising the bar on clinical standards, accreditation, and patient-centred outcomes.",
      points: [
        "NABH accreditation surge — 3,200+ hospitals certified",
        "NQAS certification for public health facilities",
        "Clinical audit mandates under PM-JAY empanelment",
        "Zero-tolerance policies for preventable medical errors",
      ],
    },
  ];

  // ── Section B: 4-Tier Health Architecture
  const healthTiers = [
    {
      level: "1",
      name: "Primary Care",
      gradientFrom: "from-teal-500",
      gradientTo: "to-teal-400",
      borderColor: "border-teal-300",
      stats: [
        "1.5L+ Health & Wellness Centres",
        "10L+ ASHA Workers",
        "Sub-Centres & PHCs",
      ],
      focus: "Prevention, wellness & early detection",
    },
    {
      level: "2",
      name: "Secondary Care",
      gradientFrom: "from-blue-500",
      gradientTo: "to-teal-500",
      borderColor: "border-blue-300",
      stats: [
        "800+ District Hospitals",
        "Community Health Centres",
        "Sub-district Hospitals",
      ],
      focus: "Essential surgeries, specialist OPD, diagnostics",
    },
    {
      level: "3",
      name: "Tertiary Care",
      gradientFrom: "from-blue-700",
      gradientTo: "to-blue-500",
      borderColor: "border-blue-500",
      stats: [
        "22 AIIMS + 700+ Medical Colleges",
        "Apex Specialty Hospitals",
        "Research & Teaching Institutions",
      ],
      focus: "Super-speciality, research & clinical teaching",
    },
    {
      level: "4",
      name: "Digital Layer (ABDM)",
      gradientFrom: "from-health-blue",
      gradientTo: "to-blue-800",
      borderColor: "border-health-blue",
      stats: [
        "ABHA Universal Health ID",
        "NHCX Claims Exchange",
        "HIE + Consent Manager",
      ],
      focus: "Seamless referral, interoperability & claims",
    },
  ];

  // ── Section C: Value-Based Healthcare
  const outcomeMetrics = [
    {
      indicator: "Maternal Mortality Rate",
      current: "97/lakh",
      target: "<70",
      unit: "live births",
    },
    {
      indicator: "Under-5 Mortality Rate",
      current: "32/1000",
      target: "<25",
      unit: "",
    },
    {
      indicator: "TB Incidence (per lakh)",
      current: "199",
      target: "<10",
      unit: "End TB goal",
    },
    {
      indicator: "Health Insurance Coverage",
      current: "37%",
      target: "70%+",
      unit: "",
    },
    {
      indicator: "Clean Claim Rate (NHCX)",
      current: "78%",
      target: "95%+",
      unit: "",
    },
    {
      indicator: "Digital Health Adoption",
      current: "43%",
      target: "80%+",
      unit: "",
    },
  ];

  const paymentReforms = [
    {
      icon: Target,
      title: "Package-Based Payment",
      desc: "PM-JAY and NHCX standardised procedure rates reducing per-treatment cost variance and eliminating over-billing across empanelled hospitals.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Outcome-Linked Incentives",
      desc: "State-level Pay-for-Performance pilots tying provider reimbursement to measurable health outcomes — maternal health, diabetes control, surgical success rates.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Users,
      title: "Capitation Models",
      desc: "Primary care capitation under Ayushman Arogya Mandir for enrolled population, incentivising preventive care over episodic high-cost treatment.",
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  // ── Section D: Governance Architecture
  const governanceCards = [
    {
      icon: Landmark,
      abbr: "MoHFW",
      title: "Ministry of Health & Family Welfare",
      role: "National policy, planning & programme oversight",
      responsibilities: [
        "National Health Policy (NHP 2017)",
        "National Health Mission (NHM)",
        "AIIMS network oversight & expansion",
        "PM-ABHIM implementation authority",
      ],
      key: "NDHM · PM-ABHIM · NHM",
    },
    {
      icon: Shield,
      abbr: "NHA",
      title: "National Health Authority",
      role: "PM-JAY implementation, ABDM & NHCX operations",
      responsibilities: [
        "55 Cr PM-JAY beneficiary enrolment",
        "ABHA 500M+ digital health ID issuance",
        "ABDM ecosystem governance",
        "NHCX national claims exchange operations",
      ],
      key: "PM-JAY · ABDM · NHCX",
    },
    {
      icon: Building,
      abbr: "IRDAI",
      title: "Insurance Regulatory & Development Authority",
      role: "Health insurance regulation & TPA oversight",
      responsibilities: [
        "Standard Health Cover mandate (Arogya Sanjeevani)",
        "Claim turnaround time regulation (3-hr cashless)",
        "TPA licensing and performance monitoring",
        "NHCX integration requirements for insurers",
      ],
      key: "Standard Cover · TPA Regulation · NHCX",
    },
    {
      icon: Building2,
      abbr: "SHA / SAST",
      title: "State Health Agencies",
      role: "State-level scheme implementation & empanelment",
      responsibilities: [
        "PM-JAY State Health Agency (SHA) operations",
        "State-specific scheme management",
        "Hospital empanelment & quality monitoring",
        "Grievance redressal for scheme beneficiaries",
      ],
      key: "RGHS (Rajasthan) · Chiranjeevi (Gujarat) · MAA (MP)",
    },
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

      {/* ══════════════════════════════════════════════════════════
           NEW SECTION A: National Health System Transformation
         ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50" data-ocid="transformation.section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-teal-100 text-teal-700 border-0 text-xs font-semibold">
              McKinsey Framework | Indian Context
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Transforming India's National Health System
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Six interdependent pillars driving India's transition from a
              fragmented, under-resourced system to an integrated,
              digitally-enabled national health platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {transformationPillars.map((p, i) => (
              <div
                key={p.num}
                data-ocid={`transformation.pillar.card.${i + 1}`}
                className={`p-7 bg-white hover:bg-slate-50 transition-colors group ${
                  i < 3 ? "border-b border-slate-100" : ""
                } ${i % 3 !== 2 ? "lg:border-r border-slate-100" : ""} ${
                  i % 2 === 0
                    ? "md:border-r border-slate-100 lg:border-r-0"
                    : ""
                } ${i % 3 !== 2 ? "lg:border-r border-slate-100" : ""}`}
              >
                {/* Number badge */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors leading-none select-none">
                    {p.num}
                  </span>
                  <div
                    className={`w-10 h-10 ${p.bg} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <p.icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                </div>
                <h3 className="font-bold text-health-blue text-sm mb-1.5">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                  {p.desc}
                </p>
                <div className="border-t border-slate-100 pt-4 space-y-1.5">
                  {p.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 text-teal-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-600 leading-snug">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
           NEW SECTION B: 4-Tier Health System Architecture
         ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" data-ocid="architecture.section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-blue-100 text-blue-700 border-0 text-xs font-semibold">
              System Design
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              India's Integrated Health System Architecture
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              A four-tier care continuum — from community health workers to apex
              national institutes — unified by India's digital health backbone
            </p>
          </div>

          {/* Desktop: horizontal connected flow */}
          <div className="hidden lg:flex items-stretch gap-0">
            {healthTiers.map((tier, i) => (
              <div key={tier.name} className="flex items-stretch flex-1">
                <div
                  data-ocid={`architecture.tier.card.${i + 1}`}
                  className={`flex-1 rounded-2xl overflow-hidden border-2 ${tier.borderColor} flex flex-col`}
                >
                  {/* Gradient header */}
                  <div
                    className={`bg-gradient-to-r ${tier.gradientFrom} ${tier.gradientTo} p-5 text-white`}
                  >
                    <div className="text-3xl font-black opacity-30 mb-1">
                      T{tier.level}
                    </div>
                    <h3 className="font-bold text-sm">{tier.name}</h3>
                  </div>
                  {/* Body */}
                  <div className="p-5 bg-white flex-1 flex flex-col">
                    <div className="space-y-2 mb-4 flex-1">
                      {tier.stats.map((s) => (
                        <div key={s} className="flex items-start gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                          <span className="text-xs text-slate-700 leading-snug">
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <span className="text-xs text-muted-foreground italic">
                        {tier.focus}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Arrow between tiers */}
                {i < healthTiers.length - 1 && (
                  <div className="flex items-center px-2 shrink-0">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="w-5 h-5 text-slate-400"
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="lg:hidden space-y-4">
            {healthTiers.map((tier, i) => (
              <div
                key={tier.name}
                data-ocid={`architecture.tier.card.${i + 1}`}
                className={`rounded-2xl overflow-hidden border-2 ${tier.borderColor}`}
              >
                <div
                  className={`bg-gradient-to-r ${tier.gradientFrom} ${tier.gradientTo} p-4 text-white flex items-center gap-3`}
                >
                  <span className="text-2xl font-black opacity-30">
                    T{tier.level}
                  </span>
                  <h3 className="font-bold text-sm">{tier.name}</h3>
                </div>
                <div className="p-4 bg-white">
                  <div className="space-y-1.5 mb-3">
                    {tier.stats.map((s) => (
                      <div key={s} className="flex items-start gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                        <span className="text-xs text-slate-700">{s}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    {tier.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ABDM connector note */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-health-blue/5 to-teal-50 border border-teal-100 text-center">
            <BookOpen className="w-5 h-5 text-teal-600 inline mr-2 mb-1" />
            <span className="text-sm text-health-blue font-semibold">
              ABDM Digital Layer
            </span>
            <span className="text-sm text-muted-foreground">
              {" "}
              connects all four tiers via ABHA universal health ID, NHCX claims
              exchange, Health Information Exchange (HIE), and consent manager —
              enabling seamless referral, longitudinal records, and real-time
              claims across the entire care continuum.
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Revolution Drivers ── */}
      <section id="revolution-drivers" className="py-16 bg-slate-50">
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
      <section className="py-16 bg-white">
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
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow"
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
      <section className="py-16 bg-slate-50">
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
      <section className="py-16 bg-white">
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
      <section className="py-16 bg-slate-50">
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

      {/* ══════════════════════════════════════════════════════════
           NEW SECTION C: Value-Based Healthcare Outcomes
         ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" data-ocid="value_based.section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-green-100 text-green-700 border-0 text-xs font-semibold">
              Outcomes & Quality
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-health-blue mb-3">
              Driving Value-Based Healthcare Outcomes
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              India's shift from volume-based to value-based healthcare — tying
              provider payment to patient outcomes, quality, and efficiency
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Outcome Metrics Table */}
            <div
              data-ocid="value_based.metrics.table"
              className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="bg-health-blue text-white px-6 py-4">
                <h3 className="font-bold text-sm">
                  Health Outcome Indicators — India 2025 vs 2030 Target
                </h3>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-slate-600 font-semibold">
                      Indicator
                    </th>
                    <th className="text-center px-3 py-3 text-slate-600 font-semibold">
                      Current
                    </th>
                    <th className="text-center px-3 py-3 text-green-700 font-semibold">
                      Target 2030
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {outcomeMetrics.map((m, i) => (
                    <tr
                      key={m.indicator}
                      data-ocid={`value_based.metrics.row.${i + 1}`}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-4 py-3 text-slate-700 font-medium leading-snug">
                        {m.indicator}
                        {m.unit && (
                          <span className="text-slate-400 font-normal ml-1">
                            ({m.unit})
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center text-slate-500 font-semibold tabular-nums">
                        {m.current}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-block bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                          {m.target}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Reform Cards */}
            <div className="space-y-5">
              <h3 className="font-bold text-health-blue text-sm mb-1">
                Payment System Reforms Driving the Shift
              </h3>
              {paymentReforms.map((r, i) => (
                <div
                  key={r.title}
                  data-ocid={`value_based.reform.card.${i + 1}`}
                  className="p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 ${r.bg} rounded-xl flex items-center justify-center shrink-0`}
                    >
                      <r.icon className={`w-5 h-5 ${r.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-health-blue text-sm mb-1.5">
                        {r.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
           NEW SECTION D: Governance Architecture (dark band)
         ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-900" data-ocid="governance.section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-white/10 text-teal-300 border-white/20 text-xs font-semibold">
              Policy & Regulation
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Healthcare Governance Architecture
            </h2>
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              India's multi-layer health governance structure — from central
              ministry to state health agencies — that shapes policy, financing,
              and digital infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {governanceCards.map((g, i) => (
              <div
                key={g.abbr}
                data-ocid={`governance.body.card.${i + 1}`}
                className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-6 flex flex-col"
              >
                {/* Icon + Abbr */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <g.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <span className="font-black text-teal-300 text-sm">
                    {g.abbr}
                  </span>
                </div>
                <h3 className="font-bold text-white text-xs mb-1.5 leading-snug">
                  {g.title}
                </h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">
                  {g.role}
                </p>
                {/* Responsibilities */}
                <div className="flex-1 space-y-1.5 mb-4">
                  {g.responsibilities.map((r) => (
                    <div key={r} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-teal-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-white/70 leading-snug">
                        {r}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Key programmes */}
                <div className="border-t border-white/10 pt-3">
                  <span className="text-xs text-teal-300/80 font-medium">
                    {g.key}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-white" data-ocid="mission_vision.section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-teal-100 text-teal-700 border-0">
              Our Purpose
            </Badge>
            <h2 className="font-playfair text-4xl font-bold text-slate-900 mb-4">
              Mission &amp; Vision
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              The principles guiding AI Health Zon&apos;s commitment to
              transforming Indian healthcare revenue management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="pl-6 border-l-4 border-teal-500">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-slate-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Transforming hospital revenue integrity for every Indian patient
                — eliminating claim leakage, automating compliance, and
                empowering healthcare administrators with intelligent revenue
                tools.
              </p>
              <ul className="space-y-3">
                {[
                  "Zero-touch claim automation for Indian hospitals",
                  "NABH & NHCX regulatory compliance at scale",
                  "Intelligent denial prevention & revenue recovery",
                  "Empowering 1,000+ hospitals by 2030",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Vision */}
            <div className="pl-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-slate-900">
                  Our Vision
                </h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                A fully digital, financially sustainable Indian healthcare
                ecosystem by 2030 — where every hospital claim is clean, every
                patient record is connected, and every rupee of healthcare
                investment delivers maximum impact.
              </p>
              <ul className="space-y-3">
                {[
                  "₹15,000 Cr claim leakage crisis — eliminated",
                  "Universal ABHA-linked patient financial records",
                  "Outcome-linked payment models across India",
                  "AI-powered revenue intelligence for every hospital",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Future Prospective for Hospitals 2025–2030 ── */}
      <section
        className="py-20 bg-slate-900"
        data-ocid="future_prospective.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-teal-900/60 text-teal-300 border-0">
              2025–2030 Outlook
            </Badge>
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              Future Prospective for Hospitals
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Four transformative shifts that will redefine hospital revenue
              management in India over the next five years.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                num: "01",
                title: "AI-Driven Claim Automation",
                desc: "95%+ clean claim rates, zero-touch processing, and real-time NHCX adjudication will become the baseline standard for forward-looking Indian hospitals.",
                icon: <Brain className="w-6 h-6 text-teal-400" />,
                highlights: [
                  "Zero-touch claim processing",
                  "Real-time NHCX adjudication",
                  "AI denial prediction engine",
                ],
              },
              {
                num: "02",
                title: "Value-Based Care Contracts",
                desc: "Outcome-linked payment models, PM-JAY 2.0 packages, and capitation contracts will reshape financial incentives for tier-2 and tier-3 hospitals across India.",
                icon: <TrendingUp className="w-6 h-6 text-teal-400" />,
                highlights: [
                  "PM-JAY 2.0 package optimization",
                  "Capitation models for smaller hospitals",
                  "Outcome-linked payment reforms",
                ],
              },
              {
                num: "03",
                title: "ABDM/NHCX Full Integration",
                desc: "ABHA-linked patient journeys, unified Health Information Exchange, and seamless insurer connectivity will become mandatory for accredited hospitals.",
                icon: <Globe className="w-6 h-6 text-teal-400" />,
                highlights: [
                  "Universal ABHA patient linking",
                  "Unified HIE connectivity",
                  "Insurer API integration",
                ],
              },
              {
                num: "04",
                title: "Revenue Intelligence Platforms",
                desc: "Predictive analytics, department-level P&L dashboards, and AI-powered denial prevention will give hospital leadership unprecedented financial visibility.",
                icon: <BarChart3 className="w-6 h-6 text-teal-400" />,
                highlights: [
                  "Predictive revenue analytics",
                  "Department-level P&L reporting",
                  "AI-powered denial prevention",
                ],
              },
            ].map((card) => (
              <div
                key={card.num}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-teal-500/50 transition-colors"
                data-ocid={`future_prospective.card.${card.num}`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="font-playfair text-4xl font-bold text-teal-500/30 leading-none">
                    {card.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {card.icon}
                      <h3 className="font-playfair text-xl font-bold text-white">
                        {card.title}
                      </h3>
                    </div>
                    <div className="h-0.5 bg-teal-500/30 w-12 mb-4" />
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 pl-2">
                  {card.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                      <span className="text-slate-300 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How AI Health Zon Is Creating Impact ── */}
      <section className="py-20 bg-white" data-ocid="impact.section">
        {/* Stats Band */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 py-10 mb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { value: "5,00,000+", label: "Claims Processed" },
                { value: "97%", label: "Clean Claim Rate" },
                { value: "<2%", label: "Rejection Rate" },
                { value: "200+", label: "Hospitals Onboarded" },
                { value: "₹500Cr+", label: "Revenue Recovered" },
              ].map((stat) => (
                <div key={stat.label} data-ocid={"impact.stat.card"}>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-teal-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Editorial Content */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-teal-100 text-teal-700 border-0">
              Platform Impact
            </Badge>
            <h2 className="font-playfair text-4xl font-bold text-slate-900 mb-4">
              How AI Health Zon Is Creating Impact
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="border-l-2 border-teal-200 pl-6">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-slate-900 mb-3">
                Reducing Claim Rejections &amp; Leakage
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Indian hospitals lose an estimated ₹15,000 Cr annually to claim
                leakage, errors, and rejections. AI Health Zon&apos;s
                intelligent claim validation engine has helped 200+ hospitals
                slash rejection rates below 2%, recovering millions in revenue
                that would otherwise be written off.
              </p>
            </div>
            <div className="border-l-2 border-teal-200 pl-6">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-slate-900 mb-3">
                NABH &amp; NHCX Regulatory Readiness
              </h3>
              <p className="text-slate-600 leading-relaxed">
                With NABH accreditation becoming non-negotiable and NHCX
                integration mandated for TPA settlements, AI Health Zon provides
                hospitals with automated compliance dashboards, audit trails,
                and NHCX-ready claim workflows — making regulatory readiness
                seamless rather than stressful.
              </p>
            </div>
            <div className="border-l-2 border-teal-200 pl-6">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-slate-900 mb-3">
                AI-Powered Revenue Management
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Beyond claim processing, AI Health Zon is building the future of
                hospital financial intelligence in India — with predictive
                analytics, department-level P&amp;L dashboards, and AI-driven
                denial prevention that turns reactive billing teams into
                proactive revenue strategists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visionary Impact: Amit Mansingh ── */}
      <section className="py-20 bg-slate-50" data-ocid="founder_vision.section">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-blue-100 text-blue-700 border-0">
              Leadership Vision
            </Badge>
            <h2 className="font-playfair text-4xl font-bold text-slate-900 mb-4">
              Visionary Impact
            </h2>
            <p className="text-slate-500 text-lg">
              The mind behind India&apos;s most ambitious healthcare revenue
              platform
            </p>
          </div>
          {/* Founder Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3">
              {/* Left: Photo + Basic Info */}
              <div className="bg-gradient-to-b from-teal-600 to-teal-800 p-10 flex flex-col items-center justify-center text-center">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/30 mb-5 shadow-lg">
                  <img
                    src="/assets/generated/amit-mansingh-founder.dim_400x400.jpg"
                    alt="Amit Mansingh Saini"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-playfair text-xl font-bold text-white mb-1">
                  Amit Mansingh Saini
                </h3>
                <p className="text-teal-200 text-sm mb-5 leading-snug">
                  Founder &amp; CEO
                  <br />
                  Triple Top Pattern Health Pvt. Ltd.
                </p>
                <a
                  href="https://www.linkedin.com/in/amit-mansingh-saini-7445a516/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="founder_vision.linkedin.button"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#0077B5" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-label="LinkedIn"
                    role="img"
                  >
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
              {/* Right: Bio + Vision Pillars */}
              <div className="md:col-span-2 p-10">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-slate-500 ml-1">
                    15+ Years in Healthcare Revenue Management
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-8 text-base">
                  With over 15 years in hospital revenue management, NABH
                  accreditation, and healthcare technology, Amit Mansingh Saini
                  founded AI Health Zon to solve the ₹15,000 Cr annual claim
                  leakage crisis in Indian hospitals. A recognized thought
                  leader in NHCX/ABDM integration, he has guided 200+ hospitals
                  through digital revenue transformation. His vision:{" "}
                  <em className="text-teal-700 font-semibold not-italic">
                    every Indian hospital should be financially empowered,
                    compliant, and future-ready.
                  </em>
                </p>
                {/* Vision Pillars */}
                <h4 className="font-playfair text-lg font-bold text-slate-900 mb-4">
                  Vision Pillars
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Zero Claim Leakage",
                      icon: <Shield className="w-4 h-4 text-teal-600" />,
                    },
                    {
                      label: "Digital Revenue Intelligence",
                      icon: <BarChart3 className="w-4 h-4 text-teal-600" />,
                    },
                    {
                      label: "NABH &amp; NHCX Excellence",
                      icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
                    },
                    {
                      label: "Patient-Centric Finance",
                      icon: <Heart className="w-4 h-4 text-teal-600" />,
                    },
                  ].map((pillar) => (
                    <div
                      key={pillar.label}
                      className="flex items-center gap-3 bg-teal-50 rounded-xl px-4 py-3 border border-teal-100"
                    >
                      {pillar.icon}
                      <span className="text-slate-700 text-sm font-medium">
                        {pillar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
