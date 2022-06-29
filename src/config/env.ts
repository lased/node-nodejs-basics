import { config } from "dotenv";
import { join } from "path";

import { IEnvConfig } from "./env.interfaces";

const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.dev";
const dotenvConfig = config({ path: join(__dirname, "../..", envFile) });
const envConfig = dotenvConfig.parsed as unknown as IEnvConfig;

if (dotenvConfig.error) {
  throw new Error("Error occurred while parsing .env file");
}

export { envConfig };