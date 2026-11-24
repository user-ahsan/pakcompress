"use client";
export function ProModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="PakCompress Pro">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
            🔒 Pro Feature
          </span>
          <button onClick={onClose} aria-label="Close dialog" className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <h2 className="mt-2 font-display text-xl font-bold">PakCompress Pro</h2>
        <p className="mt-2 text-sm text-slate-600">Batch compress, ZIP download, passport print sheet, and PDF to exact KB. Payment is a stub in this build. Connect Paddle or Lemon Squeezy in docs/MONETIZATION.md before you charge anyone.</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2"><span aria-hidden="true">🔒</span> <span>Batch: up to 10 files at once</span></li>
          <li className="flex items-center gap-2"><span aria-hidden="true">🔒</span> <span>ZIP: download all results in one file</span></li>
          <li className="flex items-center gap-2"><span aria-hidden="true">🔒</span> <span>Passport sheet: 8 photos on one A4 page</span></li>
          <li className="flex items-center gap-2"><span aria-hidden="true">🔒</span> <span>Priority: no ads, faster queue</span></li>
        </ul>
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50">Close</button>
          <a href="/pricing" className="flex-1 rounded-lg bg-pak px-4 py-2 text-center font-semibold text-white hover:bg-pak-dark">See pricing</a>
        </div>
      </div>
    </div>
  );
}
