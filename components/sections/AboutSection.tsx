import { Container } from "@/components/ui/Container";
import { AboutFlowLines, DotGrid } from "@/components/ui/Decorations";
import { BrainIcon, BuildingIcon, CodeIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { PortraitIllustration } from "@/components/visuals/PortraitIllustration";

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

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 overflow-hidden py-16 sm:py-24"
    >
      <AboutFlowLines className="pointer-events-none absolute inset-x-0 -top-2 h-[390px] w-full text-black/15 sm:h-[440px]" />
      <DotGrid className="absolute -left-4 bottom-24 hidden text-black md:grid" />

      <Container className="relative z-10">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[320px_1fr]">
          <Reveal direction="left">
            <PortraitIllustration />
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Kenalan lebih dekat
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
              Tentang Saya
            </h2>
            <p className="mt-5 max-w-[760px] text-sm leading-7 text-black/65 sm:text-base">
              Saya Ramadwipa, seorang Full Stack Developer yang berfokus pada
              pengembangan aplikasi web untuk membantu kebutuhan bisnis. Saya
              menyukai proses memahami masalah, merancang solusi yang sesuai,
              lalu mengubahnya menjadi aplikasi yang fungsional dan mudah
              digunakan. Dalam setiap project, saya tidak hanya memerhatikan
              bagaimana sistem bekerja, tetapi juga bagaimana tampilannya tetap
              rapi, nyaman digunakan, dan benar-benar memberi manfaat bagi
              penggunanya.
            </p>
          </Reveal>
        </div>

        <TechStackSection />

        <Reveal
          delay={0.14}
          className="mx-auto mt-14 max-w-[850px] text-center"
        >
          <p className="text-sm font-semibold italic text-black/70">
            “Tujuan saya bukan sekadar membuat aplikasi berjalan, tetapi
            membuatnya benar-benar berguna.”
          </p>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-[820px] items-start gap-4 sm:grid-cols-3">
          {values.map(({ label, description, Icon }, index) => (
            <Reveal
              key={label}
              delay={0.08 * index}
              className="relative sm:min-h-36 sm:hover:z-20 sm:focus-within:z-20"
            >
              <article
                tabIndex={0}
                className="group flex min-h-36 w-full cursor-default flex-col items-center justify-center overflow-hidden rounded-xl border border-black/60 bg-black p-5 text-center text-white transition-[background-color,color,box-shadow,transform] duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:absolute sm:inset-x-0 sm:top-0 sm:cursor-pointer sm:bg-white sm:text-black sm:hover:-translate-y-1 sm:hover:bg-black sm:hover:text-white sm:hover:shadow-xl sm:focus:-translate-y-1 sm:focus:bg-black sm:focus:text-white sm:focus:shadow-xl"
              >
                <Icon className="mb-4 size-9 transition-transform duration-500 group-hover:scale-110 group-focus:scale-110" />
                <p className="text-sm font-bold">{label}</p>

                <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-500 ease-out sm:grid-rows-[0fr] sm:opacity-0 sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100 sm:group-focus:grid-rows-[1fr] sm:group-focus:opacity-100">
                  <div className="overflow-hidden">
                    <p className="pt-4 text-xs leading-5 text-white/75">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
