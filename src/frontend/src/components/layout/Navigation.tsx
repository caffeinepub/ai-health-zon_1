import { DemoBookingDialog } from "@/components/shared/DemoBookingDialog";
import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Cross, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/command-centre", label: "Command Centre" },
  { href: "/patient-support", label: "Patient Support" },
  { href: "/compliance", label: "Compliance" },
  { href: "/digital-health", label: "Digital Health" },
  { href: "/insights", label: "Insights" },
  { href: "/join-network", label: "Join Network" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally close drawer on path change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [currentPath]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-health-blue shadow-md group-hover:shadow-lg transition-shadow">
                <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
                <Activity
                  className="w-3 h-3 text-health-teal absolute bottom-1 right-1"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-heading font-bold text-sm leading-tight transition-colors ${
                    isScrolled ? "text-health-blue" : "text-white"
                  }`}
                >
                  AI Health Zon
                </span>
                <span
                  className={`text-[9px] leading-tight transition-colors ${
                    isScrolled ? "text-muted-foreground" : "text-white/70"
                  }`}
                >
                  Healthcare Ecosystem
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 7).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    currentPath === link.href
                      ? isScrolled
                        ? "bg-health-blue-light text-health-blue"
                        : "bg-white/20 text-white"
                      : isScrolled
                        ? "text-foreground hover:bg-muted hover:text-health-blue"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/insights"
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  currentPath === "/insights"
                    ? isScrolled
                      ? "bg-health-blue-light text-health-blue"
                      : "bg-white/20 text-white"
                    : isScrolled
                      ? "text-foreground hover:bg-muted hover:text-health-blue"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Insights
              </Link>
              <Link
                to="/join-network"
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  currentPath === "/join-network"
                    ? isScrolled
                      ? "bg-health-blue-light text-health-blue"
                      : "bg-white/20 text-white"
                    : isScrolled
                      ? "text-foreground hover:bg-muted hover:text-health-blue"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Join Network
              </Link>
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsDemoOpen(true)}
                size="sm"
                className={`hidden sm:flex text-xs font-semibold transition-all duration-200 ${
                  isScrolled
                    ? "bg-health-blue hover:bg-health-blue/90 text-white shadow-health"
                    : "bg-white text-health-blue hover:bg-white/90 shadow-md"
                }`}
              >
                Book Demo
              </Button>
              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isMobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-border shadow-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      currentPath === link.href
                        ? "bg-health-blue-light text-health-blue"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setIsDemoOpen(true);
                      setIsMobileOpen(false);
                    }}
                    className="w-full bg-health-blue hover:bg-health-blue/90 text-white"
                    size="sm"
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <DemoBookingDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </>
  );
}
