"use client";

import { useReducedMotion } from "motion/react";
import { useEffect } from "react";
import Lenis from "lenis";

const NAVBAR_OFFSET = 96;

export function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animFrameId = requestAnimationFrame(raf);
    }
    animFrameId = requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
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

      const anchor = clickedElement.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const sectionId = decodeURIComponent(anchor.hash.slice(1));
      if (!sectionId) return;

      const targetSection = document.getElementById(sectionId);
      if (!targetSection) return;

      event.preventDefault();
      window.history.replaceState(null, "", `#${sectionId}`);

      lenis.scrollTo(targetSection, {
        offset: -NAVBAR_OFFSET,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(animFrameId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return null;
}
