import PptxGenJS from "pptxgenjs";

export async function generateAIHealthZonPPT() {
  const pptx = new PptxGenJS();

  // Theme colors
  const teal = "0A4F5C";
  const tealLight = "0E7490";
  const white = "FFFFFF";
  const offWhite = "F0F9FF";
  const dark = "0F1F2E";
  const accent = "14B8A6";
  const gray = "64748B";

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "AI Health Zon";
  pptx.company = "Triple Top Pattern Health Pvt. Ltd.";
  pptx.subject = "We Focus on What Matters Most for Hospitals";
  pptx.title = "AI Health Zon – Hospital Revenue Intelligence Platform";

  // ─── SLIDE 1: Cover ───────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: dark },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: accent },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 7.44,
      w: "100%",
      h: 0.06,
      fill: { color: accent },
    });
    slide.addText("AI Health Zon", {
      x: 1,
      y: 1.6,
      w: 11,
      h: 1.0,
      fontSize: 48,
      bold: true,
      color: white,
      fontFace: "Calibri",
    });
    slide.addText("We Focus on What Matters Most for Hospitals", {
      x: 1,
      y: 2.75,
      w: 11,
      h: 0.7,
      fontSize: 22,
      color: accent,
      bold: true,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 1,
      y: 3.55,
      w: 4,
      h: 0,
      line: { color: accent, width: 2 },
    });
    slide.addText("Hospital Revenue Intelligence Platform", {
      x: 1,
      y: 3.8,
      w: 11,
      h: 0.5,
      fontSize: 16,
      color: "94A3B8",
      fontFace: "Calibri",
    });
    slide.addText(
      "Triple Top Pattern Health Pvt. Ltd. | info@aihealthzon.com | +91-8696766966",
      {
        x: 1,
        y: 6.5,
        w: 11,
        h: 0.4,
        fontSize: 11,
        color: "94A3B8",
        fontFace: "Calibri",
      },
    );
    slide.addText(
      "C-10/9, Chinab Appartment, Sector 28, Pratap Nagar, Jaipur",
      {
        x: 1,
        y: 6.9,
        w: 11,
        h: 0.4,
        fontSize: 11,
        color: "64748B",
        fontFace: "Calibri",
      },
    );
  }

  // ─── SLIDE 2: The Problem ──────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("The Hospital Revenue Challenge", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    const problems = [
      ["30–40%", "Claims Rejected or Delayed"],
      ["₹2–5L", "Revenue Lost Per Bed Per Year"],
      ["60%+", "Manual Process Overhead"],
      ["48 hrs+", "Average Pre-Auth Turnaround"],
    ];
    problems.forEach(([stat, label], i) => {
      const x = 0.5 + (i % 2) * 6.2;
      const y = 1.5 + Math.floor(i / 2) * 2.1;
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: 5.8,
        h: 1.7,
        fill: { color: offWhite },
        line: { color: tealLight, width: 1 },
      });
      slide.addText(stat, {
        x,
        y: y + 0.15,
        w: 5.8,
        h: 0.9,
        fontSize: 36,
        bold: true,
        color: teal,
        align: "center",
        fontFace: "Calibri",
      });
      slide.addText(label, {
        x,
        y: y + 0.95,
        w: 5.8,
        h: 0.5,
        fontSize: 14,
        color: gray,
        align: "center",
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 3: About AI Health Zon ─────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("About AI Health Zon", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    slide.addText(
      "AI Health Zon is India's leading Hospital Revenue Intelligence Platform. We help hospitals, clinics, and healthcare providers maximize revenue, reduce claim rejections, and achieve full regulatory compliance — powered by AI and automation.",
      {
        x: 0.5,
        y: 1.3,
        w: 12,
        h: 1.2,
        fontSize: 14,
        color: dark,
        fontFace: "Calibri",
        align: "left",
      },
    );
    const points = [
      "Founded with a mission to transform hospital revenue cycles",
      "Serving hospitals across India with AI-powered claim intelligence",
      "Aligned with ABDM, NHCX, NABH, and government health schemes",
      "Registered: Triple Top Pattern Health Pvt. Ltd., Jaipur",
      "End-to-end platform: from patient registration to claim settlement",
    ];
    points.forEach((pt, i) => {
      slide.addText(`✔  ${pt}`, {
        x: 0.7,
        y: 2.6 + i * 0.65,
        w: 11.5,
        h: 0.55,
        fontSize: 13,
        color: dark,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 4: Platform Overview ───────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("Platform Modules", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    const modules = [
      [
        "01",
        "Hospital Revenue Management",
        "Unified revenue cycle from admission to settlement",
      ],
      [
        "02",
        "Claim Command Centre",
        "AI-powered claim tracking, automation & analytics",
      ],
      ["03", "NABH Compliance", "Digital readiness for NABH accreditation"],
      ["04", "ABDM Integration", "Ayushman Bharat Digital Mission compliance"],
      ["05", "NHCX Ready", "Single-window digital claim exchange platform"],
      ["06", "Simulation Lab", "Hospital staff training & leadership game"],
    ];
    modules.forEach(([num, title, desc], i) => {
      const x = 0.5 + (i % 2) * 6.3;
      const y = 1.4 + Math.floor(i / 2) * 1.8;
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: 6.0,
        h: 1.6,
        fill: { color: offWhite },
        line: { color: tealLight, width: 1 },
      });
      slide.addText(num, {
        x: x + 0.15,
        y: y + 0.1,
        w: 0.7,
        h: 0.7,
        fontSize: 22,
        bold: true,
        color: accent,
        fontFace: "Calibri",
      });
      slide.addText(title, {
        x: x + 0.85,
        y: y + 0.1,
        w: 5.0,
        h: 0.5,
        fontSize: 14,
        bold: true,
        color: dark,
        fontFace: "Calibri",
      });
      slide.addText(desc, {
        x: x + 0.85,
        y: y + 0.6,
        w: 5.0,
        h: 0.7,
        fontSize: 12,
        color: gray,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 5: Hospital Revenue Management ─────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("Hospital Revenue Management", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    const features = [
      "Patient registration & insurance eligibility verification",
      "Pre-authorization tracking & automated follow-ups",
      "Real-time claim status dashboard for all insurers",
      "Discharge billing & TPA coordination",
      "Denial management & root cause analysis",
      "Revenue leakage detection & alerts",
      "MIS reports & revenue analytics",
      "Integration with HIS, EMR, and insurance portals",
    ];
    features.forEach((f, i) => {
      slide.addText(`✔  ${f}`, {
        x: 0.7,
        y: 1.4 + i * 0.62,
        w: 11.5,
        h: 0.55,
        fontSize: 13,
        color: dark,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 6: Claim Command Centre ────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("Claim Command Centre", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    slide.addText(
      "AI-powered claim intelligence to reduce rejections and accelerate settlements",
      {
        x: 0.5,
        y: 1.2,
        w: 12,
        h: 0.5,
        fontSize: 14,
        color: gray,
        fontFace: "Calibri",
      },
    );
    const items = [
      [
        "AI Rejection Predictor",
        "Identify high-risk claims before submission using ML models",
      ],
      ["Smart Documentation", "Auto-checklist for complete claim packages"],
      ["Query Management", "Structured query responses to insurers/TPAs"],
      [
        "Pending Tracker",
        "Real-time follow-up on all pending pre-auths and claims",
      ],
      [
        "Show-Cause Prevention",
        "Early warning system for NABH & insurer scrutiny",
      ],
      [
        "Analytics Dashboard",
        "Rejection trends, insurer performance, and financial impact",
      ],
    ];
    items.forEach(([title, desc], i) => {
      const x = 0.5 + (i % 2) * 6.3;
      const y = 1.9 + Math.floor(i / 2) * 1.7;
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: 6.0,
        h: 1.5,
        fill: { color: offWhite },
        line: { color: tealLight, width: 1 },
      });
      slide.addText(title, {
        x: x + 0.2,
        y: y + 0.1,
        w: 5.6,
        h: 0.5,
        fontSize: 14,
        bold: true,
        color: teal,
        fontFace: "Calibri",
      });
      slide.addText(desc, {
        x: x + 0.2,
        y: y + 0.6,
        w: 5.6,
        h: 0.65,
        fontSize: 12,
        color: gray,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 7: NABH & Compliance ───────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("NABH Compliance & Quality", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    const nabh = [
      "Digital NABH readiness assessment & gap analysis",
      "SOPs and policy documentation support",
      "Staff training for NABH criteria compliance",
      "Audit trail and documentation management",
      "Incident reporting & patient safety tracking",
      "Inspection preparation support",
      "NABH entry-level & full accreditation pathways",
      "Continuous monitoring dashboard for compliance metrics",
    ];
    nabh.forEach((f, i) => {
      slide.addText(`✔  ${f}`, {
        x: 0.7,
        y: 1.4 + i * 0.62,
        w: 11.5,
        h: 0.55,
        fontSize: 13,
        color: dark,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 8: ABDM Integration ────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("ABDM Integration", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    slide.addText(
      "Ayushman Bharat Digital Mission — Building India's Digital Health Backbone",
      {
        x: 0.5,
        y: 1.2,
        w: 12,
        h: 0.5,
        fontSize: 14,
        color: gray,
        fontFace: "Calibri",
      },
    );
    const abdmItems = [
      ["ABHA Creation", "Ayushman Bharat Health Account for every patient"],
      ["ABDM-HIP", "Hospital as Health Information Provider"],
      ["ABDM-HIU", "Health Information User access and consent"],
      ["PHR App", "Personal Health Records sharing via ABDM"],
      ["UHI Protocol", "Unified Health Interface for appointments"],
      ["PMJAY Integration", "Pradhan Mantri Jan Arogya Yojana scheme support"],
    ];
    abdmItems.forEach(([title, desc], i) => {
      const x = 0.5 + (i % 2) * 6.3;
      const y = 1.9 + Math.floor(i / 2) * 1.7;
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: 6.0,
        h: 1.5,
        fill: { color: offWhite },
        line: { color: tealLight, width: 1 },
      });
      slide.addText(title, {
        x: x + 0.2,
        y: y + 0.1,
        w: 5.6,
        h: 0.5,
        fontSize: 14,
        bold: true,
        color: teal,
        fontFace: "Calibri",
      });
      slide.addText(desc, {
        x: x + 0.2,
        y: y + 0.6,
        w: 5.6,
        h: 0.65,
        fontSize: 12,
        color: gray,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 9: NHCX Readiness ──────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("NHCX Readiness", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    slide.addText(
      'National Health Claims Exchange — "The UPI for Health Insurance Claims"',
      {
        x: 0.5,
        y: 1.2,
        w: 12,
        h: 0.5,
        fontSize: 14,
        color: gray,
        fontFace: "Calibri",
      },
    );
    const nhcxSteps = [
      "Digital Hospital Information System (HIS) integration",
      "Standardized claim data formats (FHIR/HL7)",
      "Electronic medical documentation & records",
      "API integration with NHCX gateway",
      "Digital pre-authorization workflows",
      "Real-time claim status tracking",
      "Multi-insurer connectivity via single platform",
      "Compliance with NHA interoperability standards",
    ];
    nhcxSteps.forEach((step, i) => {
      slide.addText(`✔  ${step}`, {
        x: 0.7,
        y: 1.8 + i * 0.6,
        w: 11.5,
        h: 0.52,
        fontSize: 13,
        color: dark,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 10: AI Course & Training ───────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("Training & AI Masterclass", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    slide.addText(
      "Claim Protection & Show-Cause Prevention Masterclass for Hospital Teams",
      {
        x: 0.5,
        y: 1.2,
        w: 12,
        h: 0.5,
        fontSize: 14,
        color: gray,
        fontFace: "Calibri",
      },
    );
    const modules = [
      "Claim lifecycle — from admission to settlement",
      "Pre-authorization best practices and pitfalls",
      "NABH documentation for claim protection",
      "TPA/insurer communication protocols",
      "Show-cause notice prevention framework",
      "Denial pattern recognition and response",
      "AI tools for coding and billing accuracy",
      "Live simulation game for hospital leadership teams",
      "Role-based training: billing, clinical, admin staff",
      "12-module AI Course for digital health transformation",
    ];
    modules.forEach((m, i) => {
      slide.addText(`${i + 1}.  ${m}`, {
        x: 0.7,
        y: 1.8 + i * 0.54,
        w: 11.5,
        h: 0.48,
        fontSize: 12,
        color: dark,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 11: Key Metrics ────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: dark },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: accent },
    });
    slide.addText("Impact by Numbers", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: white,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: accent, width: 1.5 },
    });
    const metrics = [
      ["40%", "Reduction in claim rejections"],
      ["3x", "Faster claim settlements"],
      ["60%", "Less manual documentation"],
      ["₹50L+", "Revenue protected per hospital/year"],
      ["98%", "NABH compliance readiness rate"],
      ["500+", "Hospital staff trained"],
    ];
    metrics.forEach(([val, label], i) => {
      const x = 0.5 + (i % 3) * 4.2;
      const y = 1.5 + Math.floor(i / 3) * 2.3;
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: 3.9,
        h: 2.0,
        fill: { color: "0E2A38" },
        line: { color: accent, width: 1 },
      });
      slide.addText(val, {
        x,
        y: y + 0.25,
        w: 3.9,
        h: 1.0,
        fontSize: 38,
        bold: true,
        color: accent,
        align: "center",
        fontFace: "Calibri",
      });
      slide.addText(label, {
        x,
        y: y + 1.2,
        w: 3.9,
        h: 0.6,
        fontSize: 12,
        color: "94A3B8",
        align: "center",
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 12: Why Choose AI Health Zon ──────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: white },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: teal },
    });
    slide.addText("Why AI Health Zon?", {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.7,
      fontSize: 28,
      bold: true,
      color: dark,
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 1.1,
      w: 12,
      h: 0,
      line: { color: teal, width: 1.5 },
    });
    const reasons = [
      [
        "India-First Platform",
        "Built specifically for Indian healthcare, insurance, and regulatory ecosystem",
      ],
      [
        "End-to-End Coverage",
        "From patient registration through claim settlement — one unified platform",
      ],
      [
        "AI-Powered Intelligence",
        "Machine learning for rejection prediction, coding accuracy, and analytics",
      ],
      [
        "Regulatory Ready",
        "ABDM, NHCX, NABH, PMJAY, and private insurer compliance built-in",
      ],
      [
        "Staff Empowerment",
        "Training, simulation, and AI course designed for all hospital roles",
      ],
      [
        "Proven ROI",
        "Quantifiable revenue recovery and cost reduction from day one",
      ],
    ];
    reasons.forEach(([title, desc], i) => {
      const x = 0.5 + (i % 2) * 6.3;
      const y = 1.4 + Math.floor(i / 2) * 1.8;
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w: 6.0,
        h: 1.6,
        fill: { color: offWhite },
        line: { color: tealLight, width: 1 },
      });
      slide.addText(title, {
        x: x + 0.2,
        y: y + 0.1,
        w: 5.6,
        h: 0.5,
        fontSize: 14,
        bold: true,
        color: teal,
        fontFace: "Calibri",
      });
      slide.addText(desc, {
        x: x + 0.2,
        y: y + 0.6,
        w: 5.6,
        h: 0.7,
        fontSize: 12,
        color: gray,
        fontFace: "Calibri",
      });
    });
  }

  // ─── SLIDE 13: CTA / Contact ──────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      fill: { color: dark },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.06,
      fill: { color: accent },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 7.44,
      w: "100%",
      h: 0.06,
      fill: { color: accent },
    });
    slide.addText("Ready to Transform Your Hospital Revenue?", {
      x: 1,
      y: 1.2,
      w: 11,
      h: 1.0,
      fontSize: 30,
      bold: true,
      color: white,
      align: "center",
      fontFace: "Calibri",
    });
    slide.addText("We Focus on What Matters Most for Hospitals", {
      x: 1,
      y: 2.3,
      w: 11,
      h: 0.6,
      fontSize: 18,
      color: accent,
      bold: true,
      align: "center",
      fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 4,
      y: 3.1,
      w: 5,
      h: 0,
      line: { color: accent, width: 1 },
    });
    const contacts = [
      ["Website", "www.aihealthzon.com"],
      ["Email", "info@aihealthzon.com"],
      ["Phone", "+91-8696766966"],
      ["Address", "C-10/9, Chinab Appartment, Sector 28, Pratap Nagar, Jaipur"],
    ];
    contacts.forEach(([label, value], i) => {
      slide.addText(`${label}:  ${value}`, {
        x: 2,
        y: 3.4 + i * 0.7,
        w: 9,
        h: 0.55,
        fontSize: 14,
        color: "CBD5E1",
        align: "center",
        fontFace: "Calibri",
      });
    });
    slide.addText("Triple Top Pattern Health Pvt. Ltd.", {
      x: 1,
      y: 6.6,
      w: 11,
      h: 0.45,
      fontSize: 12,
      color: "64748B",
      align: "center",
      fontFace: "Calibri",
    });
  }

  // ─── Download ──────────────────────────────────────────────────────────────
  await pptx.writeFile({ fileName: "AI_Health_Zon_Hospital_Platform.pptx" });
}
