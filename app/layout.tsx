import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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
    "Portofolio Ramadwipa, Full Stack Developer yang membangun solusi digital untuk kebutuhan bisnis.",
  keywords: ["Ramadwipa", "Full Stack Developer", "Web Developer", "Portofolio"],
  authors: [{ name: "Ramadwipa" }],
  creator: "Ramadwipa",
  publisher: "Ramadwipa",
  openGraph: {
    title: "Ramadwipa | Full Stack Developer",
    description:
      "Full Stack Developer yang membangun aplikasi web rapi, fungsional, dan mudah digunakan untuk kebutuhan bisnis.",
    siteName: "Portofolio Ramadwipa",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramadwipa | Full Stack Developer",
    description:
      "Full Stack Developer yang membangun solusi digital untuk kebutuhan bisnis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-black">
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
