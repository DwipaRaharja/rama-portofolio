import { Container } from "@/components/ui/Container";
import { IntroContentGate } from "@/components/layout/IntroContentGate";
import { CornerFlowLines, WaveLines } from "@/components/ui/Decorations";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { ActionLink } from "@/components/ui/ActionLink";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function HeroSection() {
  return (
    <IntroContentGate>
      <section id="home" className="scroll-mt-28 pb-16 pt-2 sm:pb-24">
        <Container>
          <div className="section-card-shadow relative overflow-hidden rounded-2xl border-2 border-black bg-white px-6 py-12 sm:px-10 sm:py-16 lg:min-h-[570px] lg:px-14">
            <CornerFlowLines className="pointer-events-none absolute -left-24 -top-8 h-[330px] w-[520px] text-black/15 sm:-left-12 sm:-top-10 sm:h-[410px] sm:w-[650px] lg:-left-8 lg:-top-12 lg:h-[440px] lg:w-[700px]" />
            <WaveLines className="pointer-events-none absolute -bottom-36 -right-48 h-[380px] w-[600px] rotate-180 text-black/15" />

            <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
              <Reveal direction="left">
              <p className="mb-4 text-base font-medium sm:text-lg">
                Halo Saya, <strong>Ramadwipa</strong>{" "}
                <span aria-hidden="true">👋</span>
              </p>
              <h1 className="max-w-[760px] text-[clamp(2.6rem,5vw,4.0rem)] font-extrabold leading-[1.03] tracking-[-0.055em]">
                Saya Membangun Solusi Digital Untuk Bisnis.
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-relaxed text-black/65 sm:text-lg">
                Full Stack Developer yang membantu mengubah kebutuhan bisnis
                menjadi aplikasi web yang rapi, fungsional, dan mudah digunakan.
              </p>

              <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <ActionLink href="#portfolio" variant="outline">
                  Lihat Project
                  <ArrowRightIcon className="size-4" />
                </ActionLink>
                <ActionLink href="#contact">
                  Mari Diskusi
                  <ArrowRightIcon className="size-4" />
                </ActionLink>
              </div>
              </Reveal>

              <Reveal
                direction="right"
                delay={0.12}
                className="mx-auto w-full max-w-[470px]"
              >
                <HeroVisual />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </IntroContentGate>
  );
}
