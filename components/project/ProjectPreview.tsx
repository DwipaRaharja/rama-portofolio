import Image from "next/image";

import type { Project } from "@/types/project";

const accentStyles = {
  ember: {
    frame: "bg-[#4b1a00]",
    glow: "from-[#ff7a00] via-[#c24a00] to-transparent",
    mark: "bg-[#ff7600]",
  },
  violet: {
    frame: "bg-[#2f2445]",
    glow: "from-[#a176ff] via-[#6142a0] to-transparent",
    mark: "bg-[#7c56cc]",
  },
};

type ProjectPreviewProps = {
  project: Project;
  compact?: boolean;
  detail?: boolean;
};

function MockScreen({ project }: { project: Project }) {
  const styles = accentStyles[project.accent];

  return (
    <div className="grid h-full grid-cols-[42%_58%] overflow-hidden rounded-[inherit] bg-white">
      <div className="relative overflow-hidden bg-[#101010] p-[7%] text-white">
        <p className="max-w-[9ch] text-[clamp(.5rem,1.5vw,1.15rem)] font-medium leading-tight">
          Convert your ideas into successful business.
        </p>
        <div
          className={`absolute inset-x-[16%] bottom-0 h-[47%] bg-gradient-to-t ${styles.glow} blur-sm`}
        />
      </div>
      <div className="p-[8%] text-black">
        <div className={`mb-[8%] size-[clamp(.6rem,2vw,1.4rem)] rounded-full ${styles.mark}`} />
        <p className="text-[clamp(.55rem,1.65vw,1.25rem)] font-bold">Get Started</p>
        <p className="mt-[3%] text-[clamp(.22rem,.6vw,.48rem)] text-black/40">
          Welcome — let&apos;s get started
        </p>
        <div className="mt-[12%] space-y-[6%]">
          <div className="h-[clamp(.35rem,1.1vw,.8rem)] rounded border border-black/10 bg-black/[0.02]" />
          <div className="h-[clamp(.35rem,1.1vw,.8rem)] rounded border border-black/10 bg-black/[0.02]" />
          <div className={`h-[clamp(.42rem,1.3vw,.95rem)] rounded ${styles.mark}`} />
        </div>
      </div>
    </div>
  );
}

export function ProjectPreview({
  project,
  compact = false,
  detail = false,
}: ProjectPreviewProps) {
  const styles = accentStyles[project.accent];

  if (project.imageUrl) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-black/15 bg-[#111827] shadow-[0_12px_34px_-22px_rgba(0,0,0,0.45)] ${
          detail ? "aspect-[2/1] sm:aspect-[12/5] lg:aspect-[5/2]" : "aspect-[2/1]"
        }`}
      >
        <Image
          src={project.imageUrl}
          alt={project.imageAlt ?? `Tampilan project ${project.title}`}
          fill
          sizes={compact ? "(min-width: 1024px) 42vw, 90vw" : "(min-width: 1024px) 52vw, 90vw"}
          loading={detail ? "eager" : undefined}
          fetchPriority={detail ? "high" : undefined}
          className="object-cover object-top"
        />
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`aspect-[16/9] rounded-xl p-3 ${styles.frame}`}>
        <MockScreen project={project} />
      </div>
    );
  }

  return (
    <div className="relative min-h-[350px] sm:min-h-[430px]">
      <div className={`absolute left-0 top-0 aspect-[16/10] w-[78%] rounded-xl p-3 shadow-xl ${styles.frame}`}>
        <MockScreen project={project} />
      </div>
      <div className={`absolute bottom-[4%] left-[5%] aspect-[3/4] w-[34%] rounded-lg p-2 shadow-xl ${styles.frame}`}>
        <MockScreen project={project} />
      </div>
      <div className={`absolute bottom-[14%] right-[1%] aspect-[4/3] w-[54%] rounded-lg p-2 shadow-xl ${styles.frame}`}>
        <MockScreen project={project} />
      </div>
    </div>
  );
}
