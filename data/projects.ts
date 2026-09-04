import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "showroom-app",
    title: "Showroom Management App",
    eyebrow: "Enterprise Dealership ERP",
    description:
      "Modern automotive enterprise platform featuring reactive inventory valuation, vehicle handover workflows, BAST printing, and document mutasi tracking.",
    summary:
      "A modern, full-stack showroom enterprise management platform built for Telaga Berlian Management. Engineered with Laravel, Inertia.js React 19, and TypeScript, the system handles real-time vehicle capital valuation, multi-stage sales transactions, financing integrations, legal document mutasi processes, and automated database backups.",
    technologies: [
      "Laravel",
      "Inertia.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    imageUrl: "/projects/showroom-v2-preview.png",
    imageAlt: "Showroom Management App v2 Interface",
    problems: [
      "Manual vehicle cost tracking (repairs, detailing, and transport overheads) in fragmented spreadsheets led to inaccurate net margins and delayed inventory valuation.",
      "Complex multi-stage vehicle sales and leasing financing lacked unified invoicing, payment tracking, and real-time transaction visibility.",
      "Physical vehicle handovers and legal document transfers (mutasi BPKB/STNK) lacked digital audit trails, photo verification, and formal BAST certificates.",
      "Vulnerability to data loss and business disruption due to the absence of automated database snapshot backups.",
    ],
    features: [
      "Real-time car inventory with capital, repair, and transport valuation",
      "Multi-stage sales lifecycle with invoice generator and leasing financing support",
      "Vehicle handover timeline, BAST certificate printing, and mutasi process tracking",
    ],
    outcomes: [
      "Streamlined dealership administration into an integrated, reactive single-page app",
      "Automated financial reconciliation, handover photo archiving, and legal document tracking",
      "Ensured business continuity with automated database backup snapshots",
    ],
    repositoryUrl: "https://github.com/DwipaRaharja/showroom_app",
    accent: "emerald",
  },
  {
    id: "ramadwipa-portfolio",
    title: "Interactive Developer Portfolio",
    eyebrow: "Digital Personal Branding",
    description:
      "Modern, high-performance developer portfolio showcasing profile, engineering skills, and featured projects.",
    summary:
      "A personal portfolio website engineered to showcase my identity, journey, and projects as a Full Stack Developer. Crafted with a stealth dark monochrome design system, responsive navigation, and interactive terminal animations.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/projects/ramadwipa-portfolio-home.png",
    imageAlt: "Ramadwipa Portfolio Website Home Interface",
    problems: [
      "Scattered representation of engineering repositories, skill stacks, and credentials across disconnected platforms.",
      "Static resume documents and conventional portfolios fail to showcase real-world frontend motion physics, responsive design systems, and software craftsmanship.",
      "High-friction inquiry processes that caused communication delays between prospective clients, recruiters, and the developer.",
    ],
    features: [
      "Interactive developer profile & featured projects showcase",
      "High-performance scroll-driven and CLI animations",
      "Interactive contact terminal with direct WhatsApp integration",
    ],
    outcomes: [
      "Consolidated profile, technical skills, case studies, and contact channels in one experience",
      "Unified brand identity optimized across desktop, tablet, and mobile",
      "Enables recruiters and clients to explore projects and connect seamlessly",
    ],
    demoUrl: "/",
    repositoryUrl: "https://github.com/DwipaRaharja/rama-portofolio.git",
    accent: "violet",
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
