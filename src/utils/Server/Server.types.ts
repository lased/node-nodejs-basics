import { ServerResponse } from "node:http";

import { IRequest } from "./Server.interfaces";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type CallbackType = (req: IRequest, res: ServerResponse) => void;
export type RoutesType = Record<MethodType, Record<string, CallbackType>>;
