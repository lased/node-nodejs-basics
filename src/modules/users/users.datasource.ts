import { Request, Response, RESTDataSource } from "apollo-datasource-rest";

import { User } from "./users.model";

export default class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3004/v1/users";
  }

  registerUser(data: Exclude<User, "_id">) {
    console.log(data);

    return this.post<User>("/register", data);
  }

  getUserById(id: string) {
    return this.get<User>(`/${id}`);
  }

  async getJWT(email: string, password: string) {
    const res = await this.post("/login", { email, password });

    return res.jwt;
  }

  protected async didReceiveResponse(res: Response, req: Request) {
    const data = await res.json();

    if (res.ok) {
      data.id = data._id;
    }

    return data;
  }
}
