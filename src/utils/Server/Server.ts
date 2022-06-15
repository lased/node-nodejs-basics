import { createServer } from "http";

import { BaseError, ServerInternalError } from "../Errors";
import { MethodType, MiddlewareCallbackType } from "./Server.types";
import { RoutesType } from "../Router/Router.types";
import { Router } from "../Router/Router";
import { IRequest } from "./Server.interfaces";

const queue = [] as (MiddlewareCallbackType | RoutesType)[];
const Routes = {} as RoutesType;
let RoutesIndex: number;

const registerRoutes = (routes: RoutesType) => {
  if (RoutesIndex === undefined) {
    RoutesIndex = queue.findIndex((item) => typeof item !== "function");

    if (RoutesIndex === -1) {
      queue.push(Routes);
      RoutesIndex = queue.length - 1;
    }
  }

  for (const key in routes) {
    const method = key as MethodType;

    if (Routes[method]) {
      Routes[method] = {};
    }

    Routes[method] = { ...Routes[method], ...routes[method] };
  }
};
const registerMiddleware = (callback: MiddlewareCallbackType) => {
  queue.push(callback);
};

export const Server = () => {
  const http = createServer((req, res) => {
    let newReq = req as IRequest;
    let newRes = res;
    let result: any;

    res.setHeader("Content-Type", "application/json");

    const runMiddleware = (index = 0) => {
      const isLast = queue.length - 1 === index;
      let isCalledMiddleware = false;

      try {
        const item = queue[index];
        const isFunction = typeof item === "function";

        if (isFunction) {
          item(newReq, newRes, () => {
            !isLast && runMiddleware(index + 1);
          });
          isCalledMiddleware = true;
        } else {
          result = Router(Routes)(newReq, newRes);
        }
      } catch (error) {
        let message;

        if (error instanceof BaseError) {
          newRes.statusCode = error.code;
          message = error.message;
        } else {
          const { code, message: msg } = new ServerInternalError();

          newRes.statusCode = code;
          message = msg;
        }

        result = { message };
      } finally {
        if (isLast) {
          newRes.end(JSON.stringify(result));
        } else {
          !isCalledMiddleware && runMiddleware(index + 1);
        }
      }
    };

    runMiddleware();
  });

  return { registerMiddleware, registerRoutes, listen: http.listen.bind(http) };
};
