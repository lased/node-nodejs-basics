import { IPerson } from "./Person.model";

let list: IPerson[] = [];

const getAll = () => list;
const getById = (id: string) => {
  const person = list.find((person) => person.id === id);

  return person || null;
};
const create = (person: IPerson) => {
  list.push(person);

  return person;
};
const update = (id: string, person: Partial<IPerson>) => {
  const personIndex = list.findIndex((psn) => psn.id === id);

  if (personIndex === -1) {
    return null;
  }

  list[personIndex] = { ...list[personIndex], ...person };

  return list[personIndex];
};
const remove = (id: string) => {
  const personIndex = list.findIndex((person) => person.id === id);

  if (personIndex === -1) {
    return null;
  }

  list = list.filter((person) => person.id !== id);

  return true;
};

export { getById, getAll, create, update, remove };
