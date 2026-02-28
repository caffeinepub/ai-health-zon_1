import { AboutSection } from "@/components/home/AboutSection";
import { ComprehensiveMetrics } from "@/components/home/ComprehensiveMetrics";
import { HealthGardenTree } from "@/components/home/HealthGardenTree";
import { MissionVision } from "@/components/home/MissionVision";
import { PlatformNavigationHub } from "@/components/home/PlatformNavigationHub";
import { Layout } from "@/components/layout/Layout";

export function Home() {
  return (
    <Layout section="home">
      <HealthGardenTree />
      <AboutSection />
      <MissionVision />
      <PlatformNavigationHub />
      <ComprehensiveMetrics />
    </Layout>
  );
}
