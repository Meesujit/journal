import Link from "next/link";
import { projects, experience, stack } from "@/src/content/profile";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Full Stack Developer
        </p>

        <h1 className="mt-5 font-serif text-5xl leading-tight text-black sm:text-6xl dark:text-white">
          I build clean,{" "}
          <span className="italic text-blue-700 dark:text-blue-400">
            reliable
          </span>{" "}
          web products.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          I work mainly with Next.js, React, and TypeScript — building and
          maintaining production websites, lead-generation platforms, and
          client sites, plus independent projects on the side.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <a
            href="mailto:sujit.gda997@gmail.com"
            className="text-blue-700 hover:underline dark:text-blue-400"
          >
            Email
          </a>
          <a
            href="https://github.com/Meesujit"
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 hover:underline dark:text-blue-400"
          >
            GitHub
          </a>
          <Link href="/about" className="text-blue-700 hover:underline dark:text-blue-400">
            About
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-3xl border-t border-zinc-200 px-6 py-16 dark:border-zinc-800">
        <h2 className="font-serif text-3xl text-black dark:text-white">Projects</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          A few things I&apos;ve built and shipped recently.
        </p>

        <div className="mt-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="border-b border-zinc-200 py-6 first:pt-0 last:border-0 dark:border-zinc-800"
            >
              <div className="flex items-baseline gap-3">
                <h3 className="font-serif text-xl text-black dark:text-white">
                  {project.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                  {project.tag}
                </span>
              </div>
              <p className="mt-2 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
              >
                Visit →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="about" className="mx-auto max-w-3xl border-t border-zinc-200 px-6 py-16 dark:border-zinc-800">
        <h2 className="font-serif text-3xl text-black dark:text-white">Experience</h2>

        <div className="mt-10">
          {experience.map((item) => (
            <div
              key={item.role}
              className="grid gap-1 border-b border-zinc-200 py-6 first:pt-0 last:border-0 sm:grid-cols-[200px_1fr] dark:border-zinc-800"
            >
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.period}</p>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {item.role} <span className="font-normal text-zinc-500">· {item.company}</span>
                </h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section id="tech-stack" className="mx-auto max-w-3xl border-t border-zinc-200 px-6 py-16 dark:border-zinc-800">
        <h2 className="font-serif text-3xl text-black dark:text-white">Stack</h2>
        <p className="mt-4 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
          {stack.join(" · ")}
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl border-t border-zinc-200 px-6 py-16 dark:border-zinc-800">
        <h2 className="font-serif text-3xl text-black dark:text-white">Contact</h2>
        <p className="mt-4 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
          Freelance builds, redesigns, and frontend-heavy collaboration are
          welcome. Reach out if the work needs care.
        </p>
        <a
          href="mailto:sujit.gda997@gmail.com"
          className="mt-4 inline-block text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
        >
          sujit.gda997@gmail.com
        </a>
      </section>
    </main>
  );
}
