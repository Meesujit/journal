import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllGalleryPhotos,
  getGalleryPhotoBySlug,
} from "@/src/content/photo-archive";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllGalleryPhotos().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getGalleryPhotoBySlug(slug);

  if (!item) {
    return {
      title: "Photo Not Found",
    };
  }

  return {
    title: `${item.title} | Gallery`,
    description: item.description,
  };
}

export default async function GalleryItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getGalleryPhotoBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedItems = getAllGalleryPhotos()
    .filter((entry) => entry.category === item.category && entry.slug !== item.slug)
    .slice(0, 3);

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/about/gallery"
            className="inline-flex items-center text-sm font-medium text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Back to Gallery
          </Link>
          <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            {item.category}
          </span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            <Image
              src={item.src}
              alt={item.title}
              width={1600}
              height={2000}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {item.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {item.description}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-zinc-200 p-6 dark:border-zinc-800">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Why it is here
              </p>
              <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
                This image is part of your personal archive, where photos are
                treated like memory markers instead of just uploads. Each one
                can carry people, mood, place, or progress. Source:{" "}
                {item.origin === "featured" ? "featured gallery" : "full imported archive"}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {relatedItems.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-8 pb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">More from {item.category}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedItems.map((related) => (
              <Link
                key={related.slug}
                href={`/about/gallery/${related.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={related.src}
                    alt={related.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-xl font-semibold">{related.title}</h3>
                  <p className="leading-7 text-zinc-700 dark:text-zinc-300">
                    {related.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
