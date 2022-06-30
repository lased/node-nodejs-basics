import { ResolverType } from "../../resolvers.types";

const resolver: ResolverType = {
  ArtistsQuery: {
    all: (_, __, { dataSources }) => dataSources.artistsAPI.getArtists(),
  },
};

export default resolver;
