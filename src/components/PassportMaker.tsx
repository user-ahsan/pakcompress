"use client";
import { useEffect, useState } from "react";
import { makePassportPhoto, makePassportSheet } from "@/lib/passport-photo";
import { readHead, validateImageFile } from "@/lib/validate";
import { downloadBlob } from "@/lib/compress-image";
import { Dropzone } from "./Dropzone";
import { ImageCropper } from "./ImageCropper";
import { Button } from "./ui/button";

export function PassportMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<Blob | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const onFile = async (f: File) => {
    setError(null);
    setPhoto(null);
    setShowCropper(false);
    const head = await readHead(f);
    const err = validateImageFile(f, head);
    if (err) { setError(err); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleCropComplete = (croppedBlob: Blob, croppedUrl: string) => {
    if (preview) URL.revokeObjectURL(preview);
    const croppedFile = new File([croppedBlob], file ? `cropped-${file.name}` : "passport-cropped.jpg", {
      type: "image/jpeg"
    });
    setFile(croppedFile);
    setPreview(croppedUrl);
    setShowCropper(false);
    setPhoto(null);
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

  return (
    <section aria-label="Passport photo maker" className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-bold text-amber-800">Passport Photo Maker</span>
          <h2 className="mt-1 font-display text-lg font-bold text-ink sm:text-xl">Passport Photo (35 by 45 mm)</h2>
        </div>
        <span className="text-xs text-slate-500">413 by 531 px at 300 DPI</span>
      </div>

      <p className="mb-4 text-sm text-slate-600">Standard 35 by 45 mm photo crop on a clean white background for NADRA, Pakistani passport, and international visas.</p>

      {!showCropper && (
        <Dropzone
          accept="image/jpeg,image/png,image/webp"
          onFile={onFile}
          label="Drop photo for passport crop"
          urduHelp="Tasweer yahan drop karein passport crop ke liye. Auto crop 35 by 45 mm."
          fileLimits="JPG, PNG, WebP up to 25 MB. Converts to 413 by 531 px standard crop."
          icon="🪪"
        />
      )}

      {file && !showCropper && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 p-2.5 text-sm text-slate-700">
          <span className="truncate font-medium">Selected: {file.name}</span>
          <button
            type="button"
            onClick={() => setShowCropper(true)}
            className="rounded-md bg-pak px-2.5 py-1 text-xs font-bold text-white hover:bg-pak-dark transition"
          >
            ✂️ Crop to 35x45 mm
          </button>
        </div>
      )}

      {/* Interactive Passport Cropper */}
      {showCropper && preview && (
        <div className="mt-4">
          <ImageCropper
            imageSrc={preview}
            initialRatio="35:45"
            showPassportGuide={true}
            onCropComplete={handleCropComplete}
            onCancel={() => setShowCropper(false)}
          />
        </div>
      )}

      {preview && !showCropper && (
        <div className="mt-4 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Passport preview" className="max-h-64 rounded-lg border object-contain shadow-sm" />
          <button
            type="button"
            onClick={() => setShowCropper(true)}
            className="mt-2 text-xs font-semibold text-pak hover:underline"
          >
            Re-adjust face position (35:45 crop box)
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Button size="lg" onClick={run} disabled={!file || busy} className="w-full sm:w-auto">
          {busy ? "Processing photo..." : "Make passport photo"}
        </Button>
        <Button variant="outline" size="lg" onClick={sheet} disabled={!file || busy} className="w-full sm:w-auto">
          <span aria-hidden="true" className="mr-1.5">🔒</span> Download A4 sheet (8 photos - Pro)
        </Button>
      </div>

      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {photo && <Button className="mt-4" onClick={() => downloadBlob(photo, "passport-35x45.jpg")}>Download passport photo (35x45 mm)</Button>}
    </section>
  );
}
