import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const stats = [
  { value: "500+", label: "Network Entities", color: "text-health-blue" },
  { value: "10K+", label: "Monthly Claims", color: "text-health-teal" },
  { value: "95%", label: "Clean Claim Rate", color: "text-health-green" },
  { value: "100+", label: "Partner Hospitals", color: "text-health-blue" },
];

const highlights = [
  "Revenue Cycle Management & Claims Automation",
  "NABH 6th Edition Compliance Framework",
  "Ayushman Bharat Digital Mission Integration",
  "Real-time Claims Command Centre",
  "Patient Support & Care Continuity",
  "Multi-stakeholder Network Management",
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-health-blue-light text-health-blue text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              About Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
              About AI Health Zon
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              AI Health Zon is India's premier healthcare digital ecosystem,
              bridging the gap between hospitals, insurers, healthcare
              professionals, and patients through intelligent technology
              solutions. We specialize in Revenue Cycle Management (RCM), NABH
              compliance, and digital health transformation.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Founded with a vision to transform healthcare operations across
              India, our platform serves 500+ network entities across 50+
              cities, processing over 10,000 claims monthly with an
              industry-leading 95% clean claim rate.
            </p>

            <ul className="space-y-2.5">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-health-green shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Stats Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Background decoration */}
            <div className="absolute -inset-4 health-gradient-light rounded-3xl" />

            <div className="relative p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-border text-center"
                  >
                    <div
                      className={`font-heading text-3xl font-bold mb-1 ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Certification badges */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  Certifications & Compliance
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "NABH Compliant",
                    "ABDM Ready",
                    "HIPAA Aligned",
                    "ISO 27001",
                    "NHA Certified",
                  ].map((cert) => (
                    <span
                      key={cert}
                      className="px-2.5 py-1 bg-health-blue-light text-health-blue text-xs rounded-full font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
