import { MESSAGES } from "./Errors.constants";
import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = MESSAGES.BAD_REQUEST) {
    super(message, 400);
  }
}
