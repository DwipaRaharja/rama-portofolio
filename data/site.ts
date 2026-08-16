export const navigationItems = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang Saya", href: "#about" },
  { label: "Portofolio", href: "#portfolio" },
] as const;

export const siteConfig = {
  name: "Ramadwipa",
  role: "Full Stack Developer",
  contactEmail: "ramadwipa168@gmail.com",
  whatsappNumber: "6287776744538",
  navigation: navigationItems,
} as const;
