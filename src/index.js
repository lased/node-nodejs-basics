import { EOL } from "node:os";

import { parseProcessArgv } from "./utils/parser.js";
import { initCommands } from "./commands/index.js";
import { info, error } from "./utils/color.js";

try {
  const { username } = parseProcessArgv();

  if (!username) {
    throw new Error('Property "--username" is empty');
  }

  console.info(info(`Welcome to the File Manager, ${username}!`));
  process.on("SIGINT", process.exit);
  process.on("exit", () => {
    console.info(info(`${EOL}Thank you for using File Manager, ${username}!`));
  });
  initCommands();
} catch (err) {
  console.error(error(err.message));
  process.exit(0);
}
