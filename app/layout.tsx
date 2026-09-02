import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { PortfolioIntro } from "@/components/layout/PortfolioIntro";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ramadwipa | Full Stack Developer",
  description:
    "Portfolio of Ramadwipa, a Full Stack Developer building clean, functional, and reliable digital solutions for modern business needs.",
  keywords: [
    "Ramadwipa",
    "Full Stack Developer",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
  ],
  authors: [{ name: "Ramadwipa" }],
  creator: "Ramadwipa",
  publisher: "Ramadwipa",
  openGraph: {
    title: "Ramadwipa | Full Stack Developer",
    description:
      "Full Stack Developer building clean, functional, and intuitive web applications for modern businesses.",
    siteName: "Ramadwipa Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramadwipa | Full Stack Developer",
    description:
      "Full Stack Developer building clean, functional, and reliable digital solutions for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] font-sans text-white">
        <PortfolioIntro />
        <PageTransition />
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
