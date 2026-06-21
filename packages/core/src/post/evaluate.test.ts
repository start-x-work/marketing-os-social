import type { AIProvider } from "@start-x-work/mos-kit";
import { describe, expect, it, vi } from "vitest";
import { evaluatePost } from "./evaluate";

const mockAI: AIProvider = {
  complete: vi.fn().mockResolvedValue(
    JSON.stringify({
      scores: { hook: 85, clarity: 80, engagement: 70 },
      feedback: ["Strong opening hook"],
    }),
  ),
  embed: vi.fn(),
};

describe("evaluatePost", () => {
  it("returns scores without generating new copy", async () => {
    const result = await evaluatePost(mockAI, "Start your journey today", "x");
    expect(result.text).toBe("Start your journey today");
    expect(result.scores.hook).toBe(85);
    expect(result.feedback.length).toBeGreaterThan(0);
  });

  it("includes URL placement warnings for body URLs on X", async () => {
    const result = await evaluatePost(
      mockAI,
      "Visit https://example.com/lp now",
      "x",
    );
    expect(result.scores.urlPlacement).toBe(40);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});
