import { initialization } from "./commands/index.js";
import { info, error } from "./color.js";
import { parserArgv } from "./parser.js";

try {
  const { username } = parserArgv();

  if (!username) {
    throw new Error('Property "--username" is empty');
  }

  console.info(info(`Welcome to the File Manager, ${username}!`));
  process.on("SIGINT", () => process.exit());
  process.on("exit", () => {
    console.info(info(`Thank you for using File Manager, ${username}!`));
  });
  initialization();
} catch (err) {
  console.error(error(err.message));
}
