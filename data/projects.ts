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
    id: "smart-retail-pos",
    title: "Smart Retail & POS Platform",
    eyebrow: "Retail & Inventory System",
    description:
      "Modern point of sale and multi-outlet inventory management platform designed for rapid cashier checkout and stock tracking.",
    summary:
      "A comprehensive Point of Sale (POS) and inventory tracking platform engineered to streamline retail commerce. Built with an intuitive cashier terminal, real-time stock sync across outlets, barcode scanner support, and daily financial profit-loss analytics.",
    technologies: ["Laravel", "MySQL", "REST API", "Tailwind CSS"],
    features: [
      "High-speed cashier checkout & automated barcode scanning",
      "Real-time multi-outlet stock tracking & low inventory alerts",
      "Comprehensive daily revenue, expense, and profit-loss analytics",
    ],
    outcomes: [
      "Accelerated checkout processing and eliminated manual calculation errors",
      "Provided real-time stock visibility across multiple store locations",
      "Delivered transparent financial data and automated daily sales summaries",
    ],
    repositoryUrl: "https://github.com/DwipaRaharja",
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
