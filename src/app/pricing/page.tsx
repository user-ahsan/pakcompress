import type { Metadata } from "next";
import { Check, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - PakCompress Free and Pro | PakCompress",
  description: "PakCompress is free for 1 file at a time. Pro adds batch, ZIP, and passport print sheet. Payment is a stub in this build.",
  alternates: { canonical: "/pricing" }
};

export default function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Simple, Transparent Pricing</h1>
        <p className="mt-3 text-base text-slate-600 sm:text-lg">
          Compress photos and PDFs for Pakistan forms free of cost. Upgrade to Pro for high volume batch processing.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {/* Free Plan */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              Free Forever
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink">Free</h2>
            <p className="mt-1 text-sm text-slate-500">For students and job applicants needing occasional uploads.</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-ink">Rs 0</span>
              <span className="text-sm font-medium text-slate-500">/ forever</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>1 file at a time</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>20, 50, 100, 200, 500 KB exact targets</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Interactive crop (Square 1:1, Passport, Freeform)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Passport photo (single 35 by 45 mm)</span>
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
              className="block w-full rounded-xl border border-slate-300 bg-slate-50 py-3 text-center text-sm font-bold text-ink hover:bg-slate-100 transition"
            >
              Start using Free
            </a>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col justify-between rounded-2xl border-2 border-pak bg-white p-6 shadow-md sm:p-8">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-pak px-3 py-1 text-xs font-bold text-white">
              <Lock className="h-3 w-3" />
              Pro Planned
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink">Pro</h2>
            <p className="mt-1 text-sm text-slate-500">For internet cafes, photostats, and power users.</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-pak">Rs 499</span>
              <span className="text-sm font-medium text-slate-500">/ month (planned)</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span className="font-semibold">Batch compress up to 10 files at once</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span className="font-semibold">ZIP download for all compressed files</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Passport print sheet (8 photos on A4 sheet)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>PDF to exact KB advanced optimization</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-pak" />
                <span>Zero ads and priority processing queue</span>
              </li>
            </ul>

            <div className="mt-6 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200/60">
              Checkout is a UI stub in this build. See docs/MONETIZATION.md for Paddle and Lemon Squeezy setup.
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              disabled
              className="block w-full rounded-xl bg-pak py-3 text-center text-sm font-bold text-white opacity-80 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
