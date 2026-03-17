import { Layout } from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  FileText,
  Shield,
  Stethoscope,
} from "lucide-react";
import { motion } from "motion/react";

const claimTypes = [
  {
    name: "General Medicine",
    description:
      "In-patient and out-patient medical treatment for common illnesses, infections, fever, and chronic disease management.",
    rules: [
      "OPD claims above ₹10,000 require full clinical documentation",
      "IPD stay must be clinically justified",
      "Diagnosis must match ICD-10 code",
      "All investigations must be ordered by treating doctor",
    ],
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    name: "Surgical",
    description:
      "All planned and emergency surgical procedures including OT charges, surgeon fees, anaesthesia, and post-operative care.",
    rules: [
      "Package must include all OT components — no unbundling",
      "Pre-operative notes and consent mandatory",
      "Post-op notes must align with procedure billed",
      "Implants billed separately must have invoices",
    ],
    color: "border-red-200 bg-red-50",
    badge: "bg-red-100 text-red-800",
  },
  {
    name: "Maternity",
    description:
      "Normal delivery, C-section, complications, and neo-natal care under government and private insurance packages.",
    rules: [
      "Package type (normal/LSCS) must match clinical notes",
      "Delivery summary required with APGAR score",
      "Neo-natal stay billed separately if beyond package days",
      "Pre-natal investigations within package window",
    ],
    color: "border-pink-200 bg-pink-50",
    badge: "bg-pink-100 text-pink-800",
  },
  {
    name: "ICU / Critical Care",
    description:
      "Management of critically ill patients requiring continuous monitoring, ventilator support, and multi-system care.",
    rules: [
      "ICU stay must be clinically justified daily",
      "Ventilator days require ABG reports",
      "Specialist consultations must be documented",
      "Daily progress notes mandatory for each ICU day",
    ],
    color: "border-orange-200 bg-orange-50",
    badge: "bg-orange-100 text-orange-800",
  },
  {
    name: "Daycare",
    description:
      "Procedures completed within 24 hours without overnight stay — dialysis, chemotherapy, minor surgeries, and diagnostics.",
    rules: [
      "Daycare procedure must be on approved scheme list",
      "Patient should be discharged same day",
      "Clinical notes must confirm daycare eligibility",
      "No IPD package can be billed for daycare",
    ],
    color: "border-teal-200 bg-teal-50",
    badge: "bg-teal-100 text-teal-800",
  },
  {
    name: "Emergency",
    description:
      "Acute and life-threatening conditions requiring immediate intervention — trauma, cardiac events, strokes, and accidents.",
    rules: [
      "Emergency admission note required within 1 hour",
      "MLC cases require police/legal documentation",
      "Pre-auth may be waived but must be intimated",
      "All emergency investigations must be justified",
    ],
    color: "border-purple-200 bg-purple-50",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    name: "Chronic Disease",
    description:
      "Long-term management of diabetes, hypertension, COPD, CKD, and other chronic conditions under benefit packages.",
    rules: [
      "Baseline investigations required at first admission",
      "Ongoing monitoring results must be attached",
      "Medicines must align with disease protocol",
      "Multiple comorbidities require separate justifications",
    ],
    color: "border-amber-200 bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
  },
  {
    name: "Diagnostic",
    description:
      "Standalone lab, radiology, and other diagnostic procedures billed under outpatient or pre-admission diagnostic packages.",
    rules: [
      "Each investigation requires a doctor's written order",
      "Radiology reports must be signed by radiologist",
      "Clinical indication must match investigation type",
      "Duplicate investigations within 7 days flagged automatically",
    ],
    color: "border-green-200 bg-green-50",
    badge: "bg-green-100 text-green-800",
  },
];

const riskCategories = [
  {
    level: "Low Risk",
    color: "bg-green-600",
    bg: "bg-green-50 border-green-200",
    desc: "Standard claims with complete documentation and no anomalies.",
    examples: [
      "General medicine IPD with complete file",
      "Normal delivery with all documents",
      "Minor daycare procedures with clinical notes",
    ],
  },
  {
    level: "Medium Risk",
    color: "bg-amber-500",
    bg: "bg-amber-50 border-amber-200",
    desc: "Claims with minor gaps or borderline billing patterns needing review.",
    examples: [
      "OPD bill between ₹8,000–₹10,000",
      "Single antibiotic prescription without culture",
      "Package near cost ceiling",
    ],
  },
  {
    level: "High Risk",
    color: "bg-orange-600",
    bg: "bg-orange-50 border-orange-200",
    desc: "Claims with clear red flags or missing critical documents.",
    examples: [
      "CT/MRI without documented clinical indication",
      "ICU claim without daily progress notes",
      "Multiple packages in one admission",
    ],
  },
  {
    level: "Critical Risk",
    color: "bg-red-600",
    bg: "bg-red-50 border-red-200",
    desc: "Claims likely to trigger show-cause or fraud investigation.",
    examples: [
      "Duplicate claim for same patient episode",
      "Package unbundling detected",
      "Conflicting diagnosis and investigation codes",
    ],
  },
];

const complianceRules = [
  {
    category: "Investigation Rules",
    icon: Stethoscope,
    color: "text-blue-600",
    bg: "bg-blue-50",
    rules: [
      "All investigations must have a valid doctor order attached",
      "CT Scan and MRI require documented clinical indication",
      "ABG is mandatory only for ventilated or critically ill patients",
      "Advanced lab panels need clinical justification note",
      "Duplicate investigations within 72 hours must be explained",
      "Radiology report must bear radiologist signature and date",
    ],
  },
  {
    category: "Package Rules",
    icon: Shield,
    color: "text-teal-600",
    bg: "bg-teal-50",
    rules: [
      "Never bill components separately that are included in a package",
      "Major and minor package classification must match procedure type",
      "Bilateral procedures must use correct bilateral package code",
      "Package code must exactly match the approved scheme list",
      "No two packages can be claimed for the same procedure episode",
    ],
  },
  {
    category: "Billing Rules",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-50",
    rules: [
      "OPD bills above ₹10,000 require complete supporting documents",
      "IPD bills above ₹30,000 must undergo pre-submission audit",
      "All line items must match corresponding clinical entries",
      "Charges must align with scheme-approved rate cards",
      "Co-payment amounts must be correctly calculated and deducted",
      "Discharge summary must match final bill summary",
    ],
  },
  {
    category: "Pharmacy Rules",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    rules: [
      "Pharmacy bills above ₹5,000 require antibiotic justification",
      "Antibiotic prescriptions need culture sensitivity support",
      "Irrational drug combinations must be avoided and explained",
      "Drug chart must be attached for IPD pharmacy claims",
      "Generic names preferred; brand names must match formulary",
      "No duplicate prescriptions for the same drug within 48 hours",
    ],
  },
  {
    category: "Documentation Rules",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    rules: [
      "Admission note must be created within 2 hours of admission",
      "Discharge summary must be comprehensive and signed",
      "Consent forms must be signed before any procedure",
      "Nursing notes must be updated every shift for ICU patients",
      "All documents must match patient ABHA ID",
      "Duplicate documents should never be submitted with a claim",
    ],
  },
];

const quickRefTable = [
  {
    type: "General Medicine",
    flags: "High OPD billing, missing labs",
    docs: "Clinical notes, lab reports, prescription",
  },
  {
    type: "Surgical",
    flags: "Package unbundling, missing consent",
    docs: "OT notes, consent, surgeon certificate",
  },
  {
    type: "Maternity",
    flags: "Wrong package type, missing APGAR",
    docs: "Delivery summary, APGAR score, neo-natal records",
  },
  {
    type: "ICU/Critical Care",
    flags: "No daily notes, unjustified ABG",
    docs: "Daily progress notes, ABG, ventilator chart",
  },
  {
    type: "Daycare",
    flags: "Same-day readmission, IPD package used",
    docs: "Daycare eligibility, discharge note",
  },
  {
    type: "Emergency",
    flags: "No emergency note, missing MLC",
    docs: "ER note, MLC copy, pre-auth intimation",
  },
];

export function ClaimBibleManual() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="claim-bible.back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>

        {/* Hero */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 md:p-12 text-white shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.38 0.14 188) 0%, oklch(0.50 0.18 200) 60%, oklch(0.42 0.15 210) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  TTP Health – HARMONY
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                Claim Bible Manual
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Comprehensive reference guide covering all claim types, risk
                categories, and compliance rules
              </p>
            </motion.div>
          </div>
        </section>

        {/* Claim Types */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5" /> Claim Types Covered
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                8 Claim Categories
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Every claim type handled under government and private insurance
                schemes
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {claimTypes.map((ct, i) => (
                <motion.div
                  key={ct.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`rounded-2xl border p-5 ${ct.color}`}
                  data-ocid={`claim-bible.claim-type.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-bold text-gray-900">
                      {ct.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ct.badge}`}
                    >
                      Claim Type
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{ct.description}</p>
                  <ul className="space-y-1.5">
                    {ct.rules.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Risk Categories */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> Risk Categories
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                4 Risk Levels
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {riskCategories.map((rc, i) => (
                <motion.div
                  key={rc.level}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border p-5 ${rc.bg}`}
                  data-ocid={`claim-bible.risk-category.${i + 1}`}
                >
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3 ${rc.color}`}
                  >
                    {rc.level}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{rc.desc}</p>
                  <ul className="space-y-1.5">
                    {rc.examples.map((ex) => (
                      <li
                        key={ex}
                        className="text-xs text-gray-600 flex items-start gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Rules */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Shield className="w-3.5 h-3.5" /> Compliance Rules
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                5 Rule Categories
              </h2>
            </motion.div>
            <div className="space-y-4">
              {complianceRules.map((cr, i) => {
                const Icon = cr.icon;
                return (
                  <motion.div
                    key={cr.category}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                    data-ocid={`claim-bible.compliance-rule.${i + 1}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${cr.bg}`}
                      >
                        <Icon className={`w-5 h-5 ${cr.color}`} />
                      </div>
                      <h3 className="font-heading font-bold text-gray-900">
                        {cr.category}
                      </h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {cr.rules.map((rule) => (
                        <li
                          key={rule}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5" /> Quick Reference
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Claim Type vs Flags vs Documents
              </h2>
            </motion.div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table
                className="w-full text-sm"
                data-ocid="claim-bible.quick-ref.table"
              >
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="text-left px-5 py-3 font-semibold">
                      Claim Type
                    </th>
                    <th className="text-left px-5 py-3 font-semibold">
                      Common Flags
                    </th>
                    <th className="text-left px-5 py-3 font-semibold">
                      Required Documents
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quickRefTable.map((row, i) => (
                    <tr
                      key={row.type}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-5 py-3 font-semibold text-teal-700">
                        {row.type}
                      </td>
                      <td className="px-5 py-3 text-red-700">{row.flags}</td>
                      <td className="px-5 py-3 text-gray-700">{row.docs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Back Link Bottom */}
        <div className="max-w-5xl mx-auto px-4 pb-12">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="claim-bible.back-link-bottom"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>
      </div>
    </Layout>
  );
}
