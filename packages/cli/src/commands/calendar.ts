import {
  analyzeCalendar,
  CliError,
  PlannedPostSchema,
} from "@start-x-work/marketing-os-social-core";
import { defineCommand } from "citty";
import { runSafely } from "../errors";
import { render } from "../output/render";
import { formatArg, parseQuiet, quietArg } from "../shared";

function parsePlannedPosts(raw: string) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "invalid planned posts JSON";
    throw new CliError(`Invalid planned posts JSON: ${detail}`, "E_INPUT");
  }

  if (!Array.isArray(parsed)) {
    throw new CliError(
      "Invalid planned posts JSON: expected a JSON array",
      "E_INPUT",
    );
  }

  return parsed.map((item, index) => {
    const result = PlannedPostSchema.safeParse(item);
    if (!result.success) {
      throw new CliError(
        `Invalid planned post at index ${index}: ${result.error.message}`,
        "E_INPUT",
      );
    }
    return result.data;
  });
}

export default defineCommand({
  meta: {
    name: "calendar",
    description: "Content calendar analysis tools",
  },
  subCommands: {
    analyze: defineCommand({
      meta: {
        name: "analyze",
        description: "Analyze a planned content calendar (1/10 rule)",
      },
      args: {
        json: {
          type: "positional",
          required: true,
          description: "JSON array of planned posts",
        },
        format: formatArg,
        quiet: quietArg,
      },
      async run({ args }) {
        await runSafely(async () => {
          const posts = parsePlannedPosts(String(args.json));
          const result = analyzeCalendar(posts);
          render(result, args.format, { quiet: parseQuiet(args.quiet) });
        });
      },
    }),
  },
});
