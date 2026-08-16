"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

export function PortraitIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[285px] overflow-hidden rounded-full border-2 border-black bg-white shadow-[0_18px_45px_-24px_rgba(0,0,0,0.45)] will-change-transform"
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
        alt="Ilustrasi potret Ramadwipa bergaya sketsa hitam putih"
        fill
        sizes="(max-width: 640px) 285px, 320px"
        className="object-cover object-[center_24%]"
      />
    </motion.div>
  );
}
