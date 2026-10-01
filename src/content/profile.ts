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
    role: "Software Engineer",
    company: "Eduplor India",
    description:
      "Building and maintaining EduCollege, EduCollege HRMS, and a self-hosted EspoCRM — lead-capture flows, internal systems, and CI/CD.",
  },
  {
    period: "Sep 2025 — Present",
    role: "Freelance Full Stack Developer",
    company: "Independent Client Work",
    description:
      "10+ client applications across real estate, hospitality, legal, and creative sectors, end to end.",
  },
  {
    period: "Aug 2024 — May 2025",
    role: "Software Engineer Intern",
    company: "Noisiv Consulting",
    description: "Built a React training platform and internal tooling on a Swagger-documented REST API.",
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
