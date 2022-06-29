import { gql } from "apollo-server";

import Artist from "./modules/artists/artists.schema";

export default gql`
  ${Artist}
`;
