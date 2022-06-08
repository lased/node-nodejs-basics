import { createInterface } from "node:readline";
import { EOL, homedir } from "node:os";

import {
  error,
  getColoredText,
  TERMINAL_COLOR,
  TERMINAL_STYLE,
  warning,
} from "../color.js";
import nwd from "./nwd/index.js";
import os from "./os/index.js";

const commands = { ...nwd, ...os };

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let pathToWorkdir = homedir();

export const initialization = () => {
  readline.question(
    warning("You are currently in ") +
      getColoredText(pathToWorkdir, TERMINAL_COLOR.GREEN) +
      warning(`, enter your command:${EOL}`) +
      getColoredText("> ", TERMINAL_COLOR.WHITE, TERMINAL_STYLE.BOLD),
    async (command) => {
      command = command.trim();

      if (command === ".exit") {
        process.exit(0);
      }

      try {
        const [operation, ...args] = command.split(" ");

        if (!commands[operation]) {
          throw new Error("Invalid input");
        }

        const result = await commands[operation](pathToWorkdir, args);

        if (result && result.workdir !== pathToWorkdir && result.workdir) {
          pathToWorkdir = result.workdir;
        }

        if (result?.data) {
          console[result.outputType || "info"](result.data);
        }
      } catch (err) {
        console.error(error(err.message));
      }

      initialization();
    }
  );
};
