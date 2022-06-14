import { createServer } from "http";

import { envConfig } from "./config/env";
import { userRoutes } from "./modules/Users";
import Logger from "./utils/Logger";
import { Server } from "./utils/Server/Server";

const server = Server();

server.registerRoutes(userRoutes);
// server.register(userRoutes);

// app.use("api/users", userRouter);
// app.use(Logger);

// app.use((req, res) => {});
// app.use((err: any, req: any, res: any) => {});

server.listen(envConfig.PORT, () => {
  console.info("========================================");
  console.info(`Server running on port ${envConfig.PORT}`);
  console.info("========================================");
});
