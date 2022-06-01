import { fork } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const spawnChildProcess = async (args) => {
  const pathToScript = join(
    dirname(fileURLToPath(import.meta.url)),
    "files/script.js"
  );
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
      `\x1b[1;32m(Master)\x1b[0m Message from child process: \x1b[0m${chunk}\x1b[0m`
    );
  });
  process.stdin.pipe(childProcess.stdin);
};
