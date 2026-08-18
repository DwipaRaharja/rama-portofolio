"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { ProjectPreview } from "@/components/project/ProjectPreview";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.95,
        delay: 0.14 + index * 0.16,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/project h-full"
    >
      <div className="surface-transition flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border border-black/60 bg-white p-4 text-black will-change-transform group-hover/project:-translate-y-1 group-hover/project:border-black group-hover/project:bg-black group-hover/project:text-white group-hover/project:shadow-xl sm:p-5">
        <div className="overflow-hidden rounded-xl">
          <ProjectPreview project={project} compact />
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <p className="surface-transition mb-3 w-fit rounded border border-black/30 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-black/60 group-hover/project:border-white/35 group-hover/project:text-white/65">
            {project.eyebrow}
          </p>
          <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{project.title}</h3>
          <p className="surface-transition mt-2 text-sm leading-6 text-black/60 group-hover/project:text-white/65">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="surface-transition rounded border border-black/30 px-2 py-1 text-[11px] font-semibold group-hover/project:border-white/35"
              >
                {technology}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="interactive-transition group/detail mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold hover:text-white/65"
          >
            Lihat Detail
            <ArrowRightIcon className="interactive-transition size-4 group-hover/detail:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
