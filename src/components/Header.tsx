import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-bold text-pak">PakCompress</Link>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm font-medium">
          <Link href="/guides" className="hidden sm:inline hover:text-pak">Guides</Link>
          <Link href="/pricing" className="hidden sm:inline hover:text-pak">Pricing</Link>
          <Link href="/#compress" className="rounded-lg bg-pak px-3 py-2 text-white">Compress now</Link>
        </nav>
      </div>
    </header>
  );
}
