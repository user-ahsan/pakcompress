"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-bold text-pak flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🇵🇰</span>
          <span>PakCompress</span>
        </Link>

        {/* Language Toggle and Nav */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Big English / Urdu toggle */}
          <div
            role="group"
            aria-label="Language selector"
            className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-inner"
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition sm:px-4 sm:py-2 sm:text-sm ${
                lang === "en"
                  ? "bg-pak text-white shadow-sm"
                  : "text-slate-600 hover:text-ink"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("ur")}
              aria-pressed={lang === "ur"}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition sm:px-4 sm:py-2 sm:text-sm ${
                lang === "ur"
                  ? "bg-pak text-white shadow-sm"
                  : "text-slate-600 hover:text-ink"
              }`}
            >
              اردو (Urdu)
            </button>
          </div>

          <nav aria-label="Main" className="flex items-center gap-4 text-sm font-medium">
            <Link href="/guides" className="hidden sm:inline hover:text-pak">{t("guides")}</Link>
            <Link href="/pricing" className="hidden sm:inline hover:text-pak">{t("pricing")}</Link>
            <Link href="/#compress" className="rounded-lg bg-pak px-3.5 py-2 text-white hover:bg-pak-dark transition">
              {t("compressNow")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
