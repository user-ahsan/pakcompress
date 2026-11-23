# Deployment - Vercel

## Steps

1. Push the repo to GitHub. Do not push `.env.local` or any real key.
2. Go to Vercel and import the repo.
3. Framework preset: Next.js. Build command: `npm run build`. Output: default.
4. Set `NEXT_PUBLIC_SITE_URL` to your live domain, for example `https://pakcompress.pk` or your Vercel URL.
5. Deploy. Check the home page, one size page, one portal page, and one guide page.
6. Add a custom domain in Vercel, then set the DNS records as Vercel shows them.
7. Check `https://yourdomain/sitemap.xml` and `https://yourdomain/robots.txt` after deploy.

## Domain

Pick a short domain if you can. `pakcompress.pk` is a good fit for Pakistan users. A `.com` also works. Keep the domain in `NEXT_PUBLIC_SITE_URL` so sitemap and canonical URLs are right.

## Checks after deploy

- Home page loads in under 2 seconds on a phone.
- Compressor works with a real photo from a phone.
- PDF tool works with a real PDF.
- No console errors on the home page.
- Sitemap lists the size, portal, and guide pages.

## Rollback

Vercel keeps each deploy. If a new deploy breaks the tool, roll back to the last good deploy in the Vercel dashboard. Do not edit files on the live site by hand.
