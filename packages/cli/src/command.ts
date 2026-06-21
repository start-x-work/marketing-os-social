import { defineCommand } from "citty";

export const subCommands = {
  post: () => import("./commands/post").then((m) => m.default),
  calendar: () => import("./commands/calendar").then((m) => m.default),
  account: () => import("./commands/account").then((m) => m.default),
};

export default defineCommand({
  meta: { name: "social", description: "Marketing-OS Social toolkit" },
  subCommands,
});
