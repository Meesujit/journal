import { getSortedPostsData } from "@/lib/blog";
import BlogList from "./BlogList";

export default async function BlogPage() {
  const posts = await getSortedPostsData();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Notes & Writing
        </p>
        <h1 className="mt-5 font-serif text-5xl text-black dark:text-white">Blog</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Notes on software, debugging, and building things.
        </p>

        <BlogList posts={posts} />
      </section>
    </main>
  );
}
