import { useEffect, useRef, useState } from "react";

const heroImg = "/assets/generated/investor-pitch-hero.dim_1600x700.jpg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
}: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── ARR Bar Chart ─────────────────────────────────────────────────────────────
function ARRChart() {
  const { ref, visible } = useReveal();
  const data = [
    { label: "FY26", value: 5, max: 150 },
    { label: "FY27", value: 18, max: 150 },
    { label: "FY28", value: 45, max: 150 },
    { label: "FY29", value: 90, max: 150 },
    { label: "FY30", value: 150, max: 150 },
  ];
  const W = 500;
  const H = 220;
  const pad = { l: 50, r: 20, t: 20, b: 40 };
  const barW = 60;
  const gap = (W - pad.l - pad.r - barW * data.length) / (data.length - 1);
  return (
    <div ref={ref} className="overflow-x-auto">
      <svg
        role="img"
        aria-label="Chart"
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-xl mx-auto"
      >
        {data.map((d, i) => {
          const barH = visible ? (d.value / d.max) * (H - pad.t - pad.b) : 0;
          const x = pad.l + i * (barW + gap);
          const y = H - pad.b - barH;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill="#0D7377"
                rx="4"
                style={{ transition: "height 1s ease, y 1s ease" }}
              />
              <text
                x={x + barW / 2}
                y={H - pad.b + 16}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                {d.label}
              </text>
              {visible && (
                <text
                  x={x + barW / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#0D7377"
                >
                  ₹{d.value}Cr
                </text>
              )}
            </g>
          );
        })}
        {[0, 50, 100, 150].map((v) => {
          const yy = H - pad.b - (v / 150) * (H - pad.t - pad.b);
          return (
            <g key={v}>
              <line
                x1={pad.l - 4}
                x2={W - pad.r}
                y1={yy}
                y2={yy}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x={pad.l - 8}
                y={yy + 4}
                textAnchor="end"
                fontSize="9"
                fill="#94a3b8"
              >
                ₹{v}Cr
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Line Chart ────────────────────────────────────────────────────────────────
function ClaimLineChart() {
  const { ref, visible } = useReveal();
  const W = 500;
  const H = 200;
  const pad = { l: 40, r: 20, t: 20, b: 36 };
  const years = ["FY26", "FY27", "FY28", "FY29", "FY30"];
  const aiHz = [72, 78, 85, 91, 97];
  const indHz = [72, 72, 72, 72, 72];
  const minY = 65;
  const maxY = 100;
  const xOf = (i: number) =>
    pad.l + (i / (years.length - 1)) * (W - pad.l - pad.r);
  const yOf = (v: number) =>
    H - pad.b - ((v - minY) / (maxY - minY)) * (H - pad.t - pad.b);
  const pathD = (pts: number[]) =>
    pts.map((v, i) => `${i === 0 ? "M" : "L"} ${xOf(i)} ${yOf(v)}`).join(" ");
  return (
    <div ref={ref} className="overflow-x-auto">
      <svg
        role="img"
        aria-label="Chart"
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-xl mx-auto"
      >
        {[70, 80, 90, 100].map((v) => {
          const yy = yOf(v);
          return (
            <line
              key={v}
              x1={pad.l}
              x2={W - pad.r}
              y1={yy}
              y2={yy}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}
        <path
          d={pathD(indHz)}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 3"
        />
        <path
          d={pathD(aiHz)}
          fill="none"
          stroke="#0D7377"
          strokeWidth="3"
          strokeDashoffset={visible ? "0" : "1000"}
          strokeDasharray="1000"
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
        {years.map((y, i) => (
          <text
            key={y}
            x={xOf(i)}
            y={H - 6}
            textAnchor="middle"
            fontSize="11"
            fill="#64748b"
          >
            {y}
          </text>
        ))}
        {visible &&
          aiHz.map((v, i) => (
            <text
              key={v}
              x={xOf(i)}
              y={yOf(v) - 8}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#0D7377"
            >
              {v}%
            </text>
          ))}
        <text
          x={W - 16}
          y={yOf(72) - 6}
          textAnchor="end"
          fontSize="10"
          fill="#94a3b8"
        >
          Industry 72%
        </text>
        {[40, 80, 120, 160].map((v) => (
          <text
            key={v}
            x={pad.l - 6}
            y={yOf(65 + (v / 160) * 35) + 4}
            textAnchor="end"
            fontSize="9"
            fill="#94a3b8"
          >
            {Math.round(65 + (v / 160) * 35)}%
          </text>
        ))}
      </svg>
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
function DonutChart() {
  const { ref, visible } = useReveal();
  const segments = [
    { label: "Sales & BD", pct: 35, color: "#0D7377" },
    { label: "Tech (NHCX/ABDM)", pct: 30, color: "#14BDEB" },
    { label: "Training & Compliance", pct: 20, color: "#0a5a5e" },
    { label: "Operations", pct: 15, color: "#5ab8d4" },
  ];
  const cx = 100;
  const cy = 100;
  const r = 70;
  const ir = 42;
  let acc = -90;
  const polarX = (deg: number, radius: number) =>
    cx + radius * Math.cos((deg * Math.PI) / 180);
  const polarY = (deg: number, radius: number) =>
    cy + radius * Math.sin((deg * Math.PI) / 180);
  const arcPath = (start: number, end: number) => {
    const la = end - start > 180 ? 1 : 0;
    return [
      `M ${polarX(start, ir)} ${polarY(start, ir)}`,
      `L ${polarX(start, r)} ${polarY(start, r)}`,
      `A ${r} ${r} 0 ${la} 1 ${polarX(end, r)} ${polarY(end, r)}`,
      `L ${polarX(end, ir)} ${polarY(end, ir)}`,
      `A ${ir} ${ir} 0 ${la} 0 ${polarX(start, ir)} ${polarY(start, ir)}`,
      "Z",
    ].join(" ");
  };
  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-8">
      <svg
        role="img"
        aria-label="Fund allocation donut chart"
        viewBox="0 0 200 200"
        className="w-48 h-48 shrink-0"
      >
        {segments.map((s) => {
          const end = acc + (s.pct / 100) * 360;
          const path = arcPath(acc, end);
          acc = end;
          return (
            <path
              key={s.label}
              d={path}
              fill={s.color}
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
          );
        })}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#0F1923"
        >
          ₹10–15Cr
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fontSize="9"
          fill="#64748b"
        >
          Series A
        </text>
      </svg>
      <div className="grid grid-cols-1 gap-3 w-full">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ background: s.color }}
            />
            <span className="text-sm text-slate-700">{s.label}</span>
            <span
              className="ml-auto text-sm font-bold"
              style={{ color: s.color }}
            >
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TAM/SAM/SOM Circles ───────────────────────────────────────────────────────
function MarketCircles() {
  const { ref, visible } = useReveal();
  const circles = [
    {
      r: 110,
      label: "TAM",
      sub: "₹9.4L Cr",
      desc: "Indian Healthcare by 2030",
      color: "#e0f7fa",
    },
    {
      r: 75,
      label: "SAM",
      sub: "₹1,500 Cr",
      desc: "Hospital RCM Software",
      color: "#b2ebf2",
    },
    {
      r: 42,
      label: "SOM",
      sub: "₹150 Cr",
      desc: "AI Health Zon Target",
      color: "#0D7377",
    },
  ];
  return (
    <div ref={ref}>
      <svg
        role="img"
        aria-label="Market sizing circles"
        viewBox="0 0 260 240"
        className="w-full max-w-sm mx-auto"
      >
        {circles.map((c, i) => (
          <g key={c.label}>
            <circle
              cx={130}
              cy={120}
              r={visible ? c.r : 0}
              fill={c.color}
              stroke={i === 2 ? "#fff" : "#cce7eb"}
              strokeWidth="1.5"
              style={{ transition: `r 0.8s ease ${i * 200}ms` }}
            />
            <text
              x={130}
              y={i === 2 ? 115 : i === 1 ? 52 : 14}
              textAnchor="middle"
              fontSize={i === 2 ? "11" : "10"}
              fontWeight="700"
              fill={i === 2 ? "#fff" : "#0D7377"}
            >
              {c.label}: {c.sub}
            </text>
            <text
              x={130}
              y={i === 2 ? 129 : i === 1 ? 64 : 26}
              textAnchor="middle"
              fontSize="9"
              fill={i === 2 ? "#cce7eb" : "#475569"}
            >
              {c.desc}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── India Map SVG ─────────────────────────────────────────────────────────────
function IndiaMapGTM() {
  const cities = [
    { name: "Delhi", x: 138, y: 88, phase: 1 },
    { name: "Mumbai", x: 112, y: 170, phase: 1 },
    { name: "Bengaluru", x: 138, y: 230, phase: 1 },
    { name: "Hyderabad", x: 148, y: 200, phase: 1 },
    { name: "Chennai", x: 158, y: 234, phase: 1 },
    { name: "Jaipur", x: 122, y: 105, phase: 2 },
    { name: "Lucknow", x: 160, y: 102, phase: 2 },
    { name: "Nagpur", x: 148, y: 162, phase: 2 },
    { name: "Bhopal", x: 136, y: 148, phase: 2 },
    { name: "Coimbatore", x: 140, y: 248, phase: 2 },
  ];
  return (
    <div className="relative">
      <svg
        role="img"
        aria-label="India GTM map"
        viewBox="0 0 300 320"
        className="w-full max-w-xs mx-auto"
      >
        {/* simplified India outline */}
        <path
          d="M130 30 L175 35 L200 55 L210 80 L220 110 L215 140 L220 165 L210 190 L195 215 L185 238 L170 258 L158 278 L148 295 L140 278 L128 255 L115 235 L100 215 L88 195 L80 170 L75 145 L82 120 L90 98 L98 75 L108 55 Z"
          fill="#f0fdfd"
          stroke="#0D7377"
          strokeWidth="1.5"
        />
        {cities.map((c) => (
          <g key={c.name}>
            <circle
              cx={c.x}
              cy={c.y}
              r="5"
              fill={c.phase === 1 ? "#0D7377" : "#14BDEB"}
              opacity="0.9"
            />
            <text x={c.x + 7} y={c.y + 4} fontSize="8" fill="#334155">
              {c.name}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex gap-4 justify-center mt-2 text-xs">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[#0D7377]" />{" "}
          Phase 1 (Tier-1)
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[#14BDEB]" />{" "}
          Phase 2 (Tier-2)
        </span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
function InvestorPitchContent() {
  return (
    <div className="font-sans bg-white text-slate-900">
      {/* 1. HERO */}
      <section
        className="relative min-h-[540px] flex items-center justify-center overflow-hidden"
        data-ocid="investor.section"
      >
        <img
          src={heroImg}
          alt="India Healthcare"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1923]/80 via-[#0F1923]/70 to-[#0F1923]/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block bg-[#0D7377] text-white text-xs font-bold px-4 py-1 rounded-full mb-6 tracking-widest uppercase">
            Investor Pitch 2025–2030
          </div>
          <h1
            className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            India's ₹9.4 Lakh Crore
            <br />
            <span className="text-[#14BDEB]">Healthcare Opportunity</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            AI Health Zon — The Revenue Intelligence Platform Built for Bharat's
            Hospital Revolution
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "₹1.2L Cr Claim Problem",
              "50,000+ Hospitals",
              "₹9.4L Cr Market by 2030",
            ].map((b) => (
              <span
                key={b}
                className="bg-white/10 border border-white/30 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm"
              >
                {b}
              </span>
            ))}
          </div>
          <a
            href="#market"
            className="inline-block bg-[#0D7377] hover:bg-[#0a5a5e] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            data-ocid="investor.primary_button"
          >
            View Full Pitch ↓
          </a>
        </div>
      </section>

      {/* 2. CRISIS — dark band */}
      <section className="bg-[#0F1923] py-20 px-6" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#14BDEB] text-xs tracking-widest uppercase mb-3">
              The Indian Healthcare Crisis
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl text-white mb-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A System Under Pressure
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              {
                stat: "1.4B",
                sub: "Population — 0.5 beds/1,000 vs 2.9 global avg",
              },
              {
                stat: "₹10,000 Cr",
                sub: "Annual claim leakage across Indian hospitals",
              },
              {
                stat: "28%",
                sub: "Average claim denial rate across public & private",
              },
              {
                stat: "500M+",
                sub: "Indians without adequate health coverage",
              },
            ].map((c, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <Reveal key={i} delay={i * 100}>
                <div className="border border-white/10 rounded-xl p-5 bg-white/5">
                  <div className="text-3xl font-bold text-[#14BDEB] mb-2">
                    {c.stat}
                  </div>
                  <div className="text-sm text-white/60 leading-snug">
                    {c.sub}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <p className="text-white/60 text-base max-w-3xl leading-relaxed">
              India's healthcare industry is growing at 22% CAGR but systemic
              gaps in claims management, regulatory compliance, and revenue
              intelligence cost hospitals thousands of crores annually. With
              ABDM, NHCX, and PM-JAY reshaping the landscape, the window for a
              tech-first solution has never been wider.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. MARKET */}
      <section
        id="market"
        className="py-20 px-6 bg-slate-50"
        data-ocid="investor.section"
      >
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Market Opportunity
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              TAM · SAM · SOM
            </h2>
            <p className="text-slate-500 mb-12">
              50,000+ hospitals · 25,000+ clinics · 900+ TPAs — all underserved
              by modern revenue intelligence
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <MarketCircles />
            <div className="space-y-6">
              {[
                {
                  tag: "TAM",
                  amount: "₹9.4 Lakh Crore",
                  desc: "Indian healthcare industry projected by 2030, growing at 22% CAGR driven by PM-JAY, ABDM, and private insurance expansion.",
                  color: "#0D7377",
                },
                {
                  tag: "SAM",
                  amount: "₹1,500 Crore",
                  desc: "Hospital revenue cycle management software market. Currently fragmented with no dominant AI-native player.",
                  color: "#14BDEB",
                },
                {
                  tag: "SOM",
                  amount: "₹150 Crore",
                  desc: "AI Health Zon's 5-year addressable revenue target through direct sales, channel partners, and NHCX-mandated onboarding.",
                  color: "#0a5a5e",
                },
              ].map((m) => (
                <Reveal key={m.tag}>
                  <div
                    className="border-l-4 pl-5"
                    style={{ borderColor: m.color }}
                  >
                    <div
                      className="text-xs font-bold tracking-widest mb-1"
                      style={{ color: m.color }}
                    >
                      {m.tag}
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {m.amount}
                    </div>
                    <div className="text-sm text-slate-500">{m.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. REGULATORY TAILWINDS */}
      <section className="py-20 px-6 bg-white" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Regulatory Tailwinds
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Government Policy as Our Growth Engine
            </h2>
          </Reveal>
          <div className="space-y-6">
            {[
              {
                n: "01",
                title: "ABDM Phase 2 (2025)",
                desc: "ABHA ID mandate for all hospital transactions — every hospital must integrate or face reimbursement holds.",
              },
              {
                n: "02",
                title: "NHCX National Rollout (2025–26)",
                desc: "National Health Claims Exchange going live nationally — real-time claim processing for all empanelled hospitals.",
              },
              {
                n: "03",
                title: "PM-JAY Scale-Up",
                desc: "50 Crore+ beneficiaries, ₹5L coverage, 29,000+ empanelled hospitals requiring compliant digital billing.",
              },
              {
                n: "04",
                title: "NABH 5th Edition",
                desc: "Stricter accreditation standards with mandatory digital compliance documentation for all submissions.",
              },
              {
                n: "05",
                title: "IRDAI Digital Health Mandate",
                desc: "Cashless claim settlement within 3 hours — requires AI-assisted pre-auth and documentation automation.",
              },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="flex gap-6 items-start p-6 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                  <span
                    className="text-4xl font-black text-slate-100 shrink-0 leading-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">
                      {p.title}
                    </h3>
                    <p className="text-slate-500 text-sm">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROBLEM WE SOLVE */}
      <section className="py-20 px-6 bg-slate-50" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              The Problem We Solve
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ₹Crores Lost Every Day in Indian Hospitals
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Claim Leakage",
                rupee: "₹3.2 Cr/year",
                desc: "Average 500-bed hospital loses ₹3.2 Cr/year to preventable claim rejections due to coding errors, missing documentation, and late submission.",
                icon: "💸",
              },
              {
                title: "Compliance Gap",
                rupee: "15–30% Revenue at Risk",
                desc: "NHCX non-compliance risks 15–30% of insurance revenue. Hospitals lack real-time regulatory intelligence to stay compliant.",
                icon: "⚠️",
              },
              {
                title: "Manual Inefficiency",
                rupee: "28% Multi-Touchpoint Claims",
                desc: "28% of claims require 3+ manual touchpoints before settlement, delaying cash flow by 14+ days on average.",
                icon: "🔄",
              },
            ].map((c, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <Reveal key={i} delay={i * 120}>
                <div className="bg-white border-t-4 border-[#0D7377] rounded-xl p-6 shadow-sm h-full">
                  <div className="text-3xl mb-4">{c.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{c.title}</h3>
                  <div className="text-2xl font-black text-[#0D7377] mb-3">
                    {c.rupee}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PLATFORM MODULES */}
      <section className="py-20 px-6 bg-white" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Platform Modules
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Four Pillars of Revenue Intelligence
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                n: "01",
                title: "Hospital Revenue Management",
                desc: "End-to-end billing, coding, and revenue cycle automation. From OPD to discharge, every rupee tracked.",
              },
              {
                n: "02",
                title: "Claim Command Centre",
                desc: "AI-powered pre-auth, claim submission, denial management, and real-time adjudication tracking.",
              },
              {
                n: "03",
                title: "ABDM/NHCX Integration Suite",
                desc: "Full ABHA ID, HIE, and NHCX connectivity. The only platform certified for the complete national digital health stack.",
              },
              {
                n: "04",
                title: "AI Training & Compliance Engine",
                desc: "Role-based masterclass, simulation game, and live compliance score for every hospital department.",
              },
            ].map((m, i) => (
              <Reveal key={m.n} delay={i * 100}>
                <div className="flex gap-5 p-6 bg-gradient-to-br from-[#f0fdfd] to-white border border-[#cce7eb] rounded-xl">
                  <span
                    className="text-5xl font-black text-[#0D7377]/20 shrink-0"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {m.n}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                    <p className="text-slate-500 text-sm">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ROI TABLE */}
      <section className="py-20 px-6 bg-slate-50" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Hospital ROI
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Before vs After: 500-Bed Hospital
            </h2>
            <p className="text-slate-500 mb-10">
              Typical transformation timeline: 6–18 months post implementation
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm" data-ocid="investor.table">
                <thead>
                  <tr className="bg-[#0F1923] text-white">
                    <th className="text-left p-4 font-semibold">KPI</th>
                    <th className="p-4 font-semibold text-red-300">Before</th>
                    <th className="p-4 font-semibold text-[#14BDEB]">
                      After AI Health Zon
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Claim Denial Rate", "28%", "1.8%"],
                    ["Revenue Recovered", "₹0", "₹3.2 Cr/year"],
                    ["Claim Processing Time", "14 days", "3 days"],
                    ["NHCX Compliance", "0%", "100%"],
                    ["NABH Audit Score", "62%", "94%"],
                    ["Staff Efficiency", "Baseline", "+40% improvement"],
                  ].map(([kpi, before, after], i) => (
                    <tr
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="p-4 font-medium text-slate-700">{kpi}</td>
                      <td className="p-4 text-center font-bold text-red-500">
                        {before}
                      </td>
                      <td className="p-4 text-center font-bold text-[#0D7377]">
                        {after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. ARR CHART */}
      <section className="py-20 px-6 bg-white" data-ocid="investor.section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Financial Projections
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              5-Year ARR Growth Trajectory
            </h2>
            <p className="text-slate-500 mb-10">
              From ₹5 Cr bootstrapped revenue to ₹150 Cr ARR — driven by
              Tier-2/3 expansion and NHCX mandate
            </p>
          </Reveal>
          <ARRChart />
        </div>
      </section>

      {/* 9. LINE CHART */}
      <section className="py-20 px-6 bg-slate-50" data-ocid="investor.section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Clinical Quality Outcomes
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Clean Claim Rate: Our Hospitals vs Industry
            </h2>
            <p className="text-slate-500 mb-10">
              AI Health Zon partner hospitals — 97% clean claim rate vs 72%
              industry average
            </p>
          </Reveal>
          <ClaimLineChart />
          <div className="flex gap-6 justify-center mt-4 text-xs">
            <span className="flex items-center gap-2">
              <span className="inline-block w-6 h-0.5 bg-[#0D7377]" /> AI Health
              Zon hospitals
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-6 h-0.5 bg-slate-400"
                style={{ borderTop: "2px dashed #94a3b8" }}
              />{" "}
              Industry average
            </span>
          </div>
        </div>
      </section>

      {/* 10. GTM */}
      <section className="py-20 px-6 bg-white" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Go-To-Market Strategy
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              3-Phase PAN India Rollout
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                phase: "Phase 1",
                period: "FY25–26",
                title: "Tier-1 Metro Entry",
                cities: "Mumbai · Delhi · Bengaluru · Hyderabad · Chennai",
                target: "50 hospitals",
                color: "#0D7377",
              },
              {
                phase: "Phase 2",
                period: "FY26–27",
                title: "Tier-2 Expansion",
                cities: "Jaipur · Lucknow · Bhopal · Nagpur · Coimbatore",
                target: "150 hospitals",
                color: "#14BDEB",
              },
              {
                phase: "Phase 3",
                period: "FY27–28",
                title: "PAN India & Chains",
                cities: "Tier-3 cities + Hospital chains PAN India",
                target: "500+ hospitals",
                color: "#0a5a5e",
              },
            ].map((p, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <Reveal key={i} delay={i * 120}>
                <div
                  className="border-2 rounded-xl p-6 h-full"
                  style={{ borderColor: p.color }}
                >
                  <div
                    className="text-xs font-bold tracking-widest mb-1"
                    style={{ color: p.color }}
                  >
                    {p.phase} · {p.period}
                  </div>
                  <h3 className="font-bold text-lg mb-3">{p.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{p.cities}</p>
                  <div
                    className="text-2xl font-black"
                    style={{ color: p.color }}
                  >
                    {p.target}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="bg-slate-50 rounded-2xl p-6">
              <IndiaMapGTM />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11. PRICING */}
      <section className="py-20 px-6 bg-slate-50" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Business Model
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SaaS + Implementation · Annual Contracts
            </h2>
            <p className="text-slate-500 mb-12">
              3-year lock-in preferred · Dedicated success manager per account
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "Starter",
                beds: "50–200 Beds",
                saas: "₹2L/month",
                impl: "₹15L implementation",
                features: [
                  "Core Revenue Module",
                  "Basic ABDM Integration",
                  "5 User Seats",
                  "Email Support",
                ],
                highlight: false,
              },
              {
                tier: "Growth",
                beds: "200–500 Beds",
                saas: "₹3.5L/month",
                impl: "₹25L implementation",
                features: [
                  "Full Revenue Suite",
                  "NHCX + ABDM Complete",
                  "20 User Seats",
                  "Dedicated Manager",
                ],
                highlight: true,
              },
              {
                tier: "Enterprise",
                beds: "500+ Beds / Chains",
                saas: "₹5L–8L/month",
                impl: "Custom implementation",
                features: [
                  "All Modules + Training",
                  "Multi-location Support",
                  "Unlimited Seats",
                  "24/7 SLA",
                ],
                highlight: false,
              },
            ].map((t, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`rounded-2xl p-7 h-full ${t.highlight ? "bg-[#0F1923] text-white shadow-2xl scale-105" : "bg-white border border-slate-200"}`}
                >
                  <div
                    className={`text-xs font-bold tracking-widest mb-2 ${t.highlight ? "text-[#14BDEB]" : "text-[#0D7377]"}`}
                  >
                    {t.tier}
                  </div>
                  <div
                    className={`text-sm mb-4 ${t.highlight ? "text-white/60" : "text-slate-500"}`}
                  >
                    {t.beds}
                  </div>
                  <div
                    className={`text-3xl font-black mb-1 ${t.highlight ? "text-white" : "text-slate-900"}`}
                  >
                    {t.saas}
                  </div>
                  <div
                    className={`text-sm mb-6 ${t.highlight ? "text-[#14BDEB]" : "text-[#0D7377]"}`}
                  >
                    + {t.impl}
                  </div>
                  <ul className="space-y-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className={`text-sm flex items-center gap-2 ${t.highlight ? "text-white/80" : "text-slate-600"}`}
                      >
                        <span
                          className={`text-xs ${t.highlight ? "text-[#14BDEB]" : "text-[#0D7377]"}`}
                        >
                          ✓
                        </span>{" "}
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12. COMPETITIVE LANDSCAPE */}
      <section className="py-20 px-6 bg-white" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Competitive Advantage
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No Comparable Solution in India
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm" data-ocid="investor.table">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="p-4 font-semibold text-[#0D7377]">
                      AI Health Zon
                    </th>
                    <th className="p-4 font-semibold text-slate-500">
                      Generic HIS
                    </th>
                    <th className="p-4 font-semibold text-slate-500">
                      Manual TPA
                    </th>
                    <th className="p-4 font-semibold text-slate-500">
                      Basic Billing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["NHCX Ready", "✓", "✗", "✗", "✗"],
                    ["ABDM Integrated", "✓", "Partial", "✗", "✗"],
                    ["AI Claims Prediction", "✓", "✗", "✗", "✗"],
                    ["Training Module", "✓", "✗", "✗", "✗"],
                    ["Real-time Analytics", "✓", "Partial", "✗", "Partial"],
                    [
                      "Indian Regulatory Compliance",
                      "✓",
                      "Partial",
                      "Partial",
                      "✗",
                    ],
                  ].map(([feature, ai, his, tpa, billing], i) => (
                    <tr
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="p-4 font-medium">{feature}</td>
                      <td className="p-4 text-center font-bold text-[#0D7377]">
                        {ai}
                      </td>
                      {[his, tpa, billing].map((v, j) => (
                        <td
                          // biome-ignore lint/suspicious/noArrayIndexKey: static list
                          key={j}
                          className={`p-4 text-center font-medium ${v === "✗" ? "text-red-400" : "text-amber-500"}`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 13. TRACTION */}
      <section className="bg-[#0F1923] py-20 px-6" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#14BDEB] text-xs tracking-widest uppercase mb-3">
              Traction & KPIs
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl text-white mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Proven at Scale Across India
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { stat: "5,00,000+", label: "Claims Processed" },
              { stat: "97%", label: "Clean Claim Rate" },
              { stat: "200+", label: "Hospitals Onboarded" },
              { stat: "₹500 Cr+", label: "Revenue Recovered" },
              { stat: "1.8%", label: "Rejection Rate (<2%)" },
              { stat: "12 States", label: "Active Across India" },
            ].map((k, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <Reveal key={i} delay={i * 80}>
                <div className="text-center p-6">
                  <div className="text-4xl font-black text-[#14BDEB] mb-2">
                    {k.stat}
                  </div>
                  <div className="text-sm text-white/60">{k.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 14. USE OF FUNDS */}
      <section className="py-20 px-6 bg-white" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Series A · Use of Funds
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ₹10–15 Crore — Fuel for Market Capture
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <DonutChart />
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-slate-900">
                Exit Strategy
              </h3>
              {[
                {
                  title: "Strategic M&A",
                  desc: "Hospital chains (Fortis, Max, Aster) acquiring revenue intelligence capabilities as strategic infrastructure.",
                  timeline: "2026–28",
                },
                {
                  title: "InsurTech Consolidation",
                  desc: "Insurance tech platforms (Star Health, HDFC Ergo ecosystem) integrating claim intelligence at the source.",
                  timeline: "2027–29",
                },
                {
                  title: "Healthtech IPO Pathway",
                  desc: "Category-leader IPO as India's first AI-native hospital revenue intelligence platform.",
                  timeline: "2028–30",
                },
              ].map((e, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                <Reveal key={i} delay={i * 100}>
                  <div className="border-l-4 border-[#0D7377] pl-5">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold">{e.title}</h4>
                      <span className="text-xs bg-[#f0fdfd] text-[#0D7377] px-2 py-0.5 rounded-full">
                        {e.timeline}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{e.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 15. FOUNDER + CTA */}
      <section className="py-20 px-6 bg-slate-50" data-ocid="investor.section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[#0D7377] text-xs tracking-widest uppercase mb-3">
              Leadership
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Founder Spotlight
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <Reveal>
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0D7377] to-[#14BDEB] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Amit Mansingh Saini</h3>
                    <p className="text-sm text-slate-500">
                      Founder & CEO, AI Health Zon
                    </p>
                    <a
                      href="https://www.linkedin.com/in/amit-mansingh-saini-7445a516/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077B5] text-xs font-semibold hover:underline"
                      data-ocid="investor.link"
                    >
                      LinkedIn Profile ↗
                    </a>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  15+ years in healthcare revenue intelligence, hospital
                  operations, and insurance claim management across India. Built
                  and led revenue management teams for multi-specialty hospital
                  chains. Deep expertise in ABDM, NHCX, NABH compliance, and
                  PM-JAY scheme operations.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "15+ Years Healthcare",
                    "₹500Cr+ Revenue Impact",
                    "NHCX Pioneer",
                    "NABH Expert",
                  ].map((v) => (
                    <div
                      key={v}
                      className="text-xs bg-[#f0fdfd] text-[#0D7377] rounded-lg px-3 py-2 font-semibold"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="space-y-5">
              <Reveal>
                <h3 className="font-bold text-xl mb-4">
                  4 Vision Pillars for Indian Healthcare
                </h3>
              </Reveal>
              {[
                { n: "01", v: "Zero Claim Leakage for Every Indian Hospital" },
                { n: "02", v: "Full NHCX + ABDM Integration by 2026" },
                { n: "03", v: "AI-Powered Compliance for Every Bed in India" },
                {
                  n: "04",
                  v: "Training 10,000 Healthcare Revenue Professionals by 2028",
                },
              ].map((p, i) => (
                <Reveal key={p.n} delay={i * 80}>
                  <div className="flex gap-4 items-center">
                    <span
                      className="text-3xl font-black text-slate-100 shrink-0"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {p.n}
                    </span>
                    <p className="font-medium text-slate-700">{p.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-[#0F1923] py-20 px-6" data-ocid="investor.section">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2
              className="font-serif text-3xl md:text-5xl text-white font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Partner with AI Health Zon
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Join India's Healthcare Revenue Revolution — Series A Open ·
              ₹10–15 Crore
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/918696766966"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-full transition-colors text-lg"
                data-ocid="investor.primary_button"
              >
                <svg
                  role="img"
                  aria-label="WhatsApp"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Investor Enquiry
              </a>
              <a
                href="mailto:info@aihealthzon.com"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-full transition-colors text-lg"
                data-ocid="investor.secondary_button"
              >
                info@aihealthzon.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060d13] py-8 px-6 text-center text-white/40 text-sm">
        <p>
          Triple Top Pattern Health Pvt. Ltd. · C-10/9, Chinab Appartment,
          Sector 28, Pratap Nagar, Jaipur
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="hover:text-white/70 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default function InvestorPitch() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const today = new Date();
  const dayOfMonth = today.getDate();
  const isOdd = dayOfMonth % 2 !== 0;
  const correctCode = isOdd ? "Bingo" : "Bodh";
  const hint = isOdd
    ? "Today is an odd date — enter the access code"
    : "Today is an even date — enter the access code";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === correctCode) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect code. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setCode("");
    }
  }

  if (unlocked) return <InvestorPitchContent />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1923] via-[#0D7377] to-[#0F1923] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute rounded-full border border-white w-24 h-24 top-10 left-10" />
        <div className="absolute rounded-full border border-white w-40 h-40 top-1/4 left-1/4" />
        <div className="absolute rounded-full border border-white w-56 h-56 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute rounded-full border border-white w-72 h-72 bottom-10 right-10" />
        <div className="absolute rounded-full border border-white w-96 h-96 top-0 right-0 -translate-y-1/4" />
      </div>

      <div
        className={`relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 max-w-md w-full mx-6 shadow-2xl ${shake ? "animate-bounce" : ""}`}
        style={shake ? { animation: "shake 0.4s ease-in-out" } : {}}
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#0D7377] rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h1
          className="text-white text-2xl font-bold text-center mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Investor Pitch
        </h1>
        <p className="text-white/60 text-sm text-center mb-6">
          AI Health Zon — Confidential Access
        </p>

        {/* Date badge */}
        <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center mb-6">
          <span className="text-white/80 text-xs font-medium tracking-wide">
            {hint}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="pitch-access-code"
              className="text-white/70 text-xs uppercase tracking-widest block mb-2"
            >
              Access Code
            </label>
            <input
              id="pitch-access-code"
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              placeholder="Enter code"
              className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#14A0A5] focus:bg-white/15 transition text-lg tracking-widest"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/40 rounded-lg px-4 py-2 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0D7377] hover:bg-[#0A5F63] text-white font-bold py-3 rounded-lg transition-all duration-200 tracking-wide text-sm uppercase"
          >
            Unlock Investor Pitch
          </button>
        </form>

        <p className="text-white/30 text-xs text-center mt-6">
          Authorized personnel only —{" "}
          {today.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

export { InvestorPitch };
