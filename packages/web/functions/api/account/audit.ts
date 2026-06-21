import {
  auditAccount,
  ManualDataPlatform,
} from "@start-x-work/marketing-os-social-core";
import { jsonError, readJson } from "../../_shared";

interface AuditBody {
  handle?: string;
  platform?: string;
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const body = await readJson<AuditBody>(request);
    const handle = body.handle?.trim();
    if (!handle) {
      throw new Error("handle is required");
    }
    const platform = new ManualDataPlatform("");
    const result = await auditAccount(platform, handle);
    return Response.json(result);
  } catch (error) {
    return jsonError(error, "Account audit failed");
  }
};
