import { BrainIcon, CodeIcon, SparkleIcon } from "@/components/ui/Icons";
import { DotGrid } from "@/components/ui/Decorations";

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[410px]">
      <DotGrid className="absolute right-[8%] top-[4%] text-black" />

      <div className="absolute left-[15%] top-[18%] grid size-[68%] place-items-center rounded-full bg-black text-white shadow-[0_20px_45px_rgba(0,0,0,0.16)]">
        <CodeIcon className="size-[55%]" weight="bold" />
      </div>

      <div className="absolute bottom-[7%] left-[4%] grid size-[30%] place-items-center rounded-full border-2 border-white bg-black text-white shadow-lg">
        <BrainIcon className="size-[58%]" weight="bold" />
      </div>

      <div className="absolute right-[4%] top-[30%] grid size-[23%] place-items-center rounded-full border-2 border-white bg-black text-white shadow-lg">
        <SparkleIcon className="size-[62%]" weight="bold" />
      </div>
    </div>
  );
}
