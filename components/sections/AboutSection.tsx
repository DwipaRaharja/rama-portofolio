import { Container } from "@/components/ui/Container";
import {
  AboutFlowLines,
  DotGrid,
  SectionLabel,
} from "@/components/ui/Decorations";
import { Reveal } from "@/components/ui/Reveal";
import { PortraitIllustration } from "@/components/visuals/PortraitIllustration";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100vh-6rem)] scroll-mt-24 flex-col justify-center pb-20 pt-8 text-zinc-950 dark:text-white sm:pb-24 sm:pt-10 lg:min-h-[calc(100vh-6rem)] lg:pb-28 lg:pt-12"
    >
      <AboutFlowLines className="pointer-events-none absolute inset-x-0 -top-2 h-[390px] w-full text-zinc-950/[0.04] dark:text-white/10 sm:h-[440px]" />
      <DotGrid className="absolute -left-4 bottom-24 hidden text-zinc-950/[0.06] dark:text-white/15 md:grid" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr]">
          <Reveal direction="up">
            <PortraitIllustration />
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <SectionLabel>Get to know me</SectionLabel>
            <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-5xl">
              About Me
            </h2>
            <p className="mt-5 max-w-[760px] text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              I am Ramadwipa, a Full Stack Developer focused on building web
              applications that solve practical business needs. I enjoy
              understanding the core problem, designing scalable architectures,
              and turning ideas into functional, intuitive software. In every
              project, I care not only about how the system works under the hood,
              but also ensuring the interface remains polished, accessible, and
              truly impactful for its users.
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.14}
          className="mx-auto mt-16 max-w-[850px] text-center sm:mt-20 lg:mt-24"
        >
          <p className="text-sm font-semibold italic text-zinc-700 dark:text-zinc-300 sm:text-base">
            &ldquo;My goal is not just to make applications run, but to make them
            truly useful.&rdquo;
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
