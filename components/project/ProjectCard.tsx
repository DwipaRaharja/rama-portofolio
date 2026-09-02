"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubIcon,
} from "@/components/ui/Icons";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: 0.08 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/project flex h-full flex-col overflow-hidden rounded-xl border border-white/12 bg-[#0e0e11] text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-[#131317] hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.03)]"
    >
      {/* Top Media Window with Compact MacBook Mockup Header */}
      <div className="overflow-hidden border-b border-white/10 bg-[#16161c]">
        {/* Browser Topbar Bar */}
        <div className="flex items-center justify-between border-b border-white/8 bg-[#111115] px-3.5 py-2">
          {/* Mock Window Dots (MacBook style: Red, Yellow, Green) */}
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#ff5f56] shadow-[0_0_5px_rgba(255,95,86,0.35)]" />
            <span className="size-2 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_rgba(255,189,46,0.35)]" />
            <span className="size-2 rounded-full bg-[#27c93f] shadow-[0_0_5px_rgba(39,201,63,0.35)]" />
          </div>

          {/* Status Badge */}
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-300">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.eyebrow}
          </span>
        </div>

        {/* Screenshot Image Container - Compact 16:9 Aspect */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#18181e]">
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
    </motion.article>
  );
}
