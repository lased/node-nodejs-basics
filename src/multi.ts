import cluster from "node:cluster";
import { cpus } from "node:os";

const startWorker = () => {
  const worker = cluster.fork();

  worker.on("online", () => {
    console.info(`Worker #${worker.id} is online`);
  });
  worker.on("exit", () => {
    console.info(`Worker #${worker.id} is dead`);
    startWorker();
  });
};

if (cluster.isPrimary) {
  const cpusCount = cpus().length;

  for (let index = 0; index < cpusCount; index++) {
    startWorker();
  }
} else {
  import("./index");
}
