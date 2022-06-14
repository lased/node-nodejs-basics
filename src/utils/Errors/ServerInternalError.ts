import { BaseError } from "./BaseError";

export class ServerInternalError extends BaseError {
  constructor(message = "Server Internal Error") {
    super(message);
  }
}
