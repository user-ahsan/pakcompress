// Passport photo: 35 x 45 mm at 300 DPI = 413 x 531 px.
// A4 print sheet at 300 DPI = 2480 x 3508 px, 8 photos in 2 columns x 4 rows.

export const PASSPORT_W = 413;
export const PASSPORT_H = 531;

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
      reject(new Error("Could not read this photo."));
    };
    img.src = url;
  });
}

function toBlob(canvas: HTMLCanvasElement, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Photo export failed."))), "image/jpeg", quality);
  });
}

export async function makePassportPhoto(file: File): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = PASSPORT_W;
  canvas.height = PASSPORT_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, PASSPORT_W, PASSPORT_H);
  // Cover crop: fill the frame, centre the face area.
  const scale = Math.max(PASSPORT_W / img.naturalWidth, PASSPORT_H / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const x = (PASSPORT_W - w) / 2;
  const y = (PASSPORT_H - h) / 2;
  ctx.drawImage(img, x, y, w, h);
  return toBlob(canvas, 0.92);
}

export async function makePassportSheet(file: File): Promise<Blob> {
  const single = await makePassportPhoto(file);
  const url = URL.createObjectURL(single);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error("Could not build print sheet."));
    im.src = url;
  });
  const W = 2480;
  const H = 3508;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  const gap = 60;
  const startX = 120;
  const startY = 120;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 2; col++) {
      const x = startX + col * (PASSPORT_W + gap);
      const y = startY + row * (PASSPORT_H + gap);
      ctx.drawImage(img, x, y, PASSPORT_W, PASSPORT_H);
      ctx.strokeStyle = "#cccccc";
      ctx.strokeRect(x, y, PASSPORT_W, PASSPORT_H);
    }
  }
  URL.revokeObjectURL(url);
  return toBlob(canvas, 0.92);
}
