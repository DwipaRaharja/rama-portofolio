"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Decorations";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  EnvelopeIcon,
  SendIcon,
  WhatsappIcon,
} from "@/components/ui/Icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/data/site";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const leftColumnVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Spotlight mouse tracking state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleSendMessage = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!senderMessage.trim()) return;

    setIsSending(true);

    const formattedLines = [
      "Hello Ramadwipa, I would like to discuss a project with you.",
      "",
      `Sender: ${senderName.trim() || "Client / Partner"}`,
      `Message: ${senderMessage.trim()}`,
    ];

    const formattedMessage = encodeURIComponent(formattedLines.join("\n"));
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${formattedMessage}`;

    setTimeout(() => {
      setIsSending(false);
      setIsModalOpen(false);
      const whatsappWindow = window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );
      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    }, 200);
  };

  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 pb-24 pt-6 text-white sm:pb-32 sm:pt-8 lg:pb-36"
    >
      <Container className="relative z-10">
        <motion.div
          variants={sectionVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-14 xl:gap-16"
        >
          {/* Left Side: Staggered Headline, Description & Modal Trigger Button */}
          <motion.div variants={leftColumnVariants} className="max-w-xl">
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
              Have a project in mind, a question, or want to discuss modern web
              development? Reach out directly through the channels or send a quick message.
            </motion.p>

            {/* Popup Form Trigger Button */}
            <motion.div variants={itemVariants} className="mt-8">
              <motion.button
                type="button"
                onClick={() => setIsModalOpen(true)}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-white px-6 font-bold text-[#050505] transition-all duration-200 hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              >
                <EnvelopeIcon className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>Send a Message</span>
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side: Direct Contact Card with Ambient Spotlight Glow */}
          <motion.div
            variants={cardVariants}
            onMouseMove={handleMouseMove}
            className="group/card relative transform-gpu overflow-hidden rounded-2xl border border-white/12 bg-[#0e0e11] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.02)] sm:p-8"
          >
            {/* Ambient Radial Spotlight Highlight on Cursor Move */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
              style={{
                background: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 75%)`,
              }}
              aria-hidden="true"
            />

            {/* Live Availability Status Pill */}
            <motion.div
              variants={cardItemVariants}
              className="relative flex items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] px-4 py-3 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              </span>
              <span className="text-xs font-semibold text-emerald-300 sm:text-sm">
                Available for freelance & full-time opportunities
              </span>
            </motion.div>

            {/* Direct Channel Cards */}
            <div className="relative mt-5 space-y-3.5">
              {/* Email Card */}
              <motion.div
                variants={cardItemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className="group/item rounded-xl border border-white/10 bg-[#141418] p-4 transition-colors duration-200 hover:border-white/35 hover:bg-[#18181e] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/[0.04] text-white transition-colors duration-200 group-hover/item:border-white/35 group-hover/item:bg-white/10">
                      <EnvelopeIcon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-400">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-sm font-bold text-white transition-colors hover:text-zinc-300 sm:text-base"
                      >
                        {siteConfig.contactEmail}
                      </a>
                    </div>
                  </div>

                  {/* Copy Email Button with Animated Presence Feedback */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-w-[76px] items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-zinc-200 transition-all duration-200 hover:border-white/40 hover:bg-white/15 hover:text-white"
                    title="Copy email to clipboard"
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
                          <span>Copied!</span>
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
                </div>
              </motion.div>

              {/* WhatsApp Direct Card */}
              <motion.div
                variants={cardItemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className="group/item rounded-xl border border-white/10 bg-[#141418] p-4 transition-colors duration-200 hover:border-white/35 hover:bg-[#18181e] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400 transition-colors duration-200 group-hover/item:border-emerald-400/50 group-hover/item:bg-emerald-500/15">
                      <WhatsappIcon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-400">
                        WhatsApp Direct
                      </p>
                      <p className="text-sm font-bold text-white sm:text-base">
                        +62 877-7674-4538
                      </p>
                    </div>
                  </div>

                  {/* Open WhatsApp Direct Link */}
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      "Hello Ramadwipa, I would like to discuss a project with you.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-all duration-200 hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:text-emerald-200"
                  >
                    <span>Chat</span>
                    <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Social Channels Section */}
            <motion.div
              variants={cardItemVariants}
              className="relative mt-6 border-t border-white/10 pt-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Connect Across Platforms
              </p>
              <SocialLinks className="mt-3.5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Message Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-heading"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#0e0e11] p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.03)] sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    id="modal-heading"
                    className="text-xl font-extrabold tracking-tight text-white sm:text-2xl"
                  >
                    Send a Direct Message
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                    Write your inquiry below to start a conversation directly on WhatsApp.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close dialog"
                  className="interactive-transition -mr-2 -mt-2 grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
                {/* Sender Name Field */}
                <div>
                  <label
                    htmlFor="popup-sender-name"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-400"
                  >
                    Your Name / Organization
                  </label>
                  <input
                    id="popup-sender-name"
                    type="text"
                    autoFocus
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Alex Rivers / Acme Studio"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-[#141418] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/50 focus:bg-[#18181e]"
                  />
                </div>

                {/* Sender Message Textarea */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="popup-sender-message"
                      className="block text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Your Message *
                    </label>
                    <span className="text-[11px] text-zinc-500">
                      Ctrl + Enter to send
                    </span>
                  </div>
                  <textarea
                    id="popup-sender-message"
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    placeholder="Tell me about your project, timeline, budget, or general inquiry..."
                    required
                    rows={4}
                    className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#141418] p-4 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/50 focus:bg-[#18181e]"
                  />
                </div>

                {/* Submit Actions */}
                <div className="flex flex-col-reverse gap-2.5 pt-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </button>

                  <motion.button
                    type="submit"
                    disabled={isSending || !senderMessage.trim()}
                    whileHover={
                      shouldReduceMotion || !senderMessage.trim()
                        ? undefined
                        : { scale: 1.01 }
                    }
                    whileTap={
                      shouldReduceMotion || !senderMessage.trim()
                        ? undefined
                        : { scale: 0.98 }
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 font-bold text-[#050505] transition-all hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>Opening WhatsApp...</span>
                    ) : (
                      <>
                        <WhatsappIcon className="size-5" />
                        <span>Send via WhatsApp</span>
                        <SendIcon className="size-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
