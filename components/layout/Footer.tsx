"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navigationItems, siteConfig } from "@/data/site";

export function Footer() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const revealOffset = shouldReduceMotion ? 0 : 20;
  const getSectionHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <footer className="overflow-hidden border-t border-white/10 bg-[#050505] pb-8 pt-16 text-white sm:pt-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_.8fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-xl font-extrabold tracking-[-0.04em] text-white">{siteConfig.name}.</p>
            <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-zinc-400">
              Building clean, functional, and impactful web applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-4 font-bold text-white">Navigation</p>
            <div className="space-y-2 text-sm text-zinc-400">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={getSectionHref(item.href)}
                  className="interactive-transition block hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={getSectionHref("#contact")}
                className="interactive-transition block hover:text-white"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.26,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-4 font-bold">Connect With Me</p>
            <SocialLinks />
          </motion.div>
        </div>

        <div className="mt-16 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.85,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="whitespace-nowrap text-center text-[clamp(4.2rem,12.5vw,11rem)] font-extrabold leading-none tracking-[-0.075em]"
          >
            {siteConfig.name}.
          </motion.p>
        </div>
      </Container>
    </footer>
  );
}
