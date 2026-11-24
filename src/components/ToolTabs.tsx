"use client";
import { useState } from "react";
import { Camera, FileText, IdCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Compressor } from "./Compressor";
import { PdfCompressor } from "./PdfCompressor";
import { PassportMaker } from "./PassportMaker";

type ToolMode = "photo" | "pdf" | "passport";

export function ToolTabs({ defaultMode = "photo" }: { defaultMode?: ToolMode }) {
  const [activeTab, setActiveTab] = useState<ToolMode>(defaultMode);
  const { t } = useLanguage();

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Unified Tab Bar Header - Directly integrated with the card container */}
      <div
        role="tablist"
        aria-label="Tool selection menu"
        className="grid grid-cols-1 divide-y divide-slate-200 border-b border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 bg-slate-50"
      >
        {/* Tab 1: Photo Compressor */}
        <button
          type="button"
          role="tab"
          id="tab-photo"
          aria-selected={activeTab === "photo"}
          aria-controls="panel-photo"
          onClick={() => setActiveTab("photo")}
          className={`group flex items-center gap-3.5 p-4 text-left transition cursor-pointer sm:flex-col sm:items-start ${
            activeTab === "photo"
              ? "bg-pak text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100 hover:text-ink"
          }`}
        >
          <Camera
            className={`h-7 w-7 shrink-0 transition ${
              activeTab === "photo" ? "text-white stroke-[2.2]" : "text-pak stroke-[1.8]"
            }`}
          />
          <div>
            <span className="block font-display text-sm font-bold sm:text-base">{t("photoTab")}</span>
            <span className={`block text-xs ${activeTab === "photo" ? "text-emerald-100" : "text-slate-500"}`}>
              {t("photoTabSub")}
            </span>
          </div>
        </button>

        {/* Tab 2: PDF Compressor */}
        <button
          type="button"
          role="tab"
          id="tab-pdf"
          aria-selected={activeTab === "pdf"}
          aria-controls="panel-pdf"
          onClick={() => setActiveTab("pdf")}
          className={`group flex items-center gap-3.5 p-4 text-left transition cursor-pointer sm:flex-col sm:items-start ${
            activeTab === "pdf"
              ? "bg-pak text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100 hover:text-ink"
          }`}
        >
          <FileText
            className={`h-7 w-7 shrink-0 transition ${
              activeTab === "pdf" ? "text-white stroke-[2.2]" : "text-pak stroke-[1.8]"
            }`}
          />
          <div>
            <span className="block font-display text-sm font-bold sm:text-base">{t("pdfTab")}</span>
            <span className={`block text-xs ${activeTab === "pdf" ? "text-emerald-100" : "text-slate-500"}`}>
              {t("pdfTabSub")}
            </span>
          </div>
        </button>

        {/* Tab 3: Passport Photo Maker */}
        <button
          type="button"
          role="tab"
          id="tab-passport"
          aria-selected={activeTab === "passport"}
          aria-controls="panel-passport"
          onClick={() => setActiveTab("passport")}
          className={`group flex items-center gap-3.5 p-4 text-left transition cursor-pointer sm:flex-col sm:items-start ${
            activeTab === "passport"
              ? "bg-pak text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100 hover:text-ink"
          }`}
        >
          <IdCard
            className={`h-7 w-7 shrink-0 transition ${
              activeTab === "passport" ? "text-white stroke-[2.2]" : "text-pak stroke-[1.8]"
            }`}
          />
          <div>
            <span className="block font-display text-sm font-bold sm:text-base">{t("passportTab")}</span>
            <span className={`block text-xs ${activeTab === "passport" ? "text-emerald-100" : "text-slate-500"}`}>
              {t("passportTabSub")}
            </span>
          </div>
        </button>
      </div>

      {/* Active Tool Content - Flows directly inside the card without extra borders */}
      <div>
        {activeTab === "photo" && (
          <div role="tabpanel" id="panel-photo" aria-labelledby="tab-photo">
            <Compressor defaultTarget={100} isTabContent={true} />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-3 text-xs text-slate-600">
              <span>Need to compress a document instead?</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("pdf")}
                  className="font-semibold text-pak underline hover:text-pak-dark cursor-pointer"
                >
                  Switch to PDF Compressor
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setActiveTab("passport")}
                  className="font-semibold text-pak underline hover:text-pak-dark cursor-pointer"
                >
                  Switch to Passport Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pdf" && (
          <div role="tabpanel" id="panel-pdf" aria-labelledby="tab-pdf">
            <PdfCompressor defaultTarget={200} isTabContent={true} />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-3 text-xs text-slate-600">
              <span>Need to compress a photo or signature instead?</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("photo")}
                  className="font-semibold text-pak underline hover:text-pak-dark cursor-pointer"
                >
                  Switch to Photo Compressor
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setActiveTab("passport")}
                  className="font-semibold text-pak underline hover:text-pak-dark cursor-pointer"
                >
                  Switch to Passport Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "passport" && (
          <div role="tabpanel" id="panel-passport" aria-labelledby="tab-passport">
            <PassportMaker isTabContent={true} />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-3 text-xs text-slate-600">
              <span>Need to compress an existing photo or document?</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("photo")}
                  className="font-semibold text-pak underline hover:text-pak-dark cursor-pointer"
                >
                  Switch to Photo Compressor
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setActiveTab("pdf")}
                  className="font-semibold text-pak underline hover:text-pak-dark cursor-pointer"
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
