"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import {
  BrainIcon,
  BugBeetleIcon,
  CodeIcon,
  FlowArrowIcon,
  ListChecksIcon,
  MagnifyingGlassIcon,
  PencilRulerIcon,
  RocketLaunchIcon,
  TargetIcon,
} from "@/components/ui/Icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const processSteps = [
  {
    number: "1",
    title: "Diskusi",
    description: "Memahami kebutuhan, masalah, dan tujuan bisnis yang ingin dicapai.",
  },
  {
    number: "2",
    title: "Perencanaan",
    description: "Menyusun alur, fitur, dan solusi digital yang paling sesuai.",
  },
  {
    number: "3",
    title: "Pengembangan",
    description: "Membangun, menguji, dan menyiapkan aplikasi untuk digunakan.",
  },
] as const;

const activeNumberStyles = {
  backgroundColor: "#050505",
  borderColor: "#050505",
  color: "#ffffff",
};

const leftIconPosition =
  "left-1/2 top-1/2 -translate-x-[6.5rem] -translate-y-[4rem] sm:left-[28%] sm:-translate-x-1/2 sm:-translate-y-1/2";
const topIconPosition =
  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-[6.5rem] sm:-top-16 sm:translate-y-0";
const rightIconPosition =
  "left-1/2 top-1/2 translate-x-[3.5rem] -translate-y-[4rem] sm:left-[72%] sm:-translate-x-1/2 sm:-translate-y-1/2";

const processIconSets = [
  [
    {
      icon: BrainIcon,
      position: leftIconPosition,
    },
    {
      icon: TargetIcon,
      position: topIconPosition,
    },
    {
      icon: MagnifyingGlassIcon,
      position: rightIconPosition,
    },
  ],
  [
    {
      icon: FlowArrowIcon,
      position: leftIconPosition,
    },
    {
      icon: PencilRulerIcon,
      position: topIconPosition,
    },
    {
      icon: ListChecksIcon,
      position: rightIconPosition,
    },
  ],
  [
    {
      icon: BugBeetleIcon,
      position: leftIconPosition,
    },
    {
      icon: CodeIcon,
      position: topIconPosition,
    },
    {
      icon: RocketLaunchIcon,
      position: rightIconPosition,
    },
  ],
] as const;

export function CallToActionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progressLine = progressLineRef.current;

      if (!section || !track || !progressLine) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      const introContent = section.querySelector<HTMLElement>("[data-process-intro]");
      const stepContents = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-process-content]"),
      );
      const stepNumbers = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-process-number]"),
      );
      const stepCopies = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-process-copy]"),
      );
      const stepIcons = processSteps.map((_, index) =>
        gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll(`[data-process-icon="${index}"]`),
        ),
      );
      const stepConnectors = processSteps.map((_, index) =>
        gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll(`[data-process-connector="${index}"]`),
        ),
      );
      const processLine = section.querySelector<HTMLElement>("[data-process-line]");

      if (
        !introContent ||
        !processLine ||
        stepContents.length !== processSteps.length ||
        stepNumbers.length !== processSteps.length ||
        stepCopies.length !== processSteps.length ||
        stepIcons.some((icons) => icons.length !== 3) ||
        stepConnectors.some((connectors) => connectors.length < 1)
      ) {
        return;
      }

      gsap.set(track, { xPercent: 0, force3D: true });
      gsap.set(stepContents, { autoAlpha: 0, x: 90 });
      gsap.set(stepCopies, { autoAlpha: 0, y: 28 });
      gsap.set(processLine, { autoAlpha: 0 });
      gsap.set(progressLine, { scaleX: 0, transformOrigin: "left center" });

      stepConnectors.forEach((connectors) => {
        gsap.set(connectors, { autoAlpha: 0, scale: 0 });
      });

      stepIcons.forEach((icons, stepIndex) => {
        const numberBounds = stepNumbers[stepIndex].getBoundingClientRect();
        const numberCenterX = numberBounds.left + numberBounds.width / 2;
        const numberCenterY = numberBounds.top + numberBounds.height / 2;

        icons.forEach((icon, iconIndex) => {
          const iconBounds = icon.getBoundingClientRect();

          gsap.set(icon, {
            autoAlpha: 0,
            rotation: [-45, -75, 45][iconIndex],
            scale: 0.2,
            transformOrigin: "center center",
            x: numberCenterX - (iconBounds.left + iconBounds.width / 2),
            y: numberCenterY - (iconBounds.top + iconBounds.height / 2),
          });
        });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.7, 2800)}`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to({}, { duration: 0.25 })
        .to(track, { xPercent: -25, duration: 0.9, force3D: true })
        .to(introContent, { autoAlpha: 0, x: -100, duration: 0.62 }, "<")
        .to(stepContents[0], { autoAlpha: 1, x: 0, duration: 0.65 }, "<0.25")
        .to(processLine, { autoAlpha: 1, duration: 0.2 }, "<0.08")
        .to(progressLine, { scaleX: 0.025, duration: 0.28, ease: "none" }, "<")
        .to(stepNumbers[0], { ...activeNumberStyles, duration: 0.18 }, "<")
        .to(
          stepConnectors[0],
          { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.04 },
          ">-0.02",
        )
        .to(
          stepIcons[0],
          {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.3)",
            stagger: { each: 0.06, from: "center" },
          },
          "<0.05",
        )
        .to(
          stepCopies[0],
          { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
          "<0.22",
        )
        .to({}, { duration: 0.32 })
        .to(track, { xPercent: -50, duration: 0.9, force3D: true })
        .to(stepContents[0], { autoAlpha: 0, x: -90, duration: 0.55 }, "<")
        .to(stepContents[1], { autoAlpha: 1, x: 0, duration: 0.65 }, "<0.25")
        .to(progressLine, { scaleX: 0.5, duration: 0.9, ease: "none" }, "<")
        .to(stepNumbers[1], { ...activeNumberStyles, duration: 0.18 }, ">-0.02")
        .to(
          stepConnectors[1],
          { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.04 },
          ">-0.02",
        )
        .to(
          stepIcons[1],
          {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.3)",
            stagger: { each: 0.06, from: "center" },
          },
          "<0.05",
        )
        .to(
          stepCopies[1],
          { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
          "<0.22",
        )
        .to({}, { duration: 0.32 })
        .to(track, { xPercent: -75, duration: 0.9, force3D: true })
        .to(stepContents[1], { autoAlpha: 0, x: -90, duration: 0.55 }, "<")
        .to(stepContents[2], { autoAlpha: 1, x: 0, duration: 0.65 }, "<0.25")
        .to(progressLine, { scaleX: 1, duration: 0.9, ease: "none" }, "<")
        .to(stepNumbers[2], { ...activeNumberStyles, duration: 0.18 }, ">-0.02")
        .to(
          stepConnectors[2],
          { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.04 },
          ">-0.02",
        )
        .to(
          stepIcons[2],
          {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.3)",
            stagger: { each: 0.06, from: "center" },
          },
          "<0.05",
        )
        .to(
          stepCopies[2],
          { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
          "<0.22",
        )
        .to({}, { duration: 0.38 });

      return () => timeline.scrollTrigger?.kill();
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-white motion-reduce:h-auto motion-reduce:min-h-0 md:min-h-[680px]"
      aria-labelledby="solution-process-title"
    >
      <div
        ref={trackRef}
        data-process-track
        className="flex h-full w-[400%] will-change-transform motion-reduce:w-full motion-reduce:flex-col"
      >
        <div
          data-process-panel
          className="flex h-full w-1/4 shrink-0 items-center justify-center px-6 motion-reduce:min-h-[75svh] motion-reduce:w-full sm:px-10"
        >
          <div data-process-intro className="max-w-[900px] text-center will-change-transform">
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
              Siap Membangun
            </p>
            <span className="mx-auto mt-4 block h-px w-16 bg-black" />
            <h2
              id="solution-process-title"
              className="mt-9 text-[clamp(3.4rem,9vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.07em]"
            >
              Solusi Digital
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-black/65 sm:text-xl md:text-2xl">
              Yang fungsional, mudah digunakan, dan benar-benar berguna.
            </p>
          </div>
        </div>

        <div
          data-process-line
          aria-hidden="true"
          className="absolute left-[37.5%] top-[calc(50%_-_5.5rem)] z-0 h-0 w-1/2 border-t-2 border-dashed border-black/20 motion-reduce:hidden sm:top-[calc(50%_-_6.125rem)]"
        >
          <span
            ref={progressLineRef}
            className="absolute -top-0.5 left-0 block h-0 w-full origin-left border-t-2 border-dashed border-black will-change-transform"
          />
        </div>

        {processSteps.map((step, index) => (
          <div
            key={step.number}
            data-process-panel
            className="relative flex h-full w-1/4 shrink-0 items-center justify-center px-6 motion-reduce:min-h-[70svh] motion-reduce:w-full sm:px-10"
          >
            <article
              data-process-content
              className="relative top-6 z-10 flex h-[25rem] w-full max-w-[1120px] flex-col items-center text-center will-change-transform sm:top-8 sm:h-[30rem]"
            >
              <div className="relative h-44 w-full shrink-0 sm:h-[13.75rem]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
                  {index === 0 && (
                    <span
                      data-process-connector={index}
                      className="absolute left-[28%] right-1/2 top-1/2 h-0 origin-right border-t-2 border-dashed border-black/35"
                    />
                  )}
                  {index === 2 && (
                    <span
                      data-process-connector={index}
                      className="absolute left-1/2 right-[28%] top-1/2 h-0 origin-left border-t-2 border-dashed border-black/35"
                    />
                  )}
                  <span
                    data-process-connector={index}
                    className="absolute bottom-1/2 left-1/2 -top-16 w-0 origin-bottom border-l-2 border-dashed border-black/35"
                  />
                </div>

                {processIconSets[index].map(({ icon: Icon, position }, iconIndex) => (
                  <span
                    key={iconIndex}
                    className={`absolute z-10 ${position}`}
                  >
                    <span
                      data-process-icon={index}
                      className="grid size-12 place-items-center rounded-full border border-black/15 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:size-24"
                    >
                      <Icon className="size-6 text-black sm:size-12" weight="regular" />
                    </span>
                  </span>
                ))}

                <div className="absolute left-1/2 top-1/2 z-20 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/20 sm:size-40">
                  <span className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-black/15" />
                  <span className="pointer-events-none absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-black" />
                  <span
                    data-process-number
                    className="relative z-10 grid size-20 place-items-center rounded-full border-2 border-black bg-white text-3xl font-extrabold tracking-[-0.04em] motion-reduce:bg-black motion-reduce:text-white sm:size-32 sm:text-5xl"
                  >
                    {step.number}
                  </span>
                </div>
              </div>

              <div data-process-copy className="relative z-10 mt-7 sm:mt-9">
                <h3 className="text-[clamp(2.5rem,11vw,4rem)] font-extrabold leading-[0.92] tracking-[-0.065em] sm:text-[clamp(3rem,7vw,6.5rem)]">
                  {step.title}
                </h3>
                <div aria-hidden="true" className="mx-auto mt-6 flex w-24 items-center gap-3">
                  <span className="h-px flex-1 bg-black/45" />
                  <span className="size-2.5 rounded-full bg-black" />
                  <span className="h-px flex-1 bg-black/45" />
                </div>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/60 sm:text-xl md:text-2xl">
                  {step.description}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
