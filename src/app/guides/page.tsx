import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides - Photo and PDF size for Pakistan forms | PakCompress",
  description: "Practical guides to compress a photo or PDF to 20 KB, 50 KB, 100 KB or 200 KB for FPSC, PPSC, NTS, NADRA, HEC and university forms in Pakistan."
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Guides</h1>
      <p className="mt-3 text-slate-700">Plain guides with real numbers for Pakistan forms. No jargon. Each guide tells you the size, the format, and the checks to run before you submit.</p>
      <div className="mt-6 grid gap-4">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border p-4 hover:border-pak">
            <p className="font-bold">{g.title}</p>
            <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            <p className="mt-2 text-xs text-slate-500">Updated {g.updated}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
