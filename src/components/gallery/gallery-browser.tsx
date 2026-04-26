"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ImageTrail } from "@/src/components/gallery/image-trail";
import type { GalleryPhoto } from "@/src/content/photo-archive";

type ReadingBook = {
  title: string;
  author: string;
  status: string;
  note: string;
  accent: string;
};

type GalleryBrowserProps = {
  featuredPhotos: GalleryPhoto[];
  archivePhotos: GalleryPhoto[];
  archiveCategories: string[];
  books: ReadingBook[];
};

type TabKey = "photos" | "books" | "trail";

export function GalleryBrowser({
  featuredPhotos,
  archivePhotos,
  archiveCategories,
  books,
}: GalleryBrowserProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("photos");
  const [activeArchiveCategory, setActiveArchiveCategory] = useState("All");

  const filteredArchivePhotos = useMemo(() => {
    if (activeArchiveCategory === "All") {
      return archivePhotos;
    }

    return archivePhotos.filter((photo) => photo.category === activeArchiveCategory);
  }, [activeArchiveCategory, archivePhotos]);

  const trailImages = useMemo(
    () =>
      [...featuredPhotos.slice(0, 6), ...archivePhotos.slice(0, 10)]
        .map((item) => item.src)
        .filter(Boolean),
    [archivePhotos, featuredPhotos]
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {([
          ["photos", "Photos"],
          ["books", "Books"],
          ["trail", "Image Trail"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeTab === key
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "photos" ? (
        <div className="space-y-14">
          <section className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Featured
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  Curated story gallery
                </h2>
              </div>
              <p className="text-sm text-zinc-500">
                {featuredPhotos.length} highlighted memories
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredPhotos.map((item) => (
                <Link
                  key={item.slug}
                  href={`/about/gallery/${item.slug}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:bg-zinc-950"
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
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Archive
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  Full imported photo library
                </h2>
              </div>
              <p className="text-sm text-zinc-500">
                {archivePhotos.length} imported photos from `E:\photos`
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["All", ...archiveCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveArchiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeArchiveCategory === category
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredArchivePhotos.map((item) => (
                <Link
                  key={item.slug}
                  href={`/about/gallery/${item.slug}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1536px) 33vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <span className="rounded-full border border-zinc-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                      {item.category}
                    </span>
                    <h3 className="line-clamp-2 text-sm font-semibold">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === "books" ? (
        <section className="space-y-8">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Books
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Reading shelf
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              A separate space for what you have completed and what you are
              reading now, without mixing it into the photo archive.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {books.map((book) => (
              <article
                key={book.title}
                className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div
                  className={`h-40 bg-gradient-to-br ${book.accent} dark:opacity-80`}
                />
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                      {book.status}
                    </span>
                    <span className="text-sm text-zinc-500">{book.author}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{book.title}</h3>
                  <p className="leading-7 text-zinc-700 dark:text-zinc-300">
                    {book.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "trail" ? <ImageTrail images={trailImages} /> : null}
    </div>
  );
}
