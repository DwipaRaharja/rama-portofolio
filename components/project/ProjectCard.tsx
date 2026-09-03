"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: -48, scale: 0.78 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.72,
        delay: shouldReduceMotion ? 0 : 0.1 + index * 0.18,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="h-full"
    >
      <WindowCard
        badge={project.eyebrow}
        className="group/project flex h-full flex-col"
      >
        {/* Screenshot Image Container - Compact 16:9 Aspect */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-[#18181e]">
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0e0e11] to-transparent" />
        </div>

        {/* Card Content Body - Compact Padding */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            {/* Title */}
            <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              {project.description}
            </p>

            {/* Technologies Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="surface-transition rounded-md border border-white/12 bg-white/[0.04] px-2 py-0.5 text-[11px] font-semibold text-zinc-300 group-hover/project:border-white/25 group-hover/project:text-white"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5">
            <Link
              href={`/projects/${project.id}`}
              className="group/detail inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-zinc-300 sm:text-sm"
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
                  className="interactive-transition grid size-8 place-items-center rounded-lg border border-white/15 bg-white/[0.04] text-zinc-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
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
                  className="interactive-transition grid size-8 place-items-center rounded-lg border border-white/15 bg-white/[0.04] text-zinc-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
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
