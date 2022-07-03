import { v4 } from "uuid";

import { create, remove, getAll, getById, update } from "./Person.service";
import { Person } from "./Person.model";

const person = new Person({
  id: v4(),
  age: 3,
  username: "test",
  hobbies: ["test"],
});

describe("Testing person service", () => {
  it("create", () => {
    const createdPerson = create(person);

    expect(createdPerson).toEqual(person);
    expect(createdPerson.hobbies!.length).toBe(1);
  });
  it("get by valid id", () => {
    expect(getById(person.id!)).toEqual(person);
  });
  it("get by invalid id", () => {
    expect(getById("none")).toBe(null);
  });
  it("valid update", () => {
    const updatedPerson = { hobbies: ["test 1", "test 2"], age: 1 };

    expect(update(person.id!, updatedPerson)).toEqual({
      ...person,
      ...updatedPerson,
    });
  });
  it("invalid update", () => {
    const updatedPerson = { hobbies: ["test 1", "test 2"], age: 1 };

    expect(update("none", updatedPerson)).toBe(null);
  });
  it("get all", () => {
    expect(getAll().length).toBe(1);
    create({ id: v4(), username: "test", hobbies: [], age: 2 });
    expect(getAll().length).toBe(2);
  });
  it("invalid remove", () => {
    expect(remove("none")).toBe(null);
    expect(getAll().length).toBe(2);
  });
  it("valid remove", () => {
    expect(remove(person.id!)).toBe(true);
    expect(getAll().length).toBe(1);
  });
});
