import { info, error } from "./color.js";
import { parserArgv } from "./parser.js";

try {
  const { username } = parserArgv();

  console.info(info(`Welcome to the File Manager, ${username}!`));
  process.on("exit", () => {
    console.info(info(`Thank you for using File Manager, ${username}!`));
  });
} catch (err) {
  console.error(error(err.message));
}
