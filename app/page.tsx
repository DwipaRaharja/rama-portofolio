import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { SolutionContactSection } from "@/components/sections/SolutionContactSection";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <SolutionContactSection />
    </main>
  );
}
