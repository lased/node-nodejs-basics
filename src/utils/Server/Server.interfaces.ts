import { IncomingMessage, ServerResponse } from "node:http";

export interface IRequest extends IncomingMessage {
  params?: any;
  body?: any;
}
export interface IResponse extends ServerResponse {}
