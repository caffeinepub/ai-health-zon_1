import { Chatbot } from "@/components/shared/Chatbot";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { useRecordPageView } from "@/hooks/useQueries";
import { type ReactNode, useEffect } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  section?: string;
}

export function Layout({ children, section = "general" }: LayoutProps) {
  const recordPageView = useRecordPageView();

  const mutate = recordPageView.mutate;
  useEffect(() => {
    mutate(section);
  }, [section, mutate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </div>
  );
}
