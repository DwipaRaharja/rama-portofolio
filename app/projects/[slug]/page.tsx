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
import { WindowCard } from "@/components/ui/WindowCard";
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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <section className="relative overflow-hidden border-b border-zinc-200 pb-16 pt-8 dark:border-white/10 sm:pb-20 sm:pt-12">
        <DotGrid className="pointer-events-none absolute right-[7%] top-24 hidden rotate-12 text-zinc-950/10 md:grid dark:text-white/15" />

        <Container className="relative">
          <Link
            href="/#portfolio"
            className="interactive-transition inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Portfolio
          </Link>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="max-w-4xl">
              <SectionLabel>Case Study</SectionLabel>
              <h1 className="text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-zinc-950 sm:text-4xl md:text-5xl lg:text-[3.25rem] dark:text-white">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-400">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 min-[440px]:flex-row lg:flex-col">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-transition inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-zinc-950 px-5 text-sm font-bold text-white hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-[#050505] dark:hover:bg-zinc-200 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <ArrowUpRightIcon className="size-5" />
                  Live Demo
                </a>
              )}

              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-transition inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-zinc-300 bg-white px-5 text-sm font-bold text-zinc-950 hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white dark:border-white/30 dark:bg-[#121215] dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#050505]"
                >
                  <GithubIcon className="size-5" />
                  Open GitHub
                </a>
              ) : (
                <Link
                  href="/#contact"
                  className="interactive-transition inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-zinc-300 bg-white px-5 text-sm font-bold text-zinc-950 hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white dark:border-white/30 dark:bg-[#121215] dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#050505]"
                >
                  Discuss Project
                  <ArrowRightIcon className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f4f6] py-12 dark:bg-[#0a0a0d] sm:py-16 lg:py-20">
        <Container>
          <Reveal className="mx-auto max-w-[1080px]">
            <WindowCard
              badge="Project Preview"
              badgePulse={false}
              interactive={false}
              dotSize="md"
              className="rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-white/15 dark:bg-[#0e0e11] dark:shadow-[0_24px_65px_-38px_rgba(0,0,0,0.9)]"
              headerClassName="h-11 px-4 sm:px-5"
            >
              <div className="p-2 sm:p-3">
                <ProjectPreview project={project} detail />
              </div>
            </WindowCard>
          </Reveal>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.08fr_.92fr]">
            <Reveal>
              <section className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-950 shadow-sm sm:p-8 dark:border-white/12 dark:bg-[#0e0e11] dark:text-white">
                <SectionLabel>About Project</SectionLabel>
                <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-zinc-950 dark:text-white">
                  Overview
                </h2>
                <p className="mt-5 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-400">
                  {project.summary}
                </p>

                <div className="my-8 h-px bg-zinc-200 dark:bg-white/10" />

                <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                  Key Outcomes
                </h2>
                <ul className="mt-5 space-y-4">
                  {project.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm leading-6 text-zinc-600 sm:text-base dark:text-zinc-400"
                    >
                      <CheckIcon className="mt-0.5 size-5 shrink-0 text-zinc-950 dark:text-white" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <div className="grid gap-6">
              <Reveal delay={0.08}>
                <section className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-950 shadow-sm sm:p-8 dark:border-white/12 dark:bg-[#0e0e11] dark:text-white">
                  <SectionLabel>What Was Built</SectionLabel>
                  <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    Core Features
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {project.features.map((feature, index) => (
                      <li
                        key={feature}
                        className="flex items-start gap-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="font-extrabold text-zinc-400 dark:text-zinc-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>

              <Reveal delay={0.14}>
                <section className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-950 shadow-sm sm:p-8 dark:border-white/12 dark:bg-[#0e0e11] dark:text-white">
                  <SectionLabel>Technologies</SectionLabel>
                  <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    Tech Stack
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-xs font-bold text-zinc-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300"
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
                className="surface-transition flex transform-gpu flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-950 will-change-transform hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-white/15 dark:bg-[#0e0e11] dark:text-white dark:hover:border-white/40 dark:hover:bg-[#141417] dark:hover:shadow-2xl"
              >
                <div>
                  <p className="text-xs font-semibold capitalize tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    Next Project
                  </p>
                  <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-zinc-950 sm:text-3xl dark:text-white">
                    {nextProject.title}
                  </p>
                </div>
                <span className="inline-flex items-center gap-3 text-sm font-bold text-zinc-950 dark:text-white">
                  View Project
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
