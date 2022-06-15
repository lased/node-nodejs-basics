import { ServerResponse } from "http";

import { IRequest } from "../Server/Server.interfaces";
import { MethodType } from "../Server/Server.types";
import { MESSAGES } from "./Router.constants";
import { RoutesType } from "./Router.types";
import { NotFoundError } from "../Errors";
import { trimSlash } from "../String";

const compareUrl = (url: string, reqUrl: string): boolean => {
  const reqUrlArray = reqUrl.split("/");
  const urlArray = url.split("/");

  if (urlArray.length !== reqUrlArray.length) {
    return false;
  }

  return urlArray.every(
    (partUrl, index) =>
      partUrl === reqUrlArray[index] || partUrl.startsWith(":")
  );
};
const parseParams = (url: string, reqUrl: string) => {
  const reqUrlArray = reqUrl.split("/");
  const urlArray = url.split("/");

  return urlArray.reduce(
    (acc, param, index) => ({ ...acc, [param.slice(1)]: reqUrlArray[index] }),
    {}
  );
};

export const Router =
  (routes: RoutesType) => (req: IRequest, res: ServerResponse) => {
    const [reqUrl, _] = trimSlash(req.url || "").split("?");
    const method = req.method as MethodType;
    const routesByMethod = routes[method];

    if (!routesByMethod) {
      throw new NotFoundError(MESSAGES.NOT_FOUND);
    }

    const routePath = Object.keys(routesByMethod).find((url) =>
      compareUrl(url, reqUrl)
    );

    if (!routePath) {
      throw new NotFoundError(MESSAGES.NOT_FOUND);
    }

    req.params = parseParams(routePath, reqUrl);

    return routesByMethod[routePath](req, res);
  };
