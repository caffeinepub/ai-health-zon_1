import {
  Building2,
  FileCheck,
  Hospital,
  MapPin,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const metrics = [
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Network Entities",
    description: "Hospitals, insurers, vendors, and professionals",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: MapPin,
    value: 50,
    suffix: "+",
    label: "Cities Covered",
    description: "Pan-India presence across tier 1, 2 & 3 cities",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: FileCheck,
    value: 10000,
    suffix: "+",
    label: "Claims Processed Monthly",
    description: "End-to-end claims lifecycle management",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    value: 95,
    suffix: "%",
    label: "Clean Claim Rate",
    description: "Industry-leading first-pass acceptance rate",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Stethoscope,
    value: 200,
    suffix: "+",
    label: "Healthcare Professionals",
    description: "Doctors, specialists, and care coordinators",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Hospital,
    value: 100,
    suffix: "+",
    label: "Partner Hospitals",
    description: "NABH-certified and accredited facilities",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

function CounterNumber({
  value,
  suffix,
  isActive,
}: { value: number; suffix: string; isActive: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isActive]);

  return (
    <span>
      {count >= 1000 ? `${(count / 1000).toFixed(0)}K` : count}
      {suffix}
    </span>
  );
}

export function ComprehensiveMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.1 240) 0%, oklch(0.22 0.12 200) 50%, oklch(0.15 0.08 185) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider border border-white/20">
            Platform Impact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Numbers That Speak
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Our platform's impact in numbers — driving efficiency, quality, and
            access across India's healthcare ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                className="bg-white/8 backdrop-blur-sm rounded-xl p-6 border border-white/15 hover:bg-white/12 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${metric.bg} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-white mb-1">
                      <CounterNumber
                        value={metric.value}
                        suffix={metric.suffix}
                        isActive={isInView}
                      />
                    </div>
                    <div className="font-semibold text-white/90 text-sm mb-1">
                      {metric.label}
                    </div>
                    <div className="text-white/50 text-xs">
                      {metric.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
