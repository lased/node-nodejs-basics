import { createServer } from "http";

import { MethodType, RoutesType } from "./Server.types";
import { Router } from "../Router/Router";
import { BaseError, ServerInternalError } from "../Errors";

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

    res.setHeader("Content-Type", "application/json");

    try {
      result = Router(Routes)(req, res);
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

  return { registerRoutes, listen: http.listen.bind(http) };
};
