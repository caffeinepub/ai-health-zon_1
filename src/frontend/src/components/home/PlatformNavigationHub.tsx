import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  DollarSign,
  FileText,
  Heart,
  Monitor,
  Network,
  Shield,
  Smartphone,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const platforms = [
  {
    icon: DollarSign,
    title: "RCM Solutions",
    description:
      "End-to-end revenue cycle management with automated billing and claims processing.",
    href: "/hospitals",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Network,
    title: "Healthcare Network",
    description:
      "Connecting hospitals, insurers, vendors, and healthcare professionals seamlessly.",
    href: "/ecosystem",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: BookOpen,
    title: "Knowledge Board",
    description:
      "Insights, case studies, scheme updates, and industry best practices.",
    href: "/insights",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: Monitor,
    title: "Command Centre",
    description:
      "Real-time claims monitoring, rejection analytics, and risk intelligence.",
    href: "/command-centre",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    icon: Heart,
    title: "Patient Support",
    description:
      "Full patient lifecycle support from pre-admission to post-discharge care.",
    href: "/patient-support",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: Shield,
    title: "Compliance",
    description:
      "NABH 6th Edition compliance framework, audit readiness, and quality monitoring.",
    href: "/compliance",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Smartphone,
    title: "Digital Health",
    description:
      "ABDM integration, ABHA ID management, and health information exchange.",
    href: "/digital-health",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: FileText,
    title: "Insights",
    description:
      "Healthcare intelligence, regulatory updates, and RCM best practices.",
    href: "/insights",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    icon: UserPlus,
    title: "Join Network",
    description:
      "Register as a hospital, insurer, vendor, professional, NGO, or service provider.",
    href: "/join-network",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
];

export function PlatformNavigationHub() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 bg-health-blue-light text-health-blue text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Platform Solutions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Everything Healthcare, In One Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive suite of healthcare digital solutions
            designed for every stakeholder in the ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((platform, i) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
              >
                <Link to={platform.href} className="group block">
                  <div
                    className={`h-full bg-white rounded-xl p-6 border ${platform.border} shadow-xs card-hover group-hover:shadow-card-hover`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl ${platform.bg} flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-5 h-5 ${platform.color}`} />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-health-blue transition-colors">
                      {platform.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {platform.description}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold ${platform.color} group-hover:gap-2 transition-all`}
                    >
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
