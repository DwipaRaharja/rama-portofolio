"use client";

import { motion, useReducedMotion } from "motion/react";

import { BrainIcon, CodeIcon, SparkleIcon } from "@/components/ui/Icons";
import { DotGrid } from "@/components/ui/Decorations";

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[410px]">
      <motion.div
        className="absolute right-[8%] top-[4%] will-change-transform"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, -6, 0], x: [0, 3, 0], rotate: [0, 1.5, 0] }
        }
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <DotGrid className="text-black" />
      </motion.div>

      <motion.div
        className="absolute left-[15%] top-[18%] grid size-[68%] place-items-center rounded-full bg-black text-white shadow-[0_20px_45px_rgba(0,0,0,0.16)] will-change-transform"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, -12, 0], rotate: [0, 1, 0] }
        }
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <CodeIcon className="size-[55%]" weight="bold" />
      </motion.div>

      <motion.div
        className="absolute bottom-[7%] left-[4%] grid size-[30%] place-items-center rounded-full border-2 border-white bg-black text-white shadow-lg will-change-transform"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, -6, 0], y: [0, 9, 0], rotate: [0, -3, 0] }
        }
        transition={{
          duration: 4.7,
          delay: 0.35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BrainIcon className="size-[58%]" weight="bold" />
      </motion.div>

      <motion.div
        className="absolute right-[4%] top-[30%] grid size-[23%] place-items-center rounded-full border-2 border-white bg-black text-white shadow-lg will-change-transform"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 5, 0], y: [0, -8, 0], rotate: [0, 4, 0] }
        }
        transition={{
          duration: 4.1,
          delay: 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <SparkleIcon className="size-[62%]" weight="bold" />
      </motion.div>
    </div>
  );
}
