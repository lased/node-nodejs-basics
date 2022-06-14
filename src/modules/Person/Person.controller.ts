import { v4 } from "uuid";
import { NotFoundError } from "../../utils/Errors";

import { CallbackType } from "../../utils/Server/Server.types";
import { create, getAll, getById, remove, update } from "./Person.service";

export const createPerson: CallbackType = (req) => {
  const id = v4();

  return create({ ...req.body, id });
};
export const getByIdPerson: CallbackType = (req) => {
  const person = getById(req.params.id);

  if (!person) {
    throw new NotFoundError("Person not found");
  }

  return person;
};
export const getPerson: CallbackType = () => getAll();
export const updatePerson: CallbackType = (req) => {
  const id = req.params.id;
  const updatedPerson = update(id, req.body);

  if (!updatedPerson) {
    throw new NotFoundError("Person not found");
  }

  return updatedPerson;
};
export const deletePerson: CallbackType = (req) => {
  const id = req.params.id;
  const isDone = remove(id);

  if (!isDone) {
    throw new NotFoundError("Person not found");
  }
};
