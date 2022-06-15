import { MiddlewareCallbackType } from "./Server.types";
import { RoutesType } from "../Router/Router.types";

export class Node {
  next: MiddlewareNode | null = null;
}
export class RoutesNode extends Node {
  routes: RoutesType;

  constructor(routes: RoutesType) {
    super();
    this.routes = routes;
  }
}
export class MiddlewareNode extends Node {
  callback: MiddlewareCallbackType;

  constructor(callback: MiddlewareCallbackType) {
    super();
    this.callback = callback;
  }
}
