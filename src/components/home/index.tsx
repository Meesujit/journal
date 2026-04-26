"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";

const featuredProjects = [
  {
    title: "Compare Shiksha",
    summary:
      "Education platform built to help students compare institutions through structured information and cleaner decision-making.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Cloudflare"],
    href: "https://compareshiksha.com",
  },
  {
    title: "Mentozo",
    summary:
      "Course platform focused on enrollment, access, and student-facing product experience.",
    tech: ["Next.js", "React", "Cloudflare"],
    href: "https://mentozo.com",
  },
  {
    title: "Filter Film Studio",
    summary:
      "Visual-first freelance site with a cinematic feel and a cleaner presentation of services and portfolio.",
    tech: ["Next.js", "Framer Motion", "Vercel"],
    href: "https://filter-film-wedding.vercel.app",
  },
  {
    title: "Cheese Corner Cafe",
    summary:
      "Warm, responsive cafe website designed around brand feel, clarity, and a stronger browsing flow.",
    tech: ["Next.js", "Tailwind", "Cloudflare"],
    href: "https://cheese-corner.pages.dev",
  },
] as const;

const experience = [
  {
    period: "Nov 2025 - Present",
    role: "Freelance Full Stack Developer",
    company: "Independent Client Work",
  },
  {
    period: "Jul 2025 - Present",
    role: "Web Developer",
    company: "Eduplor India",
  },
  {
    period: "Aug 2024 - Mar 2025",
    role: "SDE Intern",
    company: "Noisiv Consulting",
  },
] as const;

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Supabase",
  "MongoDB",
  "Cloudflare",
  "Vercel",
  "Docker",
  "Google Cloud",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function HomePage() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section
        id="home"
        className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28"
      >
        <motion.div {...fadeUp} className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            Sujit Gouda · Web Developer
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Clean interfaces,
              <span className="block special-gothic text-zinc-500 dark:text-zinc-400">
                stronger frontend systems,
              </span>
              and work that feels intentional.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              I build websites and product surfaces with an eye for clarity,
              rhythm, and presentation. I like layouts that feel calm on first
              look and sharp on second look.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              About and gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              Featured work
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Focus", "Frontend and product UI"],
              ["Style", "Clean with subtle motion"],
              ["Open to", "Freelance and collaboration"],
            ].map(([label, value], index) => (
              <motion.div
                key={label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  {label}
                </p>
                <p className="mt-3 text-base font-medium">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="grid gap-4"
        >
          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <Image
              src="/about/smile-cafe.jpg"
              alt="Sujit Gouda"
              width={900}
              height={1100}
              priority
              className="h-[28rem] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Current direction
              </p>
              <p className="mt-3 text-lg font-medium">
                Better visual systems for portfolios, product pages, and client
                websites.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                What changed
              </p>
              <p className="mt-3 text-lg font-medium">
                This portfolio now mixes work, writing, books, and personal
                archive in one system.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
          {[
            "I prefer layouts with space, hierarchy, and strong type over noisy surfaces.",
            "The goal is not just animation. The goal is motion that gives the page better rhythm.",
            "Everything here is being shaped into a cleaner portfolio with more personality and more depth.",
          ].map((line, index) => (
            <motion.p
              key={line}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.04 }}
              className="text-base leading-7 text-zinc-600 dark:text-zinc-400"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Featured Work
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected projects with a cleaner presentation.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.06 }}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[1.75rem] border border-zinc-200 p-7 transition hover:border-black dark:border-zinc-800 dark:hover:border-white"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <ExternalLink className="h-5 w-5 text-zinc-400 transition group-hover:text-black dark:group-hover:text-white" />
              </div>

              <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div {...fadeUp} className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Experience
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              A quieter layout, but still enough depth to feel complete.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              I wanted this homepage to stay minimal while still saying enough
              about where I have worked and what kind of work I do.
            </p>
          </motion.div>

          <div className="space-y-5">
            {experience.map((item, index) => (
              <motion.div
                key={item.role}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                className="grid gap-4 rounded-[1.75rem] border border-zinc-200 p-6 sm:grid-cols-[180px_1fr] dark:border-zinc-800"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  {item.period}
                </p>
                <div>
                  <h3 className="text-2xl font-semibold">{item.role}</h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {item.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech-stack" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div {...fadeUp} className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Stack
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Tools I return to often.
          </h2>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((item, index) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.03 }}
              className="rounded-[1.35rem] border border-zinc-200 px-5 py-4 text-sm font-medium dark:border-zinc-800"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
        <motion.div
          {...fadeUp}
          className="rounded-[2rem] border border-zinc-200 px-8 py-10 dark:border-zinc-800"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                Contact
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Open to building something sharp and useful.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Freelance builds, redesigns, and frontend-heavy collaboration
                are all welcome. If the work needs taste and care, I&apos;m interested.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <a
                href="mailto:sujit.gda997@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>
              <Link
                href="/about/gallery"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                View gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
