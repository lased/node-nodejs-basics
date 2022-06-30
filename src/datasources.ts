import ArtistsAPI from "./modules/artists/artists.dataSource";
import UsersAPI from "./modules/users/users.datasource";

const dataSources = {
  artistsAPI: new ArtistsAPI(),
  usersAPI: new UsersAPI(),
};

export default dataSources;
