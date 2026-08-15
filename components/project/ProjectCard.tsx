import { motion } from "motion/react";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { ProjectPreview } from "@/components/project/ProjectPreview";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
};

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="h-full"
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/60 bg-white p-4 text-black transition-colors duration-[550ms] ease-in-out hover:border-black hover:bg-black hover:text-white sm:p-5">
        <div className="overflow-hidden rounded-xl">
          <ProjectPreview project={project} compact />
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <p className="mb-3 w-fit rounded border border-black/30 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-black/60 transition-colors duration-[550ms] ease-in-out group-hover:border-white/35 group-hover:text-white/65">
            {project.eyebrow}
          </p>
          <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{project.title}</h3>
          <p className="mt-2 text-sm leading-6 text-black/60 transition-colors duration-[550ms] ease-in-out group-hover:text-white/65">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded border border-black/30 px-2 py-1 text-[11px] font-semibold transition-colors duration-[550ms] ease-in-out group-hover:border-white/35"
              >
                {technology}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
          >
            Lihat Detail
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
