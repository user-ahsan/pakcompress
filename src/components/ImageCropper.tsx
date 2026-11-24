"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export type AspectRatioType = "1:1" | "35:45" | "4:3" | "free";

export interface ImageCropperProps {
  imageSrc: string;
  initialRatio?: AspectRatioType;
  showPassportGuide?: boolean;
  onCropComplete: (croppedBlob: Blob, croppedUrl: string) => void;
  onCancel: () => void;
}

interface CropBox {
  x: number; // percentage of container (0 to 100)
  y: number;
  width: number;
  height: number;
}

export function ImageCropper({
  imageSrc,
  initialRatio = "free",
  showPassportGuide = false,
  onCropComplete,
  onCancel
}: ImageCropperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [ratio, setRatio] = useState<AspectRatioType>(initialRatio);
  const [crop, setCrop] = useState<CropBox>({ x: 10, y: 10, width: 80, height: 80 });
  const [dragMode, setDragMode] = useState<string | null>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; crop: CropBox }>({
    clientX: 0,
    clientY: 0,
    crop: { x: 10, y: 10, width: 80, height: 80 }
  });

  // Calculate target numerical aspect ratio (width / height)
  const getNumericalRatio = useCallback((r: AspectRatioType): number | null => {
    if (r === "1:1") return 1;
    if (r === "35:45") return 35 / 45;
    if (r === "4:3") return 4 / 3;
    return null;
  }, []);

  // Update crop box to match ratio
  const applyRatioToCrop = useCallback((r: AspectRatioType, currentCrop: CropBox) => {
    const numRatio = getNumericalRatio(r);
    if (!numRatio || !containerRef.current) return currentCrop;

    const container = containerRef.current.getBoundingClientRect();
    const containerW = container.width;
    const containerH = container.height;

    // Convert percentage crop to pixels
    let pxW = (currentCrop.width / 100) * containerW;
    let pxH = pxW / numRatio;

    if (pxH > containerH * 0.9) {
      pxH = containerH * 0.9;
      pxW = pxH * numRatio;
    }

    const pctW = Math.min(95, (pxW / containerW) * 100);
    const pctH = Math.min(95, (pxH / containerH) * 100);
    const pctX = Math.max(0, Math.min(100 - pctW, currentCrop.x));
    const pctY = Math.max(0, Math.min(100 - pctH, currentCrop.y));

    return { x: pctX, y: pctY, width: pctW, height: pctH };
  }, [getNumericalRatio]);

  const handleRatioChange = (newRatio: AspectRatioType) => {
    setRatio(newRatio);
    setCrop((prev) => applyRatioToCrop(newRatio, prev));
  };

  const rotate = () => {
    setRotation((r) => (r + 90) % 360);
  };

  // Pointer drag events for moving and resizing
  const handlePointerDown = (mode: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragMode(mode);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      crop: { ...crop }
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragMode || !containerRef.current) return;
    e.preventDefault();

    const container = containerRef.current.getBoundingClientRect();
    const deltaXPct = ((e.clientX - dragStartRef.current.clientX) / container.width) * 100;
    const deltaYPct = ((e.clientY - dragStartRef.current.clientY) / container.height) * 100;
    const start = dragStartRef.current.crop;
    const numRatio = getNumericalRatio(ratio);

    let next = { ...start };

    if (dragMode === "move") {
      next.x = Math.max(0, Math.min(100 - start.width, start.x + deltaXPct));
      next.y = Math.max(0, Math.min(100 - start.height, start.y + deltaYPct));
    } else if (dragMode === "se") {
      let newW = Math.max(15, Math.min(100 - start.x, start.width + deltaXPct));
      let newH = Math.max(15, Math.min(100 - start.y, start.height + deltaYPct));

      if (numRatio) {
        // Enforce ratio
        const pixelW = (newW / 100) * container.width;
        const pixelH = pixelW / numRatio;
        newH = (pixelH / container.height) * 100;
        if (start.y + newH > 100) {
          newH = 100 - start.y;
          newW = ((newH / 100) * container.height * numRatio / container.width) * 100;
        }
      }
      next.width = newW;
      next.height = newH;
    } else if (dragMode === "nw") {
      let newW = Math.max(15, start.width - deltaXPct);
      let newH = Math.max(15, start.height - deltaYPct);
      let newX = start.x + (start.width - newW);
      let newY = start.y + (start.height - newH);

      if (numRatio) {
        const pixelW = (newW / 100) * container.width;
        const pixelH = pixelW / numRatio;
        newH = (pixelH / container.height) * 100;
        newY = start.y + (start.height - newH);
      }

      if (newX >= 0 && newY >= 0) {
        next.x = newX;
        next.y = newY;
        next.width = newW;
        next.height = newH;
      }
    } else if (dragMode === "ne") {
      let newW = Math.max(15, Math.min(100 - start.x, start.width + deltaXPct));
      let newH = Math.max(15, start.height - deltaYPct);
      let newY = start.y + (start.height - newH);

      if (numRatio) {
        const pixelW = (newW / 100) * container.width;
        const pixelH = pixelW / numRatio;
        newH = (pixelH / container.height) * 100;
        newY = start.y + (start.height - newH);
      }

      if (newY >= 0) {
        next.y = newY;
        next.width = newW;
        next.height = newH;
      }
    } else if (dragMode === "sw") {
      let newW = Math.max(15, start.width - deltaXPct);
      let newH = Math.max(15, Math.min(100 - start.y, start.height + deltaYPct));
      let newX = start.x + (start.width - newW);

      if (numRatio) {
        const pixelW = (newW / 100) * container.width;
        const pixelH = pixelW / numRatio;
        newH = (pixelH / container.height) * 100;
      }

      if (newX >= 0 && start.y + newH <= 100) {
        next.x = newX;
        next.width = newW;
        next.height = newH;
      }
    }

    setCrop(next);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragMode) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      setDragMode(null);
    }
  };

  // Perform actual canvas crop
  const applyCrop = () => {
    const img = imgRef.current;
    if (!img) return;

    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle rotation canvas bounds
    const isRotated = rotation % 180 !== 0;
    const srcW = isRotated ? naturalH : naturalW;
    const srcH = isRotated ? naturalW : naturalH;

    // Calculate crop coordinates in natural image space
    const cropX = (crop.x / 100) * srcW;
    const cropY = (crop.y / 100) * srcH;
    const cropW = (crop.width / 100) * srcW;
    const cropH = (crop.height / 100) * srcH;

    canvas.width = Math.max(1, Math.round(cropW));
    canvas.height = Math.max(1, Math.round(cropH));

    // Fill clean white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Translate and rotate
    if (rotation === 90) {
      ctx.translate(-cropX, -cropY);
      ctx.translate(srcW, 0);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, 0, 0);
    } else if (rotation === 180) {
      ctx.translate(-cropX, -cropY);
      ctx.translate(srcW, srcH);
      ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(img, 0, 0);
    } else if (rotation === 270) {
      ctx.translate(-cropX, -cropY);
      ctx.translate(0, srcH);
      ctx.rotate((270 * Math.PI) / 180);
      ctx.drawImage(img, 0, 0);
    } else {
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, canvas.width, canvas.height);
    }
    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        onCropComplete(blob, url);
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-pak">
            Interactive Cropper
          </span>
          <h3 className="mt-1 font-display text-lg font-bold text-ink">
            Crop photo with drag and resize
          </h3>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="md" onClick={rotate}>
            🔄 Rotate 90°
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => {
              setRotation(0);
              setCrop({ x: 10, y: 10, width: 80, height: 80 });
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Preset Ratio Buttons */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-700">Aspect Ratio:</span>
        <button
          type="button"
          onClick={() => handleRatioChange("1:1")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            ratio === "1:1"
              ? "bg-pak text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          1:1 Square (CNIC / Portal)
        </button>
        <button
          type="button"
          onClick={() => handleRatioChange("35:45")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            ratio === "35:45"
              ? "bg-pak text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          35:45 Passport Size
        </button>
        <button
          type="button"
          onClick={() => handleRatioChange("4:3")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            ratio === "4:3"
              ? "bg-pak text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          4:3 Standard
        </button>
        <button
          type="button"
          onClick={() => handleRatioChange("free")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            ratio === "free"
              ? "bg-pak text-white shadow-sm"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Freeform Resize
        </button>
      </div>

      {/* Cropper Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative mx-auto flex max-h-[480px] min-h-[300px] w-full select-none items-center justify-center overflow-hidden rounded-xl bg-slate-900 touch-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Original to crop"
          style={{ transform: `rotate(${rotation}deg)` }}
          className="max-h-[460px] w-full object-contain pointer-events-none"
        />

        {/* Semi-transparent dark overlay */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />

        {/* Draggable, Resizable Crop Box */}
        <div
          style={{
            left: `${crop.x}%`,
            top: `${crop.y}%`,
            width: `${crop.width}%`,
            height: `${crop.height}%`
          }}
          onPointerDown={(e) => handlePointerDown("move", e)}
          className="absolute cursor-move border-2 border-white shadow-2xl ring-2 ring-pak/80 touch-none"
        >
          {/* Inner Clear view */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Rule of thirds grid lines */}
            <div className="absolute inset-x-0 top-1/3 border-b border-white/40" />
            <div className="absolute inset-x-0 top-2/3 border-b border-white/40" />
            <div className="absolute inset-y-0 left-1/3 border-r border-white/40" />
            <div className="absolute inset-y-0 left-2/3 border-r border-white/40" />

            {/* Passport Oval Guide (if enabled) */}
            {showPassportGuide && (
              <div className="absolute inset-x-[15%] inset-y-[10%] rounded-[50%] border-2 border-dashed border-amber-300/80 pointer-events-none">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Head Position
                </span>
              </div>
            )}
          </div>

          {/* Corner Resize Handles */}
          <div
            onPointerDown={(e) => handlePointerDown("nw", e)}
            className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-white border-2 border-pak shadow cursor-nwse-resize"
          />
          <div
            onPointerDown={(e) => handlePointerDown("ne", e)}
            className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-white border-2 border-pak shadow cursor-nesw-resize"
          />
          <div
            onPointerDown={(e) => handlePointerDown("sw", e)}
            className="absolute -left-2 -bottom-2 h-4 w-4 rounded-full bg-white border-2 border-pak shadow cursor-nesw-resize"
          />
          <div
            onPointerDown={(e) => handlePointerDown("se", e)}
            className="absolute -right-2 -bottom-2 h-4 w-4 rounded-full bg-white border-2 border-pak shadow cursor-nwse-resize"
          />
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-slate-500">
        Drag the box to reposition. Drag the corner circles to resize. Works with mouse or finger touch.
      </p>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={applyCrop}>
          Apply Crop
        </Button>
      </div>
    </div>
  );
}
