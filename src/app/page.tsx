import type { Metadata } from "next";
import Link from "next/link";
import { Compressor } from "@/components/Compressor";
import { PdfCompressor } from "@/components/PdfCompressor";
import { PassportMaker } from "@/components/PassportMaker";
import { PORTAL_PRESETS } from "@/data/presets";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "Compress Photo and PDF to Exact KB - Free, No Upload | PakCompress",
  description: "Compress a photo to 20 KB, 50 KB, 100 KB or 200 KB for FPSC, PPSC, NTS, NADRA, HEC and university forms in Pakistan. Works in your browser. No upload.",
  alternates: { canonical: "/" }
};

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is my photo uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. Compression runs in your browser. Your file never leaves your device." } },
      { "@type": "Question", name: "What size should I use for FPSC?", acceptedAnswer: { "@type": "Answer", text: "FPSC forms often ask for a photo under 50 KB. Always check the official advertisement for the post you want." } },
      { "@type": "Question", name: "Can a PDF be compressed to 100 KB?", acceptedAnswer: { "@type": "Answer", text: "At times yes. Text-only PDFs often cannot shrink much. The tool tells you plainly when it cannot reach the target." } }
    ]
  };
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PakCompress",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" }
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">Compress photo and PDF to exact KB for Pakistan forms</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-700">Free, fast, and private. Pick 20 KB, 50 KB, 100 KB or 200 KB. Your file never leaves your browser.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white px-3 py-1 border">No upload</span>
            <span className="rounded-full bg-white px-3 py-1 border">Free - 1 file</span>
            <span className="rounded-full bg-white px-3 py-1 border">Works on mobile</span>
            <span className="rounded-full bg-white px-3 py-1 border">Urdu + English</span>
          </div>
          <div id="compress" className="mt-8 grid gap-6 lg:grid-cols-2">
            <Compressor defaultTarget={100} />
            <div className="space-y-6">
              <PdfCompressor defaultTarget={200} />
              <PassportMaker />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold">How it works</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-4">
          <li className="rounded-xl border p-4"><p className="font-bold">1. Drop file</p><p className="text-sm text-slate-600">Drop a photo or PDF. Nothing is uploaded.</p></li>
          <li className="rounded-xl border p-4"><p className="font-bold">2. Pick target</p><p className="text-sm text-slate-600">Pick 20, 50, 100 or 200 KB, or pick a portal preset.</p></li>
          <li className="rounded-xl border p-4"><p className="font-bold">3. Compress</p><p className="text-sm text-slate-600">The tool checks the real size and keeps the best quality that fits.</p></li>
          <li className="rounded-xl border p-4"><p className="font-bold">4. Download</p><p className="text-sm text-slate-600">Download and upload the file to your form.</p></li>
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-bold">Popular sizes</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[20, 50, 100, 200, 500].map((s) => (
            <Link key={s} href={`/compress-image-to-${s}kb`} className="rounded-lg border px-4 py-2 hover:border-pak hover:text-pak">Compress image to {s} KB</Link>
          ))}
          {[100, 200, 500].map((s) => (
            <Link key={`pdf-${s}`} href={`/compress-pdf-to-${s}kb`} className="rounded-lg border px-4 py-2 hover:border-pak hover:text-pak">Compress PDF to {s} KB</Link>
          ))}
        </div>
        <h2 className="mt-10 text-2xl font-bold">Portals in Pakistan</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PORTAL_PRESETS.map((p) => (
            <Link key={p.slug} href={`/${p.slug}-photo-size`} className="rounded-xl border p-4 hover:border-pak">
              <p className="font-bold">{p.name} - {p.fullName}</p>
              <p className="text-sm text-slate-600">Photo: under {p.photoKB} KB (typical). {p.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-bold">Guides</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {GUIDES.slice(0, 6).map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border p-4 hover:border-pak">
              <p className="font-bold">{g.title}</p>
              <p className="text-sm text-slate-600">{g.description}</p>
            </Link>
          ))}
        </div>
        <Link href="/guides" className="mt-4 inline-block font-semibold text-pak">See all guides</Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-bold">Questions</h2>
        <div className="mt-4 space-y-3">
          <details className="rounded-xl border p-4"><summary className="font-semibold">Is my photo uploaded?</summary><p className="mt-2 text-sm text-slate-600">No. All work runs in your browser. Close the tab and the file is gone.</p></details>
          <details className="rounded-xl border p-4"><summary className="font-semibold">What is free?</summary><p className="mt-2 text-sm text-slate-600">Free: 1 file at a time to 20, 50, 100, 200 or 500 KB. Pro adds batch, ZIP, and passport print sheet.</p></details>
          <details className="rounded-xl border p-4"><summary className="font-semibold">Why did my PDF not shrink to 100 KB?</summary><p className="mt-2 text-sm text-slate-600">Text-only PDFs are already small. The tool cannot remove text without removing pages. Split the PDF or use a larger target if the form allows it.</p></details>
          <details className="rounded-xl border p-4"><summary className="font-semibold">Is the size exact?</summary><p className="mt-2 text-sm text-slate-600">Yes. The tool measures the real file in bytes after each try and aims to land at or under your target.</p></details>
        </div>
        <p className="mt-6 text-xs text-slate-500">Portal limits on this site are typical limits, not official rules. Always check the official advertisement, because requirements change.</p>
      </section>
    </div>
  );
}
