# Architecture

## Goal

A fast tool site that works for a user on a low-end Android phone in Pakistan, with no server cost for file work, because all compression runs in the browser.

## Stack

- Next.js 15 App Router, TypeScript strict, React 19
- Tailwind CSS 3, shadcn/ui style components in `src/components/ui/`
- Canvas API for images, pdf-lib for PDF, jszip for ZIP (lazy loaded)
- No backend, no database, no file upload API

## How compression works

### Image

`src/lib/compress-image.ts` uses Canvas `toBlob` with a binary search on quality from 0.05 to 0.98. It tries full size first, then scales down in 4 stages: 1, 0.8, 0.6, 0.45, 0.32. At each stage it checks the real byte size. It keeps the highest quality that fits under the target. Re-encoding through Canvas strips EXIF and GPS data. PNG input is converted to JPG or WebP for size, because PNG is lossless and cannot shrink by quality alone. The pure function `binarySearchQuality` is unit tested in `src/lib/compress-image.test.ts`.

### PDF

`src/lib/compress-pdf.ts` uses pdf-lib. It loads the PDF, clears title, author, subject, keywords, producer, creator, and dates, then saves a clean copy. It cannot recompress embedded JPEG images in a reliable way, so it says so plainly when a text-only PDF cannot reach the target. The result includes original KB, new KB, saved KB, and a plain note.

### Passport photo

`src/lib/passport-photo.ts` crops to 413 by 531 px (35 by 45 mm at 300 DPI) with a white background. The print sheet is 2480 by 3508 px (A4 at 300 DPI) with 8 photos in 2 columns by 4 rows.

## Performance under load

- Pages are static where possible. The tool is a client component, the content pages are server components.
- No server work per file. A surge in users does not raise server cost, because the work runs on each user device.
- pdf-lib and jszip load only when the user opens the PDF or ZIP path. The home page bundle stays small.
- No large images on content pages. No client JS for guide text.
- CDN caching on Vercel. `next.config.js` sets `compress: true` and `images.unoptimized: true` because images are processed locally, not served from a remote host.

## File flow

1. User drops a file. `Dropzone` hands a `File` to the tool.
2. `validate.ts` reads the first 16 bytes and checks magic bytes, extension, and size. Max 25 MB image, 50 MB PDF. Executables are rejected.
3. Compression runs in the main thread for now. A Web Worker is the next step for large files. See the open issue in the repo.
4. Result Blob is offered as a download. Blob URLs are revoked after download and on unmount. No file is kept in localStorage.

## Security

- No `/api/upload` route. No fetch to an unknown server.
- CSP in `next.config.js` blocks external scripts, frames, and objects. `frame-ancestors 'none'`, `object-src 'none'`.
- Headers: X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera, microphone, geolocation off.
- `.env.example` has placeholders only. No real key is in the repo. Paddle or Lemon Squeezy keys stay server side only.
- File validation is by magic bytes, not only by name.

## Routes

- `/` main tool
- `/compress-image-to-20kb` etc. size pages, one static folder per size, 20, 50, 100, 200, 500
- `/compress-pdf-to-20kb` etc. PDF size pages, one static folder per size
- `/fpsc-photo-size` etc. portal pages, one static folder per portal, 15 portals
- `/guides` and `/guides/[slug]` 12 guides
- `/pricing`, `/privacy`, `/terms`
- `/sitemap.xml`, `/robots.txt` from `sitemap.ts` and `robots.ts`

## Bundle notes

Keep the home page light. Do not add a chart lib, a rich text editor, or a video player. If a new dep adds more than 50 KB to the first load, justify it in the PR.
