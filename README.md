# PakCompress - Photo and PDF Compressor to Exact KB for Pakistan Forms

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![No upload](https://img.shields.io/badge/Privacy-No%20upload-brightgreen)

PakCompress compresses a photo or PDF to an exact KB target in your browser. No upload. No account. Built for students and job seekers in Pakistan who need a photo under 20 KB, 50 KB, 100 KB or 200 KB for FPSC, PPSC, NTS, NADRA, HEC, BISE and university forms.

## Who it is for

- Students applying for FPSC, PPSC, NTS, and university admission
- Job seekers uploading a photo to a portal that rejects files over 100 KB
- Anyone who needs a passport size photo (35 by 45 mm, 413 by 531 px) or a PDF under a set limit

## Features

- Compress image to 20, 50, 100, 200 or 500 KB with binary search on quality plus downscale steps
- Compress PDF with metadata cleaning and an honest note when a text-only PDF cannot reach the target
- Passport photo maker: 35 by 45 mm, 413 by 531 px at 300 DPI, white background
- A4 print sheet with 8 passport photos (Pro UI)
- Portal presets: CNIC 20 KB, Passport 50 KB, Job Portal 100 KB, University 200 KB
- 15 portal pages: FPSC, PPSC, SPSC, KPPSC, BPSC, NTS, NADRA, HEC, BISE Lahore, BISE Karachi, UHS, NUST, LUMS, PU, IBA
- 12 practical guides with real numbers for Pakistan forms
- Programmatic SEO: sitemap, robots, JSON-LD FAQ and SoftwareApplication, canonical URLs

## Free vs Pro

| | Free | Pro (planned) |
|---|---|---|
| Files at once | 1 | Up to 10 |
| Targets | 20, 50, 100, 200, 500 KB | Same, plus batch |
| ZIP download | No | Yes |
| Passport print sheet | No | Yes |
| PDF to exact KB | Basic clean | Full |

Pro checkout is a UI stub in this build. See `docs/MONETIZATION.md`. Do not charge users until Paddle or Lemon Squeezy is wired up with keys kept server side only.

## How it works - no upload

1. Drop a photo or PDF in the box.
2. Pick a target size or a portal preset.
3. The tool runs in your browser with Canvas and pdf-lib. It checks the real file size in bytes after each try.
4. Download the result. Close the tab and the file is gone.

Your file never leaves your device. There is no `/api/upload` route. There is no database.

## Tech stack

- Next.js 15 App Router, TypeScript strict, React 19
- Tailwind CSS + shadcn/ui style components (no heavy UI lib)
- Canvas API for image compression, pdf-lib for PDF, jszip for ZIP
- Vercel for hosting, static + ISR where possible
- Vitest for unit tests, Playwright for smoke tests

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
npm run build
npm run test
```

## Project structure

```text
src/app/            Routes, sitemap, robots, metadata
src/app/compress-image-to-20kb/ etc.  Size pages (one static folder per size, 20/50/100/200/500)
src/app/compress-pdf-to-20kb/ etc.    PDF size pages (one static folder per size)
src/app/fpsc-photo-size/ etc.         Portal pages (one static folder per portal)
src/app/guides/[slug]/              12 guides
src/components/     Compressor, PdfCompressor, PassportMaker, Dropzone
src/lib/            compress-image, compress-pdf, passport-photo, validate
src/data/           presets, seo-pages, guides, seo-keywords
content/guides/     Markdown source for the 12 guides
docs/               ARCHITECTURE, SEO-PLAN, WRITING-GUIDE, DEPLOYMENT, MONETIZATION
.github/            Issue templates, PR template, CI workflow
```

## SEO plan summary

5 sizes x 8 file types x 15 portals x 4 intents = 2,400 base combinations. We build 60 real pages now and add more only when a cluster has real demand and a real guide. See `docs/SEO-PLAN.md` and `src/data/seo-keywords.md`.

## Security

- File type checked by magic bytes, not only by extension
- Max 25 MB image, 50 MB PDF, executables rejected
- CSP, X-Content-Type-Options, X-Frame-Options in `next.config.js`
- No secrets in frontend. See `.env.example` and `SECURITY.md`.

## Screenshots

Placeholders. Add `public/screenshot-home.png` and `public/screenshot-tool.png` after the first deploy, then link them here.

## License

MIT. See `LICENSE`.

## Contact

Ahsan Ali, Lahore, Pakistan
Portfolio: https://ahsanali.cc
GitHub: https://github.com/user-ahsan
