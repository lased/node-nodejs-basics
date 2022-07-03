import { MESSAGES } from "./Errors.constants";
import { BaseError } from "./BaseError";

export class ServerInternalError extends BaseError {
  constructor(message: string = MESSAGES.SERVER_INTERNAL) {
    super(message);
  }
}
