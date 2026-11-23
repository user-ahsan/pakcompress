import type { Metadata } from "next";
import { Compressor } from "@/components/Compressor";
export const metadata: Metadata = {
  title: "Compress image to 100KB online free - no upload | PakCompress",
  description: "Compress a photo to 100 KB in your browser. Free, fast, and private. No upload. For FPSC, PPSC, NTS, NADRA and job forms in Pakistan.",
  alternates: { canonical: "/compress-image-to-100kb" }
};
export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Compress image to 100 KB online free</h1>
      <p className="mt-3 text-slate-700">Drop your photo, pick 100 KB, and download the result. Your file never leaves your browser. Use this size when a form in Pakistan asks for a photo under 100 KB.</p>
      <div className="mt-6"><Compressor defaultTarget={100} /></div>
      <h2 className="mt-8 text-xl font-bold">How to compress to 100 KB</h2>
      <p className="mt-2 text-slate-700">Drop the photo in the box above. The tool tries full size first, then steps the pixel size down if needed. It keeps the highest quality that fits under 100 KB. Download the file and check the size on your phone before you upload it to the form.</p>
      <p className="mt-3 text-sm text-slate-500">Always check the official advertisement for the form you want. Requirements change.</p>
    </div>
  );
}
