"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navigationItems, siteConfig } from "@/data/site";

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const revealOffset = shouldReduceMotion ? 0 : 28;

  return (
    <footer className="overflow-hidden bg-black pb-6 pt-14 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_.8fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xl font-extrabold tracking-[-0.04em]">{siteConfig.name}.</p>
            <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-white/55">
              Membangun aplikasi web yang rapi, fungsional, dan benar-benar berguna.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-4 font-bold">Navigasi</p>
            <div className="space-y-2 text-sm text-white/60">
              {navigationItems.map((item) => (
                <a key={item.href} href={item.href} className="block hover:text-white">
                  {item.label}
                </a>
              ))}
              <a href="#contact" className="block hover:text-white">
                Kontak Saya
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-4 font-bold">Media Sosial Saya</p>
            <SocialLinks inverse />
          </motion.div>
        </div>

        <div className="mt-16 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 72 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.15,
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
