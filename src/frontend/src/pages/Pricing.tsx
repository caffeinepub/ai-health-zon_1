import { useEffect, useRef, useState } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const whatsappBase = "https://wa.me/918696766966?text=";

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    period: "/month",
    beds: "Up to 50 Beds",
    popular: false,
    features: [
      "Claim Automation (Basic)",
      "ABDM M1 Integration",
      "Clean Claim Dashboard",
      "Email Support",
    ],
    bestFor: "Small Clinics & Nursing Homes",
    cta: "Get Started",
    message:
      "Hi, I'm interested in the Starter Plan (₹15,000/month) for AI Health Zon. Please share more details.",
  },
  {
    name: "Professional",
    price: "₹35,000",
    period: "/month",
    beds: "Up to 200 Beds",
    popular: true,
    features: [
      "Full Claim Command Centre",
      "ABDM M1+M2 + NHCX Integration",
      "AI-Powered Revenue Intelligence",
      "NABH Compliance Module",
      "Training Module Access",
      "Priority Support + Onboarding",
    ],
    bestFor: "Mid-Size Hospitals",
    cta: "Start Professional",
    message:
      "Hi, I'm interested in the Professional Plan (₹35,000/month) for AI Health Zon. Please share more details.",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: " Pricing",
    beds: "200+ Beds / Multi-location",
    popular: false,
    features: [
      "All Professional Features",
      "ABDM M3 + Full NHCX",
      "Custom AI Models",
      "Dedicated Account Manager",
      "On-site Training & Onboarding",
      "SLA Guarantee",
    ],
    bestFor: "Large Hospital Chains",
    cta: "Request a Quote",
    message:
      "Hi, I'd like to request a quote for the Enterprise Plan for AI Health Zon. Please get in touch.",
  },
];

const addons = [
  {
    num: "01",
    name: "Chikitsa ABDM Software",
    price: "₹1,500/Bed/Year",
    desc: "Fully ABDM & NHCX compliant hospital management software via our partner chikitsa.io. NHA certified.",
  },
  {
    num: "02",
    name: "Auto Patient Kiosk",
    price: "₹8,000/month per location",
    desc: "Self-service patient registration, insurance check, payment, and live tracking kiosk system.",
  },
  {
    num: "03",
    name: "Training Masterclass",
    price: "₹25,000/batch",
    desc: "Claim Protection & Show-Cause Prevention Masterclass for up to 20 hospital staff members.",
  },
  {
    num: "04",
    name: "Investor Pitch Preparation",
    price: "₹50,000 one-time",
    desc: "Professional investor pitch deck preparation, ROI modelling, and presentation coaching.",
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — we offer a 14-day free demo with full platform access. No credit card required. Our team sets up your account and walks you through all modules.",
  },
  {
    q: "What is included in onboarding?",
    a: "Every plan includes dedicated setup assistance, staff orientation training, and data migration support. Professional and Enterprise plans include full on-site onboarding.",
  },
  {
    q: "Are government scheme integrations included?",
    a: "PMJAY, RGHS, and MAA Yojana integrations are available in Professional and Enterprise plans. These require ABDM M2+ compliance which is included in those tiers.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. Upgrades are seamless and take effect immediately. Your data, settings, and history are fully preserved when you move between plans.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        data-ocid="pricing.faq.toggle"
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between gap-4 group"
      >
        <span className="font-['Playfair_Display'] text-lg text-gray-900 group-hover:text-teal-700 transition-colors">
          {q}
        </span>
        <span
          className={`text-teal-600 text-2xl font-light transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-5" : "max-h-0"}`}
      >
        <p className="text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export function Pricing() {
  const heroReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const plansReveal = useScrollReveal();
  const addonsReveal = useScrollReveal();
  const roiReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white py-24 px-6">
        <div
          ref={heroReveal.ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            heroReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-block bg-teal-500/20 border border-teal-400/40 text-teal-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            Transparent Pricing
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Built for Indian Hospitals. Pay only for what you need.
          </p>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-teal-700 text-white py-10 px-6">
        <div
          ref={statsReveal.ref}
          className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center transition-all duration-700 ${
            statsReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { val: "500+", label: "Hospitals Trust Us" },
            { val: "97%", label: "Clean Claim Rate" },
            { val: "₹500Cr+", label: "Revenue Recovered" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-['Playfair_Display'] text-4xl font-bold">
                {s.val}
              </div>
              <div className="text-teal-100 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-6 bg-gray-50">
        <div
          ref={plansReveal.ref}
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            plansReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <div className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3">
              Choose Your Plan
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900">
              Plans for Every Hospital
            </h2>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-ocid="pricing.plans.list"
          >
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                data-ocid={`pricing.plan.item.${i + 1}`}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.popular
                    ? "bg-teal-700 text-white shadow-2xl scale-105 border-2 border-teal-400"
                    : "bg-white text-slate-900 shadow-lg border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase">
                    ✦ Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div
                    className={`text-sm font-semibold tracking-widest uppercase mb-2 ${
                      plan.popular ? "text-teal-200" : "text-teal-600"
                    }`}
                  >
                    {plan.beds}
                  </div>
                  <h3
                    className={`font-['Playfair_Display'] text-2xl font-bold mb-4 ${
                      plan.popular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-['Playfair_Display'] text-4xl font-bold ${
                        plan.popular ? "text-white" : "text-teal-700"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${plan.popular ? "text-teal-200" : "text-gray-500"}`}
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm ${
                        plan.popular ? "text-teal-100" : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`mt-0.5 text-base ${
                          plan.popular ? "text-amber-300" : "text-teal-500"
                        }`}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div
                  className={`text-xs mb-6 ${
                    plan.popular ? "text-teal-200" : "text-gray-400"
                  }`}
                >
                  Best for:{" "}
                  <span className="font-semibold">{plan.bestFor}</span>
                </div>
                <a
                  href={`${whatsappBase}${encodeURIComponent(plan.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`pricing.plan.primary_button.${i + 1}`}
                  className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.popular
                      ? "bg-white text-teal-700 hover:bg-teal-50"
                      : "bg-teal-700 text-white hover:bg-teal-800"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 px-6 bg-white">
        <div
          ref={addonsReveal.ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            addonsReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-14">
            <div className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3">
              Modular Add-Ons
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900">
              Extend Your Platform
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Add specialized capabilities to any plan. Each add-on integrates
              seamlessly with your core subscription.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            data-ocid="pricing.addons.list"
          >
            {addons.map((a, i) => (
              <div
                key={a.name}
                data-ocid={`pricing.addon.item.${i + 1}`}
                className="flex gap-6 p-7 rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="font-['Playfair_Display'] text-5xl font-bold text-teal-100 group-hover:text-teal-200 transition-colors leading-none mt-1 select-none">
                  {a.num}
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-slate-900 mb-1">
                    {a.name}
                  </h3>
                  <div className="text-teal-700 font-semibold text-sm mb-2">
                    {a.price}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Guarantee */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div
          ref={roiReveal.ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            roiReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <div className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">
              ROI Guarantee
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-6">
              Your Investment Pays for Itself
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Most hospitals recover our annual fee within the first 30 days
              through reduced claim rejection alone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                val: "₹2–5 Lakh",
                label: "Saved per Month",
                sub: "through claim automation",
              },
              {
                val: "18 Months",
                label: "Average ROI Payback",
                sub: "full platform investment",
              },
              {
                val: "<2%",
                label: "Claim Rejection Rate",
                sub: "down from industry avg 15%",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors"
              >
                <div className="font-['Playfair_Display'] text-4xl font-bold text-teal-400 mb-2">
                  {s.val}
                </div>
                <div className="font-semibold text-white mb-1">{s.label}</div>
                <div className="text-slate-400 text-sm">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div
          ref={faqReveal.ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            faqReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <div className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3">
              FAQ
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-slate-900">
              Common Questions
            </h2>
          </div>
          <div data-ocid="pricing.faq.list">
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-teal-700 text-white">
        <div
          ref={ctaReveal.ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            ctaReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-4">
            Ready to Transform Your Revenue?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Book a free 14-day demo — our team will set up your account and show
            you exactly how much revenue you can recover.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${whatsappBase}${encodeURIComponent("Hi, I'd like to book a free demo for AI Health Zon pricing plans. Please guide me on the best option for my hospital.")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="pricing.cta.primary_button"
              className="bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors"
            >
              📅 Book a Free Demo
            </a>
            <a
              href="mailto:info@aihealthzon.com"
              data-ocid="pricing.cta.secondary_button"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              ✉ Email Us
            </a>
          </div>
          <div className="mt-8 text-teal-200 text-sm">
            info@aihealthzon.com &nbsp;|&nbsp; +91-8696766966
          </div>
        </div>
      </section>

      {/* Footer attribution */}
      <div className="bg-slate-900 text-slate-400 text-center py-4 text-sm">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 hover:text-teal-300"
        >
          caffeine.ai
        </a>
      </div>
    </div>
  );
}
