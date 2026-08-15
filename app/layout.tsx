import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramadwipa | Full Stack Developer",
  description:
    "Portofolio Ramadwipa, Full Stack Developer yang membangun solusi digital untuk kebutuhan bisnis.",
  keywords: ["Ramadwipa", "Full Stack Developer", "Web Developer", "Portofolio"],
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
