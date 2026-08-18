"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { DotGrid } from "@/components/ui/Decorations";
import { BrainIcon, CodeIcon, RocketLaunchIcon } from "@/components/ui/Icons";
import {
  markPortfolioIntroAsSeen,
  PORTFOLIO_INTRO_EVENT,
  shouldPlayPortfolioIntro,
} from "@/data/portfolio-intro";

type FloatingIntroIconProps = {
  children: ReactNode;
  className: string;
  delay: number;
  entryX: number;
  entryY: number;
  floatY: number;
  rotation: number;
  shouldReduceMotion: boolean;
};

function FloatingIntroIcon({
  children,
  className,
  delay,
  entryX,
  entryY,
  floatY,
  rotation,
  shouldReduceMotion,
}: FloatingIntroIconProps) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
    >
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, x: entryX, y: entryY, scale: 0.55 }
        }
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.58,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="grid size-16 place-items-center rounded-full border-2 border-white/70 bg-black text-white shadow-[0_16px_45px_rgba(255,255,255,0.08)] sm:size-20"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, floatY, 0], rotate: [0, rotation, 0] }
          }
          transition={{
            duration: 3.8 + delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function PortfolioIntro() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const hasCompletedRef = useRef(false);

  const closeIntro = useCallback(() => {
    setShouldShow(false);
  }, []);

  useEffect(() => {
    const checkFrame = window.requestAnimationFrame(() => {
      setShouldShow(shouldPlayPortfolioIntro());
    });

    return () => window.cancelAnimationFrame(checkFrame);
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(
      closeIntro,
      shouldReduceMotion ? 550 : 2450,
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        closeIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeIntro, shouldReduceMotion, shouldShow]);

  const completeIntro = () => {
    if (hasCompletedRef.current) return;

    hasCompletedRef.current = true;
    markPortfolioIntroAsSeen();
    window.setTimeout(
      () => window.dispatchEvent(new Event(PORTFOLIO_INTRO_EVENT)),
      shouldReduceMotion ? 0 : 220,
    );
  };

  if (shouldShow === null) {
    return (
      <div className="fixed inset-0 z-[100] bg-black" aria-hidden="true" />
    );
  }

  return (
    <AnimatePresence onExitComplete={completeIntro}>
      {shouldShow && (
        <motion.div
          key="portfolio-intro"
          role="status"
          aria-label="Membuka portofolio Ramadwipa"
          className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-black px-5 py-10 text-white"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-102%" }}
          transition={{
            duration: shouldReduceMotion ? 0.12 : 0.4,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.div
            className="absolute right-[8%] top-[8%] text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DotGrid />
          </motion.div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 -top-32 size-80 rounded-full border border-white/10" />
            <div className="absolute -left-24 -top-24 size-80 rounded-full border border-white/10" />
            <div className="absolute -bottom-48 -right-32 size-96 rounded-full border border-white/10" />
          </div>

          <FloatingIntroIcon
            className="left-[7%] top-[24%] sm:left-[12%] sm:top-[18%]"
            delay={0.32}
            entryX={-56}
            entryY={-24}
            floatY={-7}
            rotation={-4}
            shouldReduceMotion={shouldReduceMotion}
          >
            <CodeIcon className="size-8 sm:size-10" weight="bold" />
          </FloatingIntroIcon>

          <FloatingIntroIcon
            className="bottom-[13%] left-[12%] sm:bottom-[16%] sm:left-[19%]"
            delay={0.48}
            entryX={-46}
            entryY={42}
            floatY={8}
            rotation={4}
            shouldReduceMotion={shouldReduceMotion}
          >
            <BrainIcon className="size-8 sm:size-10" weight="bold" />
          </FloatingIntroIcon>

          <FloatingIntroIcon
            className="right-[8%] top-[30%] sm:right-[14%] sm:top-[24%]"
            delay={0.64}
            entryX={56}
            entryY={-18}
            floatY={-9}
            rotation={5}
            shouldReduceMotion={shouldReduceMotion}
          >
            <RocketLaunchIcon className="size-8 sm:size-10" weight="bold" />
          </FloatingIntroIcon>

          <motion.div
            className="relative z-10 w-full max-w-[760px] border border-white/45 bg-black/85 px-6 py-9 text-center shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:px-12 sm:py-12"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
              delay: shouldReduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.p
              className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55 sm:text-xs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.58 }}
            >
              Ramadwipa · Portfolio
            </motion.p>

            <motion.h1
              className="mx-auto mt-5 max-w-[620px] text-[clamp(2.25rem,7vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.06em]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.65,
                delay: shouldReduceMotion ? 0 : 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Selamat datang di portofolio saya.
            </motion.h1>

            <motion.p
              className="mt-5 text-sm text-white/55 sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 1.02 }}
            >
              Full Stack Developer · Solusi Digital untuk Bisnis
            </motion.p>

            <div className="mx-auto mt-8 h-px w-full max-w-md overflow-hidden bg-white/15">
              <motion.span
                className="block h-full origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 1.45,
                  delay: shouldReduceMotion ? 0 : 0.72,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          <motion.button
            type="button"
            onClick={closeIntro}
            className="interactive-transition absolute bottom-5 right-5 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white/65 hover:border-white hover:text-white sm:bottom-8 sm:right-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 1.1 }}
          >
            Lewati
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
