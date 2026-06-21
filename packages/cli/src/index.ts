#!/usr/bin/env node
import { CliError } from "@start-x-work/marketing-os-social-core";
import { defineCommand, runMain } from "citty";
import pc from "picocolors";
import socialCommand, { subCommands } from "./command";

const main = defineCommand({
  meta: {
    name: "mos-social",
    description: socialCommand.meta?.description ?? "Marketing-OS Social toolkit",
  },
  subCommands,
});

runMain(main).catch((error: unknown) => {
  if (error instanceof CliError) {
    console.error(pc.red(`Error [${error.code}]: ${error.message}`));
    process.exit(1);
  }
  throw error;
});
