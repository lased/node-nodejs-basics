import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message = "Server Internal Error") {
    super(message, 404);
  }
}
