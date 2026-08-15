import Image from "next/image";

export function PortraitIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[285px] overflow-hidden rounded-full border-2 border-black bg-white">
      <Image
        src="/asset/image/ramadwipa-profile.png"
        alt="Ilustrasi potret Ramadwipa bergaya sketsa hitam putih"
        fill
        sizes="(max-width: 640px) 285px, 320px"
        className="origin-top scale-[1.45] object-cover object-[center_24%]"
      />
    </div>
  );
}
