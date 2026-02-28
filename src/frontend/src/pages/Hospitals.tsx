import { Layout } from "@/components/layout/Layout";
import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  FileText,
  type Heart,
  Layers,
  Shield,
  Stethoscope,
  Syringe,
  UserCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const painPoints = [
  {
    icon: AlertCircle,
    title: "Delayed Claim Settlements",
    description:
      "Average 45-90 days settlement cycle causing severe cash flow issues for hospitals.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Layers,
    title: "Manual Processes",
    description:
      "Paper-based billing, manual data entry, and redundant workflows consuming staff time.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "NABH Compliance Burden",
    description:
      "Complex NABH 6th edition requirements with constant audit pressure and documentation needs.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: DollarSign,
    title: "Cash Flow Issues",
    description:
      "High pending receivables, unbilled services, and delayed reconciliation impacting operations.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: FileText,
    title: "Documentation Errors",
    description:
      "ICD coding mistakes, missing documents, and incomplete discharge summaries causing rejections.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: AlertTriangle,
    title: "Insurance Complexities",
    description:
      "Multiple insurer protocols, varying pre-auth requirements, and unpredictable rejection patterns.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const solutions = [
  {
    icon: Activity,
    title: "RCM Automation",
    description:
      "Automated billing, coding, and claims submission with AI-powered error detection.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: UserCheck,
    title: "Pre-Auth Management",
    description:
      "Streamlined pre-authorization workflows with insurer-specific templates and auto-follow ups.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Activity,
    title: "Real-time Claim Tracking",
    description:
      "Live claim status dashboard with instant notifications on approvals, pending, and rejections.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Shield,
    title: "NABH Compliance Tools",
    description:
      "Digital checklists, audit preparation workflows, and quality indicators monitoring.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: DollarSign,
    title: "Financial Analytics",
    description:
      "Revenue forecasting, denial trend analysis, and department-wise financial performance.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: ClipboardList,
    title: "Staff Training",
    description:
      "Regular training modules on coding, documentation standards, and insurance protocols.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const beforeAfter = [
  { area: "Claim Settlement Time", before: "45-90 days", after: "15-21 days" },
  { area: "Clean Claim Rate", before: "65-70%", after: "93-97%" },
  { area: "Denial Rate", before: "18-25%", after: "3-7%" },
  {
    area: "Pre-Auth Processing",
    before: "3-5 business days",
    after: "Same day",
  },
  {
    area: "Documentation Errors",
    before: "High (manual)",
    after: "Near-zero (automated)",
  },
  {
    area: "NABH Audit Readiness",
    before: "Reactive",
    after: "Continuous (real-time)",
  },
  {
    area: "Revenue Recovery",
    before: "Manual follow-up",
    after: "Automated escalation",
  },
  { area: "Staff Productivity", before: "Baseline", after: "+40% efficiency" },
];

const journeyStages = [
  {
    icon: UserCheck,
    title: "Discovery",
    description:
      "Identifying the right healthcare provider and verifying insurance coverage.",
    tags: ["Provider Search", "Insurance Check", "Eligibility"],
    side: "left",
  },
  {
    icon: FileText,
    title: "Registration",
    description:
      "ABHA enrollment, demographic capture, and insurance verification at admission.",
    tags: ["ABHA Enrollment", "KYC", "Insurance Verify"],
    side: "right",
  },
  {
    icon: Shield,
    title: "Pre-Authorization",
    description:
      "Clinical documentation submission and insurance pre-approval for treatment.",
    tags: ["Clinical Docs", "Pre-auth Request", "Approval"],
    side: "left",
  },
  {
    icon: Stethoscope,
    title: "Treatment",
    description:
      "Clinical care delivery with real-time documentation and coding support.",
    tags: ["ICD Coding", "CPT Coding", "Documentation"],
    side: "right",
  },
  {
    icon: FileText,
    title: "Claim Submission",
    description:
      "Seamless digital claim submission with automated validation and tracking.",
    tags: ["UB-04/CMS-1500", "E-Submission", "Acknowledgment"],
    side: "left",
  },
  {
    icon: DollarSign,
    title: "Reconciliation",
    description:
      "Payment posting, denial management, and financial reconciliation.",
    tags: ["Payment Posting", "Denial Mgmt", "Reconciliation"],
    side: "right",
  },
];

interface TreatmentCard {
  icon: typeof Heart;
  title: string;
  description: string;
  points: string[];
  checklist: string[];
}

const treatmentCards: TreatmentCard[] = [
  {
    icon: Activity,
    title: "ICU Care",
    description:
      "Critical care validation protocols ensuring comprehensive ICU documentation.",
    points: [
      "Daily progress notes",
      "Ventilator management records",
      "Critical care billing codes",
    ],
    checklist: [
      "ICU admission criteria met",
      "Ventilator support documented",
      "Daily SOAP notes",
      "Specialist consultations recorded",
      "Nursing care plans updated",
      "Lab & imaging reports linked",
      "Medication administration records",
      "ICU scoring (APACHE/SOFA)",
      "Family counseling documented",
      "Discharge planning notes",
    ],
  },
  {
    icon: Syringe,
    title: "Surgical Procedures",
    description:
      "Pre-operative, intraoperative, and post-operative documentation validation.",
    points: [
      "Surgical safety checklist",
      "Anesthesia records",
      "Post-op monitoring",
    ],
    checklist: [
      "Surgical consent obtained",
      "Pre-op assessment completed",
      "Anesthesia risk assessment",
      "Surgical safety checklist signed",
      "Intraoperative notes complete",
      "Implant details documented",
      "Post-op monitoring recorded",
      "Discharge summary with surgeon notes",
      "Pathology reports if applicable",
      "Follow-up instructions given",
    ],
  },
  {
    icon: Stethoscope,
    title: "Medical Management",
    description:
      "Conservative treatment validation with clinical reasoning documentation.",
    points: [
      "Clinical reasoning records",
      "Treatment response notes",
      "Medication protocols",
    ],
    checklist: [
      "Admitting diagnosis justified",
      "Clinical examination documented",
      "Investigation reports linked",
      "Treatment plan documented",
      "Daily progress notes",
      "Medication administration records",
      "Response to treatment noted",
      "Discharge criteria met",
      "Discharge summary complete",
      "Follow-up plan documented",
    ],
  },
  {
    icon: Zap,
    title: "Daycare Procedures",
    description:
      "Same-day procedure documentation requirements for clean claim submission.",
    points: [
      "Pre-procedure assessment",
      "Day surgery records",
      "Post-procedure monitoring",
    ],
    checklist: [
      "Daycare eligibility confirmed",
      "Pre-procedure assessment done",
      "Consent forms signed",
      "Anesthesia type documented",
      "Procedure notes complete",
      "Post-procedure monitoring",
      "Patient recovery documented",
      "Discharge criteria met",
      "Post-care instructions given",
      "Follow-up appointment noted",
    ],
  },
  {
    icon: AlertCircle,
    title: "Emergency Services",
    description:
      "Emergency documentation requirements from triage to admission.",
    points: [
      "Triage documentation",
      "Emergency treatment records",
      "Stabilization notes",
    ],
    checklist: [
      "Triage level documented",
      "Chief complaint recorded",
      "Emergency examination notes",
      "Vital signs monitoring",
      "Emergency treatment given",
      "Diagnostic workup ordered",
      "Specialist consultation if needed",
      "Admission/discharge decision",
      "Emergency billing codes",
      "Follow-up instructions",
    ],
  },
];

const surgicalProcedures = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Oncology",
  "Gynecology",
  "Urology",
  "Gastroenterology",
  "Ophthalmology",
  "ENT",
  "Pulmonology",
  "Nephrology",
  "Endocrinology",
  "Dermatology",
  "Psychiatry",
  "Pediatrics",
];

const claimPhases = [
  {
    id: "phase-1",
    title: "Phase 1: Patient Registration",
    content:
      "ABHA ID verification, demographic data capture, insurance eligibility check, pre-admission authorization tracking, document collection (ID proof, insurance card, referral), and digital consent management.",
  },
  {
    id: "phase-2",
    title: "Phase 2: Pre-Authorization",
    content:
      "Clinical documentation preparation, medical necessity justification, ICD-10 provisional diagnosis coding, insurer-specific pre-auth form submission, real-time status tracking, and escalation workflows for delayed approvals.",
  },
  {
    id: "phase-3",
    title: "Phase 3: Treatment & Documentation",
    content:
      "Real-time ICD-10/CPT procedure coding, nursing care documentation, daily progress notes, specialist consultation records, investigation & lab report linking, implant and consumable tracking, and discharge summary preparation.",
  },
  {
    id: "phase-4",
    title: "Phase 4: Claim Submission",
    content:
      "UB-04/CMS-1500 claim form generation, electronic claim submission, acknowledgment and tracking number capture, supporting document packet compilation, digital signature and encryption, and submission audit trail.",
  },
  {
    id: "phase-5",
    title: "Phase 5: Review & Settlement",
    content:
      "Claim adjudication monitoring, partial approval management, denial response and appeal filing, payment posting and reconciliation, outstanding balance management, and final settlement reporting with financial analytics.",
  },
];

export function Hospitals() {
  const [checklistDialog, setChecklistDialog] = useState<TreatmentCard | null>(
    null,
  );
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <Layout section="hospitals">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              Hospital Solutions
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-5">
              Transform Your Hospital's
              <br />
              Revenue Operations
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              End-to-end RCM automation, NABH compliance support, and real-time
              claims management designed specifically for Indian hospitals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
              {[
                "500+ Hospitals",
                "95% Clean Claim Rate",
                "40% Less Denials",
                "NABH Certified",
              ].map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Challenges Hospitals Face
            </h2>
            <p className="text-muted-foreground">
              We understand your pain points — because we've helped 100+
              hospitals overcome them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${p.bg} flex items-center justify-center mb-3`}
                  >
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Our Solution Modules
            </h2>
            <p className="text-muted-foreground">
              Comprehensive digital tools that address every challenge in your
              revenue cycle and compliance journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs card-hover"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}
                  >
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {s.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Before & After AI Health Zon
            </h2>
            <p className="text-muted-foreground">
              Real transformation metrics from our partner hospitals.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="grid grid-cols-3 bg-health-blue text-white">
              <div className="p-4 font-semibold text-sm">Area</div>
              <div className="p-4 font-semibold text-sm text-center bg-red-500/20">
                Before
              </div>
              <div className="p-4 font-semibold text-sm text-center bg-green-500/20">
                After
              </div>
            </div>
            {beforeAfter.map((row, i) => (
              <div
                key={row.area}
                className={`grid grid-cols-3 border-t border-border ${i % 2 === 0 ? "bg-white" : "bg-muted/30"}`}
              >
                <div className="p-4 text-sm font-medium">{row.area}</div>
                <div className="p-4 text-sm text-center text-red-600">
                  {row.before}
                </div>
                <div className="p-4 text-sm text-center text-green-600 font-semibold">
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Story */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Healthcare Journey Story
            </h2>
            <p className="text-muted-foreground">
              Follow a patient's complete journey through our integrated
              ecosystem.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block -translate-x-1/2" />
            <div className="space-y-8">
              {journeyStages.map((stage, i) => {
                const Icon = stage.icon;
                const isLeft = stage.side === "left";
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex gap-4 md:gap-8 items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div
                      className={`flex-1 bg-white rounded-xl p-6 border border-border shadow-xs ${isLeft ? "md:text-right" : ""}`}
                    >
                      <h3 className="font-heading font-bold text-foreground mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {stage.description}
                      </p>
                      <div
                        className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}
                      >
                        {stage.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-health-blue flex items-center justify-center shrink-0 z-10 shadow-health">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Validation Cards */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Treatment Validation Checklists
            </h2>
            <p className="text-muted-foreground">
              Comprehensive documentation requirements for every treatment type
              — ensuring clean claims every time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {treatmentCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs card-hover"
                >
                  <div className="w-10 h-10 rounded-lg bg-health-blue-light flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-health-blue" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {card.description}
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {card.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2 text-xs text-foreground"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-health-green shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-health-blue text-health-blue hover:bg-health-blue-light"
                    onClick={() => setChecklistDialog(card)}
                  >
                    View Full Checklist
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Surgical Procedures */}
      <section
        className="section-padding"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, white 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Surgical Procedure Categories
            </h2>
            <p className="text-muted-foreground">
              Specialized validation protocols for 15+ surgical specialties.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {surgicalProcedures.map((proc, i) => (
              <motion.div
                key={proc}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl p-3 border border-border text-center text-sm font-medium text-foreground hover:bg-health-blue-light hover:text-health-blue transition-colors cursor-pointer shadow-xs"
              >
                {proc}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Protocols */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Claim Protocols
            </h2>
            <p className="text-muted-foreground">
              A structured 5-phase claim lifecycle ensuring maximum claim
              acceptance.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {claimPhases.map((phase) => (
              <AccordionItem
                key={phase.id}
                value={phase.id}
                className="border border-border rounded-xl px-5 shadow-xs"
              >
                <AccordionTrigger className="font-heading font-semibold text-foreground hover:no-underline">
                  {phase.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {phase.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-16 health-gradient">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-white/70 mb-6">
            Schedule a free personalized demo and see how AI Health Zon can
            transform your revenue cycle operations.
          </p>
          <Button
            onClick={() => setIsDemoOpen(true)}
            size="lg"
            className="bg-white text-health-blue hover:bg-white/90 font-semibold shadow-xl px-8"
          >
            Book Free Demo
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Checklist Dialog */}
      <Dialog
        open={!!checklistDialog}
        onOpenChange={() => setChecklistDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {checklistDialog?.title} — Documentation Checklist
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {checklistDialog?.checklist.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="w-6 h-6 rounded-full bg-health-green flex items-center justify-center text-white text-xs shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <DemoBookingDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </Layout>
  );
}
