"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "dark";

  const { ref, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 1150,
    isDarkMode: isDark,
    onDarkModeChange: (willBeDark) => {
      setTheme(willBeDark ? "dark" : "light");
    },
  });

  if (!mounted) {
    return (
      <div
        className={`fixed bottom-5 right-5 z-40 size-12 rounded-full border border-zinc-200/80 bg-zinc-100/60 shadow-lg backdrop-blur-md sm:bottom-6 sm:right-6 sm:size-[50px] dark:border-white/10 dark:bg-[#121216]/60 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={toggleSwitchTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full border border-zinc-200/90 bg-white/90 text-zinc-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-colors duration-300 hover:border-zinc-350 hover:bg-white hover:text-zinc-950 hover:shadow-[0_14px_35px_-5px_rgba(0,0,0,0.22)] dark:border-white/15 dark:bg-[#121216]/90 dark:text-zinc-200 dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.04)] dark:hover:border-white/30 dark:hover:bg-[#18181f] dark:hover:text-white dark:hover:shadow-[0_14px_35px_-5px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.08)] sm:bottom-6 sm:right-6 sm:size-[50px] ${className}`}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -55, scale: 0.65, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 55, scale: 0.65, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <MoonIcon
            className="size-5 text-zinc-200 transition-colors group-hover:text-white sm:size-[22px]"
            weight="bold"
          />
        ) : (
          <SunIcon
            className="size-5 text-amber-500 transition-colors group-hover:text-amber-600 sm:size-[22px]"
            weight="bold"
          />
        )}
      </motion.div>
    </motion.button>
  );
}
