"use client";
import { SIZES } from "@/data/presets";

export function SizePresetPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Target size">
      {SIZES.map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)} aria-pressed={value === s} className={`rounded-full px-4 py-2 text-sm font-semibold border ${value === s ? "bg-pak text-white border-pak" : "bg-white text-ink border-slate-300 hover:border-pak"}`}>
          {s} KB
        </button>
      ))}
    </div>
  );
}

export function PortalPresetRow({ onPick }: { onPick: (kb: number) => void }) {
  const items = [
    { label: "CNIC 20 KB", kb: 20 },
    { label: "Passport 50 KB", kb: 50 },
    { label: "Job Portal 100 KB", kb: 100 },
    { label: "University 200 KB", kb: 200 }
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button key={it.label} type="button" onClick={() => onPick(it.kb)} className="rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm font-medium hover:border-pak hover:text-pak">
          {it.label}
        </button>
      ))}
    </div>
  );
}
