"use client";
import { useEffect, useState } from "react";
import { Crop, Download, Camera } from "lucide-react";
import { compressPdf } from "@/lib/compress-pdf";
import { readHead, validatePdfFile, formatKB } from "@/lib/validate";
import { downloadBlob } from "@/lib/compress-image";
import { detectPdfImages, type DetectedImage } from "@/lib/pdf-images";
import { useLanguage } from "@/context/LanguageContext";
import { Dropzone } from "./Dropzone";
import { SizePresetPicker } from "./SizePresetPicker";
import { ImageCropper } from "./ImageCropper";
import { Button } from "./ui/button";

export function PdfCompressor({
  defaultTarget = 200,
  isTabContent = false
}: {
  defaultTarget?: number;
  isTabContent?: boolean;
}) {
  const { t } = useLanguage();
  const [target, setTarget] = useState(defaultTarget);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  // PDF Image Detection and Cropping state
  const [detectedImages, setDetectedImages] = useState<DetectedImage[]>([]);
  const [detecting, setDetecting] = useState(false);
  const [cropTargetImage, setCropTargetImage] = useState<DetectedImage | null>(null);
  const [croppedResult, setCroppedResult] = useState<{ blob: Blob; url: string } | null>(null);

  useEffect(() => {
    return () => {
      detectedImages.forEach((img) => URL.revokeObjectURL(img.dataUrl));
      if (croppedResult) URL.revokeObjectURL(croppedResult.url);
    };
  }, [detectedImages, croppedResult]);

  const onFile = async (f: File) => {
    setError(null);
    setNote(null);
    setBlob(null);
    setDetectedImages([]);
    setCropTargetImage(null);
    setCroppedResult(null);

    const head = await readHead(f);
    const err = validatePdfFile(f, head);
    if (err) { setError(err); return; }
    setFile(f);

    setDetecting(true);
    try {
      const imgs = await detectPdfImages(f);
      setDetectedImages(imgs);
    } catch {
      // Detection is optional
    } finally {
      setDetecting(false);
    }
  };

  const handleCropComplete = (croppedBlob: Blob, croppedUrl: string) => {
    setCroppedResult({ blob: croppedBlob, url: croppedUrl });
    setCropTargetImage(null);
  };

  const run = async () => {
    if (!file) { setError("Please choose a PDF first."); return; }
    setBusy(true);
    try {
      const r = await compressPdf(file, target);
      setBlob(r.blob);
      setNote(r.note);
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF compression failed.");
    } finally { setBusy(false); }
  };

  const containerClasses = isTabContent
    ? "p-4 sm:p-6"
    : "rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:p-6";

  return (
    <section aria-label="PDF compressor" className={containerClasses}>
      {!cropTargetImage && (
        <Dropzone
          accept="application/pdf"
          onFile={onFile}
          label={t("dropPdfTitle")}
          urduHelp={t("dropPdfUrdu")}
          fileLimits={t("dropPdfLimits")}
        />
      )}

      {file && (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 p-2.5 text-sm text-slate-700">
          <span className="truncate font-medium">Selected PDF: {file.name}</span>
          <span className="font-bold text-pak">{formatKB(file.size)}</span>
        </div>
      )}

      {/* Embedded PDF Picture Detection Section */}
      {detecting && (
        <div className="mt-3 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
          Scanning PDF for photos and scanned pictures...
        </div>
      )}

      {detectedImages.length > 0 && !cropTargetImage && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-pak flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              {detectedImages.length} picture{detectedImages.length > 1 ? "s" : ""} detected in this PDF
            </span>
            <span className="text-[11px] text-slate-500">Extract or crop below</span>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {detectedImages.map((img) => (
              <div key={img.id} className="rounded-lg border border-slate-200 bg-white p-2 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.dataUrl}
                  alt={img.name}
                  className="h-20 w-full rounded object-contain bg-slate-50 border border-slate-100"
                />
                <p className="mt-1.5 truncate text-[11px] font-semibold text-slate-700">{img.name}</p>
                <p className="text-[10px] text-slate-500">{img.sizeKB.toFixed(1)} KB</p>
                <button
                  type="button"
                  onClick={() => setCropTargetImage(img)}
                  className="mt-1.5 w-full inline-flex items-center justify-center gap-1 rounded bg-pak py-1 text-center text-[11px] font-bold text-white hover:bg-pak-dark transition"
                >
                  <Crop className="w-3 h-3" />
                  Crop picture
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Crop for Detected PDF Image */}
      {cropTargetImage && (
        <div className="mt-4">
          <div className="mb-2 text-xs font-semibold text-pak">
            Cropping picture extracted from PDF: {cropTargetImage.name}
          </div>
          <ImageCropper
            imageSrc={cropTargetImage.dataUrl}
            initialRatio="1:1"
            onCropComplete={handleCropComplete}
            onCancel={() => setCropTargetImage(null)}
          />
        </div>
      )}

      {/* Cropped Picture Download Result */}
      {croppedResult && !cropTargetImage && (
        <div className="mt-4 rounded-xl bg-pak-light p-3.5">
          <p className="text-xs font-bold text-pak">Photo cropped from PDF successfully</p>
          <div className="mt-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={croppedResult.url} alt="Cropped result" className="h-16 w-16 rounded border object-contain bg-white" />
            <Button
              size="md"
              className="inline-flex items-center gap-2"
              onClick={() => downloadBlob(croppedResult.blob, "cropped-from-pdf.jpg")}
            >
              <Download className="w-4 h-4" />
              Download cropped photo
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="text-sm font-semibold text-ink">{t("targetSize")}</label>
        <div className="mt-2"><SizePresetPicker value={target} onChange={setTarget} /></div>
      </div>

      <Button size="lg" className="mt-5 w-full sm:w-auto" onClick={run} disabled={!file || busy}>
        {busy ? "Compressing PDF..." : `${t("compressPdfBtn")} ${target} KB`}
      </Button>

      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {note && <p className="mt-3 rounded-lg bg-pak-light p-3 text-sm text-slate-800">{note}</p>}
      {blob && (
        <Button className="mt-3 inline-flex items-center gap-2" onClick={() => downloadBlob(blob, `compressed-${target}kb.pdf`)}>
          <Download className="w-4 h-4" />
          {t("downloadPdf")}
        </Button>
      )}

      <p className="mt-4 text-xs text-slate-500">PDF text cannot always shrink to a small target. The tool tells you plainly when that happens.</p>
    </section>
  );
}
