import { Bot, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const responses: Record<string, string> = {
  services:
    "AI Health Zon offers: ✅ Revenue Cycle Management (RCM) ✅ NABH Compliance Tools ✅ ABDM/ABHA Integration ✅ Claims Command Centre ✅ Patient Support Hub ✅ Healthcare Network Management ✅ Digital Health Records",
  contact:
    "📧 Email: info@aihealthzon.com\n📞 Phone: +91 8696766966\n📍 Registered office: Triple Top Pattern Health Pvt. Ltd., C-10/9, Chinab Appartment, Sector 28, Pratap Nagar, Jaipur",
  demo: "You can book a free personalized demo by clicking the 'Book Demo' button in the navigation, or visit our Join Network page. Our specialist will contact you within 2 business hours!",
  hospital:
    "We provide hospitals with: RCM automation, Pre-authorization management, Real-time claim tracking, NABH compliance tools, Financial analytics, and comprehensive staff training programs.",
  rcm: "Our Revenue Cycle Management (RCM) solution automates the entire billing cycle — from patient registration to final settlement. We achieve 95%+ clean claim rates and reduce denial rates by up to 40%.",
  revenue:
    "Our Revenue Cycle Management (RCM) solution automates the entire billing cycle — from patient registration to final settlement. We achieve 95%+ clean claim rates and reduce denial rates by up to 40%.",
  nabh: "We offer comprehensive NABH 6th Edition compliance support covering all 5 pillars: Patient Rights, Clinical Documentation, Medication Safety, Quality Indicators, and Infection Control. 100+ hospitals certified through our platform!",
  abdm: "We provide full ABDM integration including ABHA ID creation, Personal Health Records (PHR), Health Information Exchange, Consent Management, and Healthcare Interoperability — fully compliant with NHA guidelines.",
  abha: "ABHA (Ayushman Bharat Health Account) IDs can be created and managed through our platform. We handle enrollment, verification, and health record linkage seamlessly.",
  claim:
    "Our Claim Command Centre provides real-time tracking, rejection analytics, clean claim scoring, and department risk index. We process 10,000+ claims monthly with a 95% clean claim rate.",
  patient:
    "Our Patient Support Hub covers the full patient lifecycle: Pre-admission (insurance verification, ABHA enrollment), During Admission (treatment documentation, insurance liaison), and Post-Discharge (claim filing, follow-up care, grievance handling).",
  compliance:
    "Our NABH module covers NABH standards, audit readiness workflows, documentation checklists, and real-time monitoring. We've helped 100+ hospitals achieve NABH certification with a 98% audit pass rate.",
  insurer:
    "We connect insurers with hospitals through our network for faster pre-authorization, real-time claim updates, fraud detection, and automated reconciliation — reducing processing time by 60%.",
  vendor:
    "Vendors and suppliers can join our network to connect with 100+ partner hospitals for procurement, supplies, and services. Join through our 'Join Network' page.",
  join: "Joining AI Health Zon is simple! Visit our 'Join Network' page and select your stakeholder type (Hospital, Insurer, Vendor, Healthcare Professional, NGO, or Ambulance Service). Complete the registration form and our team will onboard you within 48 hours.",
  careers:
    "We're growing! We look for passionate healthcare technology professionals. Send your resume to careers@aihealthzon.com or connect with us on LinkedIn.",
  pricing:
    "Our pricing is customized based on your organization's size and needs. Contact us at info@aihealthzon.com or call +91 8696766966 for a tailored quote.",
  help: "I can help you with:\n• Information about our services\n• Contact details\n• Demo booking\n• NABH compliance\n• ABDM/ABHA integration\n• Claims management\n• Joining our network\n\nWhat would you like to know?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lower.includes(key)) {
      return response;
    }
  }
  return "I can help with info about our services, contact details, demo booking, and more. Try asking about 'services', 'demo', 'NABH', 'ABDM', 'claims', or 'joining the network'!";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm the AI Health Zon assistant. How can I help you today?\n\nYou can ask about our services, demo booking, NABH compliance, ABDM integration, claims management, and more!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, isBot: false };
    const botResponse = getBotResponse(input);
    const botMsg: Message = {
      id: Date.now() + 1,
      text: botResponse,
      isBot: true,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-5 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-14 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 health-gradient flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    AI Health Zon Bot
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/70 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-muted/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  {msg.isBot && (
                    <div className="w-6 h-6 rounded-full bg-health-blue flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.isBot
                        ? "bg-white text-foreground shadow-sm border border-border"
                        : "bg-health-blue text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-border flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about services, demo, NABH..."
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-health-blue/30"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="w-8 h-8 rounded-lg bg-health-teal hover:bg-health-teal/90 flex items-center justify-center transition-colors text-white shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 rounded-full bg-health-teal shadow-lg flex items-center justify-center hover:bg-health-teal/90 transition-colors"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
