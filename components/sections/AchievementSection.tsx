"use client";

import { motion, useReducedMotion } from "motion/react";

import { BuildingIcon, CodeIcon } from "@/components/ui/Icons";
import { DotGrid, SectionLabel } from "@/components/ui/Decorations";
import { Reveal } from "@/components/ui/Reveal";

const achievements = [
  {
    number: "01",
    title: "Sistem Bisnis Nyata",
    description:
      "Mengembangkan aplikasi internal yang digunakan untuk membantu operasional showroom mengelola stok, transaksi, pembayaran, dan berkas kendaraan.",
    Icon: BuildingIcon,
  },
  {
    number: "02",
    title: "Pengembangan End-to-End",
    description:
      "Membangun alur aplikasi secara menyeluruh, mulai dari antarmuka, proses backend, hingga pengelolaan database yang terstruktur.",
    Icon: CodeIcon,
  },
] as const;

export function AchievementSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="achievements"
      aria-labelledby="achievement-title"
      className="relative scroll-mt-28"
    >
      <motion.div
        aria-hidden="true"
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, scale: 0.65, y: 14 }
        }
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.55,
          delay: shouldReduceMotion ? 0 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute right-8 top-1 z-10 hidden origin-center md:block lg:right-10"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [-4, 5, -4],
                  rotate: [0, 360],
                }
          }
          transition={{
            y: {
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 16,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <DotGrid className="scale-75 text-black/75 lg:scale-90" />
        </motion.div>
      </motion.div>

      <Reveal className="max-w-2xl">
        <SectionLabel>Achievements</SectionLabel>
        <h3
          id="achievement-title"
          className="text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl"
        >
          Pencapaian Saya
        </h3>
        <p className="mt-3 text-sm leading-6 text-black/60">
          Beberapa pencapaian yang mencerminkan pengalaman saya membangun solusi
          digital dari kebutuhan nyata hingga siap digunakan.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {achievements.map(({ number, title, description, Icon }, index) => (
          <Reveal key={number} delay={0.06 * index} className="h-full">
            <article className="group flex h-full min-h-72 flex-col rounded-2xl border border-black/30 bg-white p-6 transition-[background-color,color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-extrabold tracking-[0.16em] text-black/40 transition-colors duration-500 group-hover:text-white/45">
                  {number}
                </span>
                <div className="grid size-12 place-items-center rounded-full border border-black/25 transition-[border-color,transform] duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:border-white/35">
                  <Icon className="size-6" />
                </div>
              </div>

              <div className="mt-auto pt-10">
                <h4 className="text-xl font-extrabold tracking-[-0.035em]">
                  {title}
                </h4>
                <p className="mt-3 text-sm leading-6 text-black/60 transition-colors duration-500 group-hover:text-white/65">
                  {description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
