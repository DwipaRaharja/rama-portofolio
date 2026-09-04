"use client";

import { motion, type Variants } from "motion/react";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Decorations";
import {
  CodeIcon,
  FlowArrowIcon,
  ListChecksIcon,
  RocketLaunchIcon,
} from "@/components/ui/Icons";
import { WindowCard } from "@/components/ui/WindowCard";

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

// 1. Kontainer Luar Utama
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

// 2. Header
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// 3. Grid Kartu
const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// 4. Fase 1: Card meluncur naik dari bawah ke posisinya
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

// 5. Fase 2: Ikon pop-in
const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.45,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

// 6. Fase 2: Judul kategori
const titleVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

// 7. Fase 2: Kontainer Badges
const badgesContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

// 8. Fase 2: Badge teknologi meluncur & mekar satu per satu
const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative scroll-mt-24 pb-20 pt-6 text-zinc-950 dark:text-white sm:pb-24 sm:pt-8 lg:pb-28"
    >
      <Container>
        <motion.div
          aria-labelledby="tech-stack-title"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {/* Card Utama Berbentuk WindowCard Mockup */}
          <WindowCard
            interactive={false}
            className="rounded-2xl border border-zinc-200/90 bg-white shadow-[0_18px_45px_-30px_rgba(0,0,0,0.08)] dark:border-white/12 dark:bg-[#0e0e11] dark:shadow-[0_18px_55px_-38px_rgba(0,0,0,0.85)]"
            headerClassName="px-4 py-3 sm:px-6"
            dotSize="md"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <motion.div variants={headerVariants} className="max-w-2xl">
                <SectionLabel>Technologies I use</SectionLabel>
                <h3
                  id="tech-stack-title"
                  className="text-3xl font-extrabold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-4xl"
                >
                  My Tech Stack
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Technologies and tools I leverage to build robust web applications
                  from frontend interfaces and backend APIs to database management
                  and cloud deployment.
                </p>
              </motion.div>

              <motion.div
                variants={cardsContainerVariants}
                className="mt-8 grid gap-5 sm:grid-cols-2"
              >
                {techStackGroups.map(({ label, technologies, Icon }) => (
                  <motion.article
                    key={label}
                    variants={cardVariants}
                    className="group/technology h-full"
                  >
                    <div className="surface-transition h-full transform-gpu rounded-xl border border-zinc-200/90 bg-zinc-50/80 p-6 will-change-transform group-hover/technology:-translate-y-1 group-hover/technology:border-zinc-350 group-hover/technology:bg-white group-hover/technology:shadow-lg dark:border-white/15 dark:bg-[#121215] dark:group-hover/technology:border-white/40 dark:group-hover/technology:bg-[#18181c] dark:group-hover/technology:shadow-2xl sm:p-7">
                      {/* Ikon Pop-in */}
                      <motion.div
                        variants={iconVariants}
                        className="surface-transition grid size-12 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm group-hover/technology:border-zinc-350 group-hover/technology:bg-zinc-50 group-hover/technology:shadow-md dark:border-white/20 dark:bg-[#18181c] dark:text-white dark:group-hover/technology:border-white/50 dark:group-hover/technology:bg-[#1e1e24] dark:group-hover/technology:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                      >
                        <Icon className="surface-transition size-6 group-hover/technology:scale-115 group-hover/technology:-rotate-12" />
                      </motion.div>

                       {/* Judul Kategori */}
                      <motion.h4
                        variants={titleVariants}
                        className="mt-5 text-base font-extrabold text-zinc-950 dark:text-white sm:text-lg"
                      >
                        {label}
                      </motion.h4>

                      {/* Badges Cascade In */}
                      <motion.div
                        variants={badgesContainerVariants}
                        className="mt-4 flex flex-wrap gap-2.5 sm:gap-3"
                      >
                        {technologies.map((technology, index) => (
                          <motion.span
                            key={technology}
                            variants={badgeVariants}
                            className="inline-flex transform-gpu rounded-lg border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-xs transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/technology:-translate-y-2 group-hover/technology:scale-[1.04] group-hover/technology:border-zinc-350 group-hover/technology:bg-zinc-50 group-hover/technology:text-zinc-950 group-hover/technology:shadow-md hover:!scale-110 hover:!-translate-y-3 hover:!border-zinc-400 hover:!bg-zinc-100 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-200 dark:shadow-none dark:group-hover/technology:border-white/35 dark:group-hover/technology:bg-white/10 dark:group-hover/technology:text-white dark:group-hover/technology:shadow-[0_6px_16px_rgba(0,0,0,0.5),0_0_12px_rgba(255,255,255,0.06)] dark:hover:!border-white/60 dark:hover:!bg-white/20 dark:hover:text-white sm:text-sm"
                            style={{ transitionDelay: `${index * 85}ms` }}
                          >
                            {technology}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </WindowCard>
        </motion.div>
      </Container>
    </section>
  );
}
