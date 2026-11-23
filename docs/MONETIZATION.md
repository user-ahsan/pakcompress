# Monetization

## Model

Free: 1 file at a time to 20, 50, 100, 200 or 500 KB. Passport photo single. No account.
Pro (planned): Rs 499 per month. Batch up to 10 files, ZIP download, passport print sheet, PDF to exact KB, no ads.

## Payment in Pakistan

Stripe is not available for a Pakistan business in the normal way. Use one of these instead:

- Paddle: handles tax and cards. Good fit for a small tool. Keys stay server side only.
- Lemon Squeezy: simple checkout for a small tool. Keys stay server side only.
- JazzCash or Easypaisa manual: user pays by wallet, you check the payment by hand, then you send a Pro code. Slow, but it works when cards fail. Only use this as a backup.

Do not put a payment key in frontend code. Do not put a real key in `.env.example`. The Pro modal in this build is a stub. It shows the Pro features and links to pricing. It does not take payment.

## Ads

Google AdSense can work once the site has real traffic and real guides. Do not add ads before the tool works well. Ads on a tool page slow the page and hurt trust. If you add ads, keep them below the tool, not above it.

## What to charge for

Charge for time saved, not for a single compress. Batch and ZIP save time for a student who has 10 files. A passport print sheet saves a trip to a print shop. That is what Pro sells.

## What not to do

- Do not charge for the basic 1 file compress. That must stay free, or users will go to a free site.
- Do not lock the exact KB target behind pay. The target is the core free feature.
- Do not take payment before the checkout is tested end to end.
