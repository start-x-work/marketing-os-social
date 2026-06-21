import {
  createProvider,
  evaluatePost,
} from "@start-x-work/marketing-os-social-core";
import { defineCommand } from "citty";
import { runSafely } from "../errors";
import { render } from "../output/render";
import {
  formatArg,
  modelArg,
  parseModel,
  parsePlatform,
  parseQuiet,
  platformArg,
  quietArg,
} from "../shared";

export default defineCommand({
  meta: { name: "post", description: "Post evaluation tools" },
  subCommands: {
    evaluate: defineCommand({
      meta: {
        name: "evaluate",
        description: "Evaluate a social post (no generation)",
      },
      args: {
        text: {
          type: "positional",
          required: true,
          description: "Post text to evaluate",
        },
        platform: platformArg,
        format: formatArg,
        model: modelArg,
        quiet: quietArg,
      },
      async run({ args }) {
        await runSafely(async () => {
          const result = await evaluatePost(
            createProvider(parseModel(args.model)),
            String(args.text),
            parsePlatform(args.platform),
          );
          render(result, args.format, { quiet: parseQuiet(args.quiet) });
        });
      },
    }),
  },
});
