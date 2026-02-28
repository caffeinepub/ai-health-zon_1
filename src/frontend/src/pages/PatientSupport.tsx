import { Layout } from "@/components/layout/Layout";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  CreditCard,
  FileText,
  Heart,
  MessageSquare,
  Phone,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

const phases = [
  {
    phase: "Pre-Admission",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    icon: FileText,
    steps: [
      {
        title: "Insurance Verification",
        desc: "Real-time eligibility check across 50+ insurers and TPA networks.",
      },
      {
        title: "ABHA Enrollment",
        desc: "Digital health ID creation and existing record linkage.",
      },
      {
        title: "Pre-auth Initiation",
        desc: "Automated pre-authorization submission with clinical documentation.",
      },
      {
        title: "Document Preparation",
        desc: "Digital checklist for all required admission documents.",
      },
    ],
  },
  {
    phase: "During Admission",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
    icon: Activity,
    steps: [
      {
        title: "Treatment Documentation",
        desc: "Real-time clinical notes, coding support, and procedure documentation.",
      },
      {
        title: "Interim Billing",
        desc: "Progressive billing updates and cost estimate communication.",
      },
      {
        title: "Insurance Liaison",
        desc: "Direct communication channel with insurer for approvals and queries.",
      },
      {
        title: "Patient Counseling",
        desc: "Financial counseling, discharge planning, and care coordination.",
      },
    ],
  },
  {
    phase: "Post-Discharge",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    icon: Heart,
    steps: [
      {
        title: "Claim Filing",
        desc: "Automated claim compilation and digital submission within 24 hours.",
      },
      {
        title: "Follow-up Care",
        desc: "Care coordination for follow-up visits and medication adherence.",
      },
      {
        title: "Grievance Handling",
        desc: "Dedicated grievance redressal with 72-hour resolution commitment.",
      },
      {
        title: "Health Record Management",
        desc: "Digital health records accessible via ABHA-linked PHR app.",
      },
    ],
  },
];

const helpdeskCards = [
  {
    icon: Phone,
    title: "Claims Helpdesk",
    description:
      "24/7 support for claim status queries, document submission, and settlement follow-ups.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    contact: "1800-XXX-CLAIM",
  },
  {
    icon: Shield,
    title: "ABHA Assistance",
    description:
      "Help with ABHA ID creation, health record linking, and digital health profile management.",
    color: "text-green-600",
    bg: "bg-green-50",
    contact: "1800-XXX-ABHA",
  },
  {
    icon: MessageSquare,
    title: "Insurance Queries",
    description:
      "Expert guidance on policy coverage, pre-authorization, and insurer communication.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    contact: "1800-XXX-INS",
  },
  {
    icon: AlertCircle,
    title: "Grievance Redressal",
    description:
      "Structured grievance management with dedicated case managers and escalation support.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    contact: "1800-XXX-CARE",
  },
];

const stats = [
  { value: "10,000+", label: "Patients Supported", icon: Heart },
  { value: "98%", label: "Satisfaction Rate", icon: CheckCircle2 },
  { value: "24/7", label: "Helpdesk Available", icon: Phone },
  { value: "45 min", label: "Avg Response Time", icon: Activity },
];

export function PatientSupport() {
  return (
    <Layout section="patient-support">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              Patient-First
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Patient Support Hub
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Compassionate, technology-driven support for every patient at
              every step of their healthcare journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-muted/30"
                >
                  <Icon className="w-6 h-6 text-health-teal mx-auto mb-2" />
                  <div className="font-heading text-2xl font-bold text-foreground">
                    {s.value}
                  </div>
                  <div className="text-muted-foreground text-xs">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Patient Lifecycle */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Patient Lifecycle Support
            </h2>
            <p className="text-muted-foreground">
              Comprehensive assistance across all three phases of a patient's
              hospital journey.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {phases.map((phase, pi) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pi * 0.15 }}
                  className={`rounded-2xl p-6 border ${phase.color}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${phase.iconColor}`} />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-lg">
                      {phase.phase}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {phase.steps.map((step, si) => (
                      <div key={step.title} className="flex gap-3">
                        <div
                          className="w-6 h-6 rounded-full bg-white border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{ borderColor: "currentColor" }}
                        >
                          {si + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-foreground mb-0.5">
                            {step.title}
                          </h4>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Helpdesk Cards */}
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
              Patient Helpdesk Services
            </h2>
            <p className="text-muted-foreground">
              Dedicated helpdesk channels for every patient need.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {helpdeskCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-border shadow-xs card-hover text-center"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${card.bg} ${card.color}`}
                  >
                    {card.contact}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABHA Flow Diagram */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              ABHA Enrollment Flow
            </h2>
            <p className="text-muted-foreground">
              Simple 5-step process to create and activate your Ayushman Bharat
              Health Account.
            </p>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute top-8 left-0 right-0 h-0.5 bg-health-teal-light" />
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {[
                {
                  step: 1,
                  label: "Aadhaar / Mobile Verification",
                  icon: Shield,
                },
                { step: 2, label: "ABHA ID Generation", icon: CreditCard },
                { step: 3, label: "Profile Setup", icon: FileText },
                { step: 4, label: "Health Records Linkage", icon: Activity },
                { step: 5, label: "PHR App Access", icon: Heart },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 w-16 h-16 rounded-full bg-health-teal flex items-center justify-center mb-3 shadow-md">
                      <Icon className="w-7 h-7 text-white" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-health-teal text-health-teal text-xs font-bold flex items-center justify-center">
                        {s.step}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground leading-tight">
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 p-5 bg-health-teal-light rounded-xl border border-health-teal/20">
            <h4 className="font-heading font-bold text-foreground mb-3">
              Benefits of ABHA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Unique 14-digit health ID for every Indian",
                "Lifetime access to digitally stored health records",
                "Consent-based sharing with doctors and hospitals",
                "Works across all ABDM-registered healthcare providers",
                "Free to create via Aadhaar or mobile number",
                "Interoperable with all PHR apps and HIE systems",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-health-teal shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
