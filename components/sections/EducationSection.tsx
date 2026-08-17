"use client";

import { motion } from "motion/react";

import { GraduationCapIcon, StudentIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const education = [
  {
    number: "01",
    period: "2020 — 2023",
    institution: "SMK Negeri 1 Sukawati",
    program: "Jurusan Multimedia",
    status: "Lulus",
    Icon: GraduationCapIcon,
  },
  {
    number: "02",
    period: "2023 — Sekarang",
    institution: "ITB STIKOM Bali",
    program: "Perguruan Tinggi",
    status: "Mahasiswa aktif",
    Icon: StudentIcon,
  },
] as const;

const smoothEase = [0.22, 1, 0.36, 1] as const;

const endpointPulse = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: [0, 0.75, 0.28, 0.75],
    scale: [0.7, 0.95, 2.65, 0.95],
    transition: {
      delay: 1.3,
      duration: 1.8,
      times: [0, 0.08, 0.58, 1],
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="scroll-mt-28"
    >
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Education
        </p>
        <h3
          id="education-title"
          className="mt-3 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl"
        >
          Riwayat Pendidikan
        </h3>
        <p className="mt-3 text-sm leading-6 text-black/60">
          Perjalanan pendidikan yang membentuk dasar kreativitas dan kemampuan
          saya dalam mengembangkan solusi digital.
        </p>
      </Reveal>

      <motion.div
        className="relative mt-8 grid gap-5 md:grid-cols-2 md:gap-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-10 h-5 w-px -translate-x-1/2 -translate-y-1/2 md:hidden"
        >
          <motion.span
            className="absolute inset-0 origin-top bg-black/35"
            variants={{
              hidden: { scaleY: 0 },
              visible: {
                scaleY: 1,
                transition: { delay: 0.58, duration: 0.68, ease: smoothEase },
              },
            }}
          />
          <motion.span
            className="absolute -left-[3px] -top-1 size-[7px] rounded-full bg-black/55"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 0.52, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="absolute -bottom-1 -left-[3px] size-[7px] rounded-full bg-black"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 1.24, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="absolute -bottom-[6px] -left-[6px] size-[13px] rounded-full border-2 border-black/75 bg-black/15"
            variants={endpointPulse}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-36 z-10 hidden h-20 w-24 -translate-x-1/2 md:block"
        >
          <motion.span
            className="absolute left-0 top-0 h-px w-1/2 origin-left bg-black/35"
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { delay: 0.55, duration: 0.28, ease: smoothEase },
              },
            }}
          />
          <motion.span
            className="absolute left-1/2 top-0 h-full w-px origin-top bg-black/35"
            variants={{
              hidden: { scaleY: 0 },
              visible: {
                scaleY: 1,
                transition: { delay: 0.83, duration: 0.3, ease: smoothEase },
              },
            }}
          />
          <motion.span
            className="absolute bottom-0 left-1/2 h-px w-1/2 origin-left bg-black/35"
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { delay: 1.13, duration: 0.25, ease: smoothEase },
              },
            }}
          />
          <motion.span
            className="absolute -left-[3px] -top-[3px] size-[7px] rounded-full bg-black/55"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 0.5, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="absolute -bottom-[3px] -right-[3px] size-[7px] rounded-full bg-black"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 1.36, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="absolute -bottom-[6px] -right-[6px] size-[13px] rounded-full border-2 border-black/75 bg-black/15"
            variants={endpointPulse}
          />
        </div>

        {education.map(
          ({ number, period, institution, program, status, Icon }, index) => (
            <motion.div
              key={institution}
              className={index === 0 ? "md:pb-20" : "md:pt-20"}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index === 0 ? 0 : 1.42,
                    duration: 0.62,
                    ease: smoothEase,
                  },
                },
              }}
            >
              <article className="group flex min-h-72 flex-col rounded-2xl border border-black/30 bg-white p-6 transition-[background-color,color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-xl sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-extrabold tracking-[0.16em] text-black/40 transition-colors duration-500 group-hover:text-white/45">
                    {number}
                  </span>
                  <div className="grid size-12 place-items-center rounded-full border border-black/25 transition-[border-color,transform] duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:border-white/35">
                    <Icon className="size-6" />
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/45 transition-colors duration-500 group-hover:text-white/45">
                    {period}
                  </p>
                  <h4 className="mt-3 text-2xl font-extrabold tracking-[-0.045em] sm:text-[1.65rem]">
                    {institution}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-black/60 transition-colors duration-500 group-hover:text-white/60">
                    {program}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-black/40 transition-colors duration-500 group-hover:text-white/45">
                    {status}
                  </p>
                </div>
              </article>
            </motion.div>
          ),
        )}
      </motion.div>
    </section>
  );
}
