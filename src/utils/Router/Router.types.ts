import { CallbackType, MethodType } from "../Server/Server.types";

export type RoutesType = Record<MethodType, Record<string, CallbackType>>;
