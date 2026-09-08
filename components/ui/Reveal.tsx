"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

const hiddenOffset = {
  up: { x: 0, y: 48, rotateX: -18, scaleY: 0.93 },
  left: { x: -28, y: 0, rotateX: 0, scaleY: 1 },
  right: { x: 28, y: 0, rotateX: 0, scaleY: 1 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const isUp = direction === "up";

  if (shouldReduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.35, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...hiddenOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        scaleY: 1,
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.75,
        delay: 0.08 + delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transformPerspective: 1200,
        transformOrigin: isUp ? "bottom center" : "center",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
