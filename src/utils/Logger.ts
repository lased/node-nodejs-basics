import { MiddlewareCallbackType } from "./Server/Server.types";

const Logger: MiddlewareCallbackType = (req, res, next) => {
  console.log(`${res.statusCode} ${req.method} - ${req.url}`);

  next();
};

export default Logger;
