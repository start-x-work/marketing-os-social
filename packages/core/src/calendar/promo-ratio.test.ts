import { describe, expect, it } from "vitest";
import { checkPromoRatio } from "./promo-ratio";

describe("checkPromoRatio", () => {
  it("warns when promotional ratio exceeds 10%", () => {
    const posts = Array.from({ length: 10 }, (_, i) => ({
      type: i < 2 ? "promotional" : "value",
    }));
    const result = checkPromoRatio(posts);
    expect(result.ratio).toBe(0.2);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("passes when promotional ratio is at or below 10%", () => {
    const posts = Array.from({ length: 10 }, (_, i) => ({
      type: i === 0 ? "promotional" : "value",
    }));
    const result = checkPromoRatio(posts);
    expect(result.ratio).toBe(0.1);
    expect(result.warnings).toHaveLength(0);
  });

  it("returns zero ratio for empty calendar", () => {
    const result = checkPromoRatio([]);
    expect(result.ratio).toBe(0);
    expect(result.warnings).toHaveLength(0);
  });
});
