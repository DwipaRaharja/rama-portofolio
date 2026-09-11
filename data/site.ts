export const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
] as const;

export const siteConfig = {
  name: "Ramadwipa",
  role: "Full Stack Developer",
  contactEmail: "ramadwipa168@gmail.com",
  whatsappNumber: "6287776744538",
  navigation: navigationItems,
} as const;
