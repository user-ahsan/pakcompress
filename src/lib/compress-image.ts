export type ImageFormat = "jpeg" | "png" | "webp";

export interface CompressResult {
  blob: Blob;
  sizeKB: number;
  quality: number;
  width: number;
  height: number;
  format: ImageFormat;
  originalKB: number;
}

export function kbToBytes(kb: number): number {
  return Math.floor(kb * 1024);
}

// Pure, testable binary search. Given a function that returns size in bytes
// for a quality value, find the highest quality that fits under target.
// Returns null when even the lowest quality is over target.
export function binarySearchQuality(
  sizeForQuality: (q: number) => number,
  targetBytes: number,
  low = 0.05,
  high = 0.98
): number | null {
  if (sizeForQuality(low) > targetBytes) return null;
  let lo = low;
  let hi = high;
  let best = low;
  for (let i = 0; i < 10; i++) {
    const mid = (lo + hi) / 2;
    const size = sizeForQuality(mid);
    if (size <= targetBytes) {
      best = mid;
      lo = mid;
    } else {
      hi = mid;
    }
    if (hi - lo < 0.01) break;
  }
  return best;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this image. Try a JPG or PNG file."));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Compression failed in this browser."))),
      type,
      quality
    );
  });
}

function drawToCanvas(img: HTMLImageElement, scale: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export async function compressImageToTarget(
  file: File,
  targetKB: number,
  format: ImageFormat = "jpeg"
): Promise<CompressResult> {
  const targetBytes = kbToBytes(targetKB);
  const originalKB = file.size / 1024;
  const mime = format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
  const img = await loadImage(file);

  // PNG is lossless, so quality does not shrink it. For a PNG target we
  // convert to JPEG or WebP unless the user asked to keep PNG and it already fits.
  const effectiveFormat: ImageFormat = format === "png" ? "jpeg" : format;
  const effectiveMime = effectiveFormat === "webp" ? "image/webp" : "image/jpeg";

  let scale = 1;
  // Try full size first, then step down in 4 stages.
  const scales = [1, 0.8, 0.6, 0.45, 0.32];
  for (const s of scales) {
    scale = s;
    const canvas = drawToCanvas(img, scale);
    // Measure size at low quality to see if this scale can ever fit.
    const lowBlob = await canvasToBlob(canvas, effectiveMime, 0.05);
    if (lowBlob.size > targetBytes) continue;
    // Binary search quality at this scale.
    let lo = 0.05;
    let hi = 0.98;
    let bestBlob: Blob | null = null;
    let bestQ = 0.05;
    for (let i = 0; i < 9; i++) {
      const mid = (lo + hi) / 2;
      const b = await canvasToBlob(canvas, effectiveMime, mid);
      if (b.size <= targetBytes) {
        bestBlob = b;
        bestQ = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }
    if (bestBlob) {
      return {
        blob: bestBlob,
        sizeKB: bestBlob.size / 1024,
        quality: Math.round(bestQ * 100) / 100,
        width: canvas.width,
        height: canvas.height,
        format: effectiveFormat,
        originalKB
      };
    }
  }
  // Last resort: smallest scale at lowest quality, even if it is over target.
  // The caller shows the honest size and tells the user it could not fit.
  const canvas = drawToCanvas(img, 0.32);
  const blob = await canvasToBlob(canvas, effectiveMime, 0.05);
  return {
    blob,
    sizeKB: blob.size / 1024,
    quality: 0.05,
    width: canvas.width,
    height: canvas.height,
    format: effectiveFormat,
    originalKB
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
