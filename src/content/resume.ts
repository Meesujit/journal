export const contact = {
  name: "Sujit Kumar Gouda",
  location: "Brahmapur, Odisha, India",
  phone: "+91 6372567836",
  email: "sujit.gda997@gmail.com",
  github: "github.com/Meesujit",
  linkedin: "linkedin.com/in/mesujit",
} as const;

export const skills = [
  {
    label: "Languages",
    value: "JavaScript (ES6+), TypeScript, Java, SQL, HTML5, CSS3, Bash",
  },
  {
    label: "Frontend",
    value:
      "React.js, Next.js, TailwindCSS, Material-UI, Shadcn/ui, Styled Components, SSR/SSG",
  },
  {
    label: "Backend and Databases",
    value:
      "Node.js, Express.js, Hono, REST APIs, Supabase, PostgreSQL, MongoDB, MariaDB, Redis, Drizzle ORM",
  },
  {
    label: "Cloud and DevOps",
    value:
      "Docker, Traefik, Nginx, Let's Encrypt, Cloudflare (Workers, D1, DNS), Vercel, Google Cloud, Firebase, GitHub Actions, CI/CD, Linux",
  },
  {
    label: "Tools",
    value:
      "Git, Postman, Zod, React Query, TanStack Table, Zustand, Generative AI API integration, prompt engineering",
  },
] as const;

export const resumeExperience = [
  {
    role: "Software Engineer",
    company: "Eduplor India",
    location: "Remote",
    period: "July 2025 to Present",
    bullets: [
      "Raised delivery speed by 80% by adding GitHub Actions checks with linting and test gates that cut review cycles.",
      "Contributed to 100+ qualified student leads by redesigning the lead-capture flow and running integration tests across A/B-tested versions.",
      "Improved content delivery reliability and page load time by building React.js and Next.js modules on REST APIs in an n-tiered architecture.",
      "Built and now maintain two internal systems used by the company, a self-hosted EspoCRM and a custom HRMS (see Projects).",
    ],
  },
  {
    role: "Full-Stack Developer (Freelance)",
    company: "",
    location: "Remote",
    period: "September 2025 to Present",
    bullets: [
      "Delivered 10+ client applications in real estate, hospitality, legal and creative sectors by owning the full cycle, from requirements and test planning to production deployment.",
      "Lifted client operational efficiency by up to 15% by tuning 5+ sites for Core Web Vitals and SEO.",
      "Kept frontends fast and crawlable by using Next.js SSR with Cloudflare Pages edge caching.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Noisiv Consulting",
    location: "Remote",
    period: "August 2024 to May 2025",
    bullets: [
      "Cut trainer onboarding time by 70% by building WOSH, a React (Vite, MUI Joy) training platform on a Swagger-documented REST API, with unit tests planned and run.",
      "Removed manual document assembly from client reporting by building a PDF generator that fills in data through tagged variables.",
      "Kept production stable across 3 contributors by owning the GitHub Actions pipeline, including linting, test gates and branch protection.",
    ],
  },
] as const;

export const resumeProjects = [
  {
    title: "EduCollege HRMS",
    tech: "Next.js, TypeScript, Drizzle ORM, PostgreSQL, Docker, Traefik",
    bullets: [
      "Replaced scattered HR work with one live system covering 7 modules (employees, attendance, leave, recruitment, onboarding and offboarding, expenses, analytics) by building it end to end on the Next.js App Router.",
      "Kept each branch's data private across 3 roles (super admin, HR admin, employee) by re-checking permissions server-side on every page, action and export, and showing nothing to an admin with no branch.",
      "Removed stored passwords by building email one-time-code login, with hashed 6-digit codes that expire in 10 minutes and lock after 5 wrong tries.",
      "Made admin actions traceable with an audit log of sign-ins, employee edits, leave decisions and expense changes, and shipped it in Docker behind Traefik with Let's Encrypt HTTPS.",
    ],
  },
  {
    title: "Self-Hosted CRM (EspoCRM)",
    tech: "Docker, Traefik v3, Cloudflare, MariaDB, Redis, Uptime Kuma",
    bullets: [
      "Ended recurring SaaS licence costs and third-party data exposure by self-hosting EspoCRM with MariaDB and Redis, now in daily use for sales and customer operations.",
      "Secured public access with Traefik v3 and auto-renewing Let's Encrypt certificates through a Cloudflare DNS-01 challenge, so port 80 stays closed.",
      "Kept uptime visible by running Uptime Kuma next to the CRM and putting Cloudflare in front for traffic filtering.",
    ],
  },
] as const;

export const sideProjects = [
  {
    title: "Home Lab Server",
    period: "Jan 2026 to Present",
    description:
      "Practising DevOps on a local Linux server with Docker, Nginx reverse proxies, DNS and network setup.",
  },
  {
    title: "Alumni Portal for a B.Sc. college",
    period: "Mar 2026 to Present",
    description:
      "Building an alumni directory and events platform, gathering requirements from college staff and self-hosting it on the college's server.",
  },
  {
    title: "Technical Blog",
    period: "",
    description:
      "Wrote about building a live, draggable 3D graph of my GitHub activity with the GitHub REST API.",
  },
] as const;

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    period: "2023 to 2025",
  },
  {
    degree: "Bachelor of Computer Science",
    school: "Brahmapur University, Ganjam, Odisha",
    period: "2020 to 2023",
  },
] as const;
