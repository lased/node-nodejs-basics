import { gql } from "apollo-server";

export default gql`
  type Artist {
    _id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [ID]
    instruments: [ID]
  }
  type Query {
    all: [Artist]!
  }
`;
