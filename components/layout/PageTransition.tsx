"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getProjectById } from "@/data/projects";

const NAVIGATION_DELAY_MS = 220;
const MINIMUM_VISIBLE_MS = 1100;
const TRANSITION_TIMEOUT_MS = 6000;

type TransitionInfo = {
  path: string;
  label: string;
};

const defaultTransitionInfo: TransitionInfo = {
  path: "ramadwipa@developer: ~/portfolio",
  label: "Portfolio Overview",
};

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isVisible, setIsVisible] = useState(false);
  const [transitionInfo, setTransitionInfo] = useState<TransitionInfo>(defaultTransitionInfo);

  const targetPathRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);
  const navigationTimerRef = useRef<number | null>(null);
  const completionTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleInternalLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const clickedElement = event.target;
      if (!(clickedElement instanceof Element)) return;

      const anchor = clickedElement.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.dataset.pageTransition === "false"
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      // Same page anchor navigation (e.g. #about on home page) should not trigger full page transition
      if (destination.pathname === window.location.pathname) return;

      event.preventDefault();
      if (isVisible) return;

      let nextInfo = defaultTransitionInfo;

      if (destination.pathname.startsWith("/projects/")) {
        const slug = destination.pathname.replace(/^\/projects\//, "").split("/")[0];
        const project = getProjectById(slug);

        if (project) {
          nextInfo = {
            path: `~/projects/${project.id}`,
            label: project.title,
          };
        } else {
          nextInfo = {
            path: "~/projects/case-study",
            label: "Case Study Breakdown",
          };
        }
      } else if (destination.pathname === "/" || destination.pathname === "") {
        if (destination.hash === "#portfolio") {
          nextInfo = {
            path: "~/portfolio",
            label: "Selected Projects",
          };
        } else if (destination.hash === "#contact") {
          nextInfo = {
            path: "~/contact",
            label: "Contact Channels",
          };
        } else {
          nextInfo = {
            path: "~/overview",
            label: "Portfolio Overview",
          };
        }
      }

      setTransitionInfo(nextInfo);

      const destinationHref = `${destination.pathname}${destination.search}${destination.hash}`;
      const navigationDelay = shouldReduceMotion ? 60 : NAVIGATION_DELAY_MS;

      targetPathRef.current = destination.pathname;
      startedAtRef.current = window.performance.now();
      setIsVisible(true);

      navigationTimerRef.current = window.setTimeout(() => {
        router.push(destinationHref);
      }, navigationDelay);

      safetyTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
        targetPathRef.current = null;
      }, TRANSITION_TIMEOUT_MS);
    };

    document.addEventListener("click", handleInternalLinkClick, true);
    return () => {
      document.removeEventListener("click", handleInternalLinkClick, true);
    };
  }, [isVisible, router, shouldReduceMotion]);

  useEffect(() => {
    if (!isVisible || pathname !== targetPathRef.current) return;

    const minimumVisibleDuration = shouldReduceMotion
      ? 250
      : MINIMUM_VISIBLE_MS;
    const elapsedTime = window.performance.now() - startedAtRef.current;
    const remainingTime = Math.max(0, minimumVisibleDuration - elapsedTime);

    completionTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      targetPathRef.current = null;

      if (safetyTimerRef.current !== null) {
        window.clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
    }, remainingTime);
  }, [isVisible, pathname, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
      if (completionTimerRef.current !== null) {
        window.clearTimeout(completionTimerRef.current);
      }
      if (safetyTimerRef.current !== null) {
        window.clearTimeout(safetyTimerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-transition-backdrop"
          role="status"
          aria-live="polite"
          aria-label="Loading page"
          className="fixed inset-0 z-[120] grid min-h-[100svh] place-items-center overflow-hidden bg-[#050505]/85 px-4 py-8 text-white backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.08 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Signature Background Tech Dot Grid with Radial Mask */}
          <div
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_50%,#000_35%,transparent_100%)]"
            aria-hidden="true"
          />

          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[440px] rounded-full bg-white/[0.03] blur-3xl" />
          </div>

          {/* Card with 3 Circles Topbar */}
          <motion.div
            className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0e]/95 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(255,255,255,0.03)] backdrop-blur-2xl"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 16, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.97 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.08 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Window Topbar with 3 Circles */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#121216] px-4 py-3">
              {/* The 3 Circles (Traffic Light Dots) */}
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="size-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_rgba(255,95,86,0.45)]" />
                <span className="size-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.45)]" />
                <span className="size-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_rgba(39,201,63,0.45)]" />
              </div>

              {/* Breadcrumb Path */}
              <p className="font-mono text-[11px] font-semibold text-zinc-400">
                {transitionInfo.path}
              </p>

              {/* Spacer to keep path title perfectly centered */}
              <div className="w-[52px]" aria-hidden="true" />
            </div>

            {/* Window Body: Big "Loading" text with 3 animated dots */}
            <div className="px-6 py-10 sm:py-12 text-center">
              {/* Big Text "Loading" + 3 Animated Dots */}
              <div className="flex items-baseline justify-center gap-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                <span>Loading</span>
                {/* 3 Animated Dots */}
                <span className="inline-flex items-center gap-1.5 pb-1">
                  <motion.span
                    className="size-2.5 sm:size-3 rounded-full bg-white"
                    animate={
                      shouldReduceMotion
                        ? { opacity: [0.3, 1, 0.3] }
                        : { y: [0, -9, 0], opacity: [0.35, 1, 0.35] }
                    }
                    transition={{
                      duration: 0.85,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0,
                    }}
                  />
                  <motion.span
                    className="size-2.5 sm:size-3 rounded-full bg-white"
                    animate={
                      shouldReduceMotion
                        ? { opacity: [0.3, 1, 0.3] }
                        : { y: [0, -9, 0], opacity: [0.35, 1, 0.35] }
                    }
                    transition={{
                      duration: 0.85,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.18,
                    }}
                  />
                  <motion.span
                    className="size-2.5 sm:size-3 rounded-full bg-white"
                    animate={
                      shouldReduceMotion
                        ? { opacity: [0.3, 1, 0.3] }
                        : { y: [0, -9, 0], opacity: [0.35, 1, 0.35] }
                    }
                    transition={{
                      duration: 0.85,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.36,
                    }}
                  />
                </span>
              </div>

              {/* Destination Context Subtitle */}
              <p className="mt-4 text-xs font-mono font-medium text-zinc-400 sm:text-sm">
                {transitionInfo.label}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

