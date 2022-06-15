import { ServerResponse } from "node:http";

import { IRequest } from "./Server.interfaces";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type CallbackType = (req: IRequest, res: ServerResponse) => void;
export type MiddlewareCallbackType = (
  req: IRequest,
  res: ServerResponse,
  next: () => void
) => void;
