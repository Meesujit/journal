import Link from "next/link";
import { GalleryBrowser } from "@/src/components/gallery/gallery-browser";
import { readingList } from "@/src/content/about";
import {
  getArchiveCategories,
  getArchivePhotos,
  getFeaturedGalleryPhotos,
} from "@/src/content/photo-archive";

export default function GalleryPage() {
  const featuredPhotos = getFeaturedGalleryPhotos();
  const archivePhotos = getArchivePhotos();
  const archiveCategories = getArchiveCategories();

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Link
          href="/about"
          className="inline-flex items-center text-sm font-medium text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          Back to About
        </Link>

        <div className="mt-8 max-w-4xl space-y-5">
          <div className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-1 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            Gallery Archive
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Photos, books, and interactive moments
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This page now separates the visual archive from the reading shelf
            and gives your imported photo collection its own place instead of
            hiding it behind a few cards.
          </p>
        </div>

        <div className="mt-12">
          <GalleryBrowser
            featuredPhotos={featuredPhotos}
            archivePhotos={archivePhotos}
            archiveCategories={archiveCategories}
            books={[...readingList]}
          />
        </div>
      </section>
    </main>
  );
}
