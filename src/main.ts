import { PersonRoutes } from "./modules/Person";
import { BodyParser } from "./utils/BodyParser";
import { Server } from "./utils/Server/Server";
import Logger from "./utils/Logger";

const app = Server();

app.use(BodyParser);
app.use(PersonRoutes);
app.use(Logger);

export default app;
