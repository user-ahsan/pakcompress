"use client";
import { useCallback, useEffect, useState } from "react";
import { Crop, Lock, Download, AlertCircle } from "lucide-react";
import { compressImageToTarget, downloadBlob, type ImageFormat } from "@/lib/compress-image";
import { readHead, validateImageFile, formatKB } from "@/lib/validate";
import { useLanguage } from "@/context/LanguageContext";
import { Dropzone } from "./Dropzone";
import { SizePresetPicker, PortalPresetRow } from "./SizePresetPicker";
import { ProModal } from "./ProModal";
import { ImageCropper } from "./ImageCropper";
import { Button } from "./ui/button";

export function Compressor({
  defaultTarget = 100,
  isTabContent = false
}: {
  defaultTarget?: number;
  isTabContent?: boolean;
}) {
  const { t } = useLanguage();
  const [target, setTarget] = useState(defaultTarget);
  const [format, setFormat] = useState<ImageFormat>("jpeg");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; sizeKB: number; quality: number; width: number; height: number } | null>(null);
  const [proOpen, setProOpen] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [isNonStandard, setIsNonStandard] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const onFile = useCallback(async (f: File) => {
    setError(null);
    setResult(null);
    setShowCropper(false);
    setIsNonStandard(false);
    setDimensions(null);

    const head = await readHead(f);
    const err = validateImageFile(f, head);
    if (err) { setError(err); return; }

    const url = URL.createObjectURL(f);
    setFile(f);
    setPreview(url);

    // Auto-detect image dimensions and aspect ratio
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setDimensions({ width: w, height: h });

      const ratio = w / h;
      const isSquare = Math.abs(ratio - 1) < 0.05;
      const isPassport = Math.abs(ratio - (35 / 45)) < 0.05;

      // If non-square and non-passport, auto-open cropper on the same screen
      if (!isSquare && !isPassport) {
        setIsNonStandard(true);
        setShowCropper(true);
      }
    };
    img.src = url;
  }, []);

  const handleCropComplete = (croppedBlob: Blob, croppedUrl: string) => {
    if (preview) URL.revokeObjectURL(preview);
    const croppedFile = new File([croppedBlob], file ? `cropped-${file.name}` : "cropped-photo.jpg", {
      type: "image/jpeg"
    });
    setFile(croppedFile);
    setPreview(croppedUrl);
    setShowCropper(false);
    setIsNonStandard(false);
    setResult(null);

    // Update dimensions from cropped image
    const img = new Image();
    img.onload = () => setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = croppedUrl;
  };

  const run = async () => {
    if (!file) { setError("Please choose a photo first."); return; }
    setBusy(true);
    setError(null);
    try {
      const r = await compressImageToTarget(file, target, format);
      setResult(r);
      if (r.sizeKB > target) setError(`Best result is ${r.sizeKB.toFixed(1)} KB, still over ${target} KB. Try a tighter crop or a smaller source photo.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Compression failed. Try a JPG or PNG file.");
    } finally {
      setBusy(false);
    }
  };

  const containerClasses = isTabContent
    ? "p-4 sm:p-6"
    : "rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:p-6";

  return (
    <section aria-label="Photo compressor" className={containerClasses}>
      {!file && (
        <Dropzone
          accept="image/jpeg,image/png,image/webp,image/gif"
          onFile={onFile}
          label={t("dropPhotoTitle")}
          urduHelp={t("dropPhotoUrdu")}
          fileLimits={t("dropPhotoLimits")}
        />
      )}

      {/* Selected file summary and Change Photo button */}
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
              setResult(null);
            }}
            className="text-xs font-bold text-slate-500 hover:text-red-700 underline cursor-pointer"
          >
            Change photo
          </button>
        </div>
      )}

      {/* Auto-detected non-standard ratio banner */}
      {isNonStandard && showCropper && (
        <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-amber-50 p-3 border border-amber-200 text-xs text-amber-900">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <p>
            <span className="font-bold">Non-standard photo detected:</span> Pakistan forms (CNIC, FPSC, PPSC) require a square 1:1 or passport ratio. Position the frame below and click <strong>Apply Crop</strong>.
          </p>
        </div>
      )}

      {/* Inline Facebook-style Image Cropper on the same screen */}
      {showCropper && preview && (
        <div className="mt-2 mb-4">
          <ImageCropper
            imageSrc={preview}
            initialRatio="1:1"
            onCropComplete={handleCropComplete}
            onCancel={() => setShowCropper(false)}
          />
        </div>
      )}

      {/* Normal Preview with Large Crop Action Button */}
      {preview && !showCropper && (
        <div className="mt-2 mb-4 flex flex-col items-center">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-xs max-h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Your photo preview" className="max-h-72 w-auto object-contain" />
          </div>

          {/* Large prominent Crop button as requested */}
          <button
            type="button"
            onClick={() => setShowCropper(true)}
            className="mt-3.5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-6 py-3 text-sm font-bold text-pak border-2 border-pak hover:bg-pak hover:text-white transition shadow-xs cursor-pointer w-full sm:w-auto"
          >
            <Crop className="h-5 w-5 stroke-[2.2]" />
            <span>Crop & Adjust Photo (Square 1:1 / Passport)</span>
          </button>
        </div>
      )}

      <div className="mt-5">
        <label className="text-sm font-semibold text-ink">{t("targetSize")}</label>
        <div className="mt-2"><SizePresetPicker value={target} onChange={setTarget} /></div>
        <div className="mt-3"><PortalPresetRow onPick={setTarget} /></div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-ink" htmlFor="fmt">{t("formatLabel")}</label>
        <select id="fmt" value={format} onChange={(e) => setFormat(e.target.value as ImageFormat)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-pak focus:outline-none">
          <option value="jpeg">JPG (recommended for Pakistan forms)</option>
          <option value="webp">WebP</option>
          <option value="png">PNG (compressed as JPG for size)</option>
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button size="lg" onClick={run} disabled={!file || busy} className="w-full sm:w-auto cursor-pointer">
          {busy ? "Compressing..." : `${t("compressPhotoBtn")} ${target} KB`}
        </Button>
        <Button variant="outline" size="lg" onClick={() => setProOpen(true)} className="w-full sm:w-auto inline-flex items-center cursor-pointer">
          <Lock className="w-4 h-4 mr-1.5" />
          {t("batchPro")}
        </Button>
      </div>

      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}

      {result && (
        <div className="mt-5 rounded-xl bg-pak-light p-4">
          <p className="font-semibold text-pak">Done: {result.sizeKB.toFixed(1)} KB (was {file ? formatKB(file.size) : ""})</p>
          <p className="text-sm text-slate-700">Quality {Math.round(result.quality * 100)} percent, {result.width} by {result.height} px. GPS and EXIF data removed.</p>
          <Button className="mt-3 inline-flex items-center gap-2 cursor-pointer" onClick={() => downloadBlob(result.blob, `compressed-${target}kb.jpg`)}>
            <Download className="w-4 h-4" />
            {t("downloadPhoto")}
          </Button>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">{t("freeNote")}</p>
      <ProModal open={proOpen} onClose={() => setProOpen(false)} />
    </section>
  );
}
