"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Decorations";
import { QuotesIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { WindowCard } from "@/components/ui/WindowCard";
import { testimonials } from "@/data/testimonials";

export function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 pb-20 pt-6 text-zinc-950 dark:text-white sm:pb-24 sm:pt-8 lg:pb-28"
    >
      {/* Background Subtle Tech Dot Grid with Radial Mask */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,#000_30%,transparent_100%)]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Client Endorsements</SectionLabel>
          <h2 className="text-4xl font-extrabold tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-5xl">
            What Clients Say
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
            Feedback from business owners, project leads, and collaborators on
            software delivery, problem-solving, and real-world results.
          </p>
        </Reveal>

        {/* Wide Horizontal Testimonial Spotlight */}
        <div className="mt-10 max-w-6xl">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: 0.06 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              <WindowCard
                interactive={false}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_12px_36px_-20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-zinc-350 hover:shadow-xl dark:border-white/12 dark:bg-[#0e0e11] dark:shadow-[0_18px_50px_-28px_rgba(0,0,0,0.85)] dark:hover:border-white/30 dark:hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)]"
                headerClassName="px-4 py-3"
                dotSize="md"
              >
                <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-12 md:items-center md:gap-8 lg:p-8">
                  {/* Quote Section (Left / Main) */}
                  <div className="md:col-span-8 lg:col-span-8">
                    <QuotesIcon
                      weight="fill"
                      className="size-7 sm:size-8 text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-white/20 dark:group-hover:text-white/40"
                    />
                    <blockquote className="mt-3 text-base sm:text-lg lg:text-base font-normal leading-relaxed text-zinc-800 dark:text-zinc-200">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Client Info (Right Side with Vertical Divider on Desktop) */}
                  <div className="border-t border-zinc-200 pt-6 dark:border-white/10 md:col-span-4 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:col-span-4">
                    {/* Associated Project Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-100/90 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                        <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        {testimonial.projectTag}
                      </span>
                    </div>

                    {/* Client Identity */}
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-zinc-200/90 bg-zinc-100 font-extrabold text-sm tracking-wider text-zinc-800 shadow-xs dark:border-white/15 dark:bg-[#18181f] dark:text-white">
                        {testimonial.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-bold text-zinc-950 dark:text-white">
                          {testimonial.name}
                        </p>
                        {testimonial.role && (
                          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                            {testimonial.role}
                          </p>
                        )}
                        {testimonial.company && (
                          <p className="truncate text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </WindowCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
