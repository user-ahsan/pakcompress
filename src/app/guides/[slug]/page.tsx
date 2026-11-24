import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GUIDES, getGuide } from "@/data/guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return { title: "Guide not found | PakCompress" };
  return { title: `${g.title} | PakCompress`, description: g.description, alternates: { canonical: `/guides/${g.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-pak">
        <ArrowLeft className="h-4 w-4" />
        All guides
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{g.title}</h1>
      <p className="mt-2 text-sm text-slate-500">Updated {g.updated}</p>
      {g.body.map((para, i) => (
        <p key={i} className="mt-4 leading-relaxed text-slate-800">{para}</p>
      ))}
      <div className="mt-8 rounded-xl bg-pak-light p-4">
        <p className="font-bold">Try the tool</p>
        <p className="text-sm">Use the compressor on the <Link href="/" className="font-semibold text-pak">home page</Link> to hit the exact KB target in this guide.</p>
      </div>
      <p className="mt-6 text-xs text-slate-500">Limits in this guide are typical limits, not official rules. Always check the official advertisement, because requirements change.</p>
    </article>
  );
}
