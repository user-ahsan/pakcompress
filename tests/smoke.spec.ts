import { test, expect } from "@playwright/test";

// Smoke test outline. Run with: npm run dev (in one terminal) then npm run test:e2e
test("home page loads and shows compressor", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Compress photo and PDF/i })).toBeVisible();
  await expect(page.getByLabel("Drop your photo here").first()).toBeVisible();
});

test("20kb page loads", async ({ page }) => {
  await page.goto("/compress-image-to-20kb");
  await expect(page.getByRole("heading", { name: /Compress image to 20 KB/i })).toBeVisible();
});

test("FPSC page loads", async ({ page }) => {
  await page.goto("/fpsc-photo-size");
  await expect(page.getByRole("heading", { name: /FPSC photo size/i })).toBeVisible();
});
