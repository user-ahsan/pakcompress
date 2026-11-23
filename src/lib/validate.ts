export const MAX_IMAGE_BYTES = 25 * 1024 * 1024;
export const MAX_PDF_BYTES = 50 * 1024 * 1024;

export type FileKind = "jpeg" | "png" | "webp" | "gif" | "pdf" | "unknown";

export function detectKind(bytes: Uint8Array): FileKind {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  if (bytes.length >= 12 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return "webp";
  if (bytes.length >= 6 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "gif";
  if (bytes.length >= 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return "pdf";
  return "unknown";
}

export function validateImageFile(file: File, head: Uint8Array): string | null {
  const blocked = [".exe", ".zip", ".rar", ".sh", ".bat", ".js", ".html"];
  const lower = file.name.toLowerCase();
  if (blocked.some((e) => lower.endsWith(e))) return "This file type is not allowed.";
  if (file.size > MAX_IMAGE_BYTES) return "Image is over 25 MB. Use a smaller file.";
  if (file.size === 0) return "File is empty.";
  const kind = detectKind(head);
  if (kind === "unknown" || kind === "pdf") return "Upload a JPG, PNG, WebP or GIF photo.";
  return null;
}

export function validatePdfFile(file: File, head: Uint8Array): string | null {
  if (!file.name.toLowerCase().endsWith(".pdf")) return "Upload a PDF file.";
  if (file.size > MAX_PDF_BYTES) return "PDF is over 50 MB. Use a smaller file.";
  if (file.size === 0) return "File is empty.";
  if (detectKind(head) !== "pdf") return "This file is not a valid PDF.";
  return null;
}

export async function readHead(file: File, n = 16): Promise<Uint8Array> {
  const buf = await file.slice(0, n).arrayBuffer();
  return new Uint8Array(buf);
}

export function formatKB(bytes: number): string {
  return (bytes / 1024).toFixed(1) + " KB";
}
export function bytesToKB(bytes: number): number {
  return bytes / 1024;
}
