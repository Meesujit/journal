import Image from "next/image";
import Link from "next/link";
import {
  breakthroughPosts,
  gallery,
  readingList,
} from "@/src/content/about";

export default function About() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-1 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            About Sujit
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Developer, observer, and someone trying to build a meaningful
              life one season at a time.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              I am Sujit Gouda, a web developer who enjoys building clean,
              useful products and documenting the moments that shape me. Tech
              gives me the joy of solving problems. Life outside tech gives me
              perspective, stories, and balance.
            </p>

            <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              This page is my personal archive. It holds the books that are
              changing how I think, photos that feel like memory anchors, and
              breakthrough notes about the shifts that made me stronger in work
              and in life.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Focus
              </p>
              <p className="mt-3 text-lg font-semibold">
                Frontend, product UI, and thoughtful web experiences
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Reading
              </p>
              <p className="mt-3 text-lg font-semibold">
                Fiction for imagination, science fiction for discipline and
                curiosity
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Personal Note
              </p>
              <p className="mt-3 text-lg font-semibold">
                I want this portfolio to feel human, not just professional
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-zinc-200 via-zinc-100 to-white blur-3xl dark:from-zinc-800 dark:via-zinc-900 dark:to-black" />
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 p-3 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:bg-zinc-950">
            <Image
              src="/about/smile-cafe.jpg"
              alt="Portrait of Sujit Gouda"
              width={900}
              height={1200}
              priority
              className="h-auto w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Reading Shelf
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Books are becoming part of how I grow. They help me think with more
            patience, imagination, and depth.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {readingList.map((book) => (
            <article
              key={book.title}
              className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="relative aspect-auto h-80">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="h-12"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                    {book.status}
                  </span>
                  <span className="text-sm text-zinc-500">{book.author}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">{book.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">
                    {book.note}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Gallery and Experiences
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A visual archive of moments that mattered to me. Some are personal,
            some are technical, and some just hold a mood I did not want to
            lose.
          </p>
          <Link
            href="/about/gallery"
            className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400"
          >
            Open full gallery
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gallery.map((item, index) => (
            <Link
              key={item.slug}
              href={`/about/gallery/${item.slug}`}
              className={`group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:bg-zinc-950 ${
                index === 0 ? "md:col-span-2 xl:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-3 p-6">
                <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="leading-7 text-zinc-700 dark:text-zinc-300">
                  {item.description}
                </p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  View full photo
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Breakthrough Journal
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            These are no longer summary cards. Each one opens into a full note
            about a real shift in how I think, work, and move through life.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {breakthroughPosts.map((entry) => (
            <Link
              key={entry.slug}
              href={`/about/${entry.slug}`}
              className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                {entry.category}
              </span>
              <h3 className="mt-5 text-2xl font-semibold">{entry.title}</h3>
              <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
                {entry.excerpt}
              </p>
              <p className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400">
                Read full note
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
