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
  className?: string;
};

export function SocialLinks({
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
            className="interactive-transition grid size-10 place-items-center rounded-full border border-white/20 bg-[#121215] text-white hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#050505] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <Icon className="size-[22px]" />
          </a>
        );
      })}
    </div>
  );
}
