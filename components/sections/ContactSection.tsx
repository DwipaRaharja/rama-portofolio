"use client";

import { FormEvent, useState } from "react";

import { Container } from "@/components/ui/Container";
import { WhatsappIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/data/site";

const fieldClassName =
  "h-11 w-full rounded-md border border-black/45 bg-white px-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

export function ContactSection() {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const senderName = String(formData.get("name") ?? "");
    const senderEmail = String(formData.get("email") ?? "");
    const phoneNumber = String(formData.get("phone") ?? "");
    const businessName = String(formData.get("business") ?? "");
    const projectDescription = String(formData.get("message") ?? "");

    const message = encodeURIComponent(
      [
        "Halo Ramadwipa, saya ingin mendiskusikan project.",
        "",
        `Nama: ${senderName}`,
        `Email: ${senderEmail}`,
        `Nomor telepon: ${phoneNumber}`,
        `Bisnis/organisasi: ${businessName || "-"}`,
        "",
        "Kebutuhan project:",
        projectDescription,
      ].join("\n"),
    );
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;

    setFeedbackMessage("WhatsApp akan terbuka dengan pesan yang sudah disiapkan.");
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!whatsappWindow) {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div id="contact" className="relative scroll-mt-28 pb-24 pt-12 sm:pb-32">
      <Container className="relative z-10">
        <Reveal>
          <div className="section-card-shadow rounded-2xl border-2 border-black bg-white p-6 sm:p-10 lg:p-14">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
                Kontak Saya
              </h2>
              <p className="mt-2 text-sm text-black/60">Ayo kita buat project bareng-bareng.</p>
              <SocialLinks className="mt-7 justify-center" />
              <div className="mx-auto my-8 flex max-w-md items-center gap-4 text-xs text-black/45">
                <span className="h-px flex-1 bg-black/15" />
                Atau
                <span className="h-px flex-1 bg-black/15" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-[1000px]">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-sm font-semibold">
                  Nama
                  <input className={`${fieldClassName} mt-2`} type="text" name="name" placeholder="Input nama kamu" autoComplete="name" required />
                </label>
                <label className="text-sm font-semibold">
                  Nomor Telepon
                  <input className={`${fieldClassName} mt-2`} type="tel" name="phone" placeholder="Input nomor telepon kamu" autoComplete="tel" required />
                </label>
                <label className="text-sm font-semibold">
                  Email
                  <input className={`${fieldClassName} mt-2`} type="email" name="email" placeholder="Input email kamu" autoComplete="email" required />
                </label>
                <label className="text-sm font-semibold">
                  Nama Bisnis
                  <input className={`${fieldClassName} mt-2`} type="text" name="business" placeholder="Input nama bisnis (opsional)" autoComplete="organization" />
                </label>
              </div>

              <label className="mt-5 block text-sm font-semibold">
                Apa yang bisa kita buat?
                <textarea className="mt-2 min-h-40 w-full resize-y rounded-md border border-black/45 bg-white p-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10" name="message" placeholder="Ceritakan kebutuhan atau ide project kamu" required />
              </label>

              <div className="mt-7 text-center">
                <button type="submit" className="inline-flex h-12 items-center gap-2 rounded-lg bg-black px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
                  Kirim via WhatsApp
                  <WhatsappIcon className="size-4" />
                </button>
                <p aria-live="polite" className="mt-3 min-h-5 text-xs text-black/55">
                  {feedbackMessage}
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
