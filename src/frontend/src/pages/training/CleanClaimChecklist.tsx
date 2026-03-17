import { Layout } from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, ClipboardList } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type ChecklistCategory = {
  id: string;
  title: string;
  color: string;
  headerColor: string;
  items: string[];
};

const categories: ChecklistCategory[] = [
  {
    id: "investigation",
    title: "1. Investigation Validation",
    color: "border-blue-200 bg-blue-50",
    headerColor: "bg-blue-600",
    items: [
      "Clinical indication documented for every investigation",
      "Radiology report attached and signed by radiologist",
      "Lab reports signed by pathologist",
      "Investigation order present with doctor's name and date",
      "Diagnosis supports the investigation requested",
      "No duplicate investigations within 72 hours",
      "ABG report available for ventilated patients",
      "Imaging (CT/MRI) has written clinical justification note",
    ],
  },
  {
    id: "package",
    title: "2. Package Verification",
    color: "border-teal-200 bg-teal-50",
    headerColor: "bg-teal-600",
    items: [
      "Correct package code selected from approved scheme list",
      "All package inclusions verified — nothing billed separately",
      "No unbundling detected in billing line items",
      "Bilateral procedure confirmed with appropriate bilateral code",
      "Package validity checked against admission dates",
      "No duplicate package submission detected",
      "Major/minor classification matches procedure type",
    ],
  },
  {
    id: "billing",
    title: "3. Billing Verification",
    color: "border-purple-200 bg-purple-50",
    headerColor: "bg-purple-600",
    items: [
      "OPD bill is below ₹10,000 or fully justified with documents",
      "IPD bill reviewed for ₹30,000+ threshold compliance",
      "No duplicate charges found in bill line items",
      "All line items match corresponding clinical notes",
      "Charges match scheme-approved rate card",
      "Co-payment amount correctly calculated and deducted",
      "Final bill matches discharge summary totals",
      "No inflated or unverified charges included",
    ],
  },
  {
    id: "pharmacy",
    title: "4. Pharmacy Review",
    color: "border-amber-200 bg-amber-50",
    headerColor: "bg-amber-500",
    items: [
      "All medicines prescribed match the confirmed diagnosis",
      "Antibiotic use justified with culture sensitivity report",
      "No irrational drug combinations in prescription",
      "Pharmacy bill is under ₹5,000 or justified with protocol",
      "Drug administration chart attached for IPD patients",
      "Generic drug names used where applicable",
      "No duplicate prescriptions for same drug within 48 hours",
    ],
  },
  {
    id: "documentation",
    title: "5. Documentation Check",
    color: "border-green-200 bg-green-50",
    headerColor: "bg-green-600",
    items: [
      "Admission note completed within 2 hours of admission",
      "Discharge summary comprehensive and signed by doctor",
      "All consent forms signed before procedures performed",
      "Investigation reports physically attached to file",
      "Doctor's orders documented for all prescriptions and tests",
      "Nursing notes updated every shift (ICU: every 2 hours)",
      "No duplicate documents found in patient file",
      "Patient ABHA ID verified and matches all documents",
    ],
  },
];

export function CleanClaimChecklist() {
  const [checked, setChecked] = useState<
    Record<string, Record<number, boolean>>
  >(Object.fromEntries(categories.map((c) => [c.id, {}])));

  function toggle(catId: string, idx: number) {
    setChecked((prev) => ({
      ...prev,
      [catId]: { ...prev[catId], [idx]: !prev[catId][idx] },
    }));
  }

  function getCategoryProgress(catId: string, total: number): number {
    const done = Object.values(checked[catId] ?? {}).filter(Boolean).length;
    return Math.round((done / total) * 100);
  }

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const totalChecked = Object.values(checked).reduce(
    (sum, catChecks) => sum + Object.values(catChecks).filter(Boolean).length,
    0,
  );
  const overallProgress = Math.round((totalChecked / totalItems) * 100);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="checklist.back-link"
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
                  "linear-gradient(135deg, oklch(0.42 0.16 160) 0%, oklch(0.52 0.18 170) 60%, oklch(0.38 0.14 150) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  Pre-Submission Tool
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                Clean Claim Checklist
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Step-by-step pre-submission checklist covering all 5 validation
                categories
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overall Progress */}
        <div className="max-w-5xl mx-auto px-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-bold text-gray-900">
                Overall Completion
              </h2>
              <span className="text-2xl font-bold text-teal-700">
                {overallProgress}%
              </span>
            </div>
            <Progress
              value={overallProgress}
              className="h-3"
              data-ocid="checklist.overall-progress"
            />
            <p className="text-sm text-gray-500 mt-2">
              {totalChecked} of {totalItems} items verified
            </p>
          </div>
        </div>

        {/* Categories */}
        <section className="pb-12 px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {categories.map((cat, ci) => {
              const progress = getCategoryProgress(cat.id, cat.items.length);
              const doneCount = Object.values(checked[cat.id] ?? {}).filter(
                Boolean,
              ).length;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.07 }}
                  className={`rounded-2xl border overflow-hidden shadow-sm ${cat.color}`}
                  data-ocid={`checklist.category.${ci + 1}`}
                >
                  <div
                    className={`${cat.headerColor} px-6 py-4 text-white flex items-center justify-between`}
                  >
                    <h3 className="font-heading font-bold">{cat.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold opacity-90">
                        {doneCount}/{cat.items.length}
                      </span>
                      <div className="w-20 bg-white/30 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {cat.items.map((item, idx) => (
                        <li key={item}>
                          <button
                            type="button"
                            className="flex items-start gap-3 cursor-pointer group w-full text-left"
                            onClick={() => toggle(cat.id, idx)}
                            onKeyDown={(e) => {
                              if (e.key === " " || e.key === "Enter")
                                toggle(cat.id, idx);
                            }}
                            data-ocid={`checklist.${cat.id}.checkbox.${idx + 1}`}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                checked[cat.id]?.[idx]
                                  ? "bg-teal-600 border-teal-600"
                                  : "border-gray-300 group-hover:border-teal-400"
                              }`}
                            >
                              {checked[cat.id]?.[idx] && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span
                              className={`text-sm transition-colors ${
                                checked[cat.id]?.[idx]
                                  ? "text-gray-400 line-through"
                                  : "text-gray-700"
                              }`}
                            >
                              {item}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Score Card */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div
              className="rounded-2xl border border-teal-200 bg-white p-8 shadow-sm text-center"
              data-ocid="checklist.score-card"
            >
              <div className="text-6xl font-bold text-teal-700 font-heading mb-2">
                {overallProgress}%
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {overallProgress === 100
                  ? "✅ Claim is Ready for Submission!"
                  : overallProgress >= 80
                    ? "Almost Ready — A Few Items Remaining"
                    : overallProgress >= 50
                      ? "In Progress — Continue Checking"
                      : "Checklist Started"}
              </div>
              <p className="text-sm text-gray-500">
                Complete all 5 categories for a fully compliant clean claim
              </p>
            </div>
          </div>
        </section>

        {/* Back Link Bottom */}
        <div className="max-w-5xl mx-auto px-4 pb-12 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="checklist.back-link-bottom"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>
      </div>
    </Layout>
  );
}
