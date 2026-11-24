"use client";
import { useRef, useState } from "react";

export interface DropzoneProps {
  accept: string;
  onFile: (f: File) => void;
  label: string;
  urduHelp?: string;
  fileLimits?: string;
  icon?: string;
}

export function Dropzone({
  accept,
  onFile,
  label,
  urduHelp = "Photo yahan drop karein, ya click karke file chunein. File aapke device par rehti hai, upload nahi hoti.",
  fileLimits = "JPG, PNG, WebP up to 25 MB. Files stay on your device.",
  icon = "📁"
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-label={label}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
        className={`w-full rounded-2xl border-2 border-dashed p-8 text-center transition cursor-pointer ${drag ? "border-pak bg-pak-light shadow-md" : "border-slate-300 bg-white hover:border-pak hover:bg-slate-50/50"}`}
      >
        <div className="text-4xl" aria-hidden="true">{icon}</div>
        <p className="mt-3 font-display text-lg font-bold text-ink">{label}</p>
        <p className="mt-1 text-sm text-slate-600">{urduHelp}</p>
        <p className="mt-2 text-xs font-medium text-slate-500">{fileLimits}</p>
      </button>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
    </div>
  );
}
