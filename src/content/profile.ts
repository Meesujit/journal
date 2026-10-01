export const projects = [
  {
    title: "EduCollege",
    tag: "ONGOING",
    description:
      "Lead-generation platform for university admissions counselling — university pages, lead-capture forms, chatbots, and CRM integration.",
    href: "https://educollege.in",
  },
  {
    title: "EduCollege HRMS",
    tag: "ONGOING",
    description:
      "Internal HR system — employee directory, attendance, leave, recruitment, onboarding/offboarding, and analytics, with role-based access and per-branch data isolation.",
    href: "https://hrms.educollege.in",
  },
  {
    title: "EduCollege CRM",
    tag: "ONGOING",
    description:
      "Self-hosted EspoCRM for the admissions pipeline, deployed via a fully automated Ansible pipeline — Docker, Traefik with Let's Encrypt, MariaDB, Redis, uptime monitoring, nightly backups, and GitHub Actions CI/CD on a Hostinger VPS behind Cloudflare.",
    href: "https://crm.educollege.in",
  },
  {
    title: "sitedoctor",
    tag: "SHIPPED",
    description:
      "Site-health CLI and web tool. Checks SEO, structured data, and sitemap issues, with CI gating and AI-assisted fix suggestions.",
    href: "https://github.com/Meesujit/sitedoctor",
  },
  {
    title: "utopia",
    tag: "SHIPPED",
    description:
      "Figma-to-code build for a bowling, gaming, and dining venue site. React, Tailwind, and a custom scroll/animation system.",
    href: "https://github.com/Meesujit/utopia",
  },
] as const;

export const experience = [
  {
    period: "Jul 2025 — Present",
    role: "Web Developer",
    company: "Eduplor India",
    description:
      "Building and maintaining EduCollege — university pages, lead forms, chatbots, and CRM integration.",
  },
  {
    period: "Nov 2025 — Present",
    role: "Freelance Full Stack Developer",
    company: "Independent Client Work",
    description: "Websites for small businesses using Next.js and Tailwind CSS.",
  },
  {
    period: "Aug 2024 — Mar 2025",
    role: "SDE Intern",
    company: "Noisiv Consulting",
    description: "Internal tools built with React and Vite.",
  },
] as const;

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Cloudflare",
  "MongoDB",
  "Docker",
] as const;
