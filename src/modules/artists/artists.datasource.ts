import { RESTDataSource } from "apollo-datasource-rest";

export default class ArtistsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3002/v1/artists";
  }

  async getArtists() {
    const res = await this.get("/");

    return res.items;
  }
}
