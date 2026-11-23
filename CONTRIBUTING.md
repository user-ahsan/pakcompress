# Contributing to PakCompress

Thank you for helping. This project is small on purpose. Keep it fast, private, and easy to use.

## How to contribute

1. Fork the repo and create a branch from `main`.
2. Run `npm install` and `npm run dev`.
3. Make your change. Keep it small and focused.
4. Run `npm run build` and `npm run test`. Both must pass.
5. Open a pull request with a clear title and a short note on what changed and why.

## Rules

- No file upload to a server. All compression stays in the browser.
- No secrets in code. Use `.env.example` for placeholders only.
- No em dashes in user-facing copy. See `docs/WRITING-GUIDE.md`.
- Do not invent official portal limits. Mark limits as typical and point to the official advertisement.
- Keep the home page light. Do not add a heavy dep without a note in the PR on why it is needed.
- Write tests for new compression logic.

## Content

- Guides must follow `docs/WRITING-GUIDE.md`.
- A new portal page needs a preset in `src/data/presets.ts` and a check that the limit is typical, not official.
- A new size page needs a working tool on that page.

## Reporting a bug

Use the bug report template in `.github/ISSUE_TEMPLATE/bug_report.md`. Include the browser, the file type, the target KB, and the result you saw.
