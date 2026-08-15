import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { ProjectPreview } from "@/components/project/ProjectPreview";
import { CheckIcon, CloseIcon, GithubIcon } from "@/components/ui/Icons";
import type { Project } from "@/types/project";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] cursor-pointer overflow-y-auto overscroll-contain bg-black/45 p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
      style={{ willChange: "opacity" }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
        className="relative mx-auto my-3 min-h-[calc(100vh-48px)] max-w-[1280px] cursor-default overflow-hidden rounded-2xl border-2 border-black bg-white p-6 shadow-xl transform-gpu sm:p-10 lg:p-12"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup detail project"
          className="absolute right-5 top-5 z-20 grid size-12 place-items-center rounded-lg border-2 border-black bg-white transition-colors hover:bg-black hover:text-white sm:right-8 sm:top-8"
        >
          <CloseIcon className="size-6" />
        </button>

        <div className="pointer-events-none absolute -left-24 -top-16 size-64 rounded-full border border-black/10" />
        <div className="pointer-events-none absolute -left-20 -top-12 size-64 rounded-full border border-black/10" />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">Project</p>
        <h2
          id="project-dialog-title"
          className="mt-3 max-w-[80%] text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl"
        >
          {project.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:text-base">
          {project.description}
        </p>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <ProjectPreview project={project} />

          <div>
            <div>
              <h3 className="text-3xl font-extrabold tracking-[-0.04em]">Ringkasan</h3>
              <p className="mt-4 text-sm leading-7 text-black/65 sm:text-base">
                {project.summary}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-black/50 px-3 py-2 text-xs font-semibold"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Fitur Utama</h3>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-black/70">
                    <CheckIcon className="mt-0.5 size-5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={project.repositoryUrl ?? "#contact"}
              onClick={project.repositoryUrl ? undefined : onClose}
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-lg border border-black px-4 text-sm font-bold transition-colors hover:bg-black hover:text-white"
            >
              <GithubIcon className="size-5" />
              {project.repositoryUrl ? "Buka GitHub" : "Diskusikan Project"}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
