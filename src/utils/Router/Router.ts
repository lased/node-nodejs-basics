import { ServerResponse } from "http";

import { IRequest } from "../Server/Server.interfaces";
import { MethodType } from "../Server/Server.types";
import { queryParams, trimSlash } from "../string";
import { MESSAGES } from "./Router.constants";
import { RoutesType } from "./Router.types";
import { NotFoundError } from "../Errors";

export const Router =
  (routes: RoutesType) => (req: IRequest, res: ServerResponse) => {
    const method = req.method as MethodType;
    const [endpoint, query] = trimSlash(req.url || "").split("?");
    let params = {} as Record<string, string>;
    const routePath = Object.keys(routes[method]).find((path) => {
      const pathArray = path.split("/");
      const endpointArray = endpoint.split("/");

      if (pathArray.length !== endpointArray.length) {
        return false;
      }

      const isFound = pathArray.every((part, index) => {
        if (part === endpointArray[index]) {
          return true;
        }

        const isParam = part.startsWith(":");

        if (!isParam) {
          return false;
        }

        params[part.slice(1)] = endpointArray[index];

        return true;
      });

      if (!isFound) {
        params = {};
      }

      return isFound;
    });

    if (!routes[method] || !routePath) {
      throw new NotFoundError(MESSAGES.NOT_FOUND);
    }

    req.params = { ...queryParams(query || ""), ...params };

    return routes[method][routePath](req, res);
  };
