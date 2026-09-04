"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import {
  PORTFOLIO_INTRO_EVENT,
  shouldPlayPortfolioIntro,
} from "@/data/portfolio-intro";

export function IntroContentGate({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const revealContent = () => setIsReady(true);

    if (!shouldPlayPortfolioIntro()) {
      const revealFrame = window.requestAnimationFrame(revealContent);
      return () => window.cancelAnimationFrame(revealFrame);
    }

    window.addEventListener(PORTFOLIO_INTRO_EVENT, revealContent);
    return () => window.removeEventListener(PORTFOLIO_INTRO_EVENT, revealContent);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={
        isReady
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.48,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
