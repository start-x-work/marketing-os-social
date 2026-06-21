import { aiKeysForModel, loadAiKeys } from "./ai-settings";

export interface PostEvalResult {
  text: string;
  platform: string;
  scores: {
    hook: number;
    clarity: number;
    engagement: number;
    urlPlacement: number;
  };
  warnings: string[];
  feedback: string[];
}

export interface CalendarAnalysisResult {
  totalPosts: number;
  byPlatform: Record<string, number>;
  promoRatio: number;
  cadenceIssues: string[];
  warnings: string[];
}

export interface AccountAuditResult {
  handle: string;
  platform: string;
  checks: Array<{ id: string; label: string; passed: boolean; detail: string }>;
  recommendations: string[];
}

export async function evaluatePost(input: {
  text: string;
  platform?: string;
  model?: string;
}): Promise<PostEvalResult> {
  const model = (input.model ?? "gemini") as "gemini" | "openai" | "anthropic";
  return request("/api/post/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      model,
      ...aiKeysForModel(loadAiKeys(), model),
    }),
  });
}

export async function analyzeCalendar(
  posts: unknown,
): Promise<CalendarAnalysisResult> {
  return request("/api/calendar/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posts }),
  });
}

export async function auditAccount(
  handle: string,
): Promise<AccountAuditResult> {
  return request("/api/account/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ handle, platform: "manual" }),
  });
}

async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);
  const json = await res.json().catch(() => undefined);
  if (!res.ok) {
    const message =
      typeof json === "object" && json && "error" in json
        ? String(json.error)
        : "Request failed";
    throw new Error(message);
  }
  return json as T;
}
