import { CONTACT } from "@/src/common/footer";
import { projects, experience, stack } from "@/src/content/profile";

export default function Resume() {
  return (
    <main className="bg-background text-foreground print:bg-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div>
            <h1 className="font-serif text-4xl text-black dark:text-white">
              {CONTACT.name}
            </h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              Full Stack Developer
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-sm">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-blue-700 hover:underline dark:text-blue-400"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:underline dark:text-blue-400"
            >
              github.com/Meesujit
            </a>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl text-black dark:text-white">Experience</h2>
          <div className="mt-6 space-y-6">
            {experience.map((item) => (
              <div key={item.role} className="grid gap-1 sm:grid-cols-[170px_1fr]">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.period}</p>
                <div>
                  <h3 className="font-semibold text-black dark:text-white">
                    {item.role} <span className="font-normal text-zinc-500">· {item.company}</span>
                  </h3>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl text-black dark:text-white">Projects</h2>
          <div className="mt-6 space-y-5">
            {projects.map((project) => (
              <div key={project.title}>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-semibold text-black dark:text-white">{project.title}</h3>
                  <span className="text-xs uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                    {project.tag}
                  </span>
                </div>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">{project.description}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-400"
                >
                  {project.href.replace("https://", "")}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl text-black dark:text-white">Skills</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">{stack.join(" · ")}</p>
        </div>

        <p className="mt-12 text-sm text-zinc-400 print:hidden">
          Tip: use your browser&apos;s Print → Save as PDF to export this page.
        </p>
      </section>
    </main>
  );
}
