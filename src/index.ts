import { ApolloServer } from "apollo-server";

import { envConfig } from "./config/env";
import dataSources from "./datasources";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = new ApolloServer({
  dataSources: () => dataSources,
  csrfPrevention: true,
  resolvers,
  typeDefs,
});

server.listen({ port: envConfig.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
