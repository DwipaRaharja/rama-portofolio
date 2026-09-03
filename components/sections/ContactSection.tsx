"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Decorations";
import {
  ArrowUpRightIcon,
  CheckIcon,
  EnvelopeIcon,
  WhatsappIcon,
} from "@/components/ui/Icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/data/site";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Ramadwipa, I would like to discuss a project with you.",
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 pb-24 pt-6 text-white sm:pb-32 sm:pt-8 lg:pb-36"
    >
      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-16"
        >
          {/* Left Column: Context & Overview */}
          <div className="max-w-xl">
            <motion.div variants={itemVariants}>
              <SectionLabel>Get in Touch</SectionLabel>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
            >
              Let&apos;s Build Something Great Together.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base"
            >
              Have a project in mind, an opportunity to discuss, or want to collaborate
              on modern web development? Feel free to reach out directly through my
              primary channels.
            </motion.p>

            {/* Availability Pill */}
            <motion.div variants={itemVariants} className="mt-6 flex items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>Available for freelance & full-time opportunities</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Connect Across Platforms
              </p>
              <SocialLinks className="mt-3.5" />
            </motion.div>
          </div>

          {/* Right Column: Direct Contact Cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Email Card */}
            <div className="surface-transition rounded-2xl border border-white/12 bg-[#0e0e11] p-5 sm:p-6 hover:border-white/25 hover:bg-[#121216]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-white">
                    <EnvelopeIcon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-400">Email</p>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="truncate text-sm font-bold text-white hover:underline sm:text-base"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex h-9 min-w-[76px] items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 text-xs font-semibold text-zinc-200 transition-all hover:border-white/40 hover:bg-white/15 hover:text-white"
                    title="Copy email address"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedEmail ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center gap-1 text-emerald-400"
                        >
                          <CheckIcon className="size-3.5" />
                          <span>Copied</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                        >
                          Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/15 bg-white px-3.5 text-xs font-bold text-[#050505] transition-all hover:bg-zinc-200"
                  >
                    <span>Write</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="surface-transition rounded-2xl border border-white/12 bg-[#0e0e11] p-5 sm:p-6 hover:border-white/25 hover:bg-[#121216]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400">
                    <WhatsappIcon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-400">WhatsApp Direct</p>
                    <p className="truncate text-sm font-bold text-white sm:text-base">
                      +62 877-7674-4538
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center gap-1.5 self-end rounded-lg border border-emerald-500/30 bg-emerald-500/[0.1] px-4 text-xs font-bold text-emerald-300 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:text-emerald-200 sm:self-auto"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
