import { BadRequestError, ServerInternalError } from "./Errors";
import { MiddlewareCallbackType } from "./Server/Server.types";

export const BodyParser: MiddlewareCallbackType = (req, res, next) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    body = body.trim();
    try {
      req.body = JSON.parse(body);
      next();
    } catch {
      const { code, message } = new BadRequestError(
        "Error occurred while parsing JSON"
      );

      res.statusCode = code;
      res.end(JSON.stringify({ message }));
    }
  });
  req.on("error", () => {
    const { code, message } = new ServerInternalError();

    res.statusCode = code;
    res.end(JSON.stringify({ message }));
  });
};
