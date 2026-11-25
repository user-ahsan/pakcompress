"use client";
import { useEffect, useState } from "react";
import { Crop, Download, AlertCircle } from "lucide-react";
import { makePassportPhoto, makePassportSheet } from "@/lib/passport-photo";
import { readHead, validateImageFile, formatKB } from "@/lib/validate";
import { downloadBlob } from "@/lib/compress-image";
import { useLanguage } from "@/context/LanguageContext";
import { Dropzone } from "./Dropzone";
import { ImageCropper } from "./ImageCropper";
import { Button } from "./ui/button";

export function PassportMaker({ isTabContent = false }: { isTabContent?: boolean }) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<Blob | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isNonPassport, setIsNonPassport] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const onFile = async (f: File) => {
    setError(null);
    setPhoto(null);
    setShowCropper(false);
    setIsNonPassport(false);
    setDimensions(null);

    const head = await readHead(f);
    const err = validateImageFile(f, head);
    if (err) { setError(err); return; }

    const url = URL.createObjectURL(f);
    setFile(f);
    setPreview(url);

    // Auto-detect passport aspect ratio (35/45 = ~0.777)
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setDimensions({ width: w, height: h });

      const ratio = w / h;
      const isPassportRatio = Math.abs(ratio - (35 / 45)) < 0.05;

      if (!isPassportRatio) {
        setIsNonPassport(true);
        setShowCropper(true);
      }
    };
    img.src = url;
  };

  const handleCropComplete = (croppedBlob: Blob, croppedUrl: string) => {
    if (preview) URL.revokeObjectURL(preview);
    const croppedFile = new File([croppedBlob], file ? `passport-${file.name}` : "passport-cropped.jpg", {
      type: "image/jpeg"
    });
    setFile(croppedFile);
    setPreview(croppedUrl);
    setShowCropper(false);
    setIsNonPassport(false);
    setPhoto(null);

    const img = new Image();
    img.onload = () => setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = croppedUrl;
  };

  const run = async () => {
    if (!file) { setError("Please choose a photo first."); return; }
    setBusy(true);
    try {
      const b = await makePassportPhoto(file);
      setPhoto(b);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Passport photo failed.");
    } finally { setBusy(false); }
  };

  const sheet = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const b = await makePassportSheet(file);
      downloadBlob(b, "passport-sheet-a4.jpg");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Print sheet failed.");
    } finally { setBusy(false); }
  };

  const containerClasses = isTabContent
    ? "p-4 sm:p-6"
    : "rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:p-6";

  return (
    <section aria-label="Passport photo maker" className={containerClasses}>
      <p className="mb-4 text-sm text-slate-600">Standard 35 by 45 mm photo crop on a clean white background for NADRA, Pakistani passport, and international visas.</p>

      {!file && (
        <Dropzone
          accept="image/jpeg,image/png,image/webp"
          onFile={onFile}
          label={t("dropPassportTitle")}
          urduHelp={t("dropPassportUrdu")}
          fileLimits={t("dropPassportLimits")}
        />
      )}

      {/* Selected file summary */}
      {file && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 border border-slate-200">
          <div>
            <p className="truncate font-semibold text-ink">{file.name}</p>
            <p className="text-xs text-slate-500">
              {formatKB(file.size)}
              {dimensions && ` • ${dimensions.width} by ${dimensions.height} px`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPreview(null);
              setShowCropper(false);
              setPhoto(null);
            }}
            className="text-xs font-bold text-slate-500 hover:text-red-700 underline cursor-pointer"
          >
            Change photo
          </button>
        </div>
      )}

      {/* Non-passport size auto-detected notice */}
      {isNonPassport && showCropper && (
        <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-amber-50 p-3 border border-amber-200 text-xs text-amber-900">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <p>
            <span className="font-bold">Non-passport photo ratio detected:</span> Passports require a 35 by 45 mm frame. Align the face inside the guide box and click <strong>Apply Crop</strong>.
          </p>
        </div>
      )}

      {/* Inline Facebook-style Passport Cropper on the same screen */}
      {showCropper && preview && (
        <div className="mt-2 mb-4">
          <ImageCropper
            imageSrc={preview}
            initialRatio="35:45"
            showPassportGuide={true}
            onCropComplete={handleCropComplete}
            onCancel={() => setShowCropper(false)}
          />
        </div>
      )}

      {/* Normal Preview with Large Prominent Button */}
      {preview && !showCropper && (
        <div className="mt-2 mb-4 flex flex-col items-center">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-xs max-h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Passport preview" className="max-h-72 w-auto object-contain" />
          </div>

          {/* Large prominent crop button */}
          <button
            type="button"
            onClick={() => setShowCropper(true)}
            className="mt-3.5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-6 py-3 text-sm font-bold text-pak border-2 border-pak hover:bg-pak hover:text-white transition shadow-xs cursor-pointer w-full sm:w-auto"
          >
            <Crop className="h-5 w-5 stroke-[2.2]" />
            <span>Crop & Adjust to 35 by 45 mm (Passport Size)</span>
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Button size="lg" onClick={run} disabled={!file || busy} className="w-full sm:w-auto cursor-pointer">
          {busy ? "Processing photo..." : t("makePassportBtn")}
        </Button>
        <Button variant="outline" size="lg" onClick={sheet} disabled={!file || busy} className="w-full sm:w-auto inline-flex items-center cursor-pointer">
          Download A4 sheet (8 photos) — Free
        </Button>
      </div>

      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {photo && (
        <Button className="mt-4 inline-flex items-center gap-2 cursor-pointer" onClick={() => downloadBlob(photo, "passport-35x45.jpg")}>
          <Download className="w-4 h-4" />
          {t("downloadPassport")}
        </Button>
      )}
    </section>
  );
}
