import {
  EnvelopeIcon,
  GithubIcon,
  InstagramIcon,
  MusicIcon,
  WhatsappIcon,
} from "@/components/ui/Icons";

const socialItems = [
  {
    label: "WhatsApp",
    Icon: WhatsappIcon,
    href: "https://wa.me/6287776744538",
  },
  {
    label: "GitHub",
    Icon: GithubIcon,
    href: "https://github.com/DwipaRaharja",
  },
  {
    label: "Instagram",
    Icon: InstagramIcon,
    href: "https://www.instagram.com/ramadwipa16",
  },
  {
    label: "Email",
    Icon: EnvelopeIcon,
    href: "mailto:ramadwipa168@gmail.com",
  },
  {
    label: "TikTok",
    Icon: MusicIcon,
    href: "https://www.tiktok.com/@ramawipa",
  },
] as const;

type SocialLinksProps = {
  inverse?: boolean;
  className?: string;
};

export function SocialLinks({
  inverse = false,
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialItems.map(({ label, Icon, href }) => {
        const opensInNewTab = href.startsWith("https://");

        return (
          <a
            key={label}
            href={href}
            target={opensInNewTab ? "_blank" : undefined}
            rel={opensInNewTab ? "noopener noreferrer" : undefined}
            aria-label={`${label} Ramadwipa${opensInNewTab ? " (buka di tab baru)" : ""}`}
            title={label}
            className={`grid size-10 place-items-center rounded-full border-2 transition-transform hover:-translate-y-1 ${
              inverse
                ? "border-white/40 text-white hover:border-white"
                : "border-black/30 text-black hover:border-black"
            }`}
          >
            <Icon className="size-[22px]" />
          </a>
        );
      })}
    </div>
  );
}
