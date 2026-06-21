import { describe, expect, it } from "vitest";
import { analyzeCalendar } from "./analyze";

describe("analyzeCalendar", () => {
  it("aggregates posts by platform and flags promo ratio", () => {
    const result = analyzeCalendar([
      {
        date: "2026-06-01",
        platform: "x",
        text: "Value post",
        type: "value",
      },
      {
        date: "2026-06-02",
        platform: "x",
        text: "Promo post",
        type: "promotional",
      },
      {
        date: "2026-06-03",
        platform: "threads",
        text: "Another promo",
        type: "promotional",
      },
    ]);

    expect(result.totalPosts).toBe(3);
    expect(result.byPlatform.x).toBe(2);
    expect(result.byPlatform.threads).toBe(1);
    expect(result.promoRatio).toBeCloseTo(2 / 3);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("passes a calendar within 1/10 promo rule", () => {
    const posts = Array.from({ length: 10 }, (_, i) => ({
      date: `2026-06-${String(i + 1).padStart(2, "0")}`,
      platform: "x",
      text: `Post ${i + 1}`,
      type: (i === 0 ? "promotional" : "value") as "promotional" | "value",
    }));

    const result = analyzeCalendar(posts);
    expect(result.promoRatio).toBe(0.1);
    expect(result.warnings).toHaveLength(0);
  });
});
