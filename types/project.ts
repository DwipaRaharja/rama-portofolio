export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  summary: string;
  technologies: string[];
  features: string[];
  accent: "ember" | "violet";
  imageUrl?: string;
  imageAlt?: string;
  repositoryUrl?: string;
};
