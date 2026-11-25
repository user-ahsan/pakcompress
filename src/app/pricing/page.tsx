import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - Free Forever | PakCompress",
  description: "PakCompress is free forever. Every tool is free: single and batch photo compress, ZIP download, passport photo and A4 print sheet, and PDF to exact KB. No payment, no account.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing - Free Forever",
    description: "PakCompress is free forever. Batch compress, ZIP download, passport print sheet, and PDF to exact KB — all free, no account, no payment.",
    type: "website"
  }
};

export default function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-pak">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
      <div className="mt-4 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Free forever</h1>
        <p className="mt-3 text-base text-slate-600 sm:text-lg">
          Every tool on PakCompress is free. No payment, no account, no paywall.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl">
        <div className="flex flex-col justify-between rounded-2xl border-2 border-pak bg-white p-6 shadow-md sm:p-8">
          <div>
            <div className="inline-block rounded-full bg-pak px-3 py-1 text-xs font-bold text-white">
              Free Forever
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink">Free</h2>
            <p className="mt-1 text-sm text-slate-500">For students, job applicants, and anyone filling a Pakistan form.</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-ink">Rs 0</span>
              <span className="text-sm font-medium text-slate-500">/ forever</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Single photo compress to 20, 50, 100, 200, 500 KB exact targets</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Batch compress up to 10 photos at once</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>ZIP download for all compressed files</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Passport photo (single 35 by 45 mm) and A4 print sheet (8 photos)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>PDF to exact KB</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Interactive crop (Square 1:1, Passport, Freeform)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>5 languages: English, Urdu, Roman Urdu, Sindhi, Punjabi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>100 percent in-browser privacy (no uploads)</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="/#compress"
              className="block w-full rounded-xl bg-pak py-3 text-center text-sm font-bold text-white hover:bg-pak-dark transition"
            >
              Start compressing — free
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        There is no paid plan and nothing to upgrade to. Your files never leave your browser, and nothing is ever charged.
      </p>
    </div>
  );
}
