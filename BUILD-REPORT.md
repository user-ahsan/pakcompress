# Build Report - PakCompress

Date: 2026-11-23
Node: v24.22.1, npm 10.9.4
Location: ~/workspace/projects/pakistan-photo-pdf-compressor
Status: BUILD PASSES, TESTS PASS, ALL SMOKE URLS 200

## Commands run

- `npm install` - 421 packages, passed
- `npm install next@15.5.9 eslint-config-next@15.5.9` - upgraded from 15.1.6 to patch CVE-2025-66478, passed
- `npm run build` - passed, 47 static pages
- `npm run test` - Vitest, 1 file, 3 tests passed
- `npm run typecheck` - `tsc --noEmit`, passed, no errors
- `npm run start` smoke test - 14 URLs checked, all 200

## Build output

Route list, 47 pages total:
- `/` home with Compressor, PdfCompressor, PassportMaker inline
- 5 image size pages: 20, 50, 100, 200, 500 KB
- 5 PDF size pages: 20, 50, 100, 200, 500 KB
- 15 portal pages: FPSC, PPSC, SPSC, KPPSC, BPSC, NTS, NADRA, HEC, BISE Lahore, BISE Karachi, UHS, NUST, LUMS, PU, IBA
- `/guides` plus 12 guide pages
- `/pricing`, `/privacy`, `/terms`, `/sitemap.xml`, `/robots.txt`, `/_not-found`

First Load JS: home 287 kB, PDF pages 281 kB, other pages 102 to 106 kB. Shared chunks 102 kB.

## Smoke test results

All returned 200:
`/`, `/compress-image-to-20kb`, `/compress-image-to-100kb`, `/compress-pdf-to-200kb`, `/fpsc-photo-size`, `/ppsc-photo-size`, `/nts-photo-size`, `/nadra-photo-size`, `/hec-photo-size`, `/guides`, `/guides/compress-photo-to-50kb-for-fpsc`, `/pricing`, `/sitemap.xml`, `/robots.txt`

## Bug found and fixed during build

First build passed but `/compress-image-to-20kb` and `/fpsc-photo-size` returned 404 at runtime. Cause: Next.js 15 does not expand a dynamic segment in the middle of a folder name, such as `compress-image-to-[size]kb` and `[portal]-photo-size`. `generateStaticParams` did not generate those pages, only 25 pages were built.

Fix: replaced those 3 dynamic folders with plain static folders, one per page, generated from `src/data/presets.ts`:
- `src/app/compress-image-to-20kb/` etc., 5 folders
- `src/app/compress-pdf-to-20kb/` etc., 5 folders
- `src/app/fpsc-photo-size/` etc., 15 folders

After the fix the build generates 47 pages and all smoke URLs return 200. The guides route `/guides/[slug]` is a plain `[slug]` folder and worked from the start, so it was kept as a dynamic route.

## What works

- Image compression to exact KB with binary search on quality plus downscale steps, in `src/lib/compress-image.ts`
- PDF cleaning with pdf-lib, with an honest note when a text-only PDF cannot reach the target, in `src/lib/compress-pdf.ts`
- Passport photo 413 by 531 px and A4 print sheet with 8 photos, in `src/lib/passport-photo.ts`
- File validation by magic bytes, max 25 MB image and 50 MB PDF, executables rejected, in `src/lib/validate.ts`
- ZIP helper in `src/lib/zip.ts` using jszip and file-saver, for Pro batch
- Security headers and CSP in `next.config.js`, no `/api/upload`, no database, no secrets in frontend
- SEO: sitemap, robots, canonical URLs, JSON-LD FAQ and SoftwareApplication, `generateMetadata` on size, portal, and guide pages
- 12 guides in `src/data/guides.ts` and `content/guides/*.md`, no em dashes, no banned AI words in guide body text. The banned words appear only in `docs/WRITING-GUIDE.md` where they are listed as words not to use.
- Unit tests for binary search, Playwright smoke test outline in `tests/smoke.spec.ts` (not run in CI here, it needs a dev server)

## What is stubbed

- Paid checkout: Pro modal and pricing page are UI stubs only. No Paddle or Lemon Squeezy keys, no payment code. See `docs/MONETIZATION.md` before charging anyone.
- Batch compress and ZIP download in the UI: the `downloadZip` helper exists, but the batch UI button opens the Pro modal. Batch flow is not wired to checkout yet.
- Web Worker for compression: noted as a next step in `docs/ARCHITECTURE.md`. Compression currently runs on the main thread.
- Screenshots in README: placeholders only. Add `public/screenshot-home.png` and `public/screenshot-tool.png` after the first deploy.
- Site URL is a placeholder: `https://pakcompress.example.com` in `sitemap.ts`, `robots.ts`, and layout metadata. Set `NEXT_PUBLIC_SITE_URL` to the real domain before launch.

## Files

96 files in the repo, not counting `node_modules/` and `.next/`. Includes package.json, configs, 12 guide Markdown files, 5 docs, README, CONTRIBUTING, CODE_OF_CONDUCT, LICENSE, SECURITY, GitHub templates and CI workflow.

## Next step to push to GitHub - do not push yet

This build was not pushed. To push, run these commands from the project folder:

```bash
cd ~/workspace/projects/pakistan-photo-pdf-compressor
git init
git add .
git commit -m "PakCompress v1: photo and PDF compressor to exact KB for Pakistan forms"
git branch -M main
git remote add origin https://github.com/user-ahsan/pakcompress.git
git push -u origin main
```

Then in Vercel, import the repo, set `NEXT_PUBLIC_SITE_URL` to the live domain, and deploy. See `docs/DEPLOYMENT.md`.
