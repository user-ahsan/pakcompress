"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Compressor } from "./Compressor";
import { PdfCompressor } from "./PdfCompressor";
import { PassportMaker } from "./PassportMaker";

type ToolMode = "photo" | "pdf" | "passport";

export function ToolTabs({ defaultMode = "photo" }: { defaultMode?: ToolMode }) {
  const [activeTab, setActiveTab] = useState<ToolMode>(defaultMode);
  const { t } = useLanguage();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "pdf") setActiveTab("pdf");
      else if (hash === "passport") setActiveTab("passport");
      else if (hash === "photo" || hash === "compress") setActiveTab("photo");
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const selectTab = (tab: ToolMode) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  return (
    <div className="w-full">
      {/* Tool Navigation Menu / Segmented Control */}
      <div
        role="tablist"
        aria-label="Tool selection menu"
        className="grid grid-cols-1 gap-2 rounded-2xl bg-white p-2 shadow-sm border border-slate-200 sm:grid-cols-3 sm:gap-3"
      >
        <button
          type="button"
          role="tab"
          id="tab-photo"
          aria-selected={activeTab === "photo"}
          aria-controls="panel-photo"
          onClick={() => selectTab("photo")}
          className={`group flex items-center gap-3 rounded-xl p-3.5 text-left transition sm:flex-col sm:items-start ${
            activeTab === "photo"
              ? "bg-pak text-white shadow-md ring-2 ring-pak/20"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-ink"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-xl font-bold sm:h-8 sm:w-8 sm:text-base">
            📷
          </div>
          <div>
            <span className="block font-display text-sm font-bold sm:text-base">{t("photoTab")}</span>
            <span className={`block text-xs ${activeTab === "photo" ? "text-emerald-100" : "text-slate-500"}`}>
              {t("photoTabSub")}
            </span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-pdf"
          aria-selected={activeTab === "pdf"}
          aria-controls="panel-pdf"
          onClick={() => selectTab("pdf")}
          className={`group flex items-center gap-3 rounded-xl p-3.5 text-left transition sm:flex-col sm:items-start ${
            activeTab === "pdf"
              ? "bg-pak text-white shadow-md ring-2 ring-pak/20"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-ink"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-xl font-bold sm:h-8 sm:w-8 sm:text-base">
            📄
          </div>
          <div>
            <span className="block font-display text-sm font-bold sm:text-base">{t("pdfTab")}</span>
            <span className={`block text-xs ${activeTab === "pdf" ? "text-emerald-100" : "text-slate-500"}`}>
              {t("pdfTabSub")}
            </span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-passport"
          aria-selected={activeTab === "passport"}
          aria-controls="panel-passport"
          onClick={() => selectTab("passport")}
          className={`group flex items-center gap-3 rounded-xl p-3.5 text-left transition sm:flex-col sm:items-start ${
            activeTab === "passport"
              ? "bg-pak text-white shadow-md ring-2 ring-pak/20"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-ink"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-xl font-bold sm:h-8 sm:w-8 sm:text-base">
            🪪
          </div>
          <div>
            <span className="block font-display text-sm font-bold sm:text-base">{t("passportTab")}</span>
            <span className={`block text-xs ${activeTab === "passport" ? "text-emerald-100" : "text-slate-500"}`}>
              {t("passportTabSub")}
            </span>
          </div>
        </button>
      </div>

      {/* Active Tool Panel - Single focused dropzone per HCI principles */}
      <div className="mt-6">
        {activeTab === "photo" && (
          <div role="tabpanel" id="panel-photo" aria-labelledby="tab-photo">
            <Compressor defaultTarget={100} />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-600">
              <span>Need to compress a document instead?</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => selectTab("pdf")}
                  className="font-semibold text-pak underline hover:text-pak-dark"
                >
                  Switch to PDF Compressor
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => selectTab("passport")}
                  className="font-semibold text-pak underline hover:text-pak-dark"
                >
                  Switch to Passport Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pdf" && (
          <div role="tabpanel" id="panel-pdf" aria-labelledby="tab-pdf">
            <PdfCompressor defaultTarget={200} />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-600">
              <span>Need to compress a photo or signature instead?</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => selectTab("photo")}
                  className="font-semibold text-pak underline hover:text-pak-dark"
                >
                  Switch to Photo Compressor
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => selectTab("passport")}
                  className="font-semibold text-pak underline hover:text-pak-dark"
                >
                  Switch to Passport Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "passport" && (
          <div role="tabpanel" id="panel-passport" aria-labelledby="tab-passport">
            <PassportMaker />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-600">
              <span>Need to compress an existing photo or document?</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => selectTab("photo")}
                  className="font-semibold text-pak underline hover:text-pak-dark"
                >
                  Switch to Photo Compressor
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => selectTab("pdf")}
                  className="font-semibold text-pak underline hover:text-pak-dark"
                >
                  Switch to PDF Compressor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
