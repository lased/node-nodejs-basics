import { IRequest, IResponse } from "./Server.interfaces";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type CallbackType<T = void> = (req: IRequest, res: IResponse) => T;
export type MiddlewareCallbackType = (
  req: IRequest,
  res: IResponse,
  next: () => void
) => void;
