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

const serviceOptions = [
  "Full Stack Web App",
  "Frontend / UI Engineering",
  "Backend & REST API",
  "System Consultation",
] as const;

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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [selectedService, setSelectedService] = useState<string>(serviceOptions[0]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Lock scroll when modal open
  useEffect(() => {
    if (!isModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isModalOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSendInquiry = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSending(true);

    const formattedLines = [
      "Halo Ramadwipa, saya tertarik berdiskusi mengenai proyek:",
      "",
      `👤 Nama / Klien : ${name.trim()}`,
      `📞 Kontak       : ${contact.trim() || "Tidak dicantumkan"}`,
      `💼 Layanan      : ${selectedService}`,
      "",
      `📝 Detail Kebutuhan :`,
      message.trim(),
    ];

    const formattedMessage = encodeURIComponent(formattedLines.join("\n"));
    const inquiryUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${formattedMessage}`;

    setTimeout(() => {
      setIsSending(false);
      setIsModalOpen(false);
      setName("");
      setContact("");
      setMessage("");

      const win = window.open(inquiryUrl, "_blank", "noopener,noreferrer");
      if (!win) {
        window.location.href = inquiryUrl;
      }
    }, 200);
  };

  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSendInquiry();
    }
  };

  const directWhatsappMessage = encodeURIComponent(
    "Hello Ramadwipa, I would like to discuss a project with you.",
  );
  const directWhatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${directWhatsappMessage}`;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 pb-24 pt-6 text-zinc-950 dark:text-white sm:pb-32 sm:pt-8 lg:pb-36"
    >
      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
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
              className="text-3xl font-extrabold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
            >
              Let&apos;s Build Something Great Together.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base"
            >
              Have a project in mind, an opportunity to discuss, or want to collaborate
              on modern web development? Fill out a quick inquiry or connect directly.
            </motion.p>

            {/* Availability Pill */}
            <motion.div variants={itemVariants} className="mt-6 flex items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] dark:bg-emerald-400" />
                <span>Available for freelance & full-time opportunities</span>
              </div>
            </motion.div>

            {/* Trigger Button: Pop up Form */}
            <motion.div variants={itemVariants} className="mt-7">
              <motion.button
                type="button"
                onClick={() => setIsModalOpen(true)}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex h-12 items-center gap-3 rounded-xl bg-zinc-950 px-6 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-md dark:bg-white dark:text-[#050505] dark:shadow-none dark:hover:bg-zinc-200 dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <EnvelopeIcon className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>Send Project Inquiry</span>
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="mt-9 border-t border-zinc-200 pt-6 dark:border-white/10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Connect Across Platforms
              </p>
              <SocialLinks className="mt-3.5" />
            </motion.div>
          </div>

          {/* Right Column: Direct Contact Cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Email Card */}
            <div className="surface-transition rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm hover:border-zinc-350 hover:bg-zinc-50/50 hover:shadow-md dark:border-white/12 dark:bg-[#0e0e11] dark:shadow-none dark:hover:border-white/25 dark:hover:bg-[#121216] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900 dark:border-white/15 dark:bg-white/[0.04] dark:text-white">
                    <EnvelopeIcon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Email</p>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="truncate text-sm font-bold text-zinc-950 hover:underline dark:text-white sm:text-base"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex h-9 min-w-[76px] items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 text-xs font-semibold text-zinc-700 transition-all hover:border-zinc-350 hover:bg-zinc-200 hover:text-zinc-950 dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-200 dark:hover:border-white/40 dark:hover:bg-white/15 dark:hover:text-white"
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
                    className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-zinc-300 bg-zinc-950 px-3.5 text-xs font-bold text-white transition-all hover:bg-black dark:border-white/15 dark:bg-white dark:text-[#050505] dark:hover:bg-zinc-200"
                  >
                    <span>Write</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="surface-transition rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm hover:border-zinc-350 hover:bg-zinc-50/50 hover:shadow-md dark:border-white/12 dark:bg-[#0e0e11] dark:shadow-none dark:hover:border-white/25 dark:hover:bg-[#121216] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-600 dark:text-emerald-400">
                    <WhatsappIcon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">WhatsApp Direct</p>
                    <p className="truncate text-sm font-bold text-zinc-950 dark:text-white sm:text-base">
                      +62 877-7674-4538
                    </p>
                  </div>
                </div>

                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center gap-1.5 self-end rounded-lg border border-emerald-500/30 bg-emerald-500/[0.1] px-4 text-xs font-bold text-emerald-700 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200 sm:self-auto"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Clean & Sleek Popup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md dark:bg-black/80"
            />

            {/* Dialog Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-inquiry-heading"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-950 shadow-2xl dark:border-white/15 dark:bg-[#0e0e11] dark:text-white dark:shadow-[0_25px_80px_rgba(0,0,0,0.95)] sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    id="modal-inquiry-heading"
                    className="text-xl font-extrabold tracking-tight text-zinc-950 sm:text-2xl dark:text-white"
                  >
                    Project Inquiry
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    Tell me about your project requirements to start a conversation.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close dialog"
                  className="interactive-transition -mr-2 -mt-2 grid size-9 place-items-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-200 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSendInquiry} className="mt-6 space-y-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                  >
                    Your Name or Organization *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivers / Studio Acme"
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-white/15 dark:bg-[#141418] dark:text-white dark:placeholder-zinc-600 dark:focus:border-white/50 dark:focus:bg-[#18181e]"
                  />
                </div>

                {/* Contact Field */}
                <div>
                  <label
                    htmlFor="inquiry-contact"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                  >
                    Your Email or WhatsApp Number
                  </label>
                  <input
                    id="inquiry-contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. alex@example.com or +62 812..."
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-white/15 dark:bg-[#141418] dark:text-white dark:placeholder-zinc-600 dark:focus:border-white/50 dark:focus:bg-[#18181e]"
                  />
                </div>

                {/* Service Interest Chips */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Project Interest
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedService(opt)}
                        className={`interactive-transition rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                          selectedService === opt
                            ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-[#050505]"
                            : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-200/70 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/35 dark:hover:bg-white/10"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                    >
                      Project Brief / Message *
                    </label>
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                      Ctrl + Enter to send
                    </span>
                  </div>
                  <textarea
                    id="inquiry-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    placeholder="Describe your project goals, scope, timeline, or any questions..."
                    className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-950 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-white dark:border-white/15 dark:bg-[#141418] dark:text-white dark:placeholder-zinc-600 dark:focus:border-white/50 dark:focus:bg-[#18181e]"
                  />
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-col-reverse gap-2.5 pt-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-100 px-5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-200 hover:text-zinc-950 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    Cancel
                  </button>

                  <motion.button
                    type="submit"
                    disabled={isSending || !name.trim() || !message.trim()}
                    whileHover={
                      shouldReduceMotion || !name.trim() || !message.trim()
                        ? undefined
                        : { scale: 1.01 }
                    }
                    whileTap={
                      shouldReduceMotion || !name.trim() || !message.trim()
                        ? undefined
                        : { scale: 0.98 }
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-[#050505] dark:hover:bg-zinc-200 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
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
