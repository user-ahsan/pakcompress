import type { Metadata } from "next";
import { Compressor } from "@/components/Compressor";
export const metadata: Metadata = {
  title: "NADRA photo size - 20 KB limit (typical) | PakCompress",
  description: "National Database and Registration Authority forms often ask for a photo under 20 KB. Compress your photo to 20 KB in your browser, free, no upload. Always check the official advertisement.",
  alternates: { canonical: "/nadra-photo-size" }
};
export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">NADRA photo size</h1>
      <p className="mt-3 text-lg text-slate-700">National Database and Registration Authority. Typical photo limit: under 20 KB. Typical signature limit: under 20 KB. Typical PDF limit: under 500 KB.</p>
      <p className="mt-2 text-slate-700">NADRA uploads at times ask for a photo under 20 KB. Check the exact page before you upload.</p>
      <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Always check the official advertisement, because requirements change from one post to the next. The limits on this page are typical limits, not official rules.</p>
      <div className="mt-6"><Compressor defaultTarget={20} /></div>
      <h2 className="mt-8 text-xl font-bold">Photo size for NADRA</h2>
      <p className="mt-2 text-slate-700">Use 413 by 531 px for a passport size photo when the form asks for that size. Compress the photo to 20 KB with the tool above, then download it and check the size on your phone before you upload it.</p>
    </div>
  );
}
