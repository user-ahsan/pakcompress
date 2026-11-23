"use client";
import { useCallback, useEffect, useState } from "react";
import { compressImageToTarget, downloadBlob, type ImageFormat } from "@/lib/compress-image";
import { readHead, validateImageFile, formatKB } from "@/lib/validate";
import { Dropzone } from "./Dropzone";
import { SizePresetPicker, PortalPresetRow } from "./SizePresetPicker";
import { ProModal } from "./ProModal";
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

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const onFile = useCallback(async (f: File) => {
    setError(null);
    setResult(null);
    const head = await readHead(f);
    const err = validateImageFile(f, head);
    if (err) { setError(err); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, []);

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
      <Dropzone accept="image/jpeg,image/png,image/webp,image/gif" onFile={onFile} label="Drop your photo here" />
      {file && (
        <p className="mt-3 text-sm text-slate-700">File: {file.name} ({formatKB(file.size)})</p>
      )}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Your photo preview" className="mt-4 max-h-64 rounded-lg border" />
      )}
      <div className="mt-5">
        <label className="text-sm font-semibold">Target size</label>
        <div className="mt-2"><SizePresetPicker value={target} onChange={setTarget} /></div>
        <div className="mt-3"><PortalPresetRow onPick={setTarget} /></div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold" htmlFor="fmt">Format</label>
        <select id="fmt" value={format} onChange={(e) => setFormat(e.target.value as ImageFormat)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="jpeg">JPG (smallest for photos)</option>
          <option value="webp">WebP</option>
          <option value="png">PNG (kept as JPG for size)</option>
        </select>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button size="lg" onClick={run} disabled={!file || busy}>{busy ? "Compressing..." : `Compress to ${target} KB`}</Button>
        <Button variant="outline" size="lg" onClick={() => setProOpen(true)}>Batch (Pro)</Button>
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
