import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import { notFound } from "next/navigation";
import {
  ArrowLeft as ArrowLeftIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
} from "lucide-react";

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) notFound();

  const words = postData.contentHtml.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const readTime = Math.ceil(words / 200);

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white min-h-screen">
      <article className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32">

        {/* ── Back link ── */}
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Index
        </Link>

        {/* ── Header ── */}
        <header className="mb-16 space-y-8">
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {new Date(postData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              {readTime} min read
            </span>
          </div>
        </header>

        {/* ── Body ── */}
        <div
          className="
            blog-content
            prose prose-zinc dark:prose-invert max-w-none

            prose-headings:font-bold prose-headings:tracking-tight
            prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
            prose-headings:scroll-mt-24

            prose-h1:text-4xl prose-h1:sm:text-5xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-h4:text-xl  prose-h4:mt-8  prose-h4:mb-3

            prose-p:text-lg prose-p:leading-8
            prose-p:text-zinc-700 dark:prose-p:text-zinc-300

            prose-a:text-black dark:prose-a:text-white
            prose-a:font-semibold prose-a:underline prose-a:underline-offset-4
            prose-a:decoration-zinc-300 dark:prose-a:decoration-zinc-700
            hover:prose-a:decoration-black dark:hover:prose-a:decoration-white

            prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
            prose-strong:font-semibold

            prose-em:text-zinc-600 dark:prose-em:text-zinc-400

            prose-ul:my-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:space-y-2
            prose-li:text-lg prose-li:text-zinc-700 dark:prose-li:text-zinc-300
            prose-li:leading-7

            prose-blockquote:border-l-2 prose-blockquote:border-zinc-300
            dark:prose-blockquote:border-zinc-700
            prose-blockquote:pl-6 prose-blockquote:not-italic
            prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400

            prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 prose-hr:my-12

            prose-img:rounded-xl prose-img:border
            prose-img:border-zinc-200 dark:prose-img:border-zinc-800

            prose-code:font-mono prose-code:text-[0.88em]
            prose-code:text-zinc-900 dark:prose-code:text-zinc-100
            prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900
            prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
            prose-code:before:content-none prose-code:after:content-none
          "
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        {/* ── Footer ── */}
        <footer className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <img
                  src="/about/smile-cafe.jpg"
                  alt="Sujit"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Sujit Gouda</p>
                <p className="text-sm text-zinc-500">Web Developer & Designer</p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Get in touch
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}