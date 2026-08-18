"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAVIGATION_DELAY_MS = 520;
const MINIMUM_VISIBLE_MS = 1080;
const TRANSITION_TIMEOUT_MS = 8000;

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isVisible, setIsVisible] = useState(false);
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

      if (destination.pathname === window.location.pathname) return;

      event.preventDefault();
      if (isVisible) return;

      const destinationHref = `${destination.pathname}${destination.search}${destination.hash}`;
      const navigationDelay = shouldReduceMotion ? 80 : NAVIGATION_DELAY_MS;

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
      ? 180
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
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

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
          key="page-transition"
          role="status"
          aria-live="polite"
          aria-label="Memuat halaman"
          className="fixed inset-0 z-[120] grid min-h-[100svh] place-items-center overflow-hidden bg-black px-5 py-10 text-white"
          initial={shouldReduceMotion ? { opacity: 0 } : { y: "102%" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { y: "-102%", transition: { duration: 0.42 } }
          }
          transition={{
            duration: shouldReduceMotion ? 0.08 : 0.48,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-32 -top-32 size-80 rounded-full border border-white/10" />
            <div className="absolute -left-24 -top-24 size-80 rounded-full border border-white/10" />
            <div className="absolute -bottom-48 -right-32 size-96 rounded-full border border-white/10" />
          </div>

          <motion.div
            className="relative z-10 w-full max-w-[560px] border border-white/45 bg-black/85 px-6 py-9 text-center shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:px-10 sm:py-11"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.42,
              delay: shouldReduceMotion ? 0 : 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55 sm:text-xs">
              Ramadwipa · Portfolio
            </p>
            <p className="mt-5 text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
              Loading...
            </p>

            <div className="mx-auto mt-7 h-px w-full max-w-sm overflow-hidden bg-white/15">
              <motion.span
                className="block h-full w-1/3 bg-white"
                animate={
                  shouldReduceMotion
                    ? { opacity: [0.4, 1, 0.4] }
                    : { x: ["-110%", "310%"] }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.6 : 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
