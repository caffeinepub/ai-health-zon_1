import { Layout } from "@/components/layout/Layout";
import { CheckCircle2, Clock, FileCheck, XCircle } from "lucide-react";
import { motion } from "motion/react";

const kpis = [
  {
    icon: FileCheck,
    label: "Total Claims",
    value: "1,234",
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
      <title>Clean Claim Score: 95%</title>
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
                { label: "Approved", value: 80, color: "bg-green-500" },
                { label: "Pending", value: 14, color: "bg-amber-500" },
                { label: "Rejected", value: 6, color: "bg-red-500" },
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
                  { label: "Current", value: "95%", color: "text-green-600" },
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
    </Layout>
  );
}
