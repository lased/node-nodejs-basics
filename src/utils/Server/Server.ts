import { createServer } from "http";

import { BaseError, ServerInternalError } from "../Errors";
import { MiddlewareCallbackType } from "./Server.types";
import { RoutesType } from "../Router/Router.types";
import { IRequest } from "./Server.interfaces";
import { Router } from "../Router/Router";

const queue = [] as (MiddlewareCallbackType | RoutesType)[];

const use = (entry: MiddlewareCallbackType | RoutesType) => {
  queue.push(entry);
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
          newRes.statusCode = 200;
          result = Router(item)(newReq, newRes);
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

  return { use, listen: http.listen.bind(http) };
};
