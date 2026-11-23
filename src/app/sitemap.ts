import type { MetadataRoute } from "next";
import { PORTAL_PRESETS, SIZES } from "@/data/presets";
import { GUIDES } from "@/data/guides";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://pakcompress.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/guides", "/pricing", "/privacy", "/terms"];
  const sizePages = SIZES.flatMap((s) => [`/compress-image-to-${s}kb`, `/compress-pdf-to-${s}kb`]);
  const portalPages = PORTAL_PRESETS.map((p) => `/${p.slug}-photo-size`);
  const guidePages = GUIDES.map((g) => `/guides/${g.slug}`);
  const all = [...staticPages, ...sizePages, ...portalPages, ...guidePages];
  return all.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
