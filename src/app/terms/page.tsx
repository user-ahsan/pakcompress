import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use | PakCompress",
  description: "Terms for using PakCompress. The tool resizes and compresses files in your browser. Portal size limits shown are typical, not official rules.",
  alternates: { canonical: "/terms" }
};

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Terms</h1>
      <p className="mt-4">PakCompress is a tool to resize and compress photos and PDFs in your browser. Use it for files you own or have the right to use.</p>
      <p className="mt-4">Portal limits on this site are typical limits, not official rules. Always check the official advertisement for the form you want. We are not linked to FPSC, PPSC, NTS, NADRA, HEC, or any university.</p>
      <p className="mt-4">The tool is provided as is. Check the result before you upload it to a form.</p>
    </div>
  );
}
