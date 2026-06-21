import {
  auditAccount,
  CliError,
  ManualDataPlatform,
} from "@start-x-work/marketing-os-social-core";
import { defineCommand } from "citty";
import { runSafely } from "../errors";
import { render } from "../output/render";
import {
  formatArg,
  parsePlatform,
  parseQuiet,
  platformArg,
  quietArg,
} from "../shared";

export default defineCommand({
  meta: {
    name: "account",
    description: "Account and profile audit tools",
  },
  subCommands: {
    audit: defineCommand({
      meta: {
        name: "audit",
        description: "Audit account profile (read-only)",
      },
      args: {
        handle: {
          type: "positional",
          required: true,
          description: "Account handle to audit",
        },
        platform: {
          ...platformArg,
          default: "manual",
        },
        format: formatArg,
        quiet: quietArg,
      },
      async run({ args }) {
        await runSafely(async () => {
          const platformName = parsePlatform(args.platform);
          const handle = String(args.handle);

          if (platformName !== "manual") {
            throw new CliError(
              `Platform "${platformName}" is not yet supported. Use --platform manual for v0.1.`,
              "E_INPUT",
            );
          }

          const platform = new ManualDataPlatform("");
          const result = await auditAccount(platform, handle);
          render(result, args.format, { quiet: parseQuiet(args.quiet) });
        });
      },
    }),
  },
});
