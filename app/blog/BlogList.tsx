"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-8">
      {posts.map((post, index) => (
        <motion.article 
          key={post.slug}
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ delay: index * 0.1 }}
          className="group relative"
        >
          <div className="relative rounded-[2rem] border border-zinc-100 bg-zinc-50/50 p-8 transition-all hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950/50 dark:hover:border-zinc-800 dark:hover:bg-zinc-950">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <time className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0 z-20 rounded-[2rem]" />
                    {post.title}
                  </Link>
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-2xl">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="hidden md:block">
                <div className="rounded-full border border-zinc-200 p-4 dark:border-zinc-800 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                  <ArrowRightIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
