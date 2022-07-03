export class BaseError {
  message: string;
  code: number;

  constructor(message: string, code = 500) {
    this.message = message;
    this.code = code;
  }
}
