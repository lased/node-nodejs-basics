import { Worker } from "worker_threads";
import { join } from "path";
import { cpus } from "os";

import { pathToDir } from "../shared.js";

const workerPromise = (index, workerData) => () =>
  new Promise((resolve) => {
    const __dirname = pathToDir(import.meta.url);
    const worker = new Worker(join(__dirname, "./worker.js"), {
      workerData,
    });
    const workerId = `\x1b[1;${30 + index}mWorker #${index}\x1b[0m`;

    worker.on("online", () => {
      console.log(
        `\x1b[1;${
          30 + index
        }mWorker #${index}\x1b[0m is online with data: ${workerData}`
      );
    });
    worker.on("error", (error) => {
      console.log(`${workerId}\x1b[31m error: ${error.message}\x1b[0m`);
      resolve({ data: null, status: "error" });
    });
    worker.on("message", (result) => {
      console.log(`${workerId} with data: ${workerData} = ${result}`);
      resolve({ data: result, status: "resolved" });
    });
  });

export const performCalculations = async () => {
  const workers = [];

  for (let index = 0; index < cpus().length; index++) {
    workers.push(workerPromise(index + 1, 10 + index));
  }

  return Promise.all(workers.map((worker) => worker()));
};
