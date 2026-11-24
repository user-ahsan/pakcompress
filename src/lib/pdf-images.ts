import { PDFDocument, PDFName, PDFNumber, PDFRawStream } from "pdf-lib";

export interface DetectedImage {
  id: string;
  name: string;
  dataUrl: string;
  blob: Blob;
  sizeKB: number;
  width?: number;
  height?: number;
}

/**
 * Detect and extract embedded images (such as passport photos, CNIC scans, signatures, degrees)
 * from a PDF file completely client-side in the browser.
 */
export async function detectPdfImages(file: File): Promise<DetectedImage[]> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const detected: DetectedImage[] = [];

  const context = doc.context;
  const indirectObjects = context.enumerateIndirectObjects();

  let imgIndex = 1;

  for (const [, obj] of indirectObjects) {
    if (obj instanceof PDFRawStream) {
      const dict = obj.dict;
      const subtype = dict.get(PDFName.of("Subtype"));
      if (subtype === PDFName.of("Image")) {
        const filter = dict.get(PDFName.of("Filter"));
        const widthVal = dict.get(PDFName.of("Width"));
        const heightVal = dict.get(PDFName.of("Height"));
        const width = widthVal instanceof PDFNumber ? widthVal.asNumber() : undefined;
        const height = heightVal instanceof PDFNumber ? heightVal.asNumber() : undefined;

        // Check if stream is JPEG (DCTDecode)
        const isJpeg = filter === PDFName.of("DCTDecode");
        const streamBytes = obj.contents;

        if (isJpeg && streamBytes && streamBytes.length > 0) {
          const blob = new Blob([streamBytes as unknown as BlobPart], { type: "image/jpeg" });
          const dataUrl = URL.createObjectURL(blob);
          detected.push({
            id: `img-${imgIndex}`,
            name: `Detected Image ${imgIndex} (JPEG)`,
            dataUrl,
            blob,
            sizeKB: blob.size / 1024,
            width,
            height
          });
          imgIndex++;
        }
      }
    }
  }

  return detected;
}
