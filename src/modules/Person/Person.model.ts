import { DTO } from "../../utils/Decorators/DTO";

@DTO
export class Person {
  id?: string = undefined;
  username?: string = undefined;
  age?: number = undefined;
  hobbies?: string[] = undefined;

  constructor(dto: Person) {}
}
