import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { ProjectPreview } from "@/components/project/ProjectPreview";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  GithubIcon,
} from "@/components/ui/Icons";
import type { Project } from "@/types/project";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid cursor-pointer place-items-center bg-black/60 p-2 sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.24,
          ease: smoothEase,
        }}
        className="relative max-h-[calc(100dvh-1rem)] w-full max-w-[1180px] cursor-default overflow-y-auto overscroll-contain rounded-[1.4rem] border-2 border-black bg-white shadow-[0_32px_90px_-28px_rgba(0,0,0,0.65)] transform-gpu sm:max-h-[calc(100dvh-2.5rem)]"
      >
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.36,
            delay: shouldReduceMotion ? 0 : 0.04,
            ease: smoothEase,
          }}
          className="relative overflow-hidden border-b border-black/10 px-5 pb-7 pt-5 transform-gpu sm:px-8 sm:pb-9 sm:pt-7 lg:px-10"
        >
          <div className="pointer-events-none absolute -left-20 -top-28 size-72 rounded-full border border-black/10" />
          <div className="pointer-events-none absolute -left-14 -top-24 size-72 rounded-full border border-black/10" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-black" />
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-black/50 sm:text-xs">
                Detail Project
              </p>
            </div>

            <motion.button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup detail project"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.28,
                delay: shouldReduceMotion ? 0 : 0.08,
                ease: smoothEase,
              }}
              className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-black bg-white transition-[background-color,color,transform] duration-300 hover:rotate-6 hover:bg-black hover:text-white"
            >
              <CloseIcon className="size-5" />
            </motion.button>
          </div>

          <div className="relative mt-8 max-w-4xl sm:mt-10">
            <h2
              id="project-dialog-title"
              className="mt-3 text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl lg:text-6xl"
            >
              {project.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-black/60 sm:text-base">
              {project.description}
            </p>
          </div>
        </motion.header>

        <div className="bg-[#f4f4f1] p-4 sm:p-8 lg:p-10">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: smoothEase,
            }}
            className="mx-auto max-w-[920px] overflow-hidden rounded-2xl border-2 border-black bg-black shadow-[0_22px_55px_-32px_rgba(0,0,0,0.7)] transform-gpu"
          >
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
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.38,
              delay: shouldReduceMotion ? 0 : 0.14,
              ease: smoothEase,
            }}
            className="mt-6 grid items-start gap-5 transform-gpu lg:grid-cols-[1.08fr_.92fr]"
          >
            <section className="rounded-2xl border border-black/20 bg-white p-5 sm:p-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-black/40">
                Tentang Project
              </p>
              <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">
                Ringkasan
              </h3>
              <p className="mt-4 text-sm leading-7 text-black/65 sm:text-base">
                {project.summary}
              </p>

              <div className="my-6 h-px bg-black/10" />

              <h3 className="text-xl font-extrabold tracking-[-0.035em]">
                Dampak Project
              </h3>
              <ul className="mt-4 space-y-3">
                {project.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-3 text-sm leading-6 text-black/65"
                  >
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-black" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid gap-5">
              <section className="rounded-2xl border border-black/20 bg-white p-5 sm:p-7">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-black/40">
                  Yang Dibangun
                </p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">
                  Fitur Utama
                </h3>
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

              <section className="rounded-2xl border border-black/20 bg-white p-5 sm:p-7">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-black/40">
                  Teknologi
                </p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.04em]">
                  Tech Stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
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
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.36,
              delay: shouldReduceMotion ? 0 : 0.18,
              ease: smoothEase,
            }}
            className="mt-5 flex flex-col gap-5 rounded-2xl border border-black/20 bg-white p-5 text-black transform-gpu sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <div>
              <p className="text-sm font-extrabold capitalize tracking-[-0.02em] text-black">
                Jelajahi Project
              </p>
              <p className="mt-2 max-w-md text-sm leading-6 text-black/60">
                Lihat hasil akhirnya atau pelajari struktur source code project
                ini.
              </p>
            </div>

            <div className="flex flex-col gap-3 min-[420px]:flex-row sm:shrink-0">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-black px-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  <ArrowUpRightIcon className="size-5" />
                  Lihat Website
                </a>
              )}

              <a
                href={project.repositoryUrl ?? "#contact"}
                target={project.repositoryUrl ? "_blank" : undefined}
                rel={project.repositoryUrl ? "noopener noreferrer" : undefined}
                onClick={project.repositoryUrl ? undefined : onClose}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-black/40 px-4 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                <GithubIcon className="size-5" />
                {project.repositoryUrl ? "Buka GitHub" : "Diskusikan Project"}
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
