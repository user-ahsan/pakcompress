"use client";
import { useState } from "react";
import { makePassportPhoto, makePassportSheet } from "@/lib/passport-photo";
import { readHead, validateImageFile } from "@/lib/validate";
import { downloadBlob } from "@/lib/compress-image";
import { Dropzone } from "./Dropzone";
import { Button } from "./ui/button";

export function PassportMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<Blob | null>(null);

  const onFile = async (f: File) => {
    setError(null); setPhoto(null);
    const head = await readHead(f);
    const err = validateImageFile(f, head);
    if (err) { setError(err); return; }
    setFile(f);
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
      <h2 className="font-display text-xl font-bold">Passport photo maker - 35 by 45 mm</h2>
      <p className="mt-1 text-sm text-slate-600">413 by 531 px at 300 DPI. White background. Print sheet is a Pro feature in the UI.</p>
      <div className="mt-4"><Dropzone accept="image/jpeg,image/png,image/webp" onFile={onFile} label="Drop your photo here" /></div>
      {file && <p className="mt-3 text-sm">File: {file.name}</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <Button size="lg" onClick={run} disabled={!file || busy}>{busy ? "Working..." : "Make passport photo"}</Button>
        <Button variant="outline" size="lg" onClick={sheet} disabled={!file || busy}>Download A4 sheet - 8 photos (Pro)</Button>
      </div>
      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {photo && <Button className="mt-4" onClick={() => downloadBlob(photo, "passport-35x45.jpg")}>Download passport photo</Button>}
    </section>
  );
}
