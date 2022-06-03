import { fork } from "child_process";
import { join } from "path";

import { pathToDir } from "../shared.js";

export const spawnChildProcess = async (args) => {
  const pathToScript = join(pathToDir(import.meta.url), "files/script.js");
  const childProcess = fork(pathToScript, args, { silent: true });

  childProcess
    .on("spawn", () => {
      console.log(
        `\x1b[1;32m(Master)\x1b[0m \x1b[1;34mSpawn child process with pid - ${childProcess.pid}\x1b[0m`
      );
    })
    .on("exit", (code) => {
      console.log(
        `\x1b[1;32m(Master)\x1b[0m \x1b[1;34mExit child process with pid - ${childProcess.pid} and code - ${code}\x1b[0m`
      );
    });
  childProcess.stdout.pipe(process.stdout);
  childProcess.stdout.on("data", (chunk) => {
    console.log(
      `\x1b[1;32m(Master)\x1b[0m Message from child process: ${chunk}`
    );
  });
  process.stdin.pipe(childProcess.stdin);
};
