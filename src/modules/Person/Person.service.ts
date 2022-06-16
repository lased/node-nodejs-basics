import { Person } from "./Person.model";

let list: Person[] = [];

export const getAll = () => list;
export const getById = (id: string) => {
  const person = list.find((person) => person.id === id);

  return person || null;
};
export const create = (person: Person) => {
  list.push(person);

  return person;
};
export const update = (id: string, person: Partial<Person>) => {
  const personIndex = list.findIndex((psn) => psn.id === id);

  if (personIndex === -1) {
    return null;
  }

  list[personIndex] = { ...list[personIndex], ...person };

  return list[personIndex];
};
export const remove = (id: string) => {
  const personIndex = list.findIndex((person) => person.id === id);

  if (personIndex === -1) {
    return null;
  }

  list = list.filter((person) => person.id !== id);

  return true;
};
