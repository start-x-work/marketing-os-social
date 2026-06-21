import {
  createProvider,
  evaluatePost,
  isModelKind,
} from "@start-x-work/marketing-os-social-core";
import { resolveApiKey, type AiKeyRequest } from "../../_ai-key";
import { type Env, jsonError, readJson } from "../../_shared";

interface EvaluateBody extends AiKeyRequest {
  text?: string;
  platform?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await readJson<EvaluateBody>(request);
    const text = body.text?.trim();
    if (!text) {
      throw new Error("text is required");
    }
    const model = body.model ?? "gemini";
    if (!isModelKind(model)) {
      throw new Error("Invalid model");
    }
    const apiKey = resolveApiKey(body, env, model);
    const result = await evaluatePost(
      createProvider(model, apiKey),
      text,
      body.platform ?? "x",
    );
    return Response.json(result);
  } catch (error) {
    return jsonError(error, "Post evaluation failed");
  }
};
