"use client";
import { useState } from "react";
import { compressPdf } from "@/lib/compress-pdf";
import { readHead, validatePdfFile, formatKB } from "@/lib/validate";
import { downloadBlob } from "@/lib/compress-image";
import { Dropzone } from "./Dropzone";
import { SizePresetPicker } from "./SizePresetPicker";
import { Button } from "./ui/button";

export function PdfCompressor({ defaultTarget = 200 }: { defaultTarget?: number }) {
  const [target, setTarget] = useState(defaultTarget);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  const onFile = async (f: File) => {
    setError(null); setNote(null); setBlob(null);
    const head = await readHead(f);
    const err = validatePdfFile(f, head);
    if (err) { setError(err); return; }
    setFile(f);
  };

  const run = async () => {
    if (!file) { setError("Please choose a PDF first."); return; }
    setBusy(true);
    try {
      // Lazy load is handled by the import in compress-pdf; pdf-lib is only
      // loaded when this component runs, not on the home page load.
      const r = await compressPdf(file, target);
      setBlob(r.blob);
      setNote(r.note);
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF compression failed.");
    } finally { setBusy(false); }
  };

  return (
    <section aria-label="PDF compressor" className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:p-6">
      <Dropzone accept="application/pdf" onFile={onFile} label="Drop your PDF here" />
      {file && <p className="mt-3 text-sm">File: {file.name} ({formatKB(file.size)})</p>}
      <div className="mt-4"><label className="text-sm font-semibold">Target size</label><div className="mt-2"><SizePresetPicker value={target} onChange={setTarget} /></div></div>
      <Button size="lg" className="mt-5" onClick={run} disabled={!file || busy}>{busy ? "Working..." : `Compress PDF to ${target} KB`}</Button>
      {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {note && <p className="mt-3 rounded-lg bg-pak-light p-3 text-sm">{note}</p>}
      {blob && <Button className="mt-3" onClick={() => downloadBlob(blob, `compressed-${target}kb.pdf`)}>Download PDF</Button>}
      <p className="mt-4 text-xs text-slate-500">PDF text cannot always shrink to a small target. The tool tells you plainly when that happens.</p>
    </section>
  );
}
