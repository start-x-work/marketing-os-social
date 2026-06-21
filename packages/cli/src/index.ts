#!/usr/bin/env node
import { CliError } from "@start-x-work/marketing-os-social-core";
import { defineCommand, runMain } from "citty";
import pc from "picocolors";
import account from "./commands/account";
import calendar from "./commands/calendar";
import post from "./commands/post";

const main = defineCommand({
  meta: { name: "mos-social", description: "Marketing-OS Social toolkit" },
  subCommands: {
    post,
    calendar,
    account,
  },
});

runMain(main).catch((error: unknown) => {
  if (error instanceof CliError) {
    console.error(pc.red(`Error [${error.code}]: ${error.message}`));
    process.exit(1);
  }
  throw error;
});
