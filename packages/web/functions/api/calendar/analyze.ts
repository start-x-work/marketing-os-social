import {
  analyzeCalendar,
  PlannedPostSchema,
} from "@start-x-work/marketing-os-social-core";
import { jsonError, readJson } from "../../_shared";

interface AnalyzeBody {
  posts?: unknown;
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const body = await readJson<AnalyzeBody>(request);
    const posts = PlannedPostSchema.array().parse(body.posts ?? []);
    return Response.json(analyzeCalendar(posts));
  } catch (error) {
    return jsonError(error, "Calendar analysis failed");
  }
};
