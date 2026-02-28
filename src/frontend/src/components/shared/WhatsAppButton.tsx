import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-40 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp className="w-6 h-6 text-white" />
    </motion.a>
  );
}
