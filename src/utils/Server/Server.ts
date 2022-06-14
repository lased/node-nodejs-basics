import { createServer } from "http";

import { BaseError, ServerInternalError } from "../Errors";
import { RoutesType } from "../Router/Router.types";
import { IRequest } from "./Server.interfaces";
import { MethodType } from "./Server.types";
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
          const { code, message: msg } = new ServerInternalError();

          res.statusCode = code;
          message = msg;
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
