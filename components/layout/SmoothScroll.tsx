"use client";

import { animate } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

const NAVBAR_OFFSET = 96;

export function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let activeAnimation: ReturnType<typeof animate> | null = null;

    const stopActiveAnimation = () => {
      activeAnimation?.stop();
      activeAnimation = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        stopActiveAnimation();
      }
    };

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
      stopActiveAnimation();

      const currentPosition = window.scrollY;
      const targetPosition = Math.max(
        0,
        currentPosition + targetSection.getBoundingClientRect().top - NAVBAR_OFFSET,
      );
      const scrollDistance = Math.abs(targetPosition - currentPosition);
      const scrollDuration = Math.min(0.72, Math.max(0.32, scrollDistance / 2200));

      window.history.replaceState(null, "", `#${sectionId}`);

      if (shouldReduceMotion) {
        window.scrollTo(0, targetPosition);
        return;
      }

      activeAnimation = animate(currentPosition, targetPosition, {
        duration: scrollDuration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latestPosition) => window.scrollTo(0, latestPosition),
        onComplete: () => {
          activeAnimation = null;
        },
      });
    };

    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("pointerdown", stopActiveAnimation, { passive: true });
    window.addEventListener("wheel", stopActiveAnimation, { passive: true });
    window.addEventListener("touchstart", stopActiveAnimation, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      stopActiveAnimation();
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("pointerdown", stopActiveAnimation);
      window.removeEventListener("wheel", stopActiveAnimation);
      window.removeEventListener("touchstart", stopActiveAnimation);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldReduceMotion]);

  return null;
}
