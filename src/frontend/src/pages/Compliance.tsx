import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  FileText,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Users,
    title: "Patient Rights & Responsibilities",
    description:
      "Comprehensive framework ensuring patient rights are upheld and responsibilities are clearly communicated.",
    items: [
      "Informed consent protocols",
      "Patient grievance redressal",
      "Privacy and confidentiality standards",
      "Right to information and second opinion",
    ],
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FileText,
    title: "Clinical Documentation Standards",
    description:
      "Structured documentation protocols for all clinical records, discharge summaries, and medical reports.",
    items: [
      "Discharge summary templates",
      "Nursing documentation standards",
      "Medical record completeness audits",
      "ICD-10 coding compliance",
    ],
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Shield,
    title: "Medication Safety Protocols",
    description:
      "End-to-end medication management ensuring safe prescription, dispensing, and administration practices.",
    items: [
      "High-alert medication protocols",
      "Medication reconciliation at transitions",
      "ADR reporting and monitoring",
      "Antimicrobial stewardship programs",
    ],
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Quality Indicators & Monitoring",
    description:
      "Real-time quality monitoring with automated indicators tracking clinical and operational performance.",
    items: [
      "Patient safety incident tracking",
      "Clinical outcome indicators",
      "OT efficiency metrics",
      "ICU quality benchmarks",
    ],
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Activity,
    title: "Infection Control & Prevention",
    description:
      "Comprehensive infection prevention programs with monitoring, training, and surveillance protocols.",
    items: [
      "HAI surveillance programs",
      "Hand hygiene compliance monitoring",
      "Antibiotic resistance tracking",
      "Biomedical waste management",
    ],
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const auditSteps = [
  {
    step: 1,
    title: "Assessment",
    description:
      "Comprehensive gap analysis against NABH 6th Edition standards.",
    icon: "🔍",
  },
  {
    step: 2,
    title: "Gap Analysis",
    description:
      "Detailed gap report with priority categorization and action plan.",
    icon: "📊",
  },
  {
    step: 3,
    title: "Remediation",
    description:
      "Structured implementation of corrective measures with tracking.",
    icon: "🔧",
  },
  {
    step: 4,
    title: "Mock Audit",
    description: "Internal mock audit simulating the NABH assessment process.",
    icon: "✅",
  },
  {
    step: 5,
    title: "Certification",
    description: "Final NABH assessment submission and certification support.",
    icon: "🏆",
  },
];

const checklistCategories = [
  {
    id: "patient-care",
    title: "Patient Care & Safety",
    items: [
      "Patient identification protocols in place",
      "Fall prevention measures implemented",
      "Pressure ulcer prevention protocols",
      "Restraint use policies documented",
      "Patient education programs active",
    ],
  },
  {
    id: "clinical-docs",
    title: "Clinical Documentation",
    items: [
      "Discharge summaries completed within 24 hours",
      "Operative notes documented immediately",
      "Nursing notes updated every 8 hours",
      "Informed consent obtained for all procedures",
      "Referral documentation complete",
    ],
  },
  {
    id: "quality",
    title: "Quality Management",
    items: [
      "Quality committee meetings documented",
      "Clinical audit reports filed quarterly",
      "Sentinel event reporting system active",
      "Patient satisfaction surveys conducted",
      "Benchmarking with peer hospitals done",
    ],
  },
  {
    id: "hr",
    title: "Human Resources",
    items: [
      "Staff credential verification complete",
      "Annual training completion tracked",
      "Performance appraisal system functional",
      "Duty rosters with required skill mix",
      "CPR training for all clinical staff",
    ],
  },
];

export function Compliance() {
  return (
    <Layout section="compliance">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              NABH Accreditation
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              NABH Compliance Centre
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Your end-to-end NABH 6th Edition compliance partner — from gap
              assessment to certification and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-white/80 text-sm">
              {[
                "100+ Hospitals Certified",
                "98% Audit Pass Rate",
                "NABH 6th Edition",
                "Continuous Monitoring",
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

      {/* 5 Pillars */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              NABH 6th Edition Framework
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our compliance platform is built on the five critical pillars of
              NABH 6th Edition standards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs card-hover"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {pillar.description}
                  </p>
                  <ul className="space-y-1.5">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${pillar.color} mt-0.5 shrink-0`}
                        />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audit Readiness Workflow */}
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
              Audit Readiness Workflow
            </h2>
            <p className="text-muted-foreground">
              A structured 5-phase journey from assessment to NABH
              certification.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-health-blue-light" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {auditSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-health-blue flex items-center justify-center mb-3 shadow-health text-2xl">
                    {step.icon}
                  </div>
                  <h4 className="font-heading font-bold text-sm text-foreground mb-1">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-snug">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Compliance Checklist
            </h2>
            <p className="text-muted-foreground">
              Comprehensive checklist organized by NABH domain — track your
              readiness in real-time.
            </p>
          </div>
          <Accordion type="multiple" className="space-y-3">
            {checklistCategories.map((cat) => (
              <AccordionItem
                key={cat.id}
                value={cat.id}
                className="border border-border rounded-xl px-5 shadow-xs"
              >
                <AccordionTrigger className="font-heading font-semibold text-foreground hover:no-underline">
                  {cat.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-2">
                    {cat.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group"
                      >
                        <div className="w-5 h-5 rounded border-2 border-health-blue group-hover:bg-health-blue-light transition-colors flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-health-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 health-gradient">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "100+", label: "Hospitals NABH Certified" },
              { value: "98%", label: "Audit Pass Rate" },
              { value: "30%", label: "Faster Certification" },
              { value: "500+", label: "Checklists Automated" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-heading text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/65 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
