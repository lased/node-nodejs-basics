import { v4, validate as validateUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../../utils/Errors";

import { CallbackType } from "../../utils/Server/Server.types";
import { Validate } from "../../utils/Validate/Validate";
import { MESSAGES } from "./Person.constants";
import { create, getAll, getById, remove, update } from "./Person.service";

export const createPerson: CallbackType = (req, res) => {
  const id = v4();
  const validate = Validate(req.body, {
    username: { required: true, string: true },
    hobbies: { required: true, array: "string" },
    age: { required: true, number: true },
  });

  if (!validate.isValid) {
    throw new BadRequestError(validate.error);
  }

  res.statusCode = 201;

  return create({ ...req.body, id });
};
export const getByIdPerson: CallbackType = (req) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    throw new BadRequestError(MESSAGES.ID_NOT_VALID);
  }

  const person = getById(id);

  if (!person) {
    throw new NotFoundError(MESSAGES.NOT_FOUND);
  }

  return person;
};
export const getPerson: CallbackType = () => getAll();
export const updatePerson: CallbackType = (req) => {
  const id = req.params.id;
  const validate = Validate(req.body, {
    username: { string: true },
    hobbies: { array: "string" },
    age: { number: true },
  });

  if (!validateUUID(id)) {
    throw new BadRequestError(MESSAGES.ID_NOT_VALID);
  }
  if (!validate.isValid) {
    throw new BadRequestError(validate.error);
  }

  const updatedPerson = update(id, req.body);

  if (!updatedPerson) {
    throw new NotFoundError(MESSAGES.NOT_FOUND);
  }

  return updatedPerson;
};
export const deletePerson: CallbackType = (req, res) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    throw new BadRequestError(MESSAGES.ID_NOT_VALID);
  }

  const isDone = remove(id);

  if (!isDone) {
    throw new NotFoundError(MESSAGES.NOT_FOUND);
  }

  res.statusCode = 204;
};
