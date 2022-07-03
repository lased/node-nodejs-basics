import { envConfig } from "./config/env";
import Logger from "./utils/Logger";
import app from "./main";

app.use(Logger);
app.listen(envConfig.PORT, () => {
  console.info("========================================");
  console.info(`Server running on port ${envConfig.PORT}`);
  console.info("========================================");
});
