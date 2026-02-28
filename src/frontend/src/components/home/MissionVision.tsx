import { Eye, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const coreValues = [
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Cutting-edge AI solutions that push the boundaries of healthcare technology.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Transparent and ethical practices in every interaction and transaction.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "Impact",
    description:
      "Measurable, meaningful outcomes for all stakeholders in the ecosystem.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "Inclusion",
    description:
      "Healthcare access for all — regardless of geography or socioeconomic status.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export function MissionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.02 240) 0%, oklch(0.98 0.01 200) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-health-blue-light text-health-blue text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Our Foundation
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Mission, Vision & Values
          </h2>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-health-blue" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-health-blue-light flex items-center justify-center">
                <Target className="w-5 h-5 text-health-blue" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground">
                Our Mission
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To transform India's healthcare ecosystem through intelligent
              digital solutions that improve patient outcomes, streamline
              operations, and ensure financial sustainability for healthcare
              providers.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Digital Transformation",
                "Outcome-Focused",
                "Financial Sustainability",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-health-blue-light text-health-blue text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-health-teal" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-health-teal-light flex items-center justify-center">
                <Eye className="w-5 h-5 text-health-teal" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground">
                Our Vision
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A connected, transparent, and efficient healthcare ecosystem where
              every stakeholder — from patient to provider to payer — operates
              with confidence and clarity.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Connected", "Transparent", "Efficient"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-health-teal-light text-health-teal text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-heading text-xl font-bold text-foreground text-center mb-6">
            Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border card-hover text-center"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
