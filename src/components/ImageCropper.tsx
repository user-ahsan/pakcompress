"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCw, ZoomIn, ZoomOut, Check, X, Eye } from "lucide-react";
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
  initialRatio = "1:1",
  showPassportGuide = false,
  onCropComplete,
  onCancel
}: ImageCropperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [ratio, setRatio] = useState<AspectRatioType>(initialRatio);
  const [crop, setCrop] = useState<CropBox>({ x: 15, y: 15, width: 70, height: 70 });
  const [dragMode, setDragMode] = useState<string | null>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; crop: CropBox }>({
    clientX: 0,
    clientY: 0,
    crop: { x: 15, y: 15, width: 70, height: 70 }
  });

  const getNumericalRatio = useCallback((r: AspectRatioType): number | null => {
    if (r === "1:1") return 1;
    if (r === "35:45") return 35 / 45;
    if (r === "4:3") return 4 / 3;
    return null;
  }, []);

  const applyRatioToCrop = useCallback((r: AspectRatioType, currentCrop: CropBox) => {
    const numRatio = getNumericalRatio(r);
    if (!numRatio || !containerRef.current) return currentCrop;

    const container = containerRef.current.getBoundingClientRect();
    const containerW = container.width;
    const containerH = container.height;

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

  useEffect(() => {
    setCrop((prev) => applyRatioToCrop(ratio, prev));
  }, [ratio, applyRatioToCrop]);

  // Live Zoomed Preview renderer
  const updateLivePreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    const isRotated = rotation % 180 !== 0;
    const srcW = isRotated ? naturalH : naturalW;
    const srcH = isRotated ? naturalW : naturalH;

    const effectiveW = srcW / zoom;
    const effectiveH = srcH / zoom;
    const offsetX = (srcW - effectiveW) / 2;
    const offsetY = (srcH - effectiveH) / 2;

    const cropX = Math.max(0, offsetX + (crop.x / 100) * effectiveW);
    const cropY = Math.max(0, offsetY + (crop.y / 100) * effectiveH);
    const cropW = Math.min(srcW - cropX, (crop.width / 100) * effectiveW);
    const cropH = Math.min(srcH - cropY, (crop.height / 100) * effectiveH);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    if (rotation === 90) {
      ctx.scale(canvas.width / cropW, canvas.height / cropH);
      ctx.translate(-cropX, -cropY);
      ctx.translate(srcW, 0);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, 0, 0);
    } else if (rotation === 180) {
      ctx.scale(canvas.width / cropW, canvas.height / cropH);
      ctx.translate(-cropX, -cropY);
      ctx.translate(srcW, srcH);
      ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(img, 0, 0);
    } else if (rotation === 270) {
      ctx.scale(canvas.width / cropW, canvas.height / cropH);
      ctx.translate(-cropX, -cropY);
      ctx.translate(0, srcH);
      ctx.rotate((270 * Math.PI) / 180);
      ctx.drawImage(img, 0, 0);
    } else {
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, canvas.width, canvas.height);
    }
    ctx.restore();
  }, [crop, zoom, rotation]);

  useEffect(() => {
    updateLivePreview();
  }, [updateLivePreview]);

  const handleRatioChange = (newRatio: AspectRatioType) => {
    setRatio(newRatio);
    setCrop((prev) => applyRatioToCrop(newRatio, prev));
  };

  const rotate = () => {
    setRotation((r) => (r + 90) % 360);
  };

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
      let newW = Math.max(10, Math.min(100 - start.x, start.width + deltaXPct));
      let newH = Math.max(10, Math.min(100 - start.y, start.height + deltaYPct));

      if (numRatio) {
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
      let newW = Math.max(10, start.width - deltaXPct);
      let newH = Math.max(10, start.height - deltaYPct);
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
      let newW = Math.max(10, Math.min(100 - start.x, start.width + deltaXPct));
      let newH = Math.max(10, start.height - deltaYPct);
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
      let newW = Math.max(10, start.width - deltaXPct);
      let newH = Math.max(10, Math.min(100 - start.y, start.height + deltaYPct));
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
      updateLivePreview();
    }
  };

  const applyCrop = () => {
    const img = imgRef.current;
    if (!img) return;

    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isRotated = rotation % 180 !== 0;
    const srcW = isRotated ? naturalH : naturalW;
    const srcH = isRotated ? naturalW : naturalH;

    const effectiveW = srcW / zoom;
    const effectiveH = srcH / zoom;
    const offsetX = (srcW - effectiveW) / 2;
    const offsetY = (srcH - effectiveH) / 2;

    const cropX = Math.max(0, offsetX + (crop.x / 100) * effectiveW);
    const cropY = Math.max(0, offsetY + (crop.y / 100) * effectiveH);
    const cropW = Math.min(srcW - cropX, (crop.width / 100) * effectiveW);
    const cropH = Math.min(srcH - cropY, (crop.height / 100) * effectiveH);

    canvas.width = Math.max(1, Math.round(cropW));
    canvas.height = Math.max(1, Math.round(cropH));

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
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
      0.96
    );
  };

  // Preview canvas dimensions based on ratio
  const previewCanvasWidth = 200;
  const previewCanvasHeight = ratio === "35:45" ? Math.round(200 * (45 / 35)) : 200;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header Bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-pak">
            Profile Photo Adjuster
          </span>
          <h3 className="mt-1 font-display text-base font-bold text-ink sm:text-lg">
            Position and crop your photo
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="md" onClick={rotate} className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
            <RotateCw className="h-3.5 w-3.5" />
            Rotate 90°
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => {
              setRotation(0);
              setZoom(1);
              setCrop({ x: 15, y: 15, width: 70, height: 70 });
            }}
            className="text-xs cursor-pointer"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Preset Aspect Ratio Pills */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-slate-700 mr-1">Aspect Ratio:</span>
        <button
          type="button"
          onClick={() => handleRatioChange("1:1")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
            ratio === "1:1"
              ? "bg-pak text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          1:1 Square (CNIC / Portals)
        </button>
        <button
          type="button"
          onClick={() => handleRatioChange("35:45")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
            ratio === "35:45"
              ? "bg-pak text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          35:45 Passport Size
        </button>
        <button
          type="button"
          onClick={() => handleRatioChange("free")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
            ratio === "free"
              ? "bg-pak text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Freeform Crop
        </button>
      </div>

      {/* Interactive Cropper + Live Zoomed Preview Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left Column: Interactive Cropping Frame */}
        <div className="lg:col-span-2">
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative mx-auto flex max-h-[440px] min-h-[280px] w-full select-none items-center justify-center overflow-hidden rounded-xl bg-slate-900 touch-none shadow-inner"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Original to crop"
              onLoad={updateLivePreview}
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom})`,
                transition: dragMode ? "none" : "transform 0.15s ease-out"
              }}
              className="max-h-[400px] w-full object-contain pointer-events-none"
            />

            {/* Dark mask outside crop box */}
            <div className="absolute inset-0 bg-black/55 pointer-events-none" />

            {/* Draggable, Resizable Crop Box */}
            <div
              style={{
                left: `${crop.x}%`,
                top: `${crop.y}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`
              }}
              onPointerDown={(e) => handlePointerDown("move", e)}
              className={`absolute cursor-move border-2 border-white shadow-2xl ring-2 ring-pak/80 touch-none ${
                ratio === "1:1" ? "rounded-lg" : "rounded-sm"
              }`}
            >
              {/* Inner Clear view */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 top-1/3 border-b border-white/40" />
                <div className="absolute inset-x-0 top-2/3 border-b border-white/40" />
                <div className="absolute inset-y-0 left-1/3 border-r border-white/40" />
                <div className="absolute inset-y-0 left-2/3 border-r border-white/40" />

                {showPassportGuide && (
                  <div className="absolute inset-x-[15%] inset-y-[10%] rounded-[50%] border-2 border-dashed border-amber-300 pointer-events-none">
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-amber-500/95 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      Face Position
                    </span>
                  </div>
                )}
              </div>

              {/* Corner Resize Handles */}
              <div
                onPointerDown={(e) => handlePointerDown("nw", e)}
                className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-white border-2 border-pak shadow cursor-nwse-resize"
              />
              <div
                onPointerDown={(e) => handlePointerDown("ne", e)}
                className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-white border-2 border-pak shadow cursor-nesw-resize"
              />
              <div
                onPointerDown={(e) => handlePointerDown("sw", e)}
                className="absolute -left-2.5 -bottom-2.5 h-5 w-5 rounded-full bg-white border-2 border-pak shadow cursor-nesw-resize"
              />
              <div
                onPointerDown={(e) => handlePointerDown("se", e)}
                className="absolute -right-2.5 -bottom-2.5 h-5 w-5 rounded-full bg-white border-2 border-pak shadow cursor-nwse-resize"
              />
            </div>
          </div>

          {/* Zoom Slider Control */}
          <div className="mt-3 flex items-center justify-center gap-3 rounded-xl bg-slate-50 px-4 py-2 border border-slate-200">
            <ZoomOut className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Zoom:</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => {
                setZoom(parseFloat(e.target.value));
              }}
              aria-label="Image zoom"
              className="h-1.5 w-44 max-w-full accent-pak cursor-pointer rounded-lg bg-slate-300"
            />
            <ZoomIn className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-bold text-pak">{Math.round(zoom * 100)}%</span>
          </div>
        </div>

        {/* Right Column: Live Zoomed Preview Window */}
        <div className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="w-full text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pak">
              <Eye className="h-3.5 w-3.5" />
              <span>Live Zoomed Preview</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              When you turn the crop smaller, the preview zooms in on your face automatically.
            </p>
          </div>

          {/* Live Zoomed Preview Canvas */}
          <div className="my-3 flex items-center justify-center overflow-hidden rounded-xl border-2 border-pak/40 bg-white shadow-md p-1">
            <canvas
              ref={previewCanvasRef}
              width={previewCanvasWidth}
              height={previewCanvasHeight}
              className="max-h-52 w-auto object-contain rounded-lg"
            />
          </div>

          <div className="w-full text-center">
            <span className="inline-block rounded-md bg-white px-2.5 py-1 text-xs font-bold text-ink border border-slate-200 shadow-2xs">
              {ratio === "35:45" ? "35 by 45 mm (Passport)" : ratio === "1:1" ? "1:1 Square (Portal)" : "Custom Crop"}
            </span>
            <p className="mt-1 text-[10px] text-slate-500">
              This is the exact output that will be compressed.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-slate-500">
        Drag the frame over your face. Drag corner circles smaller to zoom in closer. Works with mouse or finger touch.
      </p>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-3">
        <Button type="button" variant="outline" size="md" onClick={onCancel} className="inline-flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer">
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <Button type="button" size="md" onClick={applyCrop} className="inline-flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer">
          <Check className="h-4 w-4" />
          Apply Crop
        </Button>
      </div>
    </div>
  );
}
