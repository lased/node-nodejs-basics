import { CallbackType, MethodType, RoutesType } from "../Server/Server.types";
import { BadRequestError } from "../Errors";
import { trimSlash } from "../string";

export const Router =
  (routes: RoutesType): CallbackType =>
  (req, res) => {
    const method = req.method as MethodType;
    const endpoint = trimSlash(req.url || "");
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
      throw new BadRequestError("Route not found");
    }

    routes[method][routePath](req, res);
  };
