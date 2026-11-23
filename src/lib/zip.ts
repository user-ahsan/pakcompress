import JSZip from "jszip";
import { saveAs } from "file-saver";

// Pro batch helper. Takes already compressed Blobs and zips them in the
// browser. No upload. Used by the Pro batch flow once checkout is wired up.
export async function downloadZip(files: { name: string; blob: Blob }[], zipName = "pakcompress.zip"): Promise<void> {
  const zip = new JSZip();
  for (const f of files) {
    zip.file(f.name, f.blob);
  }
  const out = await zip.generateAsync({ type: "blob" });
  saveAs(out, zipName);
}
