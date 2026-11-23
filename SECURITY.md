# Security Policy

## How PakCompress handles your files

PakCompress works in your browser. Your photo and PDF never leave your device. There is no upload API and no database for files.

## Reporting a vulnerability

If you find a security issue, email ahsansheikhoffice@gmail.com with the subject "PakCompress security". Include the page, the steps to reproduce, and the browser you used. Do not open a public issue for a security bug.

## What we check

- File type by magic bytes, not only by extension
- Max 25 MB image, 50 MB PDF
- Executables and scripts rejected as input
- CSP and security headers in `next.config.js`
- No secrets in frontend code

## Supported versions

The `main` branch is the supported version. Security fixes go to `main` first.
