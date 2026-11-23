import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-sand">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-pak">PakCompress</p>
          <p className="mt-2 text-sm text-slate-600">Photo and PDF compressor to exact KB for Pakistan forms. No upload. Your file stays in your browser.</p>
        </div>
        <div>
          <p className="font-semibold">Tools</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/compress-image-to-20kb">Compress image to 20 KB</Link></li>
            <li><Link href="/compress-image-to-50kb">Compress image to 50 KB</Link></li>
            <li><Link href="/compress-image-to-100kb">Compress image to 100 KB</Link></li>
            <li><Link href="/compress-pdf-to-200kb">Compress PDF to 200 KB</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Portals</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/fpsc-photo-size">FPSC photo size</Link></li>
            <li><Link href="/ppsc-photo-size">PPSC photo size</Link></li>
            <li><Link href="/nts-photo-size">NTS photo size</Link></li>
            <li><Link href="/nadra-photo-size">NADRA photo size</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Site</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">Built by Ahsan Ali, Lahore, Pakistan. https://ahsanali.cc</div>
    </footer>
  );
}
