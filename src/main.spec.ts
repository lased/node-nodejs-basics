import { Server as NativeServer } from "http";
import request from "supertest";
import { v4 } from "uuid";

import { MESSAGES } from "./modules/Person/Person.constants";
import { envConfig } from "./config/env";
import app from "./main";

describe("E2E tests", () => {
  let server: NativeServer;

  beforeAll(() => {
    server = app.listen(envConfig.PORT);
  });
  afterAll(() => server.close());
  it("random actions 1", async () => {
    let toBeBody = { username: "test", age: 2, hobbies: ["test"] };
    let created = await request(server)
      .post("/api/person")
      .send({ ...toBeBody, other: null });

    expect(created.body).toMatchObject(toBeBody);
    expect(created.statusCode).toBe(201);
    toBeBody = {
      username: "test 2",
      age: 11,
      hobbies: ["test", "test"],
    };
    created = await request(server).post("/api/person").send(toBeBody);
    expect(created.body).toMatchObject(toBeBody);
    expect(created.statusCode).toBe(201);

    let list = (await request(server).get("/api/person")).body;
    const secondPerson = list[1];

    expect(list).toHaveLength(2);

    let deleted = await request(server).delete(`/api/person/${list[0].id}`);

    expect(deleted.body).toBe("");
    expect(deleted.statusCode).toBe(204);
    list = (await request(server).get("/api/person")).body;
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual(secondPerson);
    expect(
      (await request(server).get(`/api/person/${secondPerson.id}`)).body
    ).toEqual(secondPerson);
    deleted = await request(server).delete(`/api/person/${secondPerson.id}`);
    expect(deleted.body).toBe("");
    expect(deleted.statusCode).toBe(204);
  });
  it("random actions 2", async () => {
    let list = (await request(server).get("/api/person")).body;

    expect(list).toHaveLength(0);

    let body: any = { username: "test", age: 2, hobbies: ["test"] };
    let created = await request(server).post("/api/person").send(body);

    expect(created.body).toMatchObject(body);
    expect(created.statusCode).toBe(201);
    expect(
      (await request(server).get(`/api/person/${created.body.id}`)).body
    ).toEqual(created.body);
    body = { username: "test 1", age: 21 };

    let updated = await request(server)
      .put(`/api/person/${created.body.id}`)
      .send(body);

    expect(updated.body).toMatchObject(body);
    expect(updated.statusCode).toBe(200);

    let deleted = await request(server).delete(
      `/api/person/${created.body.id}`
    );

    expect(deleted.body).toBe("");
    expect(deleted.statusCode).toBe(204);

    let getById = await request(server).get(`/api/person/${created.body.id}`);

    expect(getById.body).toMatchObject({ message: MESSAGES.NOT_FOUND });
    expect(getById.statusCode).toBe(404);
  });
  it("random actions 3", async () => {
    let getById = await request(server).get(`/api/person/${v4()}`);

    expect(getById.body).toMatchObject({ message: MESSAGES.NOT_FOUND });
    expect(getById.statusCode).toBe(404);

    let body: any = { username: "test", age: 2, hobbies: [] };
    let created = await request(server).post("/api/person").send(body);

    expect(created.body).toMatchObject(body);
    expect(created.statusCode).toBe(201);

    let deleted = await request(server).delete(
      `/api/person/${created.body.id}`
    );

    expect(deleted.body).toBe("");
    expect(deleted.statusCode).toBe(204);

    getById = await request(server).get(`/api/person/${created.body.id}`);
    expect(getById.body).toMatchObject({ message: MESSAGES.NOT_FOUND });
    expect(getById.statusCode).toBe(404);
    body = { username: "test 1", age: 21 };

    let updated = await request(server)
      .put(`/api/person/${created.body.id}`)
      .send(body);

    expect(updated.body).toMatchObject({ message: MESSAGES.NOT_FOUND });
    expect(updated.statusCode).toBe(404);
  });
});
