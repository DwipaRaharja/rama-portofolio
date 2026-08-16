"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
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
    const sectionIds = [
      ...navigationItems.map((item) => item.href.slice(1)),
      "solution",
      "contact",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const isContactActive = activeSection === "contact";

  return (
    <motion.header
      className="sticky top-0 z-40 bg-white/90 px-4 py-4 backdrop-blur-lg sm:px-6"
      variants={navbarVariants}
      initial="hidden"
      animate={isIntroComplete ? "visible" : "hidden"}
    >
      <motion.nav
        className="mx-auto flex h-14 max-w-[1280px] items-center justify-between rounded-xl border border-black/25 bg-white px-5 shadow-[0_4px_18px_rgba(0,0,0,0.03)] sm:px-7"
        variants={navigationVariants}
      >
        <motion.a
          href="#home"
          onClick={closeMenu}
          variants={navigationItemVariants}
          className="text-lg font-extrabold tracking-[-0.04em] sm:text-xl"
        >
          Ramadwipa.
        </motion.a>

        <motion.div
          className="hidden items-center gap-7 lg:flex"
          variants={navigationVariants}
        >
          {navigationItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <motion.a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                variants={navigationItemVariants}
                className={`relative py-4 text-sm font-semibold transition-colors ${
                  isActive ? "text-black" : "text-black/60 hover:text-black"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-black transition-transform ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </motion.a>
            );
          })}

          <motion.a
            href="#contact"
            aria-current={isContactActive ? "location" : undefined}
            variants={navigationItemVariants}
            className={`inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition-[transform,box-shadow] hover:-translate-y-0.5 ${
              isContactActive
                ? "-translate-y-0.5 shadow-[0_0_0_4px_rgba(0,0,0,0.14)]"
                : "shadow-none"
            }`}
          >
            Kontak Saya
            <ArrowUpRightIcon className="size-4" />
          </motion.a>
        </motion.div>

        <motion.button
          type="button"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          variants={navigationItemVariants}
          className="grid size-10 place-items-center rounded-lg border border-black/20 lg:hidden"
        >
          {isMenuOpen ? (
            <CloseIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-[84px] rounded-xl border border-black bg-white p-3 shadow-xl sm:inset-x-6 lg:hidden"
          >
            {navigationItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                  className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={closeMenu}
              aria-current={isContactActive ? "location" : undefined}
              className={`mt-2 flex items-center justify-between rounded-lg bg-black px-4 py-3 text-sm font-bold text-white transition-shadow ${
                isContactActive
                  ? "shadow-[0_0_0_3px_rgba(0,0,0,0.16)]"
                  : "shadow-none"
              }`}
            >
              Kontak Saya
              <ArrowUpRightIcon className="size-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
