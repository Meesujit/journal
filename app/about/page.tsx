import Image from "next/image";

export default function About() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            About
          </p>

          <div className="space-y-5">
            <h1 className="font-serif text-5xl text-black sm:text-6xl dark:text-white">
              Sujit Gouda
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              Full-stack developer working mainly with Next.js, React, and
              TypeScript. I build and maintain production websites — lead
              generation platforms, admin dashboards, and client sites — and
              ship personal projects on the side.
            </p>

            <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              Currently building out EduCollege, a lead-generation platform
              for university admissions counselling, and shipping independent
              tools and side projects under dev-dozo.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Focus
              </p>
              <p className="mt-3 text-lg font-semibold">
                Frontend systems, product UI, full-stack web apps
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Stack
              </p>
              <p className="mt-3 text-lg font-semibold">
                Next.js, React, TypeScript, Tailwind, Cloudflare
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Image
            src="/about/smile-cafe.jpg"
            alt="Portrait of Sujit Gouda"
            width={900}
            height={1200}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
