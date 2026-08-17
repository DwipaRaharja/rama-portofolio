"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { SectionLabel } from "@/components/ui/Decorations";
import {
  CodeIcon,
  FlowArrowIcon,
  ListChecksIcon,
  RocketLaunchIcon,
} from "@/components/ui/Icons";

const techStackGroups = [
  {
    label: "Frontend",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    Icon: CodeIcon,
  },
  {
    label: "Backend",
    technologies: ["Laravel", "PHP", "REST API"],
    Icon: FlowArrowIcon,
  },
  {
    label: "Database",
    technologies: ["MySQL", "Database Design"],
    Icon: ListChecksIcon,
  },
  {
    label: "Tools & Deployment",
    technologies: ["Git", "GitHub", "Figma", "Vercel"],
    Icon: RocketLaunchIcon,
  },
] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.05,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardsVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.03,
      staggerChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 38, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TechStackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="tech-stack"
      aria-labelledby="tech-stack-title"
      className="scroll-mt-28 rounded-2xl border-2 border-black bg-white p-6 shadow-[0_18px_55px_-38px_rgba(0,0,0,0.35)] sm:p-8"
      variants={sectionVariants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      <motion.div variants={headerVariants} className="max-w-2xl">
        <SectionLabel>Teknologi yang saya gunakan</SectionLabel>
        <h3
          id="tech-stack-title"
          className="text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl"
        >
          Tech Stack Saya
        </h3>
        <p className="mt-3 text-sm leading-6 text-black/60">
          Teknologi yang saya gunakan untuk membangun aplikasi web dari
          antarmuka, backend, pengelolaan data, hingga deployment.
        </p>
      </motion.div>

      <motion.div
        variants={cardsVariants}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {techStackGroups.map(({ label, technologies, Icon }) => (
          <motion.article
            key={label}
            variants={cardVariants}
            className="group rounded-xl border border-black/25 bg-white p-5 transition-[background-color,color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-xl"
          >
            <div className="grid size-11 place-items-center rounded-lg border border-black/20 transition-[border-color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110 group-hover:border-white/35">
              <Icon className="size-6" />
            </div>
            <h4 className="mt-5 text-sm font-extrabold">{label}</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {technologies.map((technology, index) => (
                <span
                  key={technology}
                  className="rounded-md border border-black/20 bg-black/[0.02] px-2.5 py-1.5 text-[11px] font-semibold transition-[background-color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-white/30 group-hover:bg-white/10"
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  {technology}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
