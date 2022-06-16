import { Server as NativeServer, get, request } from "http";
import { v4 } from "uuid";

import { envConfig } from "./config/env";
import { Person } from "./modules/Person/Person.model";

describe("Integration tests", () => {
  const options = {
    method: "GET",
    port: envConfig.PORT,
  };
  let server: NativeServer;
  let body = "";
  let person: Person;

  beforeAll((done) => {
    import("./main").then(
      (imprt) => ((server = imprt.default.listen(envConfig.PORT)), done())
    );
  });
  afterAll(() => server.close());
  beforeEach(() => (body = ""));
  it("get person invalid", (done) => {
    request({ ...options, path: "/apis/person" }, (res) => {
      expect(res.statusCode).toBe(404);
      done();
    }).end();
  });
  it("get person valid", (done) => {
    request({ ...options, path: "/api/person" }, (res) => {
      expect(res.statusCode).toBe(200);

      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        expect(JSON.parse(body)).toHaveLength(0);
        done();
      });
    }).end();
  });
  it("get person by id invalid", (done) => {
    request({ ...options, path: "/api/person/123" }, (res) => {
      expect(res.statusCode).toBe(400);
      done();
    }).end();
  });
  it("get person by id valid", (done) => {
    request({ ...options, path: `/api/person/${v4()}` }, (res) => {
      expect(res.statusCode).toBe(404);
      done();
    }).end();
  });
  it("create person invalid", (done) => {
    request({ ...options, method: "POST", path: `/api/person` }, (res) => {
      expect(res.statusCode).toBe(400);
      done();
    }).end();
  });
  it("create person valid", (done) => {
    const req = request(
      { ...options, method: "POST", path: `/api/person` },
      (res) => {
        expect(res.statusCode).toBe(201);
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => ((person = JSON.parse(body)), done()));
      }
    );
    req.write(JSON.stringify({ username: "test", age: 2, hobbies: [] }));
    req.end();
  });
  it("update person valid", (done) => {
    const newData = { username: "test 2", age: 22 };
    const req = request(
      { ...options, method: "PUT", path: `/api/person/${person.id}` },
      (res) => {
        expect(res.statusCode).toBe(200);
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          const updatedPerson = { ...person, ...newData };

          person = JSON.parse(body);
          expect(person).toMatchObject(updatedPerson);
          done();
        });
      }
    );
    req.write(JSON.stringify(newData));
    req.end();
  });
  it("delete person", (done) => {
    const reqOptions = {
      ...options,
      method: "DELETE",
      path: `/api/person/${v4()}`,
    };

    request(reqOptions, (res) => {
      expect(res.statusCode).toBe(404);
      request({ ...reqOptions, path: `/api/person/${person.id}` }, (res) => {
        expect(res.statusCode).toBe(204);
        done();
      }).end();
    }).end();
  });
});
