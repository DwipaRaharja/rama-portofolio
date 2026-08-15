import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "showroom-management",
    title: "Sistem Showroom",
    eyebrow: "Digunakan di bisnis nyata",
    description:
      "Aplikasi internal untuk membantu pengelolaan stok kendaraan, pelanggan, transaksi, dan pembayaran.",
    summary:
      "Aplikasi internal yang membantu operasional bisnis berjalan lebih terstruktur dan efisien. Sistem mencakup manajemen stok, transaksi penjualan dan pembelian, pembayaran pelanggan, serta pengelolaan berkas kendaraan.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS"],
    imageUrl: "/projects/autohub-dashboard.png",
    imageAlt: "Dashboard sistem manajemen showroom AutoHub",
    features: [
      "Manajemen stok kendaraan secara real-time",
      "Transaksi penjualan dan pembelian",
      "Pembayaran dan berkas pelanggan",
    ],
    accent: "ember",
  },
  {
    id: "business-dashboard",
    title: "Business Dashboard",
    eyebrow: "Solusi operasional terpusat",
    description:
      "Dashboard bisnis untuk membaca performa, mencatat aktivitas tim, dan merangkum data penting dalam satu tempat.",
    summary:
      "Dashboard yang menyatukan informasi operasional agar pemilik bisnis dapat mengambil keputusan dengan lebih cepat. Fokus utama proyek ini adalah keterbacaan data, alur kerja yang sederhana, dan pengalaman yang nyaman di berbagai perangkat.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/projects/ramadwipa-portfolio-home.png",
    imageAlt: "Halaman utama website portofolio Ramadwipa",
    features: [
      "Ringkasan performa dan aktivitas",
      "Tampilan responsif untuk seluruh perangkat",
      "Komponen antarmuka yang konsisten",
    ],
    accent: "violet",
  },
];
