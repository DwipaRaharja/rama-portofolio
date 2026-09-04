"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Decorations";
import { CheckIcon, GraduationCapIcon, StudentIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const education = [
  {
    number: "01",
    period: "2020 — 2023",
    institution: "SMK Negeri 1 Sukawati",
    program: "Multimedia & Software Fundamentals",
    status: "Graduated",
    Icon: GraduationCapIcon,
  },
  {
    number: "02",
    period: "2023 — Present",
    institution: "ITB STIKOM Bali",
    program: "Information Systems Major",
    status: "Active Student",
    Icon: StudentIcon,
  },
] as const;

const smoothEase = [0.22, 1, 0.36, 1] as const;

const endpointPulse: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: [0, 0.75, 0.28, 0.75],
    scale: [0.7, 0.95, 2.65, 0.95],
    transition: {
      delay: 1.25,
      duration: 1.8,
      times: [0, 0.08, 0.58, 1],
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="relative scroll-mt-24 pb-20 pt-6 text-zinc-950 dark:text-white sm:pb-24 sm:pt-8 lg:pb-28"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel>Education</SectionLabel>
          <h3
            id="education-title"
            className="text-3xl font-extrabold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-4xl"
          >
            Academic Background
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            The educational journey that established my technical foundation,
            discipline, and problem-solving mindset for digital engineering.
          </p>
        </Reveal>

        <motion.div
          className="relative mt-8 grid gap-5 md:grid-cols-2 md:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Mobile Connecting Line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 h-5 w-px -translate-x-1/2 -translate-y-1/2 md:hidden"
          >
            <motion.span
              className="absolute inset-0 origin-top bg-zinc-400/70 dark:bg-white/30"
              variants={{
                hidden: { scaleY: 0 },
                visible: {
                  scaleY: 1,
                  transition: {
                    delay: shouldReduceMotion ? 0 : 0.5,
                    duration: 0.55,
                    ease: smoothEase,
                  },
                },
              }}
            />
            <motion.span
              className="absolute -left-[3px] -top-1 size-[7px] rounded-full bg-zinc-600 dark:bg-white/60"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: shouldReduceMotion ? 0 : 0.45, duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="absolute -bottom-1 -left-[3px] size-[7px] rounded-full bg-zinc-950 dark:bg-white"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: shouldReduceMotion ? 0 : 1.05, duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="absolute -bottom-[6px] -left-[6px] size-[13px] rounded-full border-2 border-zinc-950/70 bg-zinc-900/20 dark:border-white/80 dark:bg-white/20"
              variants={shouldReduceMotion ? undefined : endpointPulse}
            />
          </div>

          {/* Desktop Connecting Circuit Line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-36 z-10 hidden h-20 w-24 -translate-x-1/2 md:block"
          >
            {/* Step 1: Branch horizontal atas dari Card 1 */}
            <motion.span
              className="absolute left-0 top-0 h-px w-1/2 origin-left bg-zinc-400/70 dark:bg-white/30"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: {
                    delay: shouldReduceMotion ? 0 : 0.5,
                    duration: 0.25,
                    ease: smoothEase,
                  },
                },
              }}
            />
            {/* Step 2: Branch vertikal ke bawah */}
            <motion.span
              className="absolute left-1/2 top-0 h-full w-px origin-top bg-zinc-400/70 dark:bg-white/30"
              variants={{
                hidden: { scaleY: 0 },
                visible: {
                  scaleY: 1,
                  transition: {
                    delay: shouldReduceMotion ? 0 : 0.75,
                    duration: 0.25,
                    ease: smoothEase,
                  },
                },
              }}
            />
            {/* Step 3: Branch horizontal bawah menuju Card 2 */}
            <motion.span
              className="absolute bottom-0 left-1/2 h-px w-1/2 origin-left bg-zinc-400/70 dark:bg-white/30"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: {
                    delay: shouldReduceMotion ? 0 : 1.0,
                    duration: 0.25,
                    ease: smoothEase,
                  },
                },
              }}
            />
            {/* Start point dot at Card 1 */}
            <motion.span
              className="absolute -left-[3px] -top-[3px] size-[7px] rounded-full bg-zinc-600 shadow-[0_0_8px_rgba(0,0,0,0.15)] dark:bg-white/60 dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: shouldReduceMotion ? 0 : 0.45, duration: 0.2 },
                },
              }}
            />
            {/* Endpoint dot at Card 2 */}
            <motion.span
              className="absolute -bottom-[3px] -right-[3px] size-[7px] rounded-full bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.25)] dark:bg-white dark:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: shouldReduceMotion ? 0 : 1.25, duration: 0.2 },
                },
              }}
            />
            {/* Pulsing glow on endpoint */}
            <motion.span
              className="absolute -bottom-[6px] -right-[6px] size-[13px] rounded-full border-2 border-zinc-950/70 bg-zinc-900/20 dark:border-white/80 dark:bg-white/20"
              variants={shouldReduceMotion ? undefined : endpointPulse}
            />
          </div>

          {education.map(
            ({ number, period, institution, program, status, Icon }, index) => {
              const cardDelay = index === 0 ? 0.08 : 1.25;

              return (
                <motion.div
                  key={institution}
                  className={index === 0 ? "md:pb-20" : "md:pt-20"}
                  variants={{
                    hidden: { opacity: 0, y: 36, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        delay: shouldReduceMotion ? 0 : cardDelay,
                        duration: shouldReduceMotion ? 0.1 : 0.58,
                        ease: smoothEase,
                      },
                    },
                  }}
                >
                  <div className="group/education">
                    <article className="surface-transition flex min-h-72 transform-gpu flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 text-zinc-950 shadow-sm will-change-transform group-hover/education:-translate-y-1.5 group-hover/education:border-zinc-350 group-hover/education:bg-zinc-50/50 group-hover/education:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:border-white/15 dark:bg-[#0e0e11] dark:text-white dark:shadow-none dark:group-hover/education:border-white/40 dark:group-hover/education:bg-[#141419] dark:group-hover/education:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.04)] sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <span className="surface-transition font-mono text-xs font-extrabold tracking-[0.18em] text-zinc-400 group-hover/education:tracking-[0.24em] group-hover/education:text-zinc-700 dark:text-zinc-500 dark:group-hover/education:text-zinc-300">
                          {number}
                        </span>
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, scale: 0.5, rotate: -12 },
                            visible: {
                              opacity: 1,
                              scale: 1,
                              rotate: 0,
                              transition: {
                                delay: shouldReduceMotion ? 0 : cardDelay + 0.25,
                                duration: 0.45,
                                ease: [0.34, 1.56, 0.64, 1],
                              },
                            },
                          }}
                          className="surface-transition grid size-12 place-items-center rounded-full border border-zinc-200 bg-zinc-100 text-zinc-900 group-hover/education:scale-110 group-hover/education:border-zinc-350 group-hover/education:bg-white group-hover/education:shadow-md dark:border-white/20 dark:bg-[#16161a] dark:text-white dark:group-hover/education:border-white/60 dark:group-hover/education:bg-white/10 dark:group-hover/education:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                        >
                          <Icon className="surface-transition size-6 group-hover/education:scale-110 group-hover/education:-rotate-12" />
                        </motion.div>
                      </div>

                      <div className="mt-auto pt-10">
                        <p className="surface-transition text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500 group-hover/education:text-zinc-700 dark:text-zinc-400 dark:group-hover/education:text-zinc-200">
                          {period}
                        </p>
                        <h4 className="mt-3 text-2xl font-extrabold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-[1.65rem]">
                          {institution}
                        </h4>
                        <p className="surface-transition mt-2 text-sm leading-6 text-zinc-600 group-hover/education:text-zinc-800 dark:text-zinc-400 dark:group-hover/education:text-zinc-300">
                          {program}
                        </p>

                        {/* Status Capsule */}
                        <div className="mt-4 flex items-center">
                          {status === "Active Student" ? (
                            <span className="surface-transition inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2.5 py-1 text-[11px] font-semibold text-emerald-600 group-hover/education:border-emerald-500/60 group-hover/education:bg-emerald-500/15 group-hover/education:text-emerald-700 dark:text-emerald-300 dark:group-hover/education:text-emerald-200 dark:group-hover/education:shadow-[0_0_16px_rgba(16,185,129,0.15)]">
                              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)] dark:bg-emerald-400" />
                              {status}
                            </span>
                          ) : (
                            <span className="surface-transition inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 group-hover/education:border-zinc-300 group-hover/education:bg-zinc-200 group-hover/education:text-zinc-900 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300 dark:group-hover/education:border-white/35 dark:group-hover/education:bg-white/10 dark:group-hover/education:text-white">
                              <CheckIcon className="size-3 text-zinc-500 group-hover/education:text-zinc-900 dark:text-zinc-400 dark:group-hover/education:text-white" />
                              {status}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </motion.div>
              );
            },
          )}
        </motion.div>
      </Container>
    </section>
  );
}
