"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  markPortfolioIntroAsSeen,
  PORTFOLIO_INTRO_EVENT,
  shouldPlayPortfolioIntro,
} from "@/data/portfolio-intro";

export function PortfolioIntro() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
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

    // Progress counter animation from 0 to 100
    const start = performance.now();
    const duration = shouldReduceMotion ? 400 : 1800;

    let animFrame: number;
    const updateProgress = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        animFrame = requestAnimationFrame(updateProgress);
      }
    };
    animFrame = requestAnimationFrame(updateProgress);

    const timer = window.setTimeout(
      closeIntro,
      shouldReduceMotion ? 550 : 2350,
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        closeIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animFrame);
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
      <div className="fixed inset-0 z-[100] bg-[var(--background)]" aria-hidden="true" />
    );
  }

  return (
    <AnimatePresence onExitComplete={completeIntro}>
      {shouldShow && (
        <motion.div
          key="portfolio-intro"
          role="status"
          aria-label="Opening Ramadwipa developer portfolio"
          className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f8f9fa] px-4 py-8 text-zinc-950 dark:bg-[#050505] dark:text-white"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-102%" }}
          transition={{
            duration: shouldReduceMotion ? 0.12 : 0.42,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Subtle Background Tech Dot Grid with Radial Mask */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_50%,#000_35%,transparent_100%)] dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]"
            aria-hidden="true"
          />

          {/* Terminal Window */}
          <motion.div
            className="relative z-10 w-full max-w-[620px] overflow-hidden rounded-xl border border-zinc-200 bg-white/95 text-zinc-950 shadow-[0_25px_80px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/15 dark:bg-[#0a0a0e]/95 dark:text-white dark:shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(255,255,255,0.03)]"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Terminal macOS Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-[#f4f5f8] px-4 py-2.5 dark:border-white/10 dark:bg-[#121216]">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_5px_rgba(255,95,86,0.35)]" />
                <span className="size-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_rgba(255,189,46,0.35)]" />
                <span className="size-2.5 rounded-full bg-[#27c93f] shadow-[0_0_5px_rgba(39,201,63,0.35)]" />
              </div>

              {/* Title / Path */}
              <p className="font-mono text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                ramadwipa@developer: ~/portfolio
              </p>

              {/* Status Pill */}
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                live
              </span>
            </div>

            {/* Terminal Body Content */}
            <div className="p-5 font-mono text-xs sm:p-6 sm:text-[13px] leading-relaxed">
              {/* Line 1: Command */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.3 }}
                className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300"
              >
                <span className="font-bold text-zinc-950 dark:text-white">$</span>
                <span>ramadwipa --init-system</span>
              </motion.div>

              {/* Line 2: Role */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.65 }}
                className="mt-3 flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
              >
                <span className="text-emerald-600 dark:text-emerald-400">✔</span>
                <span>Role:</span>
                <span className="font-semibold text-zinc-950 dark:text-white">Full Stack Developer</span>
              </motion.div>

              {/* Line 3: Stack */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 1.0 }}
                className="mt-2 flex flex-wrap items-center gap-2 text-zinc-600 dark:text-zinc-400"
              >
                <span className="text-emerald-600 dark:text-emerald-400">✔</span>
                <span>Stack:</span>
                <span className="text-zinc-800 dark:text-zinc-200">Next.js · TypeScript · Tailwind CSS</span>
              </motion.div>

              {/* Line 4: Objective */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 1.35 }}
                className="mt-2 flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
              >
                <span className="text-emerald-600 dark:text-emerald-400">✔</span>
                <span>Focus:</span>
                <span className="text-zinc-950 dark:text-white">Personal Portfolio</span>
              </motion.div>

              {/* Line 5: Progress Bar */}
              <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-white/10">
                <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span>Launching Portfolio v2.0</span>
                  <span className="font-bold text-zinc-950 dark:text-white">{progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-zinc-950 transition-all duration-100 ease-out dark:bg-white"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skip Button */}
          <motion.button
            type="button"
            onClick={closeIntro}
            className="interactive-transition absolute bottom-5 right-5 rounded-full border border-zinc-300 bg-white/80 px-4 py-1.5 font-mono text-xs font-semibold text-zinc-700 hover:border-zinc-950 hover:text-zinc-950 dark:border-white/20 dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:border-white dark:hover:text-white sm:bottom-8 sm:right-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Skip (Esc)
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
