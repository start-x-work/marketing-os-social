import { z } from "zod";
import { checkPromoRatio } from "./promo-ratio";

export const PlannedPostSchema = z.object({
  date: z.string(),
  platform: z.string(),
  text: z.string(),
  type: z.enum(["value", "promotional", "engagement"]).default("value"),
});

export type PlannedPost = z.infer<typeof PlannedPostSchema>;

export interface CalendarAnalysis {
  totalPosts: number;
  byPlatform: Record<string, number>;
  promoRatio: number;
  cadenceIssues: string[];
  warnings: string[];
}

export function analyzeCalendar(posts: PlannedPost[]): CalendarAnalysis {
  const promo = checkPromoRatio(posts);
  const byPlatform: Record<string, number> = {};

  for (const p of posts) {
    byPlatform[p.platform] = (byPlatform[p.platform] ?? 0) + 1;
  }

  return {
    totalPosts: posts.length,
    byPlatform,
    promoRatio: promo.ratio,
    cadenceIssues: [],
    warnings: promo.warnings,
  };
}
