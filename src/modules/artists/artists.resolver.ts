import { ResolverType } from "../../resolvers.types";

const resolver: ResolverType = {
  Query: {
    all: (_, __, { dataSources }) => dataSources.artistsAPI.getArtists(),
  },
};

export default resolver;
