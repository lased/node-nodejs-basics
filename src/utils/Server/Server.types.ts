import { IncomingMessage, ServerResponse } from "http";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type CallbackType = (req: IncomingMessage, res: ServerResponse) => void;
export type RoutesType = Record<MethodType, Record<string, CallbackType>>;
