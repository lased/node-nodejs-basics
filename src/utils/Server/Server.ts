import { createServer } from "http";

import { BaseError, ServerInternalError } from "../Errors";
import { MethodType, RoutesType } from "./Server.types";
import { IRequest } from "./Server.interfaces";
import { Router } from "../Router/Router";

const Routes = {} as RoutesType;

const registerRoutes = (routes: RoutesType) => {
  for (const key in routes) {
    const method = key as MethodType;

    if (Routes[method]) {
      Routes[method] = {};
    }

    Routes[method] = { ...Routes[method], ...routes[method] };
  }
};

export const Server = () => {
  const http = createServer((req, res) => {
    let result;
    let body = "";

    res.setHeader("Content-Type", "application/json");
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const newReq = { ...req } as IRequest;

        body = body.trim();
        newReq.body = body ? JSON.parse(body) : {};
        result = Router(Routes)(newReq, res);
      } catch (error) {
        let message;

        if (error instanceof BaseError) {
          res.statusCode = error.code;
          message = error.message;
        } else {
          const { code, message: mesg } = new ServerInternalError();

          res.statusCode = code;
          message = mesg;
        }

        result = { message };
      }

      res.end(JSON.stringify(result));
    });
    req.on("error", () => {
      const { code, message } = new ServerInternalError();

      res.statusCode = code;
      res.end(JSON.stringify({ message }));
    });
  });

  return { registerRoutes, listen: http.listen.bind(http) };
};
