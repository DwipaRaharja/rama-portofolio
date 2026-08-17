import { Container } from "@/components/ui/Container";
import {
  AboutFlowLines,
  DotGrid,
  SectionLabel,
} from "@/components/ui/Decorations";
import { Reveal } from "@/components/ui/Reveal";
import { AchievementSection } from "@/components/sections/AchievementSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ValueCards } from "@/components/sections/ValueCards";
import { PortraitIllustration } from "@/components/visuals/PortraitIllustration";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 overflow-hidden py-16 sm:py-24"
    >
      <AboutFlowLines className="pointer-events-none absolute inset-x-0 -top-2 h-[390px] w-full text-black/15 sm:h-[440px]" />
      <DotGrid className="absolute -left-4 bottom-24 hidden text-black md:grid" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr]">
          <Reveal direction="left">
            <PortraitIllustration />
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <SectionLabel>Kenalan lebih dekat</SectionLabel>
            <h2 className="text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
              Tentang Saya
            </h2>
            <p className="mt-5 max-w-[760px] text-sm leading-7 text-black/65 sm:text-base">
              Saya Ramadwipa, seorang Full Stack Developer yang berfokus pada
              pengembangan aplikasi web untuk membantu kebutuhan bisnis. Saya
              menyukai proses memahami masalah, merancang solusi yang sesuai,
              lalu mengubahnya menjadi aplikasi yang fungsional dan mudah
              digunakan. Dalam setiap project, saya tidak hanya memerhatikan
              bagaimana sistem bekerja, tetapi juga bagaimana tampilannya tetap
              rapi, nyaman digunakan, dan benar-benar memberi manfaat bagi
              penggunanya.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.14}
          className="mx-auto mt-14 max-w-[850px] text-center"
        >
          <p className="text-sm font-semibold italic text-black/70">
            “Tujuan saya bukan sekadar membuat aplikasi berjalan, tetapi
            membuatnya benar-benar berguna.”
          </p>
        </Reveal>

        <ValueCards />

        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24">
          <TechStackSection />

          <AchievementSection />

          <EducationSection />
        </div>
      </Container>
    </section>
  );
}
