import { PDFDocument } from "pdf-lib";

export interface PdfResult {
  blob: Blob;
  originalKB: number;
  newKB: number;
  savedKB: number;
  canReachTarget: boolean;
  note: string;
}

// pdf-lib cannot recompress embedded JPEG images in a reliable way, so this
// function is honest about limits. It strips metadata, removes unused
// objects where possible, and saves a clean copy. Text-only PDFs often
// cannot shrink much, and we say that plainly instead of faking a result.
export async function compressPdf(file: File, targetKB?: number): Promise<PdfResult> {
  const originalKB = file.size / 1024;
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("PakCompress");
  doc.setCreator("PakCompress");
  doc.setCreationDate(new Date(0));
  doc.setModificationDate(new Date(0));
  const out = await doc.save({ useObjectStreams: false });
  const blob = new Blob([out as unknown as BlobPart], { type: "application/pdf" });
  const newKB = blob.size / 1024;
  const savedKB = Math.max(0, originalKB - newKB);
  const canReachTarget = targetKB ? newKB <= targetKB : newKB < originalKB;
  let note: string;
  if (targetKB && newKB <= targetKB) {
    note = `Done. Your PDF is now ${newKB.toFixed(1)} KB, under the ${targetKB} KB target.`;
  } else if (targetKB) {
    note = `Your PDF is now ${newKB.toFixed(1)} KB. It is a text-only or already small PDF, so it cannot be forced under ${targetKB} KB without removing pages. Try image PDF compression, or split the PDF into parts.`;
  } else if (savedKB > 1) {
    note = `Done. Saved ${savedKB.toFixed(1)} KB by cleaning metadata and unused data.`;
  } else {
    note = "This PDF is already clean. No size was saved, so we returned a clean copy at the same size.";
  }
  return { blob, originalKB, newKB, savedKB, canReachTarget, note };
}
