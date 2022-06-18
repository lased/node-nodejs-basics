import { BadRequestError, ServerInternalError } from "./Errors";
import { MiddlewareCallbackType } from "./Server/Server.types";

export const BodyParser: MiddlewareCallbackType = (req, res, next) => {
  let body = "";

  if (req.method === "GET") {
    next();
    return;
  }

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    body = body.trim();

    try {
      req.body = body ? JSON.parse(body) : {};
    } catch {
      const { code, message } = new BadRequestError(
        "Error occurred while parsing JSON"
      );

      res.statusCode = code;
      res.end(JSON.stringify({ message }));
    }

    next();
  });
  req.on("error", () => {
    const { code, message } = new ServerInternalError();

    res.statusCode = code;
    res.end(JSON.stringify({ message }));
    next();
  });
};
