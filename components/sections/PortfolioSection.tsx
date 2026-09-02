import { ProjectCard } from "@/components/project/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Decorations";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative scroll-mt-24 pb-20 pt-6 text-white sm:pb-24 sm:pt-8 lg:pb-28"
    >
      {/* Background Subtle Tech Dot Grid with Radial Mask */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,#000_30%,transparent_100%)]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl">
            Selected Projects
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            A collection of applications I&apos;ve built to solve practical business
            problems and explore modern full-stack web engineering.
          </p>
        </Reveal>

        {/* Compact Grid */}
        <div className="mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
