# SEO Plan - 2,000 to 3,000 queries

## The math

5 sizes x 8 file types x 15 portals x 4 intents = 2,400 base combinations.
Add city and board variants and the set grows past 3,000.

We do not build 3,000 thin pages. Thin pages hurt the site. We build 60 real pages now:

- 5 image size pages
- 5 PDF size pages
- 15 portal pages
- 12 guides
- Home, guides index, pricing, privacy, terms, plus sitemap and robots

That is 42 pages in the first build, plus the home page and index pages. The rest stay as data in `src/data/presets.ts` and `src/data/seo-keywords.md`. Add a new page only when a cluster has real search demand and a real guide or tool to match it.

## Page types

### Size pages

Path: `/compress-image-to-20kb`, `/compress-pdf-to-100kb`, and so on.
Each page has a working tool, a clear target, and a short how-to. Title and description name the size and the use in Pakistan. Canonical URL is set.

### Portal pages

Path: `/fpsc-photo-size`, `/ppsc-photo-size`, `/nts-photo-size`, and so on.
Each page lists the typical photo, signature, and PDF limits for that portal. Each page says in plain words: Always check the official advertisement, because requirements change. Do not present a typical limit as an official rule.

### Guides

Path: `/guides/[slug]`, 12 guides in the first build.
Each guide is 600 to 900 words in the source file, with real numbers and real steps for a Pakistan form. See `docs/WRITING-GUIDE.md` for the style rules.

## Technical SEO

- `generateMetadata` on every route, with title, description, and canonical URL
- JSON-LD on the home page: FAQPage and SoftwareApplication
- `sitemap.ts` lists all size, portal, and guide pages
- `robots.ts` allows all pages, blocks `/api/`, points to the sitemap
- Fast Core Web Vitals: no large images, no client JS for guide text, static pages where possible
- Mobile first. Most users in Pakistan will open the site on a phone.

## Content plan

Write guides in this order, based on demand in Pakistan:

1. CNIC 20 KB
2. FPSC 50 KB
3. PPSC 50 KB
4. Job portal 100 KB
5. PDF 100 KB
6. PDF 200 KB
7. Passport 35 by 45 mm
8. NTS photo size
9. NADRA 20 KB
10. HEC attestation
11. Signature 20 KB
12. University 200 KB

After launch, add guides for BISE, UHS, NUST, and LUMS only when the portal page for that body gets traffic.

## What not to do

- Do not create a page with no tool and no guide.
- Do not copy a guide and change only the portal name.
- Do not invent an official limit. If you do not know the limit, say you do not know and point to the official advertisement.
- Do not use AI-writing signs. See `docs/WRITING-GUIDE.md`.
