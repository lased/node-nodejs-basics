export interface IPerson {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export class Person {
  id: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor(dto: Person | Exclude<Person, "id">) {
    this.id = dto.id;
    this.username = dto.username;
    this.age = dto.age;
    this.hobbies = dto.hobbies;
  }
}
