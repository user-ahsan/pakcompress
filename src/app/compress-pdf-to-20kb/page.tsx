import type { Metadata } from "next";
import { PdfCompressor } from "@/components/PdfCompressor";
export const metadata: Metadata = {
  title: "Compress PDF to 20KB online free - no upload | PakCompress",
  description: "Compress a PDF to 20 KB in your browser. Free and private. No upload. The tool tells you plainly when a text-only PDF cannot reach the target.",
  alternates: { canonical: "/compress-pdf-to-20kb" }
};
export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Compress PDF to 20 KB online free</h1>
      <p className="mt-3 text-slate-700">Drop your PDF and pick 20 KB. The tool strips metadata and cleans unused data in your browser. If the PDF is text-only and cannot reach 20 KB, the tool will say so plainly.</p>
      <div className="mt-6"><PdfCompressor defaultTarget={20} /></div>
      <p className="mt-6 text-sm text-slate-500">Always check the official form page. Some forms allow a larger PDF than the photo limit on the same page.</p>
    </div>
  );
}
