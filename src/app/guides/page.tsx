import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides - Photo and PDF size for Pakistan forms | PakCompress",
  description: "Practical guides to compress a photo or PDF to 20 KB, 50 KB, 100 KB or 200 KB for FPSC, PPSC, NTS, NADRA, HEC and university forms in Pakistan.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides - Photo and PDF size for Pakistan forms",
    description: "Plain guides with real numbers for Pakistan forms. Photo and PDF sizes, formats, and the checks to run before you submit.",
    type: "website"
  }
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-pak">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Guides</h1>
      <p className="mt-3 text-slate-700">Plain guides with real numbers for Pakistan forms. No jargon. Each guide tells you the size, the format, and the checks to run before you submit.</p>
      <div className="mt-6 grid gap-4">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-pak hover:shadow-sm"
          >
            <h2 className="font-display text-base font-bold text-ink">{g.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            <p className="mt-2 text-xs text-slate-500">Updated {g.updated}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
