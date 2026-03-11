import { Link } from "@tanstack/react-router";
import { Activity, Cross, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

const platformLinks = [
  { href: "/hospitals", label: "Hospital Revenue Management" },
  { href: "/command-centre", label: "Claim Command Centre" },
  { href: "/patient-support", label: "Patient Support" },
  { href: "/compliance", label: "NABH" },
  { href: "/digital-health", label: "ABDM" },
  { href: "/nhcx", label: "NHCX" },
  { href: "/insights", label: "Insights" },
  { href: "/join-network", label: "Join Network" },
  { href: "/ai-course", label: "AI Course" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="relative overflow-hidden bg-slate-900">
      {/* Subtle teal accent overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.55 0.18 200) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.38 0.14 188) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
                <Activity
                  className="w-3 h-3 text-teal-400 absolute bottom-1 right-1"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">
                  AI Health Zon
                </div>
                <div className="text-slate-400 text-xs">
                  Healthcare Ecosystem
                </div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Transforming India's Healthcare Ecosystem through intelligent
              digital solutions for hospitals, insurers, and patients.
            </p>
            <div className="flex gap-3">
              {[
                {
                  icon: SiLinkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                { icon: SiX, href: "https://twitter.com", label: "Twitter" },
                {
                  icon: SiFacebook,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: SiYoutube,
                  href: "https://youtube.com",
                  label: "YouTube",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal-500/30 flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Solutions
            </h3>
            <ul className="space-y-2">
              {[
                "Revenue Cycle Management",
                "NABH Compliance",
                "ABDM Integration",
                "NHCX Readiness",
                "Claims Management",
                "Patient Support",
                "Network Management",
                "Analytics & Reports",
                "Staff Training",
              ].map((item) => (
                <li key={item}>
                  <span className="text-slate-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <a
                  href="mailto:info@aihealthzon.com"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  info@aihealthzon.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <a
                  href="tel:+918696766966"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  +91 8696766966
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">
                  Registered office Triple Top Pattern Health Pvt. Ltd.
                  <br />
                  C-10/9, Chinab Appartment, Sector 28,
                  <br />
                  Pratap Nagar, Jaipur
                </span>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-slate-400 text-xs mb-1">Emergency Helpline</p>
              <p className="text-white font-semibold text-sm">+91-8696766966</p>
              <p className="text-slate-500 text-xs">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">
            © {currentYear} AI Health Zon. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
