import { ServerResponse } from "http";
import { v4 } from "uuid";
import { BadRequestError, NotFoundError } from "../../utils/Errors";

import { IRequest } from "../../utils/Server/Server.interfaces";
import VALIDATE_MESSAGES from "../../utils/Validate/Validate.constants";
import { MESSAGES } from "./Person.constants";
import {
  createPerson,
  deletePerson,
  getByIdPerson,
  getPerson,
  updatePerson,
} from "./person.controller";

let res: ServerResponse;
let req: IRequest;

describe("Testing person controller", () => {
  beforeEach(() => {
    res = {} as ServerResponse;
    req = {} as IRequest;
  });
  it("create", () => {
    let res = {} as ServerResponse;
    let req = {} as IRequest;
    const BadRequestFn = (body: any, message: string) => {
      req.body = body;
      expect(() => createPerson(req, res)).toThrowError(BadRequestError);
      expect(() => createPerson(req, res)).toThrowError(message);
    };

    BadRequestFn(undefined, VALIDATE_MESSAGES.DTO_ERROR);
    BadRequestFn({}, VALIDATE_MESSAGES.REQUIRED("username"));
    BadRequestFn({ username: 1 }, VALIDATE_MESSAGES.STRING("username"));
    BadRequestFn({ username: "test" }, VALIDATE_MESSAGES.REQUIRED("age"));
    BadRequestFn(
      { username: "test", age: "12" },
      VALIDATE_MESSAGES.NUMBER("age")
    );
    BadRequestFn(
      { username: "test", age: 12 },
      VALIDATE_MESSAGES.REQUIRED("hobbies")
    );
    BadRequestFn(
      { username: "test", age: 12, hobbies: "test" },
      VALIDATE_MESSAGES.ARRAY("hobbies", "string")
    );
    BadRequestFn(
      { username: "test", age: 12, hobbies: [1, "test", null] },
      VALIDATE_MESSAGES.ARRAY("hobbies", "string")
    );

    req.body = { username: "test", age: 12, hobbies: ["test"] };
    expect(createPerson(req, res)).toMatchObject(req.body);
    expect(res.statusCode).toBe(201);
  });
  it("get all", () => {
    expect(getPerson(req, res)).toHaveLength(1);
  });
  it("get by id", () => {
    const person = getPerson(req, res)[0];

    req.params = { id: "test" };
    expect(() => getByIdPerson(req, res)).toThrowError(BadRequestError);
    expect(() => getByIdPerson(req, res)).toThrowError(MESSAGES.ID_NOT_VALID);
    req.params = { id: v4() };
    expect(() => getByIdPerson(req, res)).toThrowError(NotFoundError);
    expect(() => getByIdPerson(req, res)).toThrowError(MESSAGES.NOT_FOUND);
    req.params = { id: person.id };
    expect(getByIdPerson(req, res)).toEqual(person);
  });
  it("update by id", () => {
    const person = getPerson(req, res)[0];
    const BadRequestFn = (body: any, message: string) => {
      req.body = body;
      expect(() => updatePerson(req, res)).toThrowError(BadRequestError);
      expect(() => updatePerson(req, res)).toThrowError(message);
    };

    req.params = { id: 1 };
    BadRequestFn(undefined, MESSAGES.ID_NOT_VALID);
    req.params = { id: v4() };
    BadRequestFn(undefined, VALIDATE_MESSAGES.DTO_ERROR);
    BadRequestFn({ username: 1 }, VALIDATE_MESSAGES.STRING("username"));
    BadRequestFn(
      { username: "test", age: "12" },
      VALIDATE_MESSAGES.NUMBER("age")
    );
    BadRequestFn(
      { age: 12, hobbies: "test" },
      VALIDATE_MESSAGES.ARRAY("hobbies", "string")
    );
    BadRequestFn(
      { username: "test", hobbies: [1, "test", null] },
      VALIDATE_MESSAGES.ARRAY("hobbies", "string")
    );
    req.body = { username: "new name" };
    expect(() => updatePerson(req, res)).toThrowError(NotFoundError);
    expect(() => updatePerson(req, res)).toThrowError(MESSAGES.NOT_FOUND);
    req.params = { id: person.id };
    req.body = { username: "new name" };
    expect(updatePerson(req, res)).toEqual({ ...person, ...req.body });
  });
  it("delete by id", () => {
    const person = getPerson(req, res)[0];

    req.params = { id: "test" };
    expect(() => deletePerson(req, res)).toThrowError(BadRequestError);
    expect(() => deletePerson(req, res)).toThrowError(MESSAGES.ID_NOT_VALID);
    req.params = { id: v4() };
    expect(() => deletePerson(req, res)).toThrowError(NotFoundError);
    expect(() => deletePerson(req, res)).toThrowError(MESSAGES.NOT_FOUND);
    req.params = { id: person.id };
    expect(deletePerson(req, res)).toBe(undefined);
    expect(res.statusCode).toBe(204);
    expect(getPerson(req, res)).toHaveLength(0);
  });
  it("random actions 1", () => {
    req.body = { username: "test", age: 2, hobbies: ["test"], other: null };
    expect(createPerson(req, res)).toMatchObject(req.body);
    expect(res.statusCode).toBe(201);
    req.body = {
      username: "test 2",
      age: 11,
      hobbies: ["test", "test"],
      other: 2,
    };
    expect(createPerson(req, res)).toMatchObject(req.body);
    expect(res.statusCode).toBe(201);
    expect(getPerson(req, res)).toHaveLength(2);

    const list = getPerson(req, res);
    const secondPerson = list[1];

    req.params = { id: list[0].id };
    expect(deletePerson(req, res)).toBe(undefined);
    expect(res.statusCode).toBe(204);
    expect(getPerson(req, res)).toHaveLength(1);
    expect(getPerson(req, res)[0]).toEqual(secondPerson);
    req.params = { id: secondPerson.id };
    expect(getByIdPerson(req, res)).toEqual(secondPerson);
    req.params = { id: secondPerson.id };
    expect(deletePerson(req, res)).toBe(undefined);
    expect(res.statusCode).toBe(204);
  });
  it("random actions 2", () => {
    expect(getPerson(req, res)).toHaveLength(0);
    req.body = { username: "test", age: 2, hobbies: ["test"], other: null };

    const createdPerson = createPerson(req, res);

    expect(createdPerson).toMatchObject(req.body);
    expect(res.statusCode).toBe(201);
    req.params = { id: createdPerson.id };
    expect(getByIdPerson(req, res)).toEqual(createdPerson);
    req.body = { username: "test 1", age: 21 };
    expect(updatePerson(req, res)).toEqual({ ...createdPerson, ...req.body });
    req.params = { id: createdPerson.id };
    expect(deletePerson(req, res)).toBe(undefined);
    expect(res.statusCode).toBe(204);
    req.params = { id: createdPerson.id };
    expect(() => getByIdPerson(req, res)).toThrowError(NotFoundError);
    expect(() => getByIdPerson(req, res)).toThrowError(MESSAGES.NOT_FOUND);
  });
  it("random actions 3", () => {
    req.params = { id: v4() };
    expect(() => getByIdPerson(req, res)).toThrowError(NotFoundError);
    expect(() => getByIdPerson(req, res)).toThrowError(MESSAGES.NOT_FOUND);

    req.body = { username: "test", age: 2, hobbies: [] };

    const createdPerson = createPerson(req, res);

    expect(createdPerson).toMatchObject(req.body);
    expect(res.statusCode).toBe(201);
    req.params = { id: createdPerson.id };
    expect(deletePerson(req, res)).toBe(undefined);
    expect(res.statusCode).toBe(204);
    req.body = { username: "test 1", age: 21 };
    expect(() => updatePerson(req, res)).toThrowError(NotFoundError);
    expect(() => updatePerson(req, res)).toThrowError(MESSAGES.NOT_FOUND);
    req.params = { id: createdPerson.id };
    expect(() => getByIdPerson(req, res)).toThrowError(NotFoundError);
    expect(() => getByIdPerson(req, res)).toThrowError(MESSAGES.NOT_FOUND);
    expect(getPerson(req, res)).toHaveLength(0);
  });
});
