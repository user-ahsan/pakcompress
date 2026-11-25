"use client";
import { useCallback, useEffect, useState } from "react";
import { Crop, Download, AlertCircle } from "lucide-react";
import { compressImageToTarget, downloadBlob, type ImageFormat } from "@/lib/compress-image";
import { readHead, validateImageFile, formatKB } from "@/lib/validate";
import { downloadZip } from "@/lib/zip";
import { useLanguage } from "@/context/LanguageContext";
import { Dropzone } from "./Dropzone";
import { SizePresetPicker, PortalPresetRow } from "./SizePresetPicker";
import { ImageCropper } from "./ImageCropper";
import { Button } from "./ui/button";

interface BatchSuccess {
  name: string;
  originalKB: number;
  sizeKB: number;
  quality: number;
  blob: Blob;
  filename: string;
}

interface BatchFailure {
  name: string;
  error: string;
}

type BatchEntry = BatchSuccess | BatchFailure;

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
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [batchResults, setBatchResults] = useState<BatchEntry[]>([]);
  const [batchBusy, setBatchBusy] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);
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

  const onBatchFiles = useCallback(async (list: FileList | File[]) => {
    const all = Array.from(list);
    const files = all.slice(0, 10);
    const valid: File[] = [];
    const errors: BatchEntry[] = [];
    for (const f of files) {
      const head = await readHead(f);
      const err = validateImageFile(f, head);
      if (err) errors.push({ name: f.name, error: err });
      else valid.push(f);
    }
    setBatchFiles(valid);
    // Show validation errors right away; successful files wait for "Compress all".
    setBatchResults(errors);
    setBatchError(all.length > 10 ? `Only the first 10 files were kept (${all.length} selected).` : null);
  }, []);

  const runBatch = async () => {
    if (batchFiles.length === 0) { setBatchError("Choose up to 10 photos first."); return; }
    setBatchBusy(true);
    setBatchError(null);
    const ext = format === "webp" ? "webp" : "jpg";
    const out: BatchEntry[] = [];
    for (const f of batchFiles) {
      try {
        const r = await compressImageToTarget(f, target, format);
        const base = f.name.replace(/\.[^.]+$/, "") || "photo";
        out.push({
          name: f.name,
          originalKB: f.size / 1024,
          sizeKB: r.sizeKB,
          quality: r.quality,
          blob: r.blob,
          filename: `compressed-${target}kb-${base}.${ext}`
        });
      } catch (e) {
        out.push({ name: f.name, error: e instanceof Error ? e.message : "Compression failed." });
      }
    }
    setBatchResults(out);
    setBatchBusy(false);
  };

  const downloadBatchZip = async () => {
    const done = batchResults.filter((r): r is BatchSuccess => !("error" in r));
    if (done.length === 0) return;
    await downloadZip(done.map((r) => ({ name: r.filename, blob: r.blob })), "pakcompress-batch.zip");
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

      {/* Free batch compress: up to 10 photos, same target and format as above */}
      <div className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="font-display text-lg font-bold text-ink">Batch compress — free, up to 10 photos</h3>
        <p className="mt-1 text-sm text-slate-600">Pick up to 10 photos. Each one is compressed to the same {target} KB target and format above, right in your browser. Nothing is uploaded.</p>
        <label className="mt-4 block">
          <span className="sr-only">Choose up to 10 photos</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={(e) => { if (e.target.files) void onBatchFiles(e.target.files); e.target.value = ""; }}
            className="block w-full text-sm text-slate-700 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-pak file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-pak-dark"
          />
        </label>
        {batchFiles.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            {batchFiles.map((f, i) => (
              <li key={`${f.name}-${i}`} className="truncate">{f.name} — {formatKB(f.size)}</li>
            ))}
          </ul>
        )}
        <Button size="lg" onClick={() => void runBatch()} disabled={batchFiles.length === 0 || batchBusy} className="mt-4 w-full sm:w-auto cursor-pointer">
          {batchBusy ? "Compressing batch..." : `Compress all to ${target} KB`}
        </Button>
        {batchError && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{batchError}</p>}
        {batchResults.length > 0 && (
          <div className="mt-4">
            <ul className="space-y-2">
              {batchResults.map((r, i) => (
                <li key={`${r.name}-${i}`} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                  {"error" in r ? (
                    <div>
                      <p className="truncate font-semibold text-ink">{r.name}</p>
                      <p className="text-xs text-red-700">{r.error}</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="truncate font-semibold text-ink">{r.name}</p>
                        <p className="text-xs text-slate-500">{r.originalKB.toFixed(1)} KB → {r.sizeKB.toFixed(1)} KB • Quality {Math.round(r.quality * 100)}%</p>
                      </div>
                      <Button variant="outline" onClick={() => downloadBlob(r.blob, r.filename)} className="inline-flex items-center gap-1.5 cursor-pointer">
                        <Download className="w-4 h-4" /> Download
                      </Button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            {batchResults.some((r) => !("error" in r)) && (
              <Button onClick={() => void downloadBatchZip()} disabled={batchBusy} className="mt-3 inline-flex items-center gap-2 cursor-pointer">
                <Download className="w-4 h-4" /> Download all as ZIP
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
