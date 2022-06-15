import { MiddlewareCallbackType } from "./Server/Server.types";
import { ServerInternalError } from "./Errors";

export const BodyParser: MiddlewareCallbackType = (req, res, next) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    body = body.trim();
    req.body = body ? JSON.parse(body) : {};
    next();
  });
  req.on("error", () => {
    const { code, message } = new ServerInternalError();

    res.statusCode = code;
    res.end(JSON.stringify({ message }));
  });
};
