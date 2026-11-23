import { describe, it, expect } from "vitest";
import { binarySearchQuality, kbToBytes } from "./compress-image";

describe("binarySearchQuality", () => {
  it("finds the highest quality that fits under target", () => {
    const sizeForQuality = (q: number) => Math.round(q * 100000);
    const q = binarySearchQuality(sizeForQuality, kbToBytes(50));
    expect(q).not.toBeNull();
    expect(sizeForQuality(q as number)).toBeLessThanOrEqual(kbToBytes(50));
  });
  it("returns null when even lowest quality is over target", () => {
    const sizeForQuality = () => 999999;
    expect(binarySearchQuality(sizeForQuality, kbToBytes(20))).toBeNull();
  });
  it("kbToBytes converts correctly", () => {
    expect(kbToBytes(20)).toBe(20480);
    expect(kbToBytes(100)).toBe(102400);
  });
});
