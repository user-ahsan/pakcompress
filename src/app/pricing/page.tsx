import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - PakCompress Free and Pro | PakCompress",
  description: "PakCompress is free for 1 file at a time. Pro adds batch, ZIP, and passport print sheet. Payment is a stub in this build."
};

export default function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold">Free</h2>
          <p className="mt-2 text-3xl font-bold">Rs 0</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>1 file at a time</li>
            <li>20, 50, 100, 200, 500 KB targets</li>
            <li>Passport photo - single</li>
            <li>No upload, no account</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-pak p-6">
          <h2 className="text-xl font-bold">Pro</h2>
          <p className="mt-2 text-3xl font-bold">Rs 499 <span className="text-sm font-normal text-slate-500">/ month (planned)</span></p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Batch: up to 10 files</li>
            <li>ZIP download</li>
            <li>Passport print sheet - 8 on A4</li>
            <li>PDF to exact KB</li>
            <li>No ads</li>
          </ul>
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm">Checkout is a stub in this build. See docs/MONETIZATION.md for Paddle and Lemon Squeezy setup. Do not charge users until checkout is wired up with real keys kept server side only.</p>
        </div>
      </div>
    </div>
  );
}
