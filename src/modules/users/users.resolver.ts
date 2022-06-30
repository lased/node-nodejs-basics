import { ResolverType } from "../../resolvers.types";

const resolver: ResolverType = {
  UserMutation: {
    register: (_, data, { dataSources }) =>
      dataSources.usersAPI.registerUser(data),
  },
  Query: {
    user: (_, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id),
    jwt: (_, { email, password }, { dataSources }) =>
      dataSources.usersAPI.getJWT(email, password),
  },
};

export default resolver;
