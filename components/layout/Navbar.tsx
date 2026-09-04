"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  PORTFOLIO_INTRO_EVENT,
  shouldPlayPortfolioIntro,
} from "@/data/portfolio-intro";
import { navigationItems } from "@/data/site";

const navbarVariants: Variants = {
  hidden: { opacity: 0, y: -22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
    },
  },
};

const navigationVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.03,
      staggerChildren: 0.045,
    },
  },
};

const navigationItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const completeIntro = () => setIsIntroComplete(true);

    if (!shouldPlayPortfolioIntro()) {
      completeIntro();
    }

    window.addEventListener(PORTFOLIO_INTRO_EVENT, completeIntro);
    return () => window.removeEventListener(PORTFOLIO_INTRO_EVENT, completeIntro);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = [
      "home",
      "about",
      "tech-stack",
      "education",
      "portfolio",
      "contact",
    ];

    let animationFrameId: number;

    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.35;
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      let currentActive = "";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const targetElement =
          element.closest(".pin-spacer") ??
          (element.parentElement?.classList.contains("pin-spacer")
            ? element.parentElement
            : element);

        const rect = targetElement.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > triggerY) {
          currentActive = id;
        }
      }

      setActiveSection(currentActive);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);
  const isHomePage = pathname === "/";
  const getSectionHref = (href: string) => (isHomePage ? href : `/${href}`);
  const isContactActive = isHomePage && activeSection === "contact";

  return (
    <motion.header
      className="sticky top-0 z-40 bg-[var(--background)]/80 px-5 py-4 backdrop-blur-xl transition-colors duration-300 sm:px-8 lg:px-10"
      variants={navbarVariants}
      initial="hidden"
      animate={isIntroComplete ? "visible" : "hidden"}
    >
      <motion.nav
        className="mx-auto flex h-14 max-w-[1200px] items-center justify-between rounded-xl border border-zinc-200/90 bg-white/85 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md transition-colors duration-300 dark:border-white/12 dark:bg-[#0e0e11]/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] sm:px-7"
        variants={navigationVariants}
      >
        <motion.a
          href={getSectionHref("#home")}
          onClick={closeMenu}
          variants={navigationItemVariants}
          className="interactive-transition text-lg font-extrabold tracking-[-0.04em] text-zinc-950 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 sm:text-xl"
        >
          Ramadwipa.
        </motion.a>

        <motion.div
          className="hidden items-center gap-3.5 xl:gap-5 lg:flex"
          variants={navigationVariants}
        >
          {navigationItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = isHomePage && activeSection === sectionId;

            return (
              <motion.a
                key={item.href}
                href={getSectionHref(item.href)}
                aria-current={isActive ? "location" : undefined}
                variants={navigationItemVariants}
                className={`interactive-transition relative py-4 text-sm font-semibold ${
                  isActive
                    ? "text-zinc-950 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`interactive-transition absolute inset-x-0 bottom-0 h-0.5 origin-left bg-zinc-950 dark:bg-white ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </motion.a>
            );
          })}

          <motion.a
            href={getSectionHref("#contact")}
            aria-current={isContactActive ? "location" : undefined}
            variants={navigationItemVariants}
            className={`interactive-transition inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:-translate-y-0.5 hover:bg-black hover:shadow-md dark:bg-white dark:text-[#050505] dark:shadow-none dark:hover:bg-zinc-200 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] ${
              isContactActive
                ? "-translate-y-0.5 shadow-[0_0_0_3px_rgba(0,0,0,0.15)] dark:shadow-[0_0_0_3px_rgba(255,255,255,0.3)]"
                : ""
            }`}
          >
            Contact Me
            <ArrowUpRightIcon className="size-4" />
          </motion.a>

          <motion.div variants={navigationItemVariants}>
            <ThemeToggle />
          </motion.div>
        </motion.div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <ThemeToggle />

          <motion.button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            variants={navigationItemVariants}
            className="interactive-transition grid size-10 place-items-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:border-white/15 dark:bg-[#121215] dark:text-white dark:hover:bg-white dark:hover:text-[#050505]"
          >
            {isMenuOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-5 top-[84px] rounded-xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl transition-colors duration-300 dark:border-white/15 dark:bg-[#0e0e11]/95 dark:shadow-2xl sm:inset-x-8 lg:hidden"
          >
            {navigationItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = isHomePage && activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={getSectionHref(item.href)}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                  className={`interactive-transition block rounded-lg px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-[#050505]"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={getSectionHref("#contact")}
              onClick={closeMenu}
              aria-current={isContactActive ? "location" : undefined}
              className={`interactive-transition mt-2 flex items-center justify-between rounded-lg bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-black dark:bg-white dark:text-[#050505] dark:hover:bg-zinc-200 ${
                isContactActive
                  ? "shadow-[0_0_0_3px_rgba(0,0,0,0.15)] dark:shadow-[0_0_0_3px_rgba(255,255,255,0.3)]"
                  : ""
              }`}
            >
              Contact Me
              <ArrowUpRightIcon className="size-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
