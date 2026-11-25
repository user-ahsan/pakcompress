import { PORTAL_PRESETS, SIZES } from "./presets";

export const FILE_TYPES = ["photo", "signature", "cnic", "pdf", "jpg", "png", "image", "document"];
export const INTENTS = ["compress", "resize", "reduce", "make passport photo"];

export function queryMath(): { sizes: number; fileTypes: number; portals: number; intents: number; total: number } {
  const sizes = SIZES.length;
  const fileTypes = FILE_TYPES.length;
  const portals = PORTAL_PRESETS.length;
  const intents = INTENTS.length;
  return { sizes, fileTypes, portals, intents, total: sizes * fileTypes * portals * intents };
}

export const TOP_PAGES = [
  ...SIZES.map((s) => ({ path: `/compress-image-to-${s}kb`, title: `Compress image to ${s}KB online free` })),
  ...SIZES.map((s) => ({ path: `/compress-pdf-to-${s}kb`, title: `Compress PDF to ${s}KB online free` })),
  ...PORTAL_PRESETS.map((p) => ({ path: `/${p.slug}-photo-size`, title: `${p.name} photo size and KB limit` }))
];

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pakcompress.vercel.app";
