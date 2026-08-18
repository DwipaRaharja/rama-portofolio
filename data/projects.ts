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
    outcomes: [
      "Data stok, transaksi, pembayaran, dan berkas terpusat dalam satu aplikasi",
      "Informasi operasional lebih terstruktur dan mudah diperiksa",
      "Alur administrasi showroom menjadi lebih ringkas",
    ],
    repositoryUrl: "https://github.com/DwipaRaharja/app_autoHub.git",
    accent: "ember",
  },
  {
    id: "ramadwipa-portfolio",
    title: "Website Portofolio",
    eyebrow: "Personal branding digital",
    description:
      "Website portofolio interaktif untuk memperkenalkan profil, kemampuan, dan project yang telah saya bangun.",
    summary:
      "Website personal yang dirancang untuk menampilkan profil dan perjalanan saya sebagai Full Stack Developer. Dibangun dengan tampilan monokrom yang konsisten, navigasi yang responsif, serta animasi interaktif untuk menghadirkan pengalaman yang menarik di berbagai perangkat.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: "/projects/ramadwipa-portfolio-home.png",
    imageAlt: "Halaman utama website portofolio Ramadwipa",
    features: [
      "Profil, kemampuan, dan showcase project",
      "Animasi scroll interaktif dan responsif",
      "Form kontak dan integrasi media sosial",
    ],
    outcomes: [
      "Profil, kemampuan, project, dan kontak dirangkum dalam satu website",
      "Identitas personal tampil konsisten di desktop dan mobile",
      "Calon klien dapat melihat karya dan menghubungi saya dengan lebih mudah",
    ],
    demoUrl: "/",
    repositoryUrl: "https://github.com/DwipaRaharja/rama-portofolio.git",
    accent: "violet",
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
