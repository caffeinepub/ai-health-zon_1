import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { motion } from "motion/react";

function FieldRow({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <div
        className={`border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400 ${
          type === "yn" ? "w-20" : ""
        }`}
      >
        {type === "yn"
          ? "Yes / No"
          : type === "status"
            ? "Pass / Query / Fail"
            : "_______________________________"}
      </div>
    </div>
  );
}

const templates = [
  {
    id: "investigation",
    title: "Investigation Audit Form",
    color: "border-blue-200",
    headerBg: "bg-blue-600",
    fields: [
      { label: "Patient Name" },
      { label: "ABHA ID" },
      { label: "Admission Date" },
      { label: "Treating Doctor" },
      { label: "Investigation Name" },
      { label: "Clinical Indication" },
      { label: "Report Attached", type: "yn" },
      { label: "Justification Note" },
      { label: "Audit Status", type: "status" },
    ],
  },
  {
    id: "package",
    title: "Package Audit Form",
    color: "border-teal-200",
    headerBg: "bg-teal-600",
    fields: [
      { label: "Claim Number" },
      { label: "Package Code" },
      { label: "Package Name" },
      { label: "Procedure Date" },
      { label: "Package Inclusions Verified", type: "yn" },
      { label: "Unbundling Detected", type: "yn" },
      { label: "Bilateral Applicable", type: "yn" },
      { label: "Audit Remarks" },
    ],
  },
  {
    id: "billing",
    title: "Billing Audit Form",
    color: "border-purple-200",
    headerBg: "bg-purple-600",
    fields: [
      { label: "Bill Number" },
      { label: "Total Amount" },
      { label: "OPD Amount" },
      { label: "IPD Amount" },
      { label: "Duplicate Check", type: "yn" },
      { label: "Rate Verification", type: "yn" },
      { label: "Line Item Mismatch", type: "yn" },
      { label: "Auditor Signature" },
      { label: "Date" },
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy Audit Form",
    color: "border-amber-200",
    headerBg: "bg-amber-500",
    fields: [
      { label: "Prescription Date" },
      { label: "Total Pharma Cost" },
      { label: "Antibiotic Count" },
      { label: "Culture Report Available", type: "yn" },
      { label: "Irrational Combination", type: "yn" },
      { label: "Protocol Compliance", type: "yn" },
      { label: "Remarks" },
    ],
  },
  {
    id: "documentation",
    title: "Documentation Audit Form",
    color: "border-green-200",
    headerBg: "bg-green-600",
    fields: [
      { label: "Discharge Summary", type: "yn" },
      { label: "Consent Forms", type: "yn" },
      { label: "Investigation Reports", type: "yn" },
      { label: "Doctor Orders", type: "yn" },
      { label: "Nursing Notes", type: "yn" },
      { label: "Patient ID Match", type: "yn" },
      { label: "Final Status", type: "status" },
    ],
  },
];

export function ClaimAuditTemplates() {
  function handleDownload(title: string) {
    alert(
      `"${title}" template downloaded. In production, this would generate a printable PDF.`,
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="audit-templates.back-link"
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
                  "linear-gradient(135deg, oklch(0.35 0.12 265) 0%, oklch(0.45 0.16 275) 60%, oklch(0.40 0.14 265) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  5 Audit Forms
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                Claim Audit Templates
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Ready-to-use audit forms for investigations, packages, billing,
                pharmacy, and documentation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Templates */}
        <section className="pb-12 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {templates.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-2xl border overflow-hidden shadow-sm ${tpl.color}`}
                data-ocid={`audit-templates.template.${i + 1}`}
              >
                <div
                  className={`${tpl.headerBg} px-6 py-4 text-white flex items-center justify-between`}
                >
                  <h3 className="font-heading font-bold text-lg">
                    {tpl.title}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2"
                    onClick={() => handleDownload(tpl.title)}
                    data-ocid={`audit-templates.template.${i + 1}.download-button`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Template
                  </Button>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tpl.fields.map((field) => (
                      <FieldRow
                        key={field.label}
                        label={field.label}
                        type={field.type}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Back Link Bottom */}
        <div className="max-w-5xl mx-auto px-4 pb-12">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="audit-templates.back-link-bottom"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>
      </div>
    </Layout>
  );
}
