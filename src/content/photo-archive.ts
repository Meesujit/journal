import fs from "node:fs";
import path from "node:path";
import { gallery } from "@/src/content/about";

type ArchiveCategory = "Camera Roll" | "Snapchat" | "Edited" | "Dated Shots";

export type GalleryPhoto = {
  slug: string;
  src: string;
  title: string;
  category: string;
  description: string;
  origin: "featured" | "archive";
  filename?: string;
};

const archiveDir = path.join(process.cwd(), "public", "about", "archive");
const validExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function titleFromFilename(filename: string) {
  const base = filename.replace(path.extname(filename), "");

  if (/^snapchat-/i.test(base)) {
    return `Snapchat Memory ${base.replace(/^snapchat-/i, "#")}`;
  }

  if (/^picsart_/i.test(base)) {
    return `Edited Frame ${base.replace(/^picsart_/i, "")}`;
  }

  if (/^img/i.test(base)) {
    return base.replace(/^img_?/i, "IMG ").replace(/_/g, " ");
  }

  return base.replace(/_/g, " ");
}

function categoryFromFilename(filename: string): ArchiveCategory {
  if (/^snapchat-/i.test(filename)) return "Snapchat";
  if (/^picsart_/i.test(filename)) return "Edited";
  if (/^\d{8}_\d{6}/.test(filename)) return "Dated Shots";
  return "Camera Roll";
}

function descriptionFromCategory(category: ArchiveCategory, filename: string) {
  const sourceLabel =
    category === "Snapchat"
      ? "snap memory"
      : category === "Edited"
        ? "edited frame"
        : category === "Dated Shots"
          ? "dated capture"
          : "camera roll photo";

  return `Imported from your photos folder as a ${sourceLabel}. Original file: ${filename}.`;
}

export function getArchivePhotos(): GalleryPhoto[] {
  if (!fs.existsSync(archiveDir)) {
    return [];
  }

  return fs
    .readdirSync(archiveDir)
    .filter((filename) => validExtensions.has(path.extname(filename).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => {
      const category = categoryFromFilename(filename);
      const base = filename.replace(path.extname(filename), "");

      return {
        slug: `archive-${base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`,
        src: `/about/archive/${filename}`,
        title: titleFromFilename(filename),
        category,
        description: descriptionFromCategory(category, filename),
        origin: "archive" as const,
        filename,
      };
    });
}

export function getFeaturedGalleryPhotos(): GalleryPhoto[] {
  return gallery.map((item) => ({
    ...item,
    origin: "featured" as const,
  }));
}

export function getAllGalleryPhotos(): GalleryPhoto[] {
  return [...getFeaturedGalleryPhotos(), ...getArchivePhotos()];
}

export function getGalleryPhotoBySlug(slug: string) {
  return getAllGalleryPhotos().find((item) => item.slug === slug);
}

export function getArchiveCategories() {
  return Array.from(new Set(getArchivePhotos().map((item) => item.category)));
}
