// src/lib/content.ts
import type { Site, Service, GalleryItem } from "./types";

import siteJson     from "@/content/site.json";
import servicesJson from "@/content/services.json";
import galleryJson  from "@/content/gallery.json";

// Helper para leer strings de objetos desconocidos sin usar `any`
function pickStr(obj: unknown, key: string): string | undefined {
  if (typeof obj !== "object" || obj === null) return undefined;
  const val = (obj as Record<string, unknown>)[key];
  return typeof val === "string" ? val : undefined;
}

// === Normalizador de servicios ===
function normalizeServices(input: unknown): Service[] {
  const arr: unknown[] = Array.isArray(input) ? input : [];

  return arr
    .map((r, idx): Service => {
      const image = pickStr(r, "image") ?? pickStr(r, "src") ?? "";
      const title = pickStr(r, "title") ?? pickStr(r, "alt") ?? "Servicio";
      const desc  = pickStr(r, "desc") ?? pickStr(r, "description") ?? "";
      const price = pickStr(r, "price") ?? "";
      const id    = pickStr(r, "id") ?? String(idx);
      return { id, title, desc, price, image };
    })
    .filter((s) => s.image); // sólo los que tienen imagen válida
}

// === Normalizador de galería ===
function normalizeGallery(input: unknown): GalleryItem[] {
  const arr: unknown[] = Array.isArray(input) ? input : [];

  return arr
    .map((g): GalleryItem => ({
      src: pickStr(g, "src") ?? "",
      alt: pickStr(g, "alt") ?? undefined,
    }))
    .filter((g) => g.src);
}

export async function getSite(): Promise<Site> {
  return siteJson as Site;
}

export async function getServices(): Promise<Service[]> {
  return normalizeServices(servicesJson);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return normalizeGallery(galleryJson);
}
