"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/blog-list");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeUp}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 mb-8">
            Notes & Writing
          </div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl mb-8">
            Ink and <span className="special-gothic text-zinc-400 dark:text-zinc-500">Systems.</span>
          </h1>
          <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            A collection of thoughts on software, design philosophy, and the 
            smaller details of building digital products.
          </p>
        </motion.div>

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
      </section>
    </main>
  );
}
