import {
  contact,
  skills,
  resumeExperience,
  resumeProjects,
  sideProjects,
  education,
} from "@/src/content/resume";

export default function Resume() {
  return (
    <main className="bg-background text-foreground print:bg-white">
      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Resume
        </p>
        <h1 className="mt-5 font-serif text-5xl text-black dark:text-white">Resume</h1>

        <a
          href="/resume.pdf"
          download
          className="mt-5 inline-block text-sm font-medium text-blue-700 hover:underline dark:text-blue-400 print:hidden"
        >
          Download PDF
        </a>

        <div className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-serif text-2xl text-black dark:text-white">{contact.name}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {contact.location} · {contact.phone} · {contact.email}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {contact.github} · {contact.linkedin}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-black dark:text-white">
              Skills
            </h3>
            <div className="mt-4 space-y-2">
              {skills.map((s) => (
                <p key={s.label} className="leading-7 text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-black dark:text-white">{s.label}:</span>{" "}
                  {s.value}
                </p>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-black dark:text-white">
              Experience
            </h3>
            <div className="mt-4 space-y-6">
              {resumeExperience.map((job) => (
                <div key={job.role + job.period}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-semibold text-black dark:text-white">
                      {job.role}
                      {job.company && `, ${job.company}`}, {job.location}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.period}</p>
                  </div>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    {job.bullets.map((b) => (
                      <li key={b} className="leading-6 text-zinc-700 dark:text-zinc-300">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-black dark:text-white">
              Projects
            </h3>
            <div className="mt-4 space-y-6">
              {resumeProjects.map((p) => (
                <div key={p.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-semibold text-black dark:text-white">{p.title}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{p.tech}</p>
                  </div>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    {p.bullets.map((b) => (
                      <li key={b} className="leading-6 text-zinc-700 dark:text-zinc-300">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Side Projects */}
          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-black dark:text-white">
              Side Projects
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {sideProjects.map((p) => (
                <li key={p.title} className="leading-6 text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-black dark:text-white">{p.title}</span>
                  {p.period && ` (${p.period})`}: {p.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-black dark:text-white">
              Education
            </h3>
            <div className="mt-4 space-y-2">
              {education.map((e) => (
                <div key={e.degree} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold text-black dark:text-white">{e.degree}</span>, {e.school}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{e.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
