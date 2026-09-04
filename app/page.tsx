import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <EducationSection />
      <PortfolioSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}
