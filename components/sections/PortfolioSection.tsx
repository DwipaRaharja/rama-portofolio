import { ProjectCard } from "@/components/project/ProjectCard";
import { Container } from "@/components/ui/Container";
import { CornerFlowLines, DotGrid, SectionLabel } from "@/components/ui/Decorations";
import { projects } from "@/data/projects";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="scroll-mt-28 py-16 sm:py-24">
      <Container>
        <div className="section-card-shadow relative overflow-hidden rounded-2xl border-2 border-black bg-white p-6 sm:p-10">
          <CornerFlowLines className="pointer-events-none absolute -left-16 -top-10 h-[350px] w-[560px] text-black/15 sm:-left-12 sm:-top-12 sm:h-[400px] sm:w-[640px]" />
          <DotGrid className="absolute right-7 top-24 hidden text-black sm:grid" />

          <div className="relative z-10 max-w-2xl">
            <SectionLabel>Project</SectionLabel>
            <h2 className="text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
              Portofolio Saya
            </h2>
            <p className="mt-3 text-sm leading-6 text-black/60 sm:text-base">
              Beberapa project yang saya bangun untuk menyelesaikan kebutuhan nyata dan
              mengeksplorasi pengembangan web.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Container>

    </section>
  );
}
