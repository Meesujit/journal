import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  breakthroughPosts,
  getBreakthroughPost,
} from "@/src/content/about";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return breakthroughPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBreakthroughPost(slug);

  if (!post) {
    return {
      title: "Note Not Found",
    };
  }

  return {
    title: `${post.title} | Sujit's About`,
    description: post.excerpt,
  };
}

export default async function AboutPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBreakthroughPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/about"
          className="inline-flex items-center text-sm font-medium text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          Back to About
        </Link>

        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              {post.category}
            </span>
            <span className="text-sm text-zinc-500">{post.publishedLabel}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-xl leading-8 text-zinc-600 dark:text-zinc-400">
              {post.excerpt}
            </p>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1600}
            height={1000}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
          {post.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
