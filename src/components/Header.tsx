"use client";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useLanguage, LANGUAGES, type Language } from "@/context/LanguageContext";

export function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-bold text-pak flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pak text-xs font-bold text-white shadow-xs">
            PK
          </span>
          <span>PakCompress</span>
        </Link>

        {/* Multi-language Selector and Nav */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* 5-Language Toggle Bar */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs shadow-inner">
            <Globe className="ml-1.5 mr-1 hidden h-3.5 w-3.5 text-slate-500 sm:inline-block" aria-hidden="true" />
            
            {/* Desktop / Tablet view: pills */}
            <div className="hidden sm:flex items-center gap-0.5">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  aria-pressed={lang === item.code}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    lang === item.code
                      ? "bg-pak text-white shadow-xs"
                      : "text-slate-600 hover:text-ink hover:bg-slate-200/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile view: clean select */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              aria-label="Select language"
              className="sm:hidden rounded-lg bg-transparent py-1 px-1.5 text-xs font-bold text-ink focus:outline-none"
            >
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <nav aria-label="Main" className="flex items-center gap-3 text-sm font-medium">
            <Link href="/guides" className="hidden md:inline hover:text-pak text-slate-700">{t("guides")}</Link>
            <Link href="/pricing" className="hidden md:inline hover:text-pak text-slate-700">{t("pricing")}</Link>
            <Link href="/#compress" className="rounded-lg bg-pak px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-pak-dark transition">
              {t("compressNow")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
