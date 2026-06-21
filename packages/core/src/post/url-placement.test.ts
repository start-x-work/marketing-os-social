import { describe, expect, it } from "vitest";
import { checkUrlPlacement } from "./url-placement";

describe("checkUrlPlacement", () => {
  it("warns when URL is in body on X", () => {
    const result = checkUrlPlacement("Check out https://example.com/lp", "x");
    expect(result.score).toBe(40);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("passes when no URL in body", () => {
    const result = checkUrlPlacement("Value-first post without links", "x");
    expect(result.score).toBe(100);
    expect(result.warnings).toHaveLength(0);
  });

  it("does not penalize URLs on platforms without body penalty", () => {
    const result = checkUrlPlacement(
      "Read more at https://example.com",
      "note",
    );
    expect(result.score).toBe(100);
    expect(result.warnings).toHaveLength(0);
  });
});
