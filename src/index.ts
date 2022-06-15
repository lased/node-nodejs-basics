import { PersonRoutes } from "./modules/Person";
import { BodyParser } from "./utils/BodyParser";
import { Server } from "./utils/Server/Server";
import { envConfig } from "./config/env";
import Logger from "./utils/Logger";

const server = Server();

server.use(BodyParser);
server.use(PersonRoutes);
server.use(Logger);

server.listen(envConfig.PORT, () => {
  console.info("========================================");
  console.info(`Server running on port ${envConfig.PORT}`);
  console.info("========================================");
});
