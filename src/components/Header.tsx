"use client";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useLanguage, LANGUAGES } from "@/context/LanguageContext";

export function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur shadow-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3.5 sm:px-4 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display text-lg sm:text-xl font-bold text-pak shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pak text-xs font-extrabold text-white shadow-xs">
            PK
          </span>
          <span className="tracking-tight">PakCompress</span>
        </Link>

        {/* Multi-language Selector and Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
          {/* 5-Language Selector Bar */}
          <div
            role="group"
            aria-label="Language selector"
            className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1 shadow-inner"
          >
            {/* Globe Icon - Highlighted in green, especially for English */}
            <div
              title="Language selection"
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition mr-1 ${
                lang === "en"
                  ? "bg-emerald-100 text-pak ring-1 ring-pak/40"
                  : "bg-white text-pak shadow-2xs"
              }`}
            >
              <Globe className="h-4 w-4 stroke-[2.2]" aria-hidden="true" />
            </div>

            {/* Language buttons directly visible */}
            <div className="flex items-center gap-0.5 overflow-x-auto">
              {LANGUAGES.map((item) => {
                const isActive = lang === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLang(item.code)}
                    aria-pressed={isActive}
                    className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-pak text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-200/80 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Main" className="flex items-center gap-2 sm:gap-3 text-sm font-medium">
            <Link href="/guides" className="hidden lg:inline text-slate-700 hover:text-pak font-semibold transition">
              {t("guides")}
            </Link>
            <Link href="/pricing" className="hidden lg:inline text-slate-700 hover:text-pak font-semibold transition">
              {t("pricing")}
            </Link>
            <Link
              href="/#compress"
              className="rounded-xl bg-pak px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold text-white hover:bg-pak-dark shadow-xs transition shrink-0"
            >
              {t("compressNow")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
