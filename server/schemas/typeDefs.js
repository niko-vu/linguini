// import 'gql' function from 'apollo-server-express' library
const { gql } = require('apollo-server-express');

// GraphQL type definitions using gql template literal
const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
  }

  type Translation {
    _id: ID!
    text: String!
    language: String!
    user: User!
  }

  # query to retrieve user by username and list of translations
  type Query {
    getUser(username: String!): User
    getTranslations: [Translation]
  }

  # mutation to create new user and new translation
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    createTranslation(text: String!, language: String!): Translation
    login(email: String!, password: String!): Auth
  }
  # authentication
  type Auth {
    token: String!
    user: User!
  }
`;

// export typeDefs for use in Apollo Server
module.exports = typeDefs;
