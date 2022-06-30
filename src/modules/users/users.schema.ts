import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    password: String!
    email: String!
  }
  input NewUser {
    firstName: String!
    secondName: String!
    middleName: String!
    password: String!
    email: String!
  }

  type Mutation {
    user: UserMutation
  }
  type Query {
    user(id: ID!): User
    jwt(email: String!, password: String!): String
  }

  type UserMutation {
    register(user: NewUser!): User
  }
`;
