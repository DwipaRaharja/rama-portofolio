"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

export function PortraitIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[285px] overflow-hidden rounded-full border-2 border-white/20 bg-[#121215] shadow-[0_18px_45px_-24px_rgba(255,255,255,0.12),0_0_30px_rgba(255,255,255,0.03)] will-change-transform"
      animate={
        shouldReduceMotion
          ? undefined
          : { y: [0, -11, 0], rotate: [0, 0.8, 0] }
      }
      transition={{
        duration: 5.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/asset/image/ramadwipa-profile.png"
        alt="Portrait illustration of Ramadwipa in black and white sketch style"
        fill
        sizes="(max-width: 640px) 285px, 320px"
        className="object-cover object-[center_24%]"
      />
    </motion.div>
  );
}
