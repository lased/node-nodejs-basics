import cluster from "node:cluster";
import { cpus } from "node:os";

import { envConfig } from "./config/env";
import app from "./main";

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

  console.info("========================================");
  console.info(`Server running on port ${envConfig.PORT}`);
  console.info("========================================");
} else {
  const workerId = cluster.worker?.id || 0;

  app.use((req, res) => {
    console.info(
      `SERVER ${workerId} - ${process.pid}: ${res.statusCode} ${req.method} - ${req.url}`
    );
  });
  app.listen(envConfig.PORT);
}
