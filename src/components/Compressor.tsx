"use client";
import { useCallback, useEffect, useState } from "react";
import { compressImageToTarget, downloadBlob, type ImageFormat } from "@/lib/compress-image";
import { readHead, validateImageFile, formatKB } from "@/lib/validate";
import { Dropzone } from "./Dropzone";
import { SizePresetPicker, PortalPresetRow } from "./SizePresetPicker";
import { ProModal } from "./ProModal";
import { ImageCropper } from "./ImageCropper";
import { Button } from "./ui/button";

export function Compressor({ defaultTarget = 100 }: { defaultTarget?: number }) {
  const [target, setTarget] = useState(defaultTarget);
  const [format, setFormat] = useState<ImageFormat>("jpeg");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; sizeKB: number; quality: number; width: number; height: number } | null>(null);
  const [proOpen, setProOpen] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const onFile = useCallback(async (f: File) => {
    setError(null);
    setResult(null);
    setShowCropper(false);
    const head = await readHead(f);
    const err = validateImageFile(f, head);
    if (err) { setError(err); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, []);

  const handleCropComplete = (croppedBlob: Blob, croppedUrl: string) => {
    if (preview) URL.revokeObjectURL(preview);
    const croppedFile = new File([croppedBlob], file ? `cropped-${file.name}` : "cropped-photo.jpg", {
      type: "image/jpeg"
    });
    setFile(croppedFile);
    setPreview(croppedUrl);
    setShowCropper(false);
    setResult(null);
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

  return (
    <section aria-label="Photo compressor" className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <span className="inline-block rounded-full bg-pak-light px-3 py-0.5 text-xs font-bold text-pak">Photo Compressor</span>
          <h2 className="mt-1 font-display text-lg font-bold text-ink sm:text-xl">Photo to Exact KB</h2>
        </div>
        <span className="text-xs text-slate-500">For CNIC, FPSC, PPSC, Admissions</span>
      </div>

      {!showCropper && (
        <Dropzone
          accept="image/jpeg,image/png,image/webp,image/gif"
          onFile={onFile}
          label="Drop your photo here"
          urduHelp="Photo ya signature yahan drop karein, ya click karke photo chunein."
          fileLimits="JPG, PNG, WebP up to 25 MB. Strips EXIF and GPS data."
          icon="📷"
        />
      )}

      {file && !showCropper && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 p-2.5 text-sm text-slate-700">
          <span className="truncate font-medium">Selected: {file.name}</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-pak">{formatKB(file.size)}</span>
            <button
              type="button"
              onClick={() => setShowCropper(true)}
              className="rounded-md bg-pak px-2.5 py-1 text-xs font-bold text-white hover:bg-pak-dark transition"
            >
              ✂️ Crop photo
            </button>
          </div>
        </div>
      )}

      {/* Interactive Cropper Mode */}
      {showCropper && preview && (
        <div className="mt-4">
          <ImageCropper
            imageSrc={preview}
            initialRatio="1:1"
            onCropComplete={handleCropComplete}
            onCancel={() => setShowCropper(false)}
          />
        </div>
      )}

      {preview && !showCropper && (
        <div className="mt-4 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Your photo preview" className="max-h-64 rounded-lg border object-contain shadow-sm" />
          <button
            type="button"
            onClick={() => setShowCropper(true)}
            className="mt-2 text-xs font-semibold text-pak hover:underline"
          >
            Adjust crop (Square 1:1, Passport, or Freeform)
          </button>
        </div>
      )}

      <div className="mt-5">
        <label className="text-sm font-semibold text-ink">Target size</label>
        <div className="mt-2"><SizePresetPicker value={target} onChange={setTarget} /></div>
        <div className="mt-3"><PortalPresetRow onPick={setTarget} /></div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-ink" htmlFor="fmt">Output format</label>
        <select id="fmt" value={format} onChange={(e) => setFormat(e.target.value as ImageFormat)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-pak focus:outline-none">
          <option value="jpeg">JPG (recommended for Pakistan forms)</option>
          <option value="webp">WebP</option>
          <option value="png">PNG (compressed as JPG for size)</option>
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button size="lg" onClick={run} disabled={!file || busy} className="w-full sm:w-auto">
          {busy ? "Compressing..." : `Compress photo to ${target} KB`}
        </Button>
        <Button variant="outline" size="lg" onClick={() => setProOpen(true)} className="w-full sm:w-auto">
          <span aria-hidden="true" className="mr-1.5">🔒</span> Batch (Pro)
        </Button>
      </div>

      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}

      {result && (
        <div className="mt-5 rounded-xl bg-pak-light p-4">
          <p className="font-semibold text-pak">Done: {result.sizeKB.toFixed(1)} KB (was {file ? formatKB(file.size) : ""})</p>
          <p className="text-sm text-slate-700">Quality {Math.round(result.quality * 100)} percent, {result.width} by {result.height} px. GPS and EXIF data removed.</p>
          <Button className="mt-3" onClick={() => downloadBlob(result.blob, `compressed-${target}kb.jpg`)}>Download photo</Button>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">Free: 1 file at a time. No upload. Your file never leaves this browser.</p>
      <ProModal open={proOpen} onClose={() => setProOpen(false)} />
    </section>
  );
}
