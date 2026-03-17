import { Layout } from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  FileCheck,
  Info,
} from "lucide-react";
import { motion } from "motion/react";

const highRiskExamples = [
  {
    investigation: "CT Scan",
    color: "border-red-200 bg-red-50",
    badge: "bg-red-100 text-red-800",
    justification:
      "Patient presents with severe headache, vomiting, and altered consciousness. CT Brain required to rule out intracranial hemorrhage / mass lesion. GCS score of 12 at presentation.",
    indication: "Altered consciousness with focal neurological signs",
  },
  {
    investigation: "MRI",
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
    justification:
      "Patient with lower back pain radiating to left leg for 3 weeks, positive SLR test at 45°. MRI Lumbar Spine required to evaluate disc herniation / nerve compression before surgical decision.",
    indication: "Radiculopathy with positive straight-leg raise",
  },
  {
    investigation: "ABG (Arterial Blood Gas)",
    color: "border-orange-200 bg-orange-50",
    badge: "bg-orange-100 text-orange-800",
    justification:
      "Patient on ventilator support with declining SpO2 from 95% to 88% over 2 hours. ABG required for acid-base status evaluation and ventilator parameter adjustment to prevent respiratory failure.",
    indication: "Declining SpO2 on ventilated patient",
  },
  {
    investigation: "Advanced Lab Panel",
    color: "border-amber-200 bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
    justification:
      "Patient with suspected multi-organ dysfunction — rising serum creatinine (3.2), elevated bilirubin (4.8), low platelets (65,000). LFT, RFT, Coagulation profile required for organ function monitoring and management.",
    indication: "Multi-organ dysfunction with rising markers",
  },
];

const rejectionReasons = [
  {
    reason: "No doctor's written investigation order attached",
    tip: "Always attach signed order slip with date and doctor name",
  },
  {
    reason: "Clinical indication field left blank in records",
    tip: "Complete the standard justification format before ordering any investigation",
  },
  {
    reason: "Diagnosis does not support the investigation requested",
    tip: "Ensure provisional diagnosis clearly links to investigation need",
  },
  {
    reason: "Duplicate investigation within 72 hours without explanation",
    tip: "Document clinical reason if same investigation is repeated within 3 days",
  },
  {
    reason: "CT/MRI ordered for routine cases without significant symptoms",
    tip: "Reserve advanced imaging for clinically justified complex cases",
  },
  {
    reason: "ABG ordered for stable non-ventilated patient",
    tip: "ABG is appropriate only for ventilated or critically compromised patients",
  },
];

const bestPractices = [
  "Document clinical indication at the time of ordering, not after the report arrives",
  "Use standard ICD-10 code for provisional diagnosis in justification forms",
  "Ensure the treating doctor signs and dates every investigation order",
  "For repeat investigations, always note the change in clinical status",
  "Attach investigation report immediately after receiving — never delay",
  "Use the ward round note to reference investigation findings",
  "For high-cost investigations, get a second clinical opinion noted in records",
  "Train nursing staff to flag missing investigation orders before tests are performed",
];

export function InvestigationJustification() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="inv-justification.back-link"
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
                  "linear-gradient(135deg, oklch(0.45 0.16 40) 0%, oklch(0.55 0.18 50) 60%, oklch(0.40 0.14 35) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  Clinical Documentation Standard
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                Investigation Justification Format
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Standardized format for documenting clinical indication and
                necessity for all investigations
              </p>
            </motion.div>
          </div>
        </section>

        {/* Standard Format */}
        <section className="pb-10 px-4 bg-gray-50 py-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                <FileCheck className="w-3.5 h-3.5" /> Standard Format
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Investigation Justification Form Template
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Use this format for every high-risk investigation ordered
              </p>
            </motion.div>
            <div
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              data-ocid="inv-justification.form-template"
            >
              <div className="bg-teal-600 px-6 py-4 text-white">
                <h3 className="font-heading font-bold">
                  Standard Investigation Justification Form
                </h3>
                <p className="text-white/70 text-xs mt-1">
                  To be completed by Treating Doctor before any high-risk
                  investigation
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Patient Name" },
                    { label: "ABHA ID" },
                    { label: "Date" },
                    { label: "Treating Doctor" },
                    { label: "Ward / Unit" },
                    { label: "Investigation Requested" },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col gap-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {f.label}
                      </p>
                      <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400">
                        _______________________________
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Investigation Type
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400">
                      Imaging / Laboratory / Cardiac / Other
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Provisional Diagnosis
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400 h-12" />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Clinical Findings Supporting Investigation
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400 h-16" />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Specific Indication / Need
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400 h-12" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Risk if Investigation Not Done
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400 h-12" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Expected Outcome / Clinical Decision
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400 h-12" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Doctor Signature
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400">
                      _______________________________
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Date
                    </p>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400">
                      _______________________________
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* High-Risk Examples */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Info className="w-3.5 h-3.5" /> Justification Examples
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                High-Risk Investigation Examples
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {highRiskExamples.map((ex, i) => (
                <motion.div
                  key={ex.investigation}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`rounded-2xl border p-5 ${ex.color}`}
                  data-ocid={`inv-justification.example.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-gray-900">
                      {ex.investigation}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ex.badge}`}
                    >
                      High Risk
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Clinical Indication
                    </p>
                    <p className="text-xs text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-200">
                      {ex.indication}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Sample Justification Note
                    </p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "{ex.justification}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rejection Reasons */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> Common Rejection
                Reasons
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Why Claims Get Rejected for Missing Justification
              </h2>
            </motion.div>
            <div className="space-y-3">
              {rejectionReasons.map((rr, i) => (
                <motion.div
                  key={rr.reason}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex gap-4"
                  data-ocid={`inv-justification.rejection-reason.${i + 1}`}
                >
                  <span className="w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">
                      {rr.reason}
                    </p>
                    <p className="text-xs text-teal-700 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>
                        <strong>Prevention:</strong> {rr.tip}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle className="w-3.5 h-3.5" /> Best Practices
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                8 Documentation Best Practices
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestPractices.map((bp, i) => (
                <motion.div
                  key={bp}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm"
                  data-ocid={`inv-justification.best-practice.${i + 1}`}
                >
                  <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700">{bp}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Back Link Bottom */}
        <div className="max-w-5xl mx-auto px-4 pb-12">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="inv-justification.back-link-bottom"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>
      </div>
    </Layout>
  );
}
