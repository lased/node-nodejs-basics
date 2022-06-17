import { PersonRoutes } from "./modules/Person";
import { BodyParser } from "./utils/BodyParser";
import { Server } from "./utils/Server/Server";

const app = Server();

app.use(BodyParser);
app.use(PersonRoutes);

export default app;
