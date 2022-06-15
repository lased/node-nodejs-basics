import { CallbackType, MethodType } from "../Server/Server.types";

export type RoutesType = Partial<
  Record<MethodType, Record<string, CallbackType>>
>;
