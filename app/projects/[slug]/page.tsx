import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectPreview } from "@/components/project/ProjectPreview";
import { Container } from "@/components/ui/Container";
import { DotGrid, SectionLabel } from "@/components/ui/Decorations";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  GithubIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { getProjectById, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) notFound();

  return {
    title: `${project.title} | Ramadwipa`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | Ramadwipa`,
      description: project.description,
      type: "article",
      images: project.imageUrl
        ? [
            {
              url: project.imageUrl,
              alt: project.imageAlt ?? `Tampilan project ${project.title}`,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject =
    projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : null;

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-black/10 pb-16 pt-8 sm:pb-20 sm:pt-12">
        <DotGrid className="pointer-events-none absolute right-[7%] top-24 hidden rotate-12 text-black/15 md:grid" />

        <Container className="relative">
          <Link
            href="/#portfolio"
            className="interactive-transition inline-flex items-center gap-2 text-sm font-bold text-black/60 hover:text-black"
          >
            <ArrowLeftIcon className="size-4" />
            Kembali ke Portofolio
          </Link>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="max-w-4xl">
              <SectionLabel>Detail Project</SectionLabel>
              <h1 className="text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold leading-[0.94] tracking-[-0.065em]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-black/60 sm:text-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 min-[440px]:flex-row lg:flex-col">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-transition inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-black px-5 text-sm font-bold text-white hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <ArrowUpRightIcon className="size-5" />
                  Lihat Website
                </a>
              )}

              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-transition inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-black/40 px-5 text-sm font-bold hover:-translate-y-0.5 hover:bg-black hover:text-white"
                >
                  <GithubIcon className="size-5" />
                  Buka GitHub
                </a>
              ) : (
                <Link
                  href="/#contact"
                  className="interactive-transition inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-black/40 px-5 text-sm font-bold hover:-translate-y-0.5 hover:bg-black hover:text-white"
                >
                  Diskusikan Project
                  <ArrowRightIcon className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f4f1] py-12 sm:py-16 lg:py-20">
        <Container>
          <Reveal className="mx-auto max-w-[1080px] overflow-hidden rounded-2xl border-2 border-black bg-black shadow-[0_24px_65px_-38px_rgba(0,0,0,0.65)]">
            <div className="flex h-11 items-center justify-between border-b border-white/15 px-4 text-white sm:px-5">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="size-2 rounded-full bg-white" />
                <span className="size-2 rounded-full bg-white/50" />
                <span className="size-2 rounded-full bg-white/25" />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 sm:text-[10px]">
                Project Preview
              </p>
            </div>
            <div className="p-2 sm:p-3">
              <ProjectPreview project={project} detail />
            </div>
          </Reveal>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.08fr_.92fr]">
            <Reveal>
              <section className="rounded-2xl border border-black/20 bg-white p-6 sm:p-8">
                <SectionLabel>Tentang Project</SectionLabel>
                <h2 className="text-3xl font-extrabold tracking-[-0.045em]">
                  Ringkasan
                </h2>
                <p className="mt-5 text-sm leading-7 text-black/65 sm:text-base">
                  {project.summary}
                </p>

                <div className="my-8 h-px bg-black/10" />

                <h2 className="text-2xl font-extrabold tracking-[-0.04em]">
                  Dampak Project
                </h2>
                <ul className="mt-5 space-y-4">
                  {project.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm leading-6 text-black/65 sm:text-base"
                    >
                      <CheckIcon className="mt-0.5 size-5 shrink-0 text-black" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <div className="grid gap-6">
              <Reveal delay={0.08}>
                <section className="rounded-2xl border border-black/20 bg-white p-6 sm:p-8">
                  <SectionLabel>Yang Dibangun</SectionLabel>
                  <h2 className="text-2xl font-extrabold tracking-[-0.04em]">
                    Fitur Utama
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {project.features.map((feature, index) => (
                      <li
                        key={feature}
                        className="flex items-start gap-4 text-sm leading-6 text-black/65"
                      >
                        <span className="font-extrabold text-black/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>

              <Reveal delay={0.14}>
                <section className="rounded-2xl border border-black/20 bg-white p-6 sm:p-8">
                  <SectionLabel>Teknologi</SectionLabel>
                  <h2 className="text-2xl font-extrabold tracking-[-0.04em]">
                    Tech Stack
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-black/30 bg-black/[0.025] px-3 py-2 text-xs font-bold"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>
            </div>
          </div>

          {nextProject && (
            <Reveal delay={0.08} className="group/next-project mt-6">
              <Link
                href={`/projects/${nextProject.id}`}
                className="surface-transition flex transform-gpu flex-col gap-5 rounded-2xl border-2 border-black bg-black p-6 text-white will-change-transform group-hover/next-project:-translate-y-1 group-hover/next-project:shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div>
                  <p className="text-xs font-semibold capitalize tracking-[0.18em] text-white/50">
                    Project Berikutnya
                  </p>
                  <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                    {nextProject.title}
                  </p>
                </div>
                <span className="inline-flex items-center gap-3 text-sm font-bold">
                  Lihat Project
                  <ArrowRightIcon className="interactive-transition size-5 group-hover/next-project:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          )}
        </Container>
      </section>
    </main>
  );
}
