"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div
        className={`size-9 rounded-full border border-zinc-200/80 bg-zinc-100/60 dark:border-white/10 dark:bg-white/[0.04] ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex size-9 items-center justify-center rounded-full border border-zinc-200/90 bg-white/80 text-zinc-700 shadow-sm backdrop-blur-md transition-all hover:border-zinc-350 hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/12 dark:bg-white/[0.05] dark:text-zinc-300 dark:shadow-none dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white ${className}`}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <MoonIcon className="size-[17px] text-zinc-300 transition-colors group-hover:text-white" weight="bold" />
        ) : (
          <SunIcon className="size-[17px] text-amber-500 transition-colors group-hover:text-amber-600" weight="bold" />
        )}
      </motion.div>
    </button>
  );
}
