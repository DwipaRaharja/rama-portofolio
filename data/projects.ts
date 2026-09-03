import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "showroom-management",
    title: "Showroom Management System",
    eyebrow: "Deployed for Real Business",
    description:
      "Internal web application streamlining vehicle stock management, customer CRM, sales/purchase transactions, and payments.",
    summary:
      "An end-to-end internal system built to organize and optimize daily automotive showroom operations. The platform covers real-time inventory tracking, purchase and sales transactions, customer payment processing, and document archiving.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS"],
    imageUrl: "/projects/autohub-dashboard.png",
    imageAlt: "AutoHub Showroom Management System Dashboard",
    features: [
      "Real-time vehicle inventory management",
      "Comprehensive sales & purchase transactions",
      "Customer payment processing and document tracking",
    ],
    outcomes: [
      "Centralized stock, transactions, payments, and archives into a single unified system",
      "Enhanced operational transparency and eliminated manual tracking errors",
      "Significantly streamlined administrative workflow for showroom staff",
    ],
    repositoryUrl: "https://github.com/DwipaRaharja/app_autoHub.git",
    accent: "ember",
  },
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
