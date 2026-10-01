import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="border-b border-zinc-200 py-6 dark:border-zinc-800"
        >
          <time className="text-sm text-zinc-500 dark:text-zinc-400">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h2 className="mt-2 font-serif text-2xl text-black dark:text-white">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="mt-2 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        </article>
      ))}
    </div>
  );
}
