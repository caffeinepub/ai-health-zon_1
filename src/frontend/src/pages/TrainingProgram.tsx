import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  FileCheck,
  FileText,
  Layers,
  Shield,
  Stethoscope,
  Target,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Module data ──────────────────────────────────────────────────────────────

interface Module {
  num: number;
  title: string;
  color: "green" | "yellow" | "orange" | "red" | "purple";
  content: React.ReactNode;
}

const colorMap: Record<
  Module["color"],
  { pill: string; bg: string; border: string; text: string; badge: string }
> = {
  green: {
    pill: "bg-green-500 text-white",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800 border border-green-300",
  },
  yellow: {
    pill: "bg-amber-500 text-white",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-800 border border-amber-300",
  },
  orange: {
    pill: "bg-orange-500 text-white",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-800 border border-orange-300",
  },
  red: {
    pill: "bg-red-500 text-white",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-800 border border-red-300",
  },
  purple: {
    pill: "bg-purple-600 text-white",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-800 border border-purple-300",
  },
};

function ModuleList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
          <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ModuleSubheading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
      {children}
    </p>
  );
}

const modules: Module[] = [
  {
    num: 1,
    title: "Understanding Claim Risk Flags",
    color: "green",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          To understand how insurance schemes detect irregularities in hospital
          claims.
        </p>
        <div>
          <ModuleSubheading>Major Risk Categories</ModuleSubheading>
          <ModuleList
            items={[
              "Investigation Overuse",
              "Package Manipulation",
              "Billing Irregularities",
              "Pharmacy Overuse",
              "Documentation Errors",
            ]}
          />
        </div>
        <div>
          <ModuleSubheading>Common Claim Flags</ModuleSubheading>
          <ModuleList
            items={[
              "ABG report missing",
              "CT/MRI without clinical indication",
              "Duplicate documents",
              "Excess packages under single transaction",
              "Antibiotic overuse",
              "High OPD/IPD billing",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    num: 2,
    title: "Investigation Compliance",
    color: "green",
    content: (
      <div className="space-y-4">
        <div>
          <ModuleSubheading>High-Risk Investigations</ModuleSubheading>
          <ModuleList
            items={["CT Scan", "MRI", "ABG", "Advanced laboratory tests"]}
          />
        </div>
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Common Risk
          </p>
          <p className="text-sm text-red-600 mt-1">
            Imaging performed without clinical justification
          </p>
        </div>
        <div>
          <ModuleSubheading>Prevention Protocol</ModuleSubheading>
          <p className="text-sm text-gray-600 mb-2">
            Doctors must clearly document:
          </p>
          <ModuleList
            items={[
              "Provisional diagnosis",
              "Clinical indication",
              "Reason for investigation",
            ]}
          />
        </div>
        <div>
          <ModuleSubheading>Mandatory Documents</ModuleSubheading>
          <ModuleList
            items={[
              "Doctor investigation order",
              "Radiology report",
              "Clinical notes",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    num: 3,
    title: "Package Integrity Management",
    color: "yellow",
    content: (
      <div className="space-y-4">
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm font-semibold text-amber-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Major Claim Risk: Package
            Unbundling
          </p>
          <p className="text-sm text-amber-600 mt-1">
            Occurs when hospitals bill separately for services already included
            in a package.
          </p>
        </div>
        <div>
          <ModuleSubheading>
            Surgery Package Example (Includes)
          </ModuleSubheading>
          <ModuleList
            items={[
              "Surgeon fees",
              "Anaesthesia",
              "OT charges",
              "Nursing charges",
              "ICU stay",
            ]}
          />
          <p className="text-xs text-red-600 mt-2 font-medium">
            Billing these items separately triggers a fraud flag.
          </p>
        </div>
        <div>
          <ModuleSubheading>Prevention</ModuleSubheading>
          <ModuleList
            items={[
              "Follow scheme package inclusions",
              "Verify major vs minor packages",
              "Ensure correct billing for bilateral procedures",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    num: 4,
    title: "Billing Compliance",
    color: "yellow",
    content: (
      <div className="space-y-5">
        {[
          {
            label: "1. Multiple Packages in Single Admission",
            risk: "Excess packages booked under a single transaction.",
            items: [
              "Clinical justification for each procedure",
              "Medical audit before claim submission",
            ],
            type: "prevention",
          },
          {
            label: "2. High OPD Billing",
            risk: "Claims exceeding ₹10,000 in OPD are frequently audited.",
            items: ["Prescription", "Investigation reports", "Clinical notes"],
            type: "docs",
          },
          {
            label: "3. High IPD Billing",
            risk: "IPD claims exceeding ₹30,000 often trigger audit reviews.",
            items: [
              "Pre-submission claim verification",
              "Complete clinical documentation",
            ],
            type: "prevention",
          },
        ].map((flag) => (
          <div
            key={flag.label}
            className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <p className="text-sm font-bold text-gray-800 mb-1">{flag.label}</p>
            <p className="text-xs text-red-600 mb-2 font-medium">{flag.risk}</p>
            <ModuleSubheading>
              {flag.type === "docs" ? "Required Documents" : "Prevention"}
            </ModuleSubheading>
            <ModuleList items={flag.items} />
          </div>
        ))}
      </div>
    ),
  },
  {
    num: 5,
    title: "Pharmacy Compliance",
    color: "orange",
    content: (
      <div className="space-y-4">
        <div>
          <ModuleSubheading>High Risk Pharmacy Flags</ModuleSubheading>
          <ModuleList
            items={[
              "Pharma claims exceeding ₹5,000",
              "Multiple antibiotics prescribed",
              "Unusual drug combinations",
            ]}
          />
        </div>
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl">
          <p className="text-sm font-semibold text-teal-700">Prevention</p>
          <p className="text-sm text-teal-600 mt-1">
            Hospitals must implement an{" "}
            <strong>Antibiotic Stewardship Policy</strong>.
          </p>
        </div>
        <div>
          <ModuleSubheading>Required Documentation</ModuleSubheading>
          <ModuleList
            items={[
              "Culture reports",
              "Doctor justification",
              "Treatment protocol",
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    num: 6,
    title: "Documentation Compliance",
    color: "orange",
    content: (
      <div className="space-y-4">
        <div>
          <ModuleSubheading>Most Common Documentation Errors</ModuleSubheading>
          <div className="space-y-2">
            {[
              "Missing investigation reports",
              "Duplicate documents",
              "Wrong patient document uploads",
              "Incomplete discharge summaries",
            ].map((err, i) => (
              <div
                key={err}
                className="flex items-center gap-3 p-2.5 bg-red-50 border border-red-100 rounded-lg"
              >
                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{err}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ModuleSubheading>Medical Records Dept Must Verify</ModuleSubheading>
          <ModuleList
            items={["Patient ID", "Admission number", "Document matching"]}
          />
        </div>
      </div>
    ),
  },
  {
    num: 7,
    title: "Clean Claim Checklist",
    color: "red",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Before submitting any claim, hospitals must verify all of the
          following:
        </p>
        {[
          {
            cat: "Investigation Validation",
            items: ["All investigations justified", "Reports attached"],
          },
          {
            cat: "Package Verification",
            items: ["Correct package selected", "No duplicate packages"],
          },
          {
            cat: "Billing Verification",
            items: ["No OPD/IPD duplication", "No inflated billing"],
          },
          {
            cat: "Pharmacy Review",
            items: [
              "Medicines match diagnosis",
              "No irrational drug combinations",
            ],
          },
          {
            cat: "Documentation Check",
            items: ["All reports attached", "No duplicate documents"],
          },
        ].map((section) => (
          <div key={section.cat}>
            <ModuleSubheading>{section.cat}</ModuleSubheading>
            <ModuleList items={section.items} />
          </div>
        ))}
      </div>
    ),
  },
  {
    num: 8,
    title: "Case Study Training",
    color: "red",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Real claim scenarios used to train hospital teams.
        </p>
        {[
          {
            title: "Case Study 1",
            issue: "CT/MRI booked without clinical indication",
            cause: "Doctor failed to document clinical reason.",
            solution: "Add investigation justification note.",
          },
          {
            title: "Case Study 2",
            issue: "Package claimed twice for same beneficiary",
            cause: "Repeat claim submission.",
            solution: "Verify patient treatment history.",
          },
          {
            title: "Case Study 3",
            issue: "Unusual medicine combinations",
            cause: "Prescription error.",
            solution: "Pharmacy verification and protocol compliance.",
          },
        ].map((cs) => (
          <div
            key={cs.title}
            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <p className="font-bold text-sm text-gray-800 mb-3">{cs.title}</p>
            <div className="space-y-2">
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                  Issue
                </span>
                <p className="text-sm text-gray-700">{cs.issue}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                  Root Cause
                </span>
                <p className="text-sm text-gray-700">{cs.cause}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider">
                  Solution
                </span>
                <p className="text-sm text-gray-700">{cs.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: 9,
    title: "Hospital Claim Command Centre Model",
    color: "purple",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Hospitals should implement a{" "}
          <strong>five-layer claim monitoring system</strong>.
        </p>
        <div>
          <ModuleSubheading>Five Layer Claim Audit Framework</ModuleSubheading>
          <div className="space-y-2">
            {[
              "Investigation Audit",
              "Package Integrity Check",
              "Billing Validation",
              "Pharmacy Review",
              "Documentation Audit",
            ].map((layer, i) => (
              <div
                key={layer}
                className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-100 rounded-xl"
              >
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-purple-800">
                  {layer}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl">
          <p className="text-sm font-semibold text-teal-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Result
          </p>
          <p className="text-sm text-teal-600 mt-1">
            This system significantly reduces claim rejections.
          </p>
        </div>
      </div>
    ),
  },
];

// ── Module Accordion Card ─────────────────────────────────────────────────────

function ModuleCard({ module }: { module: Module }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[module.color];
  return (
    <div
      className={`rounded-2xl border ${c.border} bg-white overflow-hidden shadow-sm`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        data-ocid={`training.module.${module.num}.toggle`}
      >
        <span
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${c.pill}`}
        >
          {module.num.toString().padStart(2, "0")}
        </span>
        <span className="font-heading font-bold text-gray-800 flex-1">
          {module.title}
        </span>
        <span
          className={`text-xs font-semibold ${c.badge} px-2 py-0.5 rounded-full mr-2`}
        >
          Module {module.num}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className={`px-5 pb-5 border-t ${c.border} ${c.bg}`}
        >
          <div className="pt-4">{module.content}</div>
        </motion.div>
      )}
    </div>
  );
}

// ── Training Material Card with Link ─────────────────────────────────────────

type MaterialItem = {
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  href: string;
  hoverBorder: string;
};

const trainingMaterials: MaterialItem[] = [
  {
    title: "Claim Bible Manual",
    desc: "Comprehensive reference guide covering all claim types, risk categories, and compliance rules",
    icon: BookOpen,
    color: "text-teal-600",
    bg: "bg-teal-50",
    href: "/training-materials/claim-bible",
    hoverBorder: "hover:border-teal-400",
  },
  {
    title: "Clean Claim Checklist",
    desc: "Step-by-step pre-submission checklist covering all 5 validation categories",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    href: "/training-materials/clean-claim-checklist",
    hoverBorder: "hover:border-green-400",
  },
  {
    title: "Claim Audit Templates",
    desc: "Ready-to-use audit forms for investigations, packages, billing, pharmacy, and documentation",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/training-materials/claim-audit-templates",
    hoverBorder: "hover:border-blue-400",
  },
  {
    title: "Department Responsibility Matrix",
    desc: "Assigns accountability for each claim stage across all hospital departments",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
    href: "/training-materials/department-responsibility-matrix",
    hoverBorder: "hover:border-purple-400",
  },
  {
    title: "Investigation Justification Format",
    desc: "Standardized format for documenting clinical indication and necessity for all investigations",
    icon: FileCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
    href: "/training-materials/investigation-justification",
    hoverBorder: "hover:border-amber-400",
  },
];

// ── Main Program Info Export ───────────────────────────────────────────────────

export function TrainingProgramInfo() {
  return (
    <>
      {/* Program Overview Banner */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 md:p-8 text-white shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.42 0.14 188) 0%, oklch(0.52 0.18 200) 60%, oklch(0.38 0.12 188) 100%)",
            }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-semibold">
                <Zap className="w-3 h-3" /> TTP Health – HARMONY Claim Command
                Centre
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-semibold">
                <Shield className="w-3 h-3" /> PMJAY | RGHS | Chiranjeevi | MAA
                | Private Insurance
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              Claim Protection & Show-Cause Prevention Masterclass
            </h2>
            <p className="text-white/80 text-sm max-w-2xl">
              A comprehensive structured training program helping hospitals
              prevent claim rejection, reduce show-cause notices, and improve
              clean claim ratio across government and insurance empanelled
              facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="px-4 py-6 bg-white">
        <img
          src="/assets/generated/hero-training-ai-health-zon.dim_1200x600.jpg"
          alt="Hospital staff training and masterclass program"
          className="w-full max-w-5xl mx-auto rounded-2xl object-cover shadow-xl"
          style={{ aspectRatio: "16/7" }}
        />
      </div>

      {/* Program Objective */}
      <section className="py-10 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Target className="w-3.5 h-3.5" /> Program Objective
            </span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
              What This Program Achieves
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              This training program is designed to help hospitals{" "}
              <strong>
                prevent claim rejection, reduce show-cause notices, and improve
                clean claim ratio
              </strong>{" "}
              through structured claim management practices.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: TrendingDown,
                text: "Reduce claim rejections",
                color: "text-red-600",
                bg: "bg-red-50",
              },
              {
                icon: Shield,
                text: "Prevent show-cause notices",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                icon: FileCheck,
                text: "Improve documentation quality",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: FileText,
                text: "Strengthen billing compliance",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: CheckCircle,
                text: "Increase clean claim submission rate",
                color: "text-teal-600",
                bg: "bg-teal-50",
              },
              {
                icon: Award,
                text: "Improve revenue cycle efficiency",
                color: "text-green-600",
                bg: "bg-green-50",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Participants */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" /> Target Participants
            </span>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Who Should Attend
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                group: "Hospital Leadership",
                color: "border-purple-200 bg-purple-50",
                headerBg: "bg-purple-600",
                members: [
                  "Directors",
                  "Medical Superintendents",
                  "Administrators",
                ],
              },
              {
                group: "Operational Teams",
                color: "border-blue-200 bg-blue-50",
                headerBg: "bg-blue-600",
                members: [
                  "Billing Department",
                  "Insurance / TPA Desk",
                  "Revenue Cycle Management Team",
                  "Medical Records Department",
                ],
              },
              {
                group: "Clinical Teams",
                color: "border-green-200 bg-green-50",
                headerBg: "bg-green-600",
                members: ["Doctors", "Nursing Supervisors", "ICU Teams"],
              },
              {
                group: "Support Departments",
                color: "border-amber-200 bg-amber-50",
                headerBg: "bg-amber-500",
                members: ["Pharmacy", "Radiology", "Laboratory"],
              },
            ].map((group, i) => (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className={`rounded-2xl border ${group.color} overflow-hidden shadow-sm`}
              >
                <div className={`${group.headerBg} text-white px-4 py-3`}>
                  <p className="font-heading font-bold text-sm">
                    {group.group}
                  </p>
                </div>
                <div className="px-4 py-4">
                  <ul className="space-y-2">
                    {group.members.map((m) => (
                      <li
                        key={m}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 Training Modules */}
      <section className="py-10 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" /> Training Structure
            </span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
              9 Structured Training Modules
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Covering the complete claim lifecycle — from risk detection to
              Command Centre implementation
            </p>
          </motion.div>
          <div className="space-y-3">
            {modules.map((module) => (
              <ModuleCard key={module.num} module={module} />
            ))}
          </div>
        </div>
      </section>

      {/* Training Duration */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5" /> Training Duration
            </span>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Choose Your Training Format
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-2xl border border-teal-200 shadow-sm overflow-hidden"
            >
              <div
                className="px-5 py-4 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.42 0.14 188) 0%, oklch(0.52 0.18 200) 100%)",
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                  Option 1
                </p>
                <p className="font-heading font-bold text-xl">Full Workshop</p>
                <p className="text-sm opacity-80 mt-0.5">
                  Duration: 1 Full Day
                </p>
              </div>
              <div className="p-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Session
                      </th>
                      <th className="text-right py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      ["Claim Risk Overview", "45 min"],
                      ["Investigation Compliance", "45 min"],
                      ["Package Integrity", "45 min"],
                      ["Billing Red Flags", "45 min"],
                      ["Pharmacy Compliance", "30 min"],
                      ["Documentation Audit", "30 min"],
                      ["Case Studies", "45 min"],
                      ["Q&A", "30 min"],
                    ].map(([session, duration]) => (
                      <tr key={session} className="hover:bg-gray-50">
                        <td className="py-2.5 text-gray-700">{session}</td>
                        <td className="py-2.5 text-right font-semibold text-teal-700">
                          {duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Option 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 text-white bg-gradient-to-br from-blue-600 to-blue-800">
                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                  Option 2
                </p>
                <p className="font-heading font-bold text-xl">
                  Executive Masterclass
                </p>
                <p className="text-sm opacity-80 mt-0.5">Duration: 3 Hours</p>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4">
                  A condensed, high-impact session for hospital leadership and
                  senior management.
                </p>
                <div className="space-y-3">
                  {[
                    "Claim risk framework overview",
                    "Top 25 claim flags deep-dive",
                    "Clean claim checklist walkthrough",
                    "Case study discussion and Q&A",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Materials — Clickable Cards */}
      <section className="py-10 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" /> Training Materials
            </span>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Resources Provided to Participants
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Click any resource below to view the full detailed guide
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingMaterials.map((mat, i) => {
              const Icon = mat.icon;
              return (
                <motion.div
                  key={mat.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                >
                  <Link
                    to={mat.href}
                    className={`group block bg-white rounded-2xl border border-gray-200 shadow-sm p-5 transition-all duration-200 ${mat.hoverBorder} hover:shadow-md`}
                    data-ocid={`training.material.${i + 1}.link`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${mat.bg}`}
                    >
                      <Icon className={`w-5 h-5 ${mat.color}`} />
                    </div>
                    <h3 className="font-heading font-bold text-sm text-gray-900 mb-1">
                      {mat.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      {mat.desc}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold ${mat.color} group-hover:gap-2 transition-all`}
                    >
                      View Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" /> Expected Outcomes
            </span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
              What Hospitals Typically Achieve
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              After implementing the training framework, hospitals consistently
              report measurable improvements across all key metrics
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                stat: "40–60%",
                label: "Reduction in claim rejections",
                color: "text-teal-700",
                bg: "bg-teal-50",
                border: "border-teal-200",
              },
              {
                stat: "60–70%",
                label: "Reduction in show-cause notices",
                color: "text-blue-700",
                bg: "bg-blue-50",
                border: "border-blue-200",
              },
              {
                stat: "Faster",
                label: "Claim approval cycles",
                color: "text-green-700",
                bg: "bg-green-50",
                border: "border-green-200",
              },
              {
                stat: "Higher",
                label: "Documentation standards",
                color: "text-purple-700",
                bg: "bg-purple-50",
                border: "border-purple-200",
              },
              {
                stat: "Stronger",
                label: "Compliance with insurance schemes",
                color: "text-amber-700",
                bg: "bg-amber-50",
                border: "border-amber-200",
              },
            ].map((outcome, i) => (
              <motion.div
                key={outcome.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`rounded-2xl border ${outcome.border} ${outcome.bg} p-6 text-center shadow-sm`}
              >
                <div
                  className={`font-heading font-bold text-4xl mb-2 ${outcome.color}`}
                >
                  {outcome.stat}
                </div>
                <div className="text-sm text-gray-700 font-medium">
                  {outcome.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About HARMONY */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl p-6 md:p-8 text-white shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.38 0.14 188) 0%, oklch(0.48 0.16 200) 60%, oklch(0.42 0.15 188) 100%)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-lg">
                  About AI Health Zon – HARMONY
                </p>
                <p className="text-white/70 text-xs">
                  HARMONY Claim Command Centre
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "AI-based claim risk detection",
                "Pre-submission claim audit",
                "Clean claim frameworks",
                "Hospital claim training programs",
                "Centralized claim monitoring",
              ].map((cap) => (
                <div key={cap} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-300 shrink-0" />
                  <span className="text-sm text-white/90">{cap}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider to game */}
      <div className="py-6 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />
            <div
              className="rounded-2xl px-6 py-3 text-white shadow-md text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.42 0.14 188) 0%, oklch(0.52 0.18 200) 100%)",
              }}
            >
              <p className="font-heading font-bold text-sm">
                Interactive Training Simulation
              </p>
              <p className="text-xs text-white/70 mt-0.5">
                10-Stage Multi-Role Team Experience Below
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
}
