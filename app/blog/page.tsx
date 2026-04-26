import { getSortedPostsData } from "@/lib/blog";
import BlogList from "./BlogList";
import * as motion from "framer-motion/client";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default async function BlogPage() {
  const posts = await getSortedPostsData();

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

        <BlogList posts={posts} />
      </section>
    </main>
  );
}
