import { MESSAGES } from "./Errors.constants";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = MESSAGES.NOT_FOUND) {
    super(message, 404);
  }
}
