import type { AIProvider } from "@start-x-work/mos-kit";
import { z } from "zod";
import { parseJsonFromText } from "../json";
import { checkUrlPlacement } from "./url-placement";

export const PostEvalSchema = z.object({
  text: z.string(),
  platform: z.string(),
  scores: z.object({
    hook: z.number(),
    clarity: z.number(),
    engagement: z.number(),
    urlPlacement: z.number(),
  }),
  warnings: z.array(z.string()),
  feedback: z.array(z.string()),
});

export type PostEval = z.infer<typeof PostEvalSchema>;

export async function evaluatePost(
  ai: AIProvider,
  text: string,
  platform = "x",
): Promise<PostEval> {
  const urlCheck = checkUrlPlacement(text, platform);

  const prompt = `Evaluate the following ${platform} post for hook, clarity, and engagement potential. Return JSON only with keys scores {hook, clarity, engagement} and feedback (string array). Do not rewrite or generate new copy: "${text}"`;
  const json = await ai.complete(prompt, { json: true });
  const aiEval = parseJsonFromText<{
    scores?: { hook?: number; clarity?: number; engagement?: number };
    feedback?: string[];
  }>(json);

  return PostEvalSchema.parse({
    text,
    platform,
    scores: {
      hook: aiEval.scores?.hook ?? 0,
      clarity: aiEval.scores?.clarity ?? 0,
      engagement: aiEval.scores?.engagement ?? 0,
      urlPlacement: urlCheck.score,
    },
    warnings: [...urlCheck.warnings],
    feedback: aiEval.feedback ?? [],
  });
}
