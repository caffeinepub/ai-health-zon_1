import { Layout } from "@/components/layout/Layout";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, ChevronUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const claimStages = [
  "Patient Registration",
  "Insurance Verification",
  "Pre-Authorization",
  "Admission",
  "Clinical Documentation",
  "Treatment & Procedures",
  "Billing",
  "Claim Submission",
  "Denial Management",
  "Payment Reconciliation",
];

const departments = [
  "Front Desk",
  "Billing",
  "RCM Team",
  "Doctor",
  "Nursing",
  "Med Records",
  "Pharmacy",
  "Radiology/Lab",
  "TPA Desk",
  "Management",
];

// P=Primary, S=Secondary, R=Review, ""=not involved
const matrix: string[][] = [
  ["P", "S", "S", "", "", "", "", "", "R", ""], // Patient Registration
  ["S", "P", "R", "", "", "", "", "", "P", "R"], // Insurance Verification
  ["", "S", "P", "R", "", "", "", "", "P", ""], // Pre-Authorization
  ["P", "S", "R", "P", "S", "S", "", "", "", ""], // Admission
  ["", "", "R", "P", "P", "P", "S", "S", "", ""], // Clinical Documentation
  ["", "", "R", "P", "P", "S", "P", "P", "", ""], // Treatment & Procedures
  ["S", "P", "S", "R", "", "R", "S", "S", "", "R"], // Billing
  ["", "P", "P", "", "", "S", "", "", "S", "R"], // Claim Submission
  ["", "S", "P", "R", "", "S", "", "", "S", "P"], // Denial Management
  ["", "P", "P", "", "", "", "", "", "R", "P"], // Payment Reconciliation
];

function cellStyle(val: string): string {
  if (val === "P") return "bg-teal-100 text-teal-800 font-bold";
  if (val === "S") return "bg-blue-100 text-blue-800 font-semibold";
  if (val === "R") return "bg-amber-100 text-amber-800 font-semibold";
  return "";
}

const deptResponsibilities: Record<string, string[]> = {
  "Front Desk": [
    "Capture complete patient demographics at registration",
    "Create and link ABHA ID for each patient",
    "Inform patients about insurance eligibility at arrival",
    "Issue unique hospital registration number",
    "Verify identity documents and scheme card",
  ],
  Billing: [
    "Prepare accurate bills matching clinical notes",
    "Verify line items against scheme rate cards",
    "Submit claims via NHCX or insurer portal",
    "Track claim status and payment receipts",
    "Resolve billing queries raised by insurers",
  ],
  "RCM Team": [
    "Monitor daily claim submission dashboard",
    "Identify high-risk claims before submission",
    "Coordinate pre-authorization workflows",
    "Manage denial appeals and resubmissions",
    "Generate weekly revenue cycle performance reports",
  ],
  Doctor: [
    "Write admission notes within 2 hours of patient arrival",
    "Document clinical indication for all investigations",
    "Ensure treatment aligns with approved package",
    "Sign discharge summary before patient leaves",
    "Provide justification for high-cost procedures",
  ],
  Nursing: [
    "Update nursing notes every shift for all patients",
    "Record all administered medicines in drug chart",
    "Obtain and document patient consent for procedures",
    "Alert billing team for unreported procedures",
    "Maintain ICU monitoring charts accurately",
  ],
  "Med Records": [
    "Compile complete patient file before discharge",
    "Verify all documents are signed and dated",
    "Ensure no duplicate documents in the file",
    "Match all documents to patient ABHA ID",
    "Maintain secure digital and physical records",
  ],
  Pharmacy: [
    "Verify all prescriptions against approved formulary",
    "Document antibiotic usage with culture support",
    "Maintain drug administration chart for IPD patients",
    "Report irrational prescriptions to treating doctor",
    "Ensure pharmacy bill aligns with drug chart",
  ],
  "Radiology/Lab": [
    "Perform investigations only on valid doctor orders",
    "Sign and date all reports with radiologist/pathologist name",
    "Flag investigations without clinical indication",
    "Maintain digital copies for claim documentation",
    "Report urgent findings directly to treating team",
  ],
  "TPA Desk": [
    "Verify insurance policy validity at admission",
    "Submit pre-authorization requests within defined timelines",
    "Respond to insurer queries within 48 hours",
    "Coordinate for cashless approvals",
    "Maintain insurer-wise claim tracking register",
  ],
  Management: [
    "Review weekly claim rejection and approval reports",
    "Ensure all departments are trained on compliance",
    "Approve high-value claim submissions before dispatch",
    "Monitor denial trends and take corrective actions",
    "Set clean claim rate targets for each department",
  ],
};

export function DepartmentMatrix() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="dept-matrix.back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>

        {/* Hero */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 md:p-12 text-white shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.38 0.12 300) 0%, oklch(0.48 0.16 310) 60%, oklch(0.42 0.14 295) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  10 Departments × 10 Stages
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                Department Responsibility Matrix
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Assigns accountability for each claim stage across all hospital
                departments
              </p>
            </motion.div>
          </div>
        </section>

        {/* Matrix Table */}
        <section className="pb-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm"
              data-ocid="dept-matrix.table"
            >
              <table className="w-full text-xs min-w-[900px]">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left px-4 py-3 font-semibold sticky left-0 bg-gray-900">
                      Claim Stage
                    </th>
                    {departments.map((dept) => (
                      <th
                        key={dept}
                        className="text-center px-3 py-3 font-semibold whitespace-nowrap"
                      >
                        {dept}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {claimStages.map((stage, si) => (
                    <tr
                      key={stage}
                      className={si % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      data-ocid={`dept-matrix.row.${si + 1}`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap sticky left-0 bg-inherit">
                        {stage}
                      </td>
                      {departments.map((dept, di) => {
                        const val = matrix[si][di];
                        return (
                          <td
                            key={`${si}-${dept}`}
                            className="px-3 py-3 text-center"
                          >
                            {val && (
                              <span
                                className={`inline-block w-7 h-7 rounded-lg text-xs flex items-center justify-center ${cellStyle(val)}`}
                              >
                                {val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div
              className="flex flex-wrap gap-4 mt-4"
              data-ocid="dept-matrix.legend"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs font-bold bg-teal-100 text-teal-800">
                  P
                </span>
                <span className="text-sm text-gray-700">
                  Primary — Directly responsible for this activity
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs font-semibold bg-blue-100 text-blue-800">
                  S
                </span>
                <span className="text-sm text-gray-700">
                  Secondary — Supports the primary owner
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 rounded-lg items-center justify-center text-xs font-semibold bg-amber-100 text-amber-800">
                  R
                </span>
                <span className="text-sm text-gray-700">
                  Review — Reviews/approves the output
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Department Details */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Users className="w-3.5 h-3.5" /> Key Responsibilities
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Per Department Breakdown
              </h2>
            </motion.div>
            <div className="space-y-3">
              {Object.entries(deptResponsibilities).map(
                ([dept, responsibilities], i) => (
                  <motion.div
                    key={dept}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                    data-ocid={`dept-matrix.dept.${i + 1}`}
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        setExpandedDept(expandedDept === dept ? null : dept)
                      }
                      data-ocid={`dept-matrix.dept.${i + 1}.toggle`}
                    >
                      <span className="font-heading font-bold text-gray-900">
                        {dept}
                      </span>
                      {expandedDept === dept ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    {expandedDept === dept && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-5 pb-5 bg-gray-50 border-t border-gray-100"
                      >
                        <ul className="space-y-2 pt-4">
                          {responsibilities.map((r, ri) => (
                            <li
                              key={r}
                              className="flex items-start gap-3 text-sm text-gray-700"
                            >
                              <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                                {ri + 1}
                              </span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Back Link Bottom */}
        <div className="max-w-6xl mx-auto px-4 pb-12 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="dept-matrix.back-link-bottom"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>
      </div>
    </Layout>
  );
}
