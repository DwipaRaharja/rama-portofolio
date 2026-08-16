"use client";

import { useState } from "react";

import { BrainIcon, BuildingIcon, CodeIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    label: "Problem Solving",
    description:
      "Menganalisis akar masalah dan mengubahnya menjadi solusi yang sederhana, tepat, dan mudah digunakan.",
    Icon: BrainIcon,
  },
  {
    label: "Full Stack Development",
    description:
      "Membangun aplikasi dari antarmuka hingga sistem backend dengan struktur yang rapi dan mudah dikembangkan.",
    Icon: CodeIcon,
  },
  {
    label: "Business Solutions",
    description:
      "Menerjemahkan kebutuhan operasional bisnis menjadi fitur digital yang efisien dan benar-benar bermanfaat.",
    Icon: BuildingIcon,
  },
] as const;

export function ValueCards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      className="mt-8 grid items-stretch gap-4 sm:grid-cols-3 lg:flex lg:h-[240px]"
      onMouseLeave={() => setActiveIndex(null)}
    >
      {values.map(({ label, description, Icon }, index) => {
        const flexGrow =
          activeIndex === null ? 1 : activeIndex === index ? 1.7 : 0.65;

        return (
          <div
            key={label}
            className="min-w-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:basis-0"
            style={{ flexGrow }}
            onMouseEnter={() => setActiveIndex(index)}
            onFocusCapture={() => setActiveIndex(index)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setActiveIndex(null);
              }
            }}
          >
            <Reveal delay={0.08 * index} className="h-full">
              <article
                tabIndex={0}
                className="group flex h-full min-h-44 w-full cursor-default flex-col items-center justify-center overflow-hidden rounded-xl border border-black/60 bg-white p-5 text-center text-black transition-[background-color,color,box-shadow] duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 lg:min-h-0 lg:cursor-pointer lg:hover:bg-black lg:hover:text-white lg:hover:shadow-xl lg:focus:bg-black lg:focus:text-white lg:focus:shadow-xl"
              >
                <Icon className="mb-4 size-9 shrink-0 transition-transform duration-500 group-hover:scale-110 group-focus:scale-110" />
                <p className="text-sm font-bold">{label}</p>

                <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus:grid-rows-[1fr] lg:group-focus:opacity-100">
                  <div className="overflow-hidden">
                    <p className="max-w-md pt-4 text-xs leading-5 text-black/65 transition-colors duration-500 lg:group-hover:text-white/75 lg:group-focus:text-white/75">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
