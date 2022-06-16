import { envConfig } from "./config/env";
import app from "./main";

app.listen(envConfig.PORT, () => {
  console.info("========================================");
  console.info(`Server running on port ${envConfig.PORT}`);
  console.info("========================================");
});
