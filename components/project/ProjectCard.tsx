"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubIcon,
} from "@/components/ui/Icons";
import { WindowCard } from "@/components/ui/WindowCard";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: 0.06 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <WindowCard
        className="group/project flex h-full flex-col"
      >
        {/* Screenshot Image Container - Compact 16:9 Aspect */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-[#18181e]">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.imageAlt ?? `Preview project ${project.title}`}
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/project:scale-[1.035]"
            />
          ) : (
            <div className="grid h-full place-items-center text-xs text-zinc-500">
              No Preview Image
            </div>
          )}
          {/* Subtle Bottom Shadow Gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent dark:from-[#0e0e11]" />
        </div>

        {/* Card Content Body - Compact Padding */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            {/* Title */}
            <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white sm:text-xl">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
              {project.description}
            </p>

            {/* Technologies Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="surface-transition rounded-md border border-zinc-200 bg-zinc-100/80 px-2 py-0.5 text-[11px] font-semibold text-zinc-700 group-hover/project:border-zinc-300 group-hover/project:text-zinc-950 dark:border-white/12 dark:bg-white/[0.04] dark:text-zinc-300 dark:group-hover/project:border-white/25 dark:group-hover/project:text-white"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-3.5 dark:border-white/10">
            <Link
              href={`/projects/${project.id}`}
              className="group/detail inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 sm:text-sm"
            >
              <span>View Case Study</span>
              <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover/detail:translate-x-1" />
            </Link>

            {/* Direct External Links (Repository & Demo) */}
            <div className="flex items-center gap-1.5">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub repository for ${project.title}`}
                  className="interactive-transition grid size-8 place-items-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-350 hover:bg-zinc-200 hover:text-zinc-950 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/40 dark:hover:bg-white/10 dark:hover:text-white"
                  title="View Source Code on GitHub"
                >
                  <GithubIcon className="size-4" />
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo for ${project.title}`}
                  className="interactive-transition grid size-8 place-items-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-350 hover:bg-zinc-200 hover:text-zinc-950 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/40 dark:hover:bg-white/10 dark:hover:text-white"
                  title="Visit Live Demo"
                >
                  <ArrowUpRightIcon className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </WindowCard>
    </motion.div>
  );
}
