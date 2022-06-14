import { IncomingMessage } from "node:http";

export interface IRequest extends IncomingMessage {
  params?: any;
  body?: any;
}
