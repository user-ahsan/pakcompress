import type { Metadata } from "next";
import { Compressor } from "@/components/Compressor";
export const metadata: Metadata = {
  title: "PPSC photo size - 50 KB limit (typical) | PakCompress",
  description: "Punjab Public Service Commission forms often ask for a photo under 50 KB. Compress your photo to 50 KB in your browser, free, no upload. Always check the official advertisement.",
  alternates: { canonical: "/ppsc-photo-size" }
};
export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">PPSC photo size</h1>
      <p className="mt-3 text-lg text-slate-700">Punjab Public Service Commission. Typical photo limit: under 50 KB. Typical signature limit: under 20 KB. Typical PDF limit: under 200 KB.</p>
      <p className="mt-2 text-slate-700">PPSC forms in Punjab often ask for a photo under 50 KB.</p>
      <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Always check the official advertisement, because requirements change from one post to the next. The limits on this page are typical limits, not official rules.</p>
      <div className="mt-6"><Compressor defaultTarget={50} /></div>
      <h2 className="mt-8 text-xl font-bold">Photo size for PPSC</h2>
      <p className="mt-2 text-slate-700">Use 413 by 531 px for a passport size photo when the form asks for that size. Compress the photo to 50 KB with the tool above, then download it and check the size on your phone before you upload it.</p>
    </div>
  );
}
