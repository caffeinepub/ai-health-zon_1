import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Award,
  CheckCircle,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  Home,
  Monitor,
  RotateCcw,
  Shield,
  Star,
  Stethoscope,
  TrendingUp,
  Trophy,
  UserCheck,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type RoleId =
  | "front-desk"
  | "rcm-manager"
  | "clinician"
  | "command-centre"
  | "quality-nabh"
  | "insurer-tpa";

type OutcomeKey = "good" | "query" | "reject";

interface PlayerRole {
  id: RoleId;
  player: number;
  title: string;
  description: string;
  accent: string;
  accentLight: string;
  accentText: string;
  accentBorder: string;
  icon: React.ComponentType<{ className?: string }>;
  stageTasks: Record<number, string[]>;
}

interface Stage {
  num: number;
  name: string;
  focus: string;
  twist: string;
  statusColor: "green" | "yellow" | "orange" | "red" | "purple";
  outcomes: Record<
    OutcomeKey,
    {
      label: string;
      pts: number;
      color: string;
      icon: React.ComponentType<{ className?: string }>;
    }
  >;
  winCondition?: string;
}

interface PlayerScore {
  roleId: RoleId;
  stageScores: Record<number, number>;
  outcomes: Record<number, OutcomeKey>;
  tasks: Record<number, boolean[]>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const playerRoles: PlayerRole[] = [
  {
    id: "front-desk",
    player: 1,
    title: "Front Desk",
    description:
      "Patient registration, insurance verification, ABHA ID creation and document coordination.",
    accent: "bg-teal-500",
    accentLight: "bg-teal-50",
    accentText: "text-teal-700",
    accentBorder: "border-teal-200",
    icon: UserCheck,
    stageTasks: {
      1: [
        "Capture patient demographics accurately",
        "Verify insurance details and policy number",
        "Create ABHA ID for patient",
      ],
      2: [
        "Check policy validity and expiry date",
        "Confirm coverage limits with insurer",
        "Map insurance to hospital tariff package",
      ],
      3: [
        "Submit pre-auth documents to TPA portal",
        "Ensure all required documents are attached",
        "Track pre-auth submission status",
      ],
      4: [
        "Collect all consent forms from patient",
        "Compile admission documents checklist",
        "Ensure room type matches tariff category",
      ],
      5: [
        "Update patient movement and transfer records",
        "Maintain procedure billing log in real-time",
        "Flag any discrepancies in patient records",
      ],
      6: [
        "Compile final claim document package",
        "Cross-check all reports are attached",
        "Confirm patient discharge readiness",
      ],
      7: [
        "Pull all original documents for appeal",
        "Organize evidence for rejection reversal",
        "Coordinate with RCM Manager on appeal",
      ],
      8: [
        "Prepare final discharge documents",
        "Verify patient and next-of-kin acknowledgment",
        "Collect and file all signed documents",
      ],
      9: [
        "Respond to patient and family queries",
        "Update patient status in front desk system",
        "Coordinate with nursing for discharge flow",
      ],
      10: [
        "Present patient experience improvements",
        "Propose front desk SOP enhancements",
        "Recommend registration accuracy measures",
      ],
    },
  },
  {
    id: "rcm-manager",
    player: 2,
    title: "RCM Manager",
    description:
      "Claims oversight, denial management, revenue optimization and clean claim rate improvement.",
    accent: "bg-blue-600",
    accentLight: "bg-blue-50",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200",
    icon: TrendingUp,
    stageTasks: {
      1: [
        "Verify insurance details match hospital records",
        "Flag high-risk payer accounts",
        "Set up billing profile for patient",
      ],
      2: [
        "Map insurance package to hospital tariff",
        "Identify sub-limits and exclusions",
        "Brief front desk on coverage restrictions",
      ],
      3: [
        "Ensure clinical justification is attached",
        "Review pre-auth submission for completeness",
        "Coordinate with Clinician on documentation",
      ],
      4: [
        "Confirm tariff category and room allocation",
        "Validate insurance package match",
        "Set up claim tracking in RCM system",
      ],
      5: [
        "Track procedure billing codes in real-time",
        "Validate ICD-10 and CPT coding accuracy",
        "Flag potential billing discrepancies early",
      ],
      6: [
        "Submit final claim with all validations",
        "Validate package against clinical documentation",
        "Attach all required reports and summaries",
      ],
      7: [
        "Analyze rejection reason code thoroughly",
        "Prepare comprehensive appeal documentation",
        "Coordinate multi-department appeal response",
      ],
      8: [
        "Verify final bill matches approved package",
        "Reconcile all billing line items",
        "Prepare final settlement claim",
      ],
      9: [
        "Prioritize high-value pending claims",
        "Deploy denial management protocols",
        "Coordinate rapid response for critical claims",
      ],
      10: [
        "Present clean claim improvement plan",
        "Outline denial reduction strategy",
        "Propose revenue optimization roadmap",
      ],
    },
  },
  {
    id: "clinician",
    player: 3,
    title: "Clinician",
    description:
      "Clinical documentation, diagnosis coding, treatment validation and discharge summary generation.",
    accent: "bg-green-600",
    accentLight: "bg-green-50",
    accentText: "text-green-700",
    accentBorder: "border-green-200",
    icon: Stethoscope,
    stageTasks: {
      1: [
        "Confirm patient identity before consultation",
        "Review referral and prior medical history",
        "Document initial clinical assessment",
      ],
      2: [
        "Review insurance coverage for planned procedure",
        "Identify any non-covered clinical requirements",
        "Discuss treatment plan with patient",
      ],
      3: [
        "Write comprehensive clinical notes for pre-auth",
        "Justify medical necessity clearly",
        "Coordinate with TPA on clinical queries",
      ],
      4: [
        "Complete admission notes within required TAT",
        "Document initial diagnosis and doctor orders",
        "Obtain and sign all consent forms",
      ],
      5: [
        "Update daily progress notes accurately",
        "Code procedures and diagnoses (ICD-10)",
        "Document any complications or changes",
      ],
      6: [
        "Sign off on final diagnosis and procedure list",
        "Validate clinical documentation completeness",
        "Review final claim for clinical accuracy",
      ],
      7: [
        "Provide additional clinical justification",
        "Prepare detailed medical necessity letter",
        "Support RCM Manager with clinical evidence",
      ],
      8: [
        "Generate accurate and complete discharge summary",
        "Confirm all procedures and diagnoses coded",
        "Review final bill for clinical accuracy",
      ],
      9: [
        "Ensure all clinical documentation is current",
        "Review pending cases for documentation gaps",
        "Support Command Centre with clinical data",
      ],
      10: [
        "Present clinical documentation accuracy plan",
        "Propose coding quality improvement measures",
        "Outline physician training recommendations",
      ],
    },
  },
  {
    id: "command-centre",
    player: 4,
    title: "Claim Command Centre Lead",
    description:
      "Dashboard monitoring, KPI tracking, department alerts and real-time claim status management.",
    accent: "bg-purple-600",
    accentLight: "bg-purple-50",
    accentText: "text-purple-700",
    accentBorder: "border-purple-200",
    icon: Monitor,
    stageTasks: {
      1: [
        "Monitor registration queue KPIs on dashboard",
        "Flag long-pending registrations for action",
        "Track daily registration accuracy metrics",
      ],
      2: [
        "Flag high-risk payer cases on dashboard",
        "Monitor insurance verification TAT",
        "Alert on pending eligibility confirmations",
      ],
      3: [
        "Track pending pre-auth TAT on dashboard",
        "Send alerts for pre-auth approaching deadline",
        "Monitor pre-auth approval rates by insurer",
      ],
      4: [
        "Update admission status on live dashboard",
        "Monitor bed utilization and admission flow",
        "Flag high-risk cases for priority attention",
      ],
      5: [
        "Monitor clinical documentation completion rates",
        "Send alerts on documentation delays",
        "Track coding accuracy by department",
      ],
      6: [
        "Track live claim submission status",
        "Monitor real-time claim acceptance rates",
        "Flag high-risk claims for immediate review",
      ],
      7: [
        "Escalate high-value denials to management",
        "Monitor denial patterns by insurer",
        "Deploy denial management task force",
      ],
      8: [
        "Confirm discharge clearance on dashboard",
        "Monitor pending discharge documentation",
        "Track final bill processing TAT",
      ],
      9: [
        "Identify root cause from dashboard data",
        "Deploy targeted response team",
        "Implement crisis management protocol",
      ],
      10: [
        "Present dashboard optimization strategy",
        "Propose new KPI monitoring framework",
        "Recommend alert system improvements",
      ],
    },
  },
  {
    id: "quality-nabh",
    player: 5,
    title: "Quality / NABH",
    description:
      "Compliance checks, audit readiness, NABH standards enforcement and quality indicator monitoring.",
    accent: "bg-orange-500",
    accentLight: "bg-orange-50",
    accentText: "text-orange-700",
    accentBorder: "border-orange-200",
    icon: Shield,
    stageTasks: {
      1: [
        "Check registration SOP compliance",
        "Verify ABHA ID creation protocol followed",
        "Audit patient information accuracy",
      ],
      2: [
        "Verify consent obtained for non-covered items",
        "Ensure insurance disclosure protocols followed",
        "Check financial counseling documentation",
      ],
      3: [
        "Confirm pre-auth SOP adherence",
        "Validate clinical justification quality standards",
        "Check TPA communication protocols",
      ],
      4: [
        "Verify all consent documents are compliant",
        "Audit admission documentation checklist",
        "Check NABH compliance for admission process",
      ],
      5: [
        "Audit clinical records for NABH completeness",
        "Review coding accuracy against NABH standards",
        "Flag documentation quality issues",
      ],
      6: [
        "Conduct final compliance check before submission",
        "Verify all NABH documentation requirements met",
        "Ensure audit trail is complete",
      ],
      7: [
        "Review if denial is compliance-related",
        "Check for documentation gaps causing rejection",
        "Assess quality improvement opportunity",
      ],
      8: [
        "Review discharge documentation quality",
        "Ensure NABH discharge summary standards met",
        "Conduct final quality audit before closure",
      ],
      9: [
        "Trigger internal audit protocol",
        "Identify systemic quality issues",
        "Deploy corrective action framework",
      ],
      10: [
        "Present NABH readiness action plan",
        "Outline quality indicator improvement strategy",
        "Propose compliance monitoring enhancements",
      ],
    },
  },
  {
    id: "insurer-tpa",
    player: 6,
    title: "Insurer / TPA",
    description:
      "Policy validation, pre-authorization decisions, claim adjudication and payment authorization.",
    accent: "bg-red-500",
    accentLight: "bg-red-50",
    accentText: "text-red-700",
    accentBorder: "border-red-200",
    icon: FileText,
    stageTasks: {
      1: [
        "Confirm policy details match submitted data",
        "Verify patient beneficiary enrollment",
        "Check policy for any active endorsements",
      ],
      2: [
        "Confirm policy is active and not lapsed",
        "Review and communicate all sub-limits",
        "Validate network hospital eligibility",
      ],
      3: [
        "Review pre-auth request within TAT",
        "Request additional documents if required",
        "Issue pre-auth approval or query",
      ],
      4: [
        "Acknowledge admission intimation within TAT",
        "Confirm coverage for admission category",
        "Flag any policy coverage concerns",
      ],
      5: [
        "Review interim documentation if requested",
        "Validate procedure codes against policy coverage",
        "Monitor claim progression",
      ],
      6: [
        "Receive and validate submitted claim",
        "Check claim against policy terms",
        "Raise queries or approve claim",
      ],
      7: [
        "Review appeal with fresh documentation",
        "Provide detailed rejection rationale",
        "Facilitate fair claim adjudication",
      ],
      8: [
        "Review final bill before payment authorization",
        "Validate package amounts against policy",
        "Process payment authorization",
      ],
      9: [
        "Expedite pending claim approvals",
        "Prioritize high-value outstanding claims",
        "Provide rapid query resolution",
      ],
      10: [
        "Present faster adjudication strategy",
        "Propose streamlined claim processing model",
        "Recommend TPA-hospital collaboration improvements",
      ],
    },
  },
];

const stageColorClasses: Record<
  Stage["statusColor"],
  {
    pill: string;
    bg: string;
    border: string;
    text: string;
    bar: string;
    twist: string;
  }
> = {
  green: {
    pill: "bg-green-500 text-white",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    bar: "bg-green-500",
    twist: "bg-green-50 border-green-200 text-green-800",
  },
  yellow: {
    pill: "bg-amber-500 text-white",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    bar: "bg-amber-500",
    twist: "bg-amber-50 border-amber-200 text-amber-800",
  },
  orange: {
    pill: "bg-orange-500 text-white",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    bar: "bg-orange-500",
    twist: "bg-orange-50 border-orange-200 text-orange-800",
  },
  red: {
    pill: "bg-red-500 text-white",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    bar: "bg-red-500",
    twist: "bg-red-50 border-red-200 text-red-800",
  },
  purple: {
    pill: "bg-purple-600 text-white",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    bar: "bg-purple-600",
    twist: "bg-purple-50 border-purple-200 text-purple-800",
  },
};

const gameStages: Stage[] = [
  {
    num: 1,
    name: "Smart Registration",
    focus: "Patient onboarding accuracy",
    twist: "❗ Incomplete patient data appears — act fast to correct it",
    statusColor: "green",
    winCondition: "≥95% data accuracy",
    outcomes: {
      good: {
        label: "Perfect registration",
        pts: 10,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Minor error corrected",
        pts: -5,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Major data miss",
        pts: -12,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 2,
    name: "Insurance Intelligence",
    focus: "Eligibility verification",
    twist: "⚠ Policy looks valid but has critical sub-limits",
    statusColor: "green",
    outcomes: {
      good: {
        label: "Correct verification",
        pts: 15,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Delay in verification",
        pts: -5,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Missed exclusion",
        pts: -15,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 3,
    name: "Pre-Auth Power Play",
    focus: "Pre-authorisation",
    twist: "⏳ TPA asks for additional clinical documents",
    statusColor: "yellow",
    outcomes: {
      good: {
        label: "First-time approval",
        pts: 20,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Query raised by TPA",
        pts: -8,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Pre-auth rejected",
        pts: -20,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 4,
    name: "Admission Control",
    focus: "Documentation discipline",
    twist: "🚨 Missing consent discovered mid-case",
    statusColor: "yellow",
    winCondition: "Complete file on admission",
    outcomes: {
      good: {
        label: "Complete file",
        pts: 15,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Late correction",
        pts: -10,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Non-compliance",
        pts: -18,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 5,
    name: "Clinical Documentation Race",
    focus: "Real-time documentation",
    twist: "⚡ Emergency case interrupts workflow",
    statusColor: "orange",
    outcomes: {
      good: {
        label: "Clean documentation",
        pts: 20,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Delay in update",
        pts: -8,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Coding error found",
        pts: -12,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 6,
    name: "Live Claim Submission",
    focus: "Claim Command Centre usage",
    twist: "📉 System flags high-risk department",
    statusColor: "orange",
    outcomes: {
      good: {
        label: "Clean claim submitted",
        pts: 25,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Query raised",
        pts: -10,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Claim rejected",
        pts: -25,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 7,
    name: "Denial Defense",
    focus: "Rejection management",
    twist: "🔥 Multiple denials hit simultaneously",
    statusColor: "red",
    outcomes: {
      good: {
        label: "Successful appeal",
        pts: 30,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Partial recovery",
        pts: 10,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Failed appeal",
        pts: -20,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 8,
    name: "Discharge Precision",
    focus: "Final bill accuracy",
    twist: "💣 Package mismatch discovered at discharge",
    statusColor: "red",
    winCondition: "Zero-error final bill",
    outcomes: {
      good: {
        label: "Zero-error bill",
        pts: 25,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Minor correction",
        pts: -8,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Major rework needed",
        pts: -20,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 9,
    name: "Claim Command Centre Crisis",
    focus: "Leadership decision-making",
    twist:
      "🖥 Dashboard: Approved 80% | Pending 14% | Rejected 6% — Gen. Medicine: HIGH RISK",
    statusColor: "purple",
    outcomes: {
      good: {
        label: "Correct diagnosis + action",
        pts: 45,
        color: "text-green-600",
        icon: CheckCircle,
      },
      query: {
        label: "Partial action plan",
        pts: 15,
        color: "text-amber-600",
        icon: AlertTriangle,
      },
      reject: {
        label: "Wrong focus / missed root cause",
        pts: -15,
        color: "text-red-600",
        icon: XCircle,
      },
    },
  },
  {
    num: 10,
    name: "Revenue Board Review",
    focus: "Executive strategy — Final Boss",
    twist:
      "👑 Judged by the Revenue Board on strategy clarity, data use, innovation & feasibility",
    statusColor: "purple",
    outcomes: {
      good: {
        label: "Strong strategy presentation",
        pts: 85,
        color: "text-green-600",
        icon: Trophy,
      },
      query: {
        label: "Adequate presentation",
        pts: 40,
        color: "text-amber-600",
        icon: Star,
      },
      reject: {
        label: "Weak/unclear strategy",
        pts: 10,
        color: "text-red-600",
        icon: AlertTriangle,
      },
    },
  },
];

const victoryLevels = [
  {
    min: 95,
    title: "AI Health Zon Master",
    emoji: "🏆",
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-800",
  },
  {
    min: 85,
    title: "Revenue Champion",
    emoji: "⭐",
    bg: "bg-sky-50",
    border: "border-sky-300",
    text: "text-sky-800",
  },
  {
    min: 70,
    title: "Claim Performer",
    emoji: "👍",
    bg: "bg-teal-50",
    border: "border-teal-300",
    text: "text-teal-800",
  },
  {
    min: 0,
    title: "Needs RCM Training",
    emoji: "⚠️",
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
  },
];

function getVictoryLevel(score: number) {
  return (
    victoryLevels.find((v) => score >= v.min) ??
    victoryLevels[victoryLevels.length - 1]
  );
}

const MAX_POSSIBLE_SCORE = gameStages.reduce(
  (sum, s) => sum + s.outcomes.good.pts,
  0,
);

function calcFinalScore(stagePoints: number): number {
  const raw = (stagePoints / MAX_POSSIBLE_SCORE) * 100;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

// ─── Role Selection Screen ─────────────────────────────────────────────────────

interface RoleCardProps {
  role: PlayerRole;
  selected: boolean;
  onToggle: () => void;
}

function RoleCard({ role, selected, onToggle }: RoleCardProps) {
  const Icon = role.icon;
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        selected
          ? `${role.accentBorder.replace("border-", "border-2 border-")} ${role.accentLight} shadow-lg`
          : "border-border bg-white shadow-sm hover:shadow-md"
      }`}
    >
      {/* Player number badge */}
      <div
        className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${role.accent}`}
      >
        P{role.player}
      </div>

      {/* Selected checkmark */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute top-10 right-3 w-5 h-5 rounded-full ${role.accent} flex items-center justify-center`}
        >
          <CheckCircle className="w-3 h-3 text-white" />
        </motion.div>
      )}

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
          selected ? role.accent : role.accentLight
        }`}
      >
        <Icon
          className={`w-6 h-6 ${selected ? "text-white" : role.accentText}`}
        />
      </div>

      {/* Content */}
      <h3
        className={`font-heading font-bold text-base mb-1 ${
          selected ? role.accentText : "text-foreground"
        }`}
      >
        {role.title}
      </h3>
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
        {role.description}
      </p>

      {/* Selected indicator */}
      <div
        className={`mt-3 text-xs font-semibold flex items-center gap-1 transition-colors ${
          selected ? role.accentText : "text-muted-foreground"
        }`}
      >
        {selected ? (
          <>
            <CheckCircle className="w-3.5 h-3.5" /> Selected
          </>
        ) : (
          <>
            <ChevronRight className="w-3.5 h-3.5" /> Click to select
          </>
        )}
      </div>
    </motion.button>
  );
}

// ─── Stage Navigator ───────────────────────────────────────────────────────────

interface StageNavProps {
  currentStage: number;
  completedStages: Set<number>;
  onSelect: (n: number) => void;
}

function StageNavigator({
  currentStage,
  completedStages,
  onSelect,
}: StageNavProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
      {gameStages.map((s) => {
        const done = completedStages.has(s.num);
        const active = currentStage === s.num;
        const c = stageColorClasses[s.statusColor];
        return (
          <button
            key={s.num}
            type="button"
            onClick={() => onSelect(s.num)}
            className={`shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active
                ? `${c.bg} ${c.border} ${c.text} shadow-md`
                : done
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-border text-muted-foreground hover:bg-muted/40"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                done
                  ? "bg-green-500 text-white"
                  : active
                    ? c.pill
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? "✓" : s.num}
            </span>
            <span className="text-[9px] font-medium whitespace-nowrap max-w-[60px] leading-tight text-center">
              {s.name.split(" ").slice(0, 2).join(" ")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Score Panel ───────────────────────────────────────────────────────────────

interface ScorePanelProps {
  selectedRoles: RoleId[];
  playerScores: Record<RoleId, PlayerScore>;
  currentStage: number;
}

function ScorePanel({
  selectedRoles,
  playerScores,
  currentStage,
}: ScorePanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-500" />
        <h3 className="font-heading font-bold text-sm text-foreground">
          Live Scores
        </h3>
        <Badge variant="outline" className="ml-auto text-[10px]">
          Stage {currentStage}/10
        </Badge>
      </div>
      <div className="space-y-2">
        {selectedRoles.map((roleId) => {
          const role = playerRoles.find((r) => r.id === roleId)!;
          const score = playerScores[roleId];
          const totalPts = Object.values(score.stageScores).reduce(
            (a, b) => a + b,
            0,
          );
          const pct = calcFinalScore(totalPts);
          const Icon = role.icon;
          return (
            <div key={roleId} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${role.accentLight}`}
              >
                <Icon className={`w-3.5 h-3.5 ${role.accentText}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-medium text-foreground truncate">
                    {role.title}
                  </span>
                  <span
                    className={`text-xs font-bold ${totalPts >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {totalPts >= 0 ? `+${totalPts}` : totalPts}
                  </span>
                </div>
                <Progress value={Math.max(0, pct)} className="h-1.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Task Panel ────────────────────────────────────────────────────────────────

interface TaskPanelProps {
  role: PlayerRole;
  stage: Stage;
  tasks: boolean[];
  onTaskToggle: (idx: number) => void;
  outcome: OutcomeKey | null;
  onSubmit: (outcome: OutcomeKey) => void;
  isSubmitted: boolean;
  showCreatures?: boolean;
}

function TaskPanel({
  role,
  stage,
  tasks,
  onTaskToggle,
  outcome,
  onSubmit,
  isSubmitted,
  showCreatures = true,
}: TaskPanelProps) {
  const Icon = role.icon;
  const c = stageColorClasses[stage.statusColor];
  const roleTasks = role.stageTasks[stage.num] ?? [];
  const allChecked = tasks.every(Boolean);

  return (
    <motion.div
      key={`${role.id}-${stage.num}`}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      {/* Role header */}
      <div
        className={`flex items-center gap-3 px-5 py-4 ${role.accentLight} border-b ${role.accentBorder}`}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${role.accent}`}
        >
          <Icon className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <p className={`font-heading font-bold text-sm ${role.accentText}`}>
            {role.title}
          </p>
          <p className="text-xs text-muted-foreground">Player {role.player}</p>
        </div>
        <Badge
          className={`ml-auto text-[10px] ${role.accent} text-white border-0`}
        >
          Stage {stage.num}
        </Badge>
      </div>

      <div className="p-5 space-y-4">
        {/* Twist alert with fox */}
        <div
          className={`relative p-3 rounded-xl border text-sm ${c.twist} font-medium`}
        >
          {stage.twist}
          {/* Fox appears near the twist */}
          <MischievousFox show={showCreatures} stageNum={stage.num} />
        </div>

        {/* Tasks checklist */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
            Your Tasks for This Stage
          </p>
          <div className="space-y-2">
            {roleTasks.map((task, idx) => (
              <button
                key={task}
                type="button"
                onClick={() => !isSubmitted && onTaskToggle(idx)}
                disabled={isSubmitted}
                className={`w-full flex items-start gap-3 p-2.5 rounded-lg transition-colors text-left ${
                  isSubmitted
                    ? "cursor-default opacity-75"
                    : "hover:bg-muted/50 cursor-pointer"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    tasks[idx]
                      ? `${role.accent} border-transparent`
                      : "border-border bg-white"
                  }`}
                >
                  {tasks[idx] && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={`text-sm leading-snug ${
                    tasks[idx]
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stage scoring guide */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
            Scoring
          </p>
          <div className="space-y-1.5">
            {(
              Object.entries(stage.outcomes) as [
                OutcomeKey,
                Stage["outcomes"][OutcomeKey],
              ][]
            ).map(([key, val]) => {
              const ValIcon = val.icon;
              return (
                <div
                  key={key}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
                    outcome === key
                      ? key === "good"
                        ? "bg-green-50 border-green-200"
                        : key === "query"
                          ? "bg-amber-50 border-amber-200"
                          : "bg-red-50 border-red-200"
                      : "bg-muted/30 border-transparent"
                  }`}
                >
                  <ValIcon className={`w-3.5 h-3.5 shrink-0 ${val.color}`} />
                  <span className="flex-1 text-foreground">{val.label}</span>
                  <span className={`font-bold text-sm ${val.color}`}>
                    {val.pts >= 0 ? `+${val.pts}` : val.pts}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit area */}
        {!isSubmitted ? (
          <div className="pt-1">
            <p className="text-xs text-muted-foreground mb-3 text-center">
              Complete your tasks then submit the stage outcome.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(
                Object.entries(stage.outcomes) as [
                  OutcomeKey,
                  Stage["outcomes"][OutcomeKey],
                ][]
              ).map(([key]) => (
                <Button
                  key={key}
                  size="sm"
                  disabled={!allChecked}
                  onClick={() => onSubmit(key)}
                  variant={key === "good" ? "default" : "outline"}
                  className={`text-[11px] h-9 ${
                    key === "good"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : key === "query"
                        ? "border-amber-400 text-amber-700 hover:bg-amber-50"
                        : "border-red-300 text-red-600 hover:bg-red-50"
                  }`}
                >
                  {key === "good"
                    ? "✓ Good"
                    : key === "query"
                      ? "⚠ Query"
                      : "✗ Reject"}
                </Button>
              ))}
            </div>
            {!allChecked && (
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Complete all tasks above to unlock submission
              </p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-3 rounded-xl border text-center ${
              outcome === "good"
                ? "bg-green-50 border-green-200"
                : outcome === "query"
                  ? "bg-amber-50 border-amber-200"
                  : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {outcome === "good" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : outcome === "query" ? (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span
                className={`font-semibold text-sm ${
                  outcome === "good"
                    ? "text-green-700"
                    : outcome === "query"
                      ? "text-amber-700"
                      : "text-red-700"
                }`}
              >
                Stage {stage.num} submitted —{" "}
                {outcome === "good"
                  ? `+${stage.outcomes.good.pts}`
                  : outcome === "query"
                    ? stage.outcomes.query.pts >= 0
                      ? `+${stage.outcomes.query.pts}`
                      : stage.outcomes.query.pts
                    : stage.outcomes.reject.pts}{" "}
                pts
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Final Results Screen ──────────────────────────────────────────────────────

interface FinalResultsProps {
  selectedRoles: RoleId[];
  playerScores: Record<RoleId, PlayerScore>;
  onRestart: () => void;
}

function FinalResults({
  selectedRoles,
  playerScores,
  onRestart,
}: FinalResultsProps) {
  const results = selectedRoles.map((roleId) => {
    const role = playerRoles.find((r) => r.id === roleId)!;
    const score = playerScores[roleId];
    const totalPts = Object.values(score.stageScores).reduce(
      (a, b) => a + b,
      0,
    );
    const finalScore = calcFinalScore(totalPts);
    const victory = getVictoryLevel(finalScore);
    return { role, totalPts, finalScore, victory };
  });

  const sorted = [...results].sort((a, b) => b.finalScore - a.finalScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      {/* Trophy header */}
      <div
        className="rounded-2xl p-8 text-center mb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.04 188) 0%, oklch(0.95 0.06 200) 100%)",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🏆
        </motion.div>
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
          Training Complete!
        </h2>
        <p className="text-muted-foreground">
          Clean Claim Command — Multi-Role Training Simulation
        </p>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <h3 className="font-heading font-bold text-foreground">
            Final Leaderboard
          </h3>
        </div>
        <div className="divide-y divide-border">
          {sorted.map((r, idx) => {
            const Icon = r.role.icon;
            return (
              <motion.div
                key={r.role.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                className="flex items-center gap-4 px-5 py-4"
              >
                {/* Rank */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    idx === 0
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : idx === 1
                        ? "bg-slate-100 text-slate-700 border border-slate-300"
                        : idx === 2
                          ? "bg-orange-100 text-orange-700 border border-orange-300"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {idx + 1}
                </div>
                {/* Role */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${r.role.accentLight}`}
                >
                  <Icon className={`w-4.5 h-4.5 ${r.role.accentText}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-bold text-sm text-foreground">
                      {r.role.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      P{r.role.player}
                    </span>
                    <span className="text-lg">{r.victory.emoji}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Progress value={r.finalScore} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground w-8 text-right">
                      {r.finalScore}%
                    </span>
                  </div>
                </div>
                {/* Victory badge */}
                <div
                  className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-bold ${r.victory.bg} ${r.victory.border} ${r.victory.text}`}
                >
                  {r.victory.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Score formula reminder */}
      <div className="bg-gradient-to-r from-teal-50 to-sky-50 rounded-2xl border border-teal-100 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-teal-600" />
          <h4 className="font-heading font-bold text-sm text-foreground">
            Score Formula
          </h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Stage Points", pct: "60%", color: "text-teal-600" },
            { label: "Clean Claim Rate", pct: "20%", color: "text-sky-600" },
            { label: "Speed Bonus", pct: "10%", color: "text-amber-600" },
            { label: "Leadership", pct: "10%", color: "text-purple-600" },
          ].map((f) => (
            <div key={f.label} className="text-center">
              <div className={`font-bold text-lg ${f.color}`}>{f.pct}</div>
              <div className="text-xs text-muted-foreground">{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          size="lg"
          onClick={onRestart}
          className="bg-primary text-white hover:bg-primary/90"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        <Link to="/">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary w-full sm:w-auto"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Training Creatures ────────────────────────────────────────────────────────

interface CreatureTooltipProps {
  text: string;
  visible: boolean;
  angry?: boolean;
}

function CreatureTooltip({
  text,
  visible,
  angry = false,
}: CreatureTooltipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.9 }}
          transition={{ duration: 0.18 }}
          className={`absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-xl text-white text-[11px] font-medium shadow-xl border backdrop-blur-sm pointer-events-none ${
            angry
              ? "bg-red-700/95 border-red-400/40"
              : "bg-gray-900/90 border-white/10"
          }`}
          style={{ maxWidth: 240, whiteSpace: "normal", textAlign: "center" }}
        >
          {text}
          {/* Arrow */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${angry ? "border-t-red-700/95" : "border-t-gray-900/90"}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Shared hook for angry creature state ─────────────────────────────────────
function useAngryCreature() {
  const [isAngry, setIsAngry] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handlePointerDown(e: React.PointerEvent) {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsAngry(true);
    setTooltipVisible(true);
    timeoutRef.current = setTimeout(() => {
      setIsAngry(false);
      setTooltipVisible(false);
    }, 3000);
  }

  function handleMouseEnter() {
    if (!isAngry) setTooltipVisible(true);
  }

  function handleMouseLeave() {
    if (!isAngry) setTooltipVisible(false);
  }

  return {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  };
}

// Doctor Owl → Dr. Sharma (Senior Physician) — bobs up and down, becomes angry on touch
function DoctorOwl({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="absolute top-2 left-2 z-20 hidden md:flex flex-col items-center cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ pointerEvents: "auto" }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              y: 0,
            }
          : { y: [0, -8, 0] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : {
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "😤 Don't interrupt my rounds!"
              : "🩺 Complete all tasks to unlock submission!"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-3xl drop-shadow-md"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
        >
          {isAngry ? "😤" : "👨‍⚕️"}
        </motion.span>
        <div
          className={`text-[9px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-teal-700"}`}
        >
          Dr. Sharma
        </div>
      </div>
    </motion.div>
  );
}

// Running Rabbit → Nurse Priya (Head Nurse) — dashes left to right, becomes angry on touch
function RunningRabbit({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="absolute bottom-3 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ pointerEvents: "auto" }}
      animate={
        isAngry
          ? { rotate: [-15, 15, -15, 15, 0], scale: [1.3, 1.2, 1.3, 1.2, 1.0] }
          : { x: ["-8vw", "105vw"] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : {
              duration: 5.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1.2,
              ease: "linear",
            }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "💢 I'm on duty! Stop that!"
              : "💉 Hurry! Submit before time runs out!"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-2xl drop-shadow-md"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
          animate={
            isAngry ? undefined : { scaleX: [1, 1.15, 1], y: [0, -4, 0] }
          }
          transition={
            isAngry
              ? undefined
              : {
                  duration: 0.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }
          }
        >
          {isAngry ? "😠" : "👩‍⚕️"}
        </motion.span>
        <div
          className={`text-[9px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-pink-700"}`}
        >
          Nurse Priya
        </div>
      </div>
    </motion.div>
  );
}

// Wise Turtle → Mr. Arun (Billing Expert) — crawls slowly, becomes angry on touch
function WiseTurtle({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="absolute -bottom-6 left-0 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing select-none hidden md:flex touch-none"
      style={{ pointerEvents: "auto" }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              x: 0,
            }
          : { x: [0, 600, 0] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : {
              duration: 28,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatType: "mirror",
            }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "😤 I'm slow but precise — don't rush me!"
              : "📋 Accuracy beats speed every time."
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-2xl drop-shadow-md"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
          animate={isAngry ? undefined : { y: [0, -2, 0] }}
          transition={
            isAngry
              ? undefined
              : {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        >
          {isAngry ? "😤" : "🧑‍💼"}
        </motion.span>
        <div
          className={`text-[9px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-green-700"}`}
        >
          Mr. Arun
        </div>
      </div>
    </motion.div>
  );
}

// Cheerful Bear → Dr. Mehta (RCM Director) — bounces, becomes angry on touch
function CheerfulBear({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none mx-auto mb-2 w-fit hidden md:flex touch-none"
      style={{ pointerEvents: "auto" }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              y: 0,
            }
          : { y: [0, -10, 0] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : {
              duration: 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "🤬 Step back — I'm reviewing claims!"
              : "💪 Keep going! You're doing great!"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-3xl drop-shadow-md"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
        >
          {isAngry ? "🤬" : "👨‍💼"}
        </motion.span>
        <div
          className={`text-[9px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-amber-700"}`}
        >
          Dr. Mehta
        </div>
      </div>
    </motion.div>
  );
}

// Mischievous Fox → Rahul (TPA Agent) — blinks/flashes near Challenge Twist, becomes angry on touch
function MischievousFox({
  show,
  stageNum,
}: {
  show: boolean;
  stageNum: number;
}) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      key={stageNum}
      drag
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 200, top: 0, bottom: 100 }}
      className="absolute -right-2 -top-3 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing select-none hidden md:flex touch-none"
      style={{ pointerEvents: "auto" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              opacity: 1,
            }
          : { opacity: [0, 1, 0.6, 1], scale: [0.8, 1.1, 1] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : { duration: 0.6, delay: 0.3 }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "🔥 You've disrupted the TPA process!"
              : "🕵️ I caused this challenge... 😈"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-2xl drop-shadow-md"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
          animate={
            isAngry
              ? undefined
              : { rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1] }
          }
          transition={
            isAngry
              ? undefined
              : { duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }
          }
        >
          {isAngry ? "😡" : "🕵️"}
        </motion.span>
        <div
          className={`text-[9px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-orange-700"}`}
        >
          Rahul TPA
        </div>
      </div>
    </motion.div>
  );
}

// ─── Big Staff ────────────────────────────────────────────────────────────────

// Wise Elephant → Mr. Gupta (Hospital CEO) — stomps slowly, becomes angry on touch
function WiseElephant({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="absolute bottom-4 right-4 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing select-none hidden md:flex touch-none"
      style={{ pointerEvents: "auto" }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              x: 0,
            }
          : { x: [0, -120, 0] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : {
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "mirror",
            }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "💢 Never disturb the CEO during strategy!"
              : "🏥 Every step matters — don't miss a document!"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-5xl drop-shadow-xl"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
          animate={
            isAngry ? undefined : { y: [0, -6, 0], rotate: [0, -3, 3, 0] }
          }
          transition={
            isAngry
              ? undefined
              : {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        >
          {isAngry ? "😡" : "🧑‍💼"}
        </motion.span>
        <div
          className={`text-[10px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-gray-700"}`}
        >
          CEO Gupta
        </div>
      </div>
    </motion.div>
  );
}

// Roaring Lion → Dr. Kapoor (Chief Medical Officer) — paces back and forth, becomes angry on touch
function RoaringLion({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="absolute top-4 right-4 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing select-none hidden md:flex touch-none"
      style={{ pointerEvents: "auto" }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              x: 0,
            }
          : { x: [0, -200, 0] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : {
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "mirror",
            }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "CMO is watching — take that seriously!"
              : "🌟 Lead like a CMO — own your role!"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-5xl drop-shadow-xl"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
          animate={
            isAngry ? undefined : { scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }
          }
          transition={
            isAngry
              ? undefined
              : {
                  duration: 2.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        >
          {isAngry ? "😾" : "👨‍⚕️"}
        </motion.span>
        <div
          className={`text-[10px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-yellow-700"}`}
        >
          {isAngry ? "CMO Alert!" : "Dr. Kapoor"}
        </div>
      </div>
    </motion.div>
  );
}

// Mighty Gorilla → Mrs. Singh (Quality Head) — beats chest, becomes angry on touch
function MightyGorilla({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="absolute bottom-4 left-4 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing select-none hidden md:flex touch-none"
      style={{ pointerEvents: "auto" }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              y: 0,
            }
          : { y: [0, -12, 0, -8, 0] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "🤬 NABH audit pending! Don't poke me!"
              : "✅ Strength is in the details — check every field!"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-5xl drop-shadow-xl"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
          animate={isAngry ? undefined : { scale: [1, 1.15, 1, 1.1, 1] }}
          transition={
            isAngry
              ? undefined
              : {
                  duration: 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        >
          {isAngry ? "🤬" : "👩‍💼"}
        </motion.span>
        <div
          className={`text-[10px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-gray-800"}`}
        >
          Mrs. Singh
        </div>
      </div>
    </motion.div>
  );
}

// Tall Giraffe → Priti (ABHA Coordinator) — sways gracefully, becomes angry on touch
function TallGiraffe({ show }: { show: boolean }) {
  const {
    isAngry,
    tooltipVisible,
    handlePointerDown,
    handleMouseEnter,
    handleMouseLeave,
  } = useAngryCreature();
  if (!show) return null;
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      className="absolute top-1 left-1/2 z-20 flex flex-col items-center cursor-grab active:cursor-grabbing select-none hidden md:flex touch-none"
      style={{ pointerEvents: "auto", marginLeft: 80 }}
      animate={
        isAngry
          ? {
              rotate: [-15, 15, -15, 15, 0],
              scale: [1.3, 1.2, 1.3, 1.2, 1.0],
              x: 0,
              y: 0,
            }
          : { x: [0, 60, 0], y: [0, -4, 0] }
      }
      transition={
        isAngry
          ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
          : {
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "mirror",
            }
      }
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <CreatureTooltip
          text={
            isAngry
              ? "📡 ABHA system alert — back off!"
              : "🔍 Keep your head high — spot issues early!"
          }
          visible={tooltipVisible}
          angry={isAngry}
        />
        <motion.span
          className="text-5xl drop-shadow-xl"
          style={
            isAngry
              ? { filter: "drop-shadow(0 0 12px rgba(220,38,38,0.8))" }
              : undefined
          }
          animate={isAngry ? undefined : { rotate: [0, 4, -4, 0] }}
          transition={
            isAngry
              ? undefined
              : {
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        >
          {isAngry ? "😤" : "👩‍💻"}
        </motion.span>
        <div
          className={`text-[10px] font-bold text-center mt-0.5 bg-white/80 rounded px-1 ${isAngry ? "text-red-700" : "text-orange-700"}`}
        >
          Priti ABHA
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Game Board ───────────────────────────────────────────────────────────

type GameScreen = "role-select" | "game-board" | "results";

function initPlayerScore(roleId: RoleId): PlayerScore {
  return {
    roleId,
    stageScores: {},
    outcomes: {},
    tasks: Object.fromEntries(
      gameStages.map((s) => [
        s.num,
        new Array(
          (playerRoles.find((r) => r.id === roleId)?.stageTasks[s.num] ?? [])
            .length,
        ).fill(false),
      ]),
    ),
  };
}

export function TrainingGame() {
  const [screen, setScreen] = useState<GameScreen>("role-select");
  const [selectedRoles, setSelectedRoles] = useState<RoleId[]>([]);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [completedStages, setCompletedStages] = useState<Set<number>>(
    new Set(),
  );
  const [playerScores, setPlayerScores] = useState<Record<RoleId, PlayerScore>>(
    {} as Record<RoleId, PlayerScore>,
  );
  const [showCreatures, setShowCreatures] = useState(true);

  function toggleRole(id: RoleId) {
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  }

  function startGame() {
    const scores: Partial<Record<RoleId, PlayerScore>> = {};
    for (const id of selectedRoles) {
      scores[id] = initPlayerScore(id);
    }
    setPlayerScores(scores as Record<RoleId, PlayerScore>);
    setActiveRoleIdx(0);
    setCurrentStage(1);
    setCompletedStages(new Set());
    setScreen("game-board");
  }

  function toggleTask(roleId: RoleId, stageNum: number, taskIdx: number) {
    setPlayerScores((prev) => {
      const ps = { ...prev[roleId] };
      const tasks = [...(ps.tasks[stageNum] ?? [])];
      tasks[taskIdx] = !tasks[taskIdx];
      ps.tasks = { ...ps.tasks, [stageNum]: tasks };
      return { ...prev, [roleId]: ps };
    });
  }

  function submitStage(roleId: RoleId, stageNum: number, outcome: OutcomeKey) {
    const stage = gameStages.find((s) => s.num === stageNum)!;
    const pts = stage.outcomes[outcome].pts;

    setPlayerScores((prev) => {
      const ps = { ...prev[roleId] };
      ps.stageScores = { ...ps.stageScores, [stageNum]: pts };
      ps.outcomes = { ...ps.outcomes, [stageNum]: outcome };
      return { ...prev, [roleId]: ps };
    });

    // Check if all selected roles submitted this stage
    // We use a callback to get the freshest state
    setPlayerScores((prev) => {
      const updated = {
        ...prev,
        [roleId]: {
          ...prev[roleId],
          stageScores: { ...prev[roleId].stageScores, [stageNum]: pts },
          outcomes: { ...prev[roleId].outcomes, [stageNum]: outcome },
        },
      };

      const allSubmitted = selectedRoles.every(
        (r) => updated[r]?.outcomes[stageNum] !== undefined,
      );

      if (allSubmitted) {
        setCompletedStages((cs) => new Set([...cs, stageNum]));
        if (stageNum < 10) {
          setCurrentStage(stageNum + 1);
          setActiveRoleIdx(0);
        } else {
          setTimeout(() => setScreen("results"), 600);
        }
      }

      return updated;
    });
  }

  function restartGame() {
    setScreen("role-select");
    setSelectedRoles([]);
    setActiveRoleIdx(0);
    setCurrentStage(1);
    setCompletedStages(new Set());
    setPlayerScores({} as Record<RoleId, PlayerScore>);
  }

  const stage = gameStages.find((s) => s.num === currentStage)!;
  const activeRole = selectedRoles[activeRoleIdx]
    ? playerRoles.find((r) => r.id === selectedRoles[activeRoleIdx])!
    : null;
  const stageColors = stage
    ? stageColorClasses[stage.statusColor]
    : stageColorClasses.green;

  return (
    <Layout section="training-game">
      {/* ── Page Hero ── */}
      <section
        className="pt-20 pb-8 px-4 md:px-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 188) 0%, oklch(0.28 0.14 200) 60%, oklch(0.20 0.10 188) 100%)",
        }}
      >
        {/* Rabbit creature — runs across hero bottom */}
        <RunningRabbit show={showCreatures} />
        {/* Big animals in hero */}
        <RoaringLion show={showCreatures} />
        <TallGiraffe show={showCreatures} />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-wider mb-5">
              <Zap className="w-3.5 h-3.5" />
              Interactive Training Module
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3">
              Clean Claim Command
            </h1>
            <p className="text-white/70 text-lg mb-5">
              Multi-Role Training Simulation · 10 Escalating Stages
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { label: "Duration", value: "45–60 min" },
                { label: "Players", value: "3–6 per team" },
                { label: "Goal", value: "≥95% Clean Claim Rate" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white"
                >
                  <span className="text-white/60 text-xs">{label}:</span>
                  <span className="font-semibold text-xs">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Creatures toggle button */}
          <div className="flex justify-center mt-5">
            <motion.button
              type="button"
              onClick={() => setShowCreatures((v) => !v)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white text-xs font-semibold transition-colors backdrop-blur-sm"
            >
              {showCreatures ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />👥 Hide Staff
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />👥 Show Staff
                </>
              )}
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── Game Area ── */}
      <section className="py-8 px-4 md:px-8 min-h-[70vh] relative">
        {/* Doctor Owl — top-left of game area */}
        <DoctorOwl show={showCreatures} />
        {/* Big animals in game area */}
        <WiseElephant show={showCreatures} />
        <MightyGorilla show={showCreatures} />

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ── Role Selection ── */}
            {screen === "role-select" && (
              <motion.div
                key="role-select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Step 1: Select Your Role(s)
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Choose one or more roles to play. With fewer players, a
                    single player can hold multiple roles.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {playerRoles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      selected={selectedRoles.includes(role.id)}
                      onToggle={() => toggleRole(role.id)}
                    />
                  ))}
                </div>

                {/* Role summary */}
                {selectedRoles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-health-blue-light border border-primary/20 rounded-2xl p-5 mb-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <h4 className="font-heading font-bold text-sm text-foreground">
                        Selected Roles ({selectedRoles.length}/6)
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoles.map((id) => {
                        const r = playerRoles.find((p) => p.id === id)!;
                        const Icon = r.icon;
                        return (
                          <div
                            key={id}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${r.accentLight} ${r.accentText} ${r.accentBorder} border`}
                          >
                            <Icon className="w-3 h-3" />
                            {r.title}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    disabled={selectedRoles.length === 0}
                    onClick={startGame}
                    className="bg-primary text-white hover:bg-primary/90 px-10 shadow-lg disabled:opacity-50"
                  >
                    Start Training
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── Game Board ── */}
            {screen === "game-board" && activeRole && (
              <motion.div
                key="game-board"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stage header */}
                <div className="mb-5">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${stageColors.pill}`}
                        >
                          Stage {currentStage} of 10
                        </span>
                        <span
                          className={`text-sm font-bold ${stageColors.text}`}
                        >
                          {stage.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stage.focus}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={restartGame}
                      className="text-muted-foreground hover:text-foreground text-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> Restart
                    </Button>
                  </div>

                  {/* Stage navigator with turtle */}
                  <div className="relative pb-7">
                    <StageNavigator
                      currentStage={currentStage}
                      completedStages={completedStages}
                      onSelect={(n) => {
                        if (completedStages.has(n) || n === currentStage)
                          setCurrentStage(n);
                      }}
                    />
                    {/* Wise Turtle crawls below stage navigator */}
                    <WiseTurtle show={showCreatures} />
                  </div>
                </div>

                {/* Main layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Left: Role tabs + task panels */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Role selector tabs */}
                    <Card className="border-border shadow-sm">
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="text-sm font-heading font-bold text-foreground">
                          Active Players — Select Role to View Tasks
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <div className="flex flex-wrap gap-2">
                          {selectedRoles.map((roleId, idx) => {
                            const r = playerRoles.find((p) => p.id === roleId)!;
                            const Icon = r.icon;
                            const submitted =
                              playerScores[roleId]?.outcomes[currentStage] !==
                              undefined;
                            return (
                              <button
                                key={roleId}
                                type="button"
                                onClick={() => setActiveRoleIdx(idx)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                  activeRoleIdx === idx
                                    ? `${r.accentLight} ${r.accentBorder} ${r.accentText} shadow-sm`
                                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/60"
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {r.title}
                                {submitted && (
                                  <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Task panel */}
                    <TaskPanel
                      role={activeRole}
                      stage={stage}
                      tasks={
                        playerScores[activeRole.id]?.tasks[currentStage] ?? []
                      }
                      onTaskToggle={(idx) =>
                        toggleTask(activeRole.id, currentStage, idx)
                      }
                      outcome={
                        playerScores[activeRole.id]?.outcomes[currentStage] ??
                        null
                      }
                      onSubmit={(outcome) =>
                        submitStage(activeRole.id, currentStage, outcome)
                      }
                      isSubmitted={
                        playerScores[activeRole.id]?.outcomes[currentStage] !==
                        undefined
                      }
                      showCreatures={showCreatures}
                    />

                    {/* Stage completion status */}
                    {selectedRoles.length > 1 && (
                      <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                          Stage {currentStage} Submission Status
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedRoles.map((roleId) => {
                            const r = playerRoles.find((p) => p.id === roleId)!;
                            const submitted =
                              playerScores[roleId]?.outcomes[currentStage] !==
                              undefined;
                            const outcome =
                              playerScores[roleId]?.outcomes[currentStage];
                            const Icon = r.icon;
                            return (
                              <div
                                key={roleId}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${
                                  submitted
                                    ? outcome === "good"
                                      ? "bg-green-50 border-green-200 text-green-700"
                                      : outcome === "query"
                                        ? "bg-amber-50 border-amber-200 text-amber-700"
                                        : "bg-red-50 border-red-200 text-red-700"
                                    : "bg-muted/30 border-border text-muted-foreground"
                                }`}
                              >
                                <Icon className="w-3 h-3" />
                                <span className="font-medium">{r.title}</span>
                                {submitted ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <span className="w-3 h-3 rounded-full border-2 border-current opacity-40 inline-block" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Score panel + stage info */}
                  <div className="space-y-4">
                    {/* Bear bounces above score panel */}
                    <CheerfulBear show={showCreatures} />
                    <ScorePanel
                      selectedRoles={selectedRoles}
                      playerScores={playerScores}
                      currentStage={currentStage}
                    />

                    {/* Stage overview card */}
                    <div
                      className={`rounded-2xl border p-4 ${stageColors.bg} ${stageColors.border}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`font-heading font-bold text-sm ${stageColors.text}`}
                        >
                          Stage Overview
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                            Focus
                          </span>
                          <p
                            className={`mt-0.5 font-medium ${stageColors.text}`}
                          >
                            {stage.focus}
                          </p>
                        </div>
                        {stage.winCondition && (
                          <div>
                            <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                              Win Condition
                            </span>
                            <p
                              className={`mt-0.5 font-medium ${stageColors.text}`}
                            >
                              {stage.winCondition}
                            </p>
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                            Max Points
                          </span>
                          <p
                            className={`mt-0.5 font-bold text-lg ${stageColors.text}`}
                          >
                            +{stage.outcomes.good.pts}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Victory levels reference */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <p className="font-heading font-bold text-xs text-foreground">
                          Victory Levels
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        {victoryLevels.map((v) => (
                          <div
                            key={v.title}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs ${v.bg} ${v.border} ${v.text}`}
                          >
                            <span>{v.emoji}</span>
                            <span className="font-semibold flex-1">
                              {v.title}
                            </span>
                            <span className="font-bold">
                              {v.min > 0 ? `${v.min}+` : "<70"}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Results ── */}
            {screen === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FinalResults
                  selectedRoles={selectedRoles}
                  playerScores={playerScores}
                  onRestart={restartGame}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}
