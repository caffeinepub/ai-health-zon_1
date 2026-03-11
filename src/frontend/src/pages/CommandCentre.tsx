import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Award,
  Building2,
  CheckCircle2,
  Clock,
  FileCheck,
  Monitor,
  Shield,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const kpis = [
  {
    icon: FileCheck,
    label: "Total Claims",
    value: "5,00,000+",
    subtitle: "This Month",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: CheckCircle2,
    label: "Approved",
    value: "987",
    subtitle: "80% Approval Rate",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    icon: Clock,
    label: "Pending",
    value: "167",
    subtitle: "14% Under Review",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    icon: XCircle,
    label: "Rejected",
    value: "80",
    subtitle: "6% Rejection Rate",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
];

const rejectionReasons = [
  { reason: "Documentation Missing", pct: 35, color: "#dc2626" },
  { reason: "Pre-auth Issues", pct: 25, color: "#d97706" },
  { reason: "Coding Errors", pct: 20, color: "#1e40af" },
  { reason: "Eligibility Issues", pct: 15, color: "#059669" },
  { reason: "Other Reasons", pct: 5, color: "#7c3aed" },
];

const deptScores = [
  { dept: "Cardiology", score: 98, risk: "Low" },
  { dept: "Orthopedics", score: 96, risk: "Low" },
  { dept: "Oncology", score: 91, risk: "Low" },
  { dept: "Neurology", score: 88, risk: "Low" },
  { dept: "Emergency", score: 79, risk: "Medium" },
  { dept: "Gastroenterology", score: 76, risk: "Medium" },
  { dept: "General Medicine", score: 68, risk: "High" },
];

const monthlyData = [
  { month: "Jan", volume: 820, approved: 85 },
  { month: "Feb", volume: 940, approved: 88 },
  { month: "Mar", volume: 880, approved: 86 },
  { month: "Apr", volume: 1050, approved: 90 },
  { month: "May", volume: 1100, approved: 91 },
  { month: "Jun", volume: 1234, approved: 93 },
];

const riskColor: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-700",
};

const staffRoles = [
  {
    role: "Claim Command Centre Head",
    count: "1",
    responsibilities: "Overall P&L, insurer negotiations, SOP governance",
    qualification: "MBBS + MBA/MHA, 8+ years",
    icon: Award,
  },
  {
    role: "Senior Claim Manager",
    count: "2",
    responsibilities: "Escalations, complex claims, audit coordination",
    qualification: "BHMS/MBBS + coding certification, 5+ years",
    icon: Shield,
  },
  {
    role: "Medical Coding Specialists",
    count: "4–6",
    responsibilities: "ICD-10/CPT coding, DRG mapping, NHCX compliance",
    qualification: "CPC/CCS certified, clinical background",
    icon: FileCheck,
  },
  {
    role: "Pre-Auth Officers",
    count: "3–4",
    responsibilities: "Pre-authorization, eligibility check, insurer liaison",
    qualification: "Graduate + insurance training, 2+ years",
    icon: CheckCircle2,
  },
  {
    role: "Claim Submission Officers",
    count: "3–4",
    responsibilities: "Digital claim filing, NHCX portal, document management",
    qualification: "Graduate, computer proficiency",
    icon: Monitor,
  },
  {
    role: "Rejection Analysis Executive",
    count: "2",
    responsibilities: "Root cause analysis, re-submission, trend reporting",
    qualification: "Graduate, analytical skills, 2+ years",
    icon: XCircle,
  },
  {
    role: "QA / Audit Executive",
    count: "1–2",
    responsibilities: "Internal audit, compliance checks, staff training",
    qualification: "BHMS/BDS, quality management background",
    icon: Shield,
  },
  {
    role: "IT / System Support",
    count: "1",
    responsibilities: "Software maintenance, integrations, data security",
    qualification: "B.Tech/BCA, healthcare IT experience",
    icon: Monitor,
  },
];

const scalingData = [
  {
    hospitals: "2–3 Hospitals",
    model: "Centralized Hub + Liaisons",
    staffing: "1 central team + 1 liaison per hospital",
    size: "12–18 staff",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    hospitals: "4–6 Hospitals",
    model: "Regional Lead Model",
    staffing: "1 central HQ team + dedicated regional leads",
    size: "18–28 staff",
    color: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-teal-700",
  },
  {
    hospitals: "7–10 Hospitals",
    model: "Centre of Excellence (COE)",
    staffing: "Full COE model with specialized teams",
    size: "25–40 staff",
    color: "bg-indigo-50 border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700",
  },
  {
    hospitals: "10+ Hospitals",
    model: "Dedicated Division",
    staffing: "Separate Claim Command Centre division",
    size: "40+ staff",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
  },
];

const techStack = [
  "AI Health Zon Platform",
  "NHCX Integration",
  "ICD-10 Coding Software",
  "Claims Management System",
  "Real-time Dashboard",
  "Rejection Alert System",
];

function PieChart() {
  let cumAngle = 0;
  const cx = 110;
  const cy = 110;
  const r = 90;
  const innerR = 55;

  const slices = rejectionReasons.map((d) => {
    const startAngle = cumAngle;
    const sweep = (d.pct / 100) * 360;
    cumAngle += sweep;
    const endAngle = cumAngle;

    const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle - 0.1));
    const y2 = cy + r * Math.sin(toRad(endAngle - 0.1));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle - 0.1));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle - 0.1));
    const largeArc = sweep > 180 ? 1 : 0;

    const path = `M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;
    return { ...d, path, startAngle, endAngle };
  });

  return (
    <svg
      viewBox="0 0 220 220"
      className="w-full max-w-[220px] mx-auto"
      role="img"
      aria-label="Rejection reasons pie chart"
    >
      <title>Rejection Reasons Breakdown</title>
      {slices.map((slice) => (
        <path
          key={slice.reason}
          d={slice.path}
          fill={slice.color}
          stroke="white"
          strokeWidth="2"
        >
          <title>{`${slice.reason}: ${slice.pct}%`}</title>
        </path>
      ))}
      <text
        textAnchor="middle"
        x={cx}
        y={cy - 5}
        fontSize="22"
        fontWeight="800"
        fill="#1f2937"
      >
        80
      </text>
      <text textAnchor="middle" x={cx} y={cy + 12} fontSize="10" fill="#6b7280">
        Total
      </text>
      <text textAnchor="middle" x={cx} y={cy + 24} fontSize="10" fill="#6b7280">
        Rejections
      </text>
    </svg>
  );
}

function CleanClaimGauge() {
  const pct = 95;
  const r = 80;
  const cx = 110;
  const cy = 110;
  const circumference = Math.PI * r;
  const filled = (pct / 100) * circumference;

  return (
    <svg
      viewBox="0 0 220 140"
      className="w-full max-w-[220px] mx-auto"
      role="img"
      aria-label="Clean claim score gauge"
    >
      <title>Clean Claim Score: 97%</title>
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* Track */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="20"
        strokeLinecap="round"
      />
      {/* Filled */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
      />
      <text
        textAnchor="middle"
        x={cx}
        y={cy - 20}
        fontSize="32"
        fontWeight="900"
        fill="#1e40af"
      >
        {pct}%
      </text>
      <text textAnchor="middle" x={cx} y={cy - 4} fontSize="10" fill="#6b7280">
        Clean Claim Rate
      </text>
    </svg>
  );
}

export function CommandCentre() {
  const maxVol = Math.max(...monthlyData.map((d) => d.volume));

  return (
    <Layout section="command-centre">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              Live Dashboard
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Claim Command Centre
            </h1>
            <p className="text-white/70 text-lg">
              Real-time claims monitoring, rejection analytics, and financial
              intelligence — all in one powerful dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Real-Time Claim Tracking
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {kpis.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-xl p-5 border ${kpi.border} shadow-xs`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4.5 h-4.5 ${kpi.color}`} />
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${kpi.bg} ${kpi.color}`}
                    >
                      {kpi.subtitle}
                    </span>
                  </div>
                  <div className="font-heading text-3xl font-bold text-foreground">
                    {kpi.value}
                  </div>
                  <div className="text-muted-foreground text-xs mt-0.5">
                    {kpi.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Status Bar Chart */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-xs mb-8">
            <h3 className="font-heading font-bold text-foreground mb-5">
              Claim Status Distribution
            </h3>
            <div className="space-y-4">
              {[
                { label: "Approved", value: 97, color: "bg-green-500" },
                { label: "Pending", value: 1.2, color: "bg-amber-500" },
                { label: "Rejected", value: 1.8, color: "bg-red-500" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-4">
                  <span className="w-20 text-sm font-medium text-foreground shrink-0">
                    {bar.label}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                    <motion.div
                      className={`h-full ${bar.color} rounded-full flex items-center justify-end pr-3`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      <span className="text-white text-xs font-bold">
                        {bar.value}%
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rejection Analytics + Clean Claim Score */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Rejection Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-xs">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Rejection Breakdown
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <PieChart />
                <div className="flex-1 space-y-2.5">
                  {rejectionReasons.map((r) => (
                    <div
                      key={r.reason}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="text-xs text-foreground">
                          {r.reason}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        {r.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clean Claim Gauge */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-xs">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Clean Claim Score
              </h3>
              <CleanClaimGauge />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Target", value: "90%", color: "text-blue-600" },
                  { label: "Current", value: "97%", color: "text-green-600" },
                  { label: "Trend", value: "↑ 3%", color: "text-teal-600" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="text-center p-2 bg-muted/50 rounded-lg"
                  >
                    <div className={`font-bold text-lg ${m.color}`}>
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dept Scores */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-xs mb-8">
            <h3 className="font-heading font-bold text-foreground mb-5">
              Department Clean Claim Scores
            </h3>
            <div className="space-y-3">
              {deptScores.map((dept, i) => (
                <motion.div
                  key={dept.dept}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-32 text-sm font-medium shrink-0">
                    {dept.dept}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-5">
                    <motion.div
                      className={`h-full rounded-full flex items-center justify-end pr-2 ${dept.score >= 90 ? "bg-green-500" : dept.score >= 80 ? "bg-amber-500" : "bg-red-500"}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dept.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.07 }}
                    >
                      <span className="text-white text-xs font-bold">
                        {dept.score}%
                      </span>
                    </motion.div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${riskColor[dept.risk]}`}
                  >
                    {dept.risk}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trend Analysis - Line Chart SVG */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-xs">
            <h3 className="font-heading font-bold text-foreground mb-5">
              Monthly Claim Volume & Approval Rate Trend
            </h3>
            <div className="overflow-x-auto">
              <svg
                viewBox="0 0 600 200"
                className="w-full min-w-[400px]"
                role="img"
                aria-label="Monthly claim volume and approval rate trend"
              >
                <title>Monthly Claim Volume and Approval Rate Trend</title>
                <defs>
                  <linearGradient
                    id="volGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                {[0, 25, 50, 75, 100].map((v) => (
                  <line
                    key={v}
                    x1="60"
                    y1={170 - v * 1.4}
                    x2="580"
                    y2={170 - v * 1.4}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Volume Bars */}
                {monthlyData.map((d, i) => {
                  const barH = (d.volume / maxVol) * 130;
                  const x = 70 + i * 85;
                  return (
                    <g key={d.month}>
                      <rect
                        x={x}
                        y={170 - barH}
                        width="50"
                        height={barH}
                        fill="#1e40af"
                        opacity="0.2"
                        rx="3"
                      />
                      <text
                        x={x + 25}
                        y="190"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#6b7280"
                      >
                        {d.month}
                      </text>
                      <text
                        x={x + 25}
                        y={170 - barH - 4}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#1e40af"
                        fontWeight="600"
                      >
                        {d.volume}
                      </text>
                    </g>
                  );
                })}

                {/* Approval Rate Line */}
                {(() => {
                  const pts = monthlyData.map(
                    (d, i) => `${70 + i * 85 + 25},${170 - d.approved * 1.4}`,
                  );
                  return (
                    <>
                      <polyline
                        points={pts.join(" ")}
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {monthlyData.map((d, i) => (
                        <g key={`pt-${d.month}`}>
                          <circle
                            cx={70 + i * 85 + 25}
                            cy={170 - d.approved * 1.4}
                            r="4"
                            fill="#0d9488"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <text
                            x={70 + i * 85 + 25}
                            y={170 - d.approved * 1.4 - 8}
                            textAnchor="middle"
                            fontSize="9"
                            fill="#0d9488"
                            fontWeight="700"
                          >
                            {d.approved}%
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}

                {/* Legend */}
                <rect
                  x="380"
                  y="10"
                  width="12"
                  height="10"
                  fill="#1e40af"
                  opacity="0.2"
                  rx="2"
                />
                <text x="396" y="19" fontSize="10" fill="#6b7280">
                  Claim Volume
                </text>
                <line
                  x1="460"
                  y1="15"
                  x2="472"
                  y2="15"
                  stroke="#0d9488"
                  strokeWidth="2.5"
                />
                <circle cx="466" cy="15" r="3" fill="#0d9488" />
                <text x="476" y="19" fontSize="10" fill="#6b7280">
                  Approval Rate %
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Department Risk Index */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Department Risk Index
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-health-blue text-white">
                  <th className="p-4 text-left text-sm font-semibold">
                    Department
                  </th>
                  <th className="p-4 text-center text-sm font-semibold">
                    Claim Volume
                  </th>
                  <th className="p-4 text-center text-sm font-semibold">
                    Rejection Rate
                  </th>
                  <th className="p-4 text-center text-sm font-semibold">
                    Clean Claim Score
                  </th>
                  <th className="p-4 text-center text-sm font-semibold">
                    Risk Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    dept: "Cardiology",
                    vol: 245,
                    rejRate: "2%",
                    score: 98,
                    risk: "Low",
                  },
                  {
                    dept: "Orthopedics",
                    vol: 198,
                    rejRate: "4%",
                    score: 96,
                    risk: "Low",
                  },
                  {
                    dept: "Oncology",
                    vol: 156,
                    rejRate: "9%",
                    score: 91,
                    risk: "Low",
                  },
                  {
                    dept: "Neurology",
                    vol: 134,
                    rejRate: "12%",
                    score: 88,
                    risk: "Low",
                  },
                  {
                    dept: "Emergency",
                    vol: 312,
                    rejRate: "21%",
                    score: 79,
                    risk: "Medium",
                  },
                  {
                    dept: "Gastroenterology",
                    vol: 89,
                    rejRate: "24%",
                    score: 76,
                    risk: "Medium",
                  },
                  {
                    dept: "General Medicine",
                    vol: 100,
                    rejRate: "32%",
                    score: 68,
                    risk: "High",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.dept}
                    className={`border-t border-border ${i % 2 === 0 ? "bg-white" : "bg-muted/20"}`}
                  >
                    <td className="p-4 text-sm font-medium">{row.dept}</td>
                    <td className="p-4 text-sm text-center text-muted-foreground">
                      {row.vol}
                    </td>
                    <td className="p-4 text-sm text-center text-red-600 font-medium">
                      {row.rejRate}
                    </td>
                    <td className="p-4 text-sm text-center font-semibold text-foreground">
                      {row.score}%
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${riskColor[row.risk]}`}
                      >
                        {row.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
           STAFF REQUIREMENTS FOR CENTRALIZED CLAIM COMMAND CENTRE
           ============================================================ */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.97 0.015 220) 0%, oklch(0.99 0.008 180) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Chain Hospital Setup Guide
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Staff Requirements for Centralized
              <span className="block text-health-blue">
                Claim Command Centre
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete staffing blueprint for chain hospitals looking to build
              a centralized claim command centre to manage insurance claims
              across all branches from a single hub.
            </p>
          </motion.div>

          {/* Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
          >
            {[
              {
                icon: Users,
                label: "Total Recommended Staff",
                value: "15–25",
                sub: "per 500 beds",
                color: "text-blue-600",
                bg: "bg-blue-50",
                border: "border-blue-200",
              },
              {
                icon: Clock,
                label: "Coverage",
                value: "24 × 7",
                sub: "in 3 rotating shifts",
                color: "text-teal-600",
                bg: "bg-teal-50",
                border: "border-teal-200",
              },
              {
                icon: Building2,
                label: "Reporting",
                value: "Centralized",
                sub: "to hospital HQ",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                border: "border-indigo-200",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-2xl p-6 border ${card.border} shadow-sm flex items-start gap-4`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <div>
                    <div
                      className={`font-heading text-2xl font-bold ${card.color}`}
                    >
                      {card.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {card.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {card.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Staff Roles Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-10"
            data-ocid="staff.table"
          >
            <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-blue-600 to-teal-600">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-white" />
                <h3 className="font-heading text-lg font-bold text-white">
                  Staff Role Matrix — Per 500 Beds
                </h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-border">
                    <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Role
                    </th>
                    <th className="p-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Count
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Key Responsibilities
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Required Qualification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {staffRoles.map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <tr
                        key={row.role}
                        className={`border-b border-border last:border-0 transition-colors hover:bg-blue-50/50 ${
                          i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              {row.role}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center justify-center min-w-[40px] px-3 py-1 rounded-full text-sm font-bold bg-teal-100 text-teal-700">
                            {row.count}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground max-w-[260px]">
                          {row.responsibilities}
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                            {row.qualification}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Shift Structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-health-blue" />
              Shift Structure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  shift: "Morning Shift",
                  time: "8:00 AM – 4:00 PM",
                  desc: "Full team deployment. Peak volume processing, pre-auth approvals, and insurer coordination.",
                  color: "from-amber-400 to-orange-400",
                  bg: "bg-amber-50",
                  border: "border-amber-200",
                  textColor: "text-amber-700",
                  badgeBg: "bg-amber-100",
                },
                {
                  shift: "Evening Shift",
                  time: "4:00 PM – 12:00 AM",
                  desc: "Claim submission team, follow-up on pending approvals, documentation review.",
                  color: "from-blue-400 to-indigo-400",
                  bg: "bg-blue-50",
                  border: "border-blue-200",
                  textColor: "text-blue-700",
                  badgeBg: "bg-blue-100",
                },
                {
                  shift: "Night Shift",
                  time: "12:00 AM – 8:00 AM",
                  desc: "Emergency pre-authorization requests, urgent claim submissions, overnight monitoring.",
                  color: "from-indigo-500 to-purple-500",
                  bg: "bg-indigo-50",
                  border: "border-indigo-200",
                  textColor: "text-indigo-700",
                  badgeBg: "bg-indigo-100",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.shift}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`bg-white rounded-2xl border ${s.border} overflow-hidden shadow-sm`}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />
                  <div className="p-5">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.badgeBg} ${s.textColor} mb-3`}
                    >
                      <Clock className="w-3 h-3" />
                      {s.time}
                    </div>
                    <h4 className="font-heading font-bold text-foreground mb-2">
                      {s.shift}
                    </h4>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chain Hospital Scaling Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-10"
            data-ocid="staff.scaling_table"
          >
            <div className="px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-health-blue" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    Scaling Model for Chain Hospitals
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    How your Claim Command Centre grows with your hospital
                    network
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-border">
                    <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Network Size
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Operating Model
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Staffing Structure
                    </th>
                    <th className="p-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Recommended Size
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scalingData.map((row, i) => (
                    <tr
                      key={row.hospitals}
                      className={`border-b border-border last:border-0 hover:bg-blue-50/40 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${row.color}`}
                        >
                          {row.hospitals}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-semibold text-foreground">
                        {row.model}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {row.staffing}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${row.badge}`}
                        >
                          {row.size}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-10"
          >
            <div className="flex items-center gap-2 mb-5">
              <Monitor className="w-5 h-5 text-health-blue" />
              <h3 className="font-heading text-lg font-bold text-foreground">
                Key Technology Stack for Staff
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-teal-100 transition-colors cursor-default"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 p-8 sm:p-12 text-center shadow-xl"
          >
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 rounded-full text-white/90 text-xs font-semibold mb-5 uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                Chain Hospital Special
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to set up your Claim Command Centre?
              </h3>
              <p className="text-white/75 text-base max-w-xl mx-auto mb-8">
                Our experts will help you design the ideal staffing structure,
                technology setup, and SOPs tailored to your hospital network.
              </p>
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = "/contact";
                }}
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-ocid="staff.cta_button"
              >
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
