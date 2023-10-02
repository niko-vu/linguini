// import 'gql' function from 'apollo-server-express' library
const { gql } = require('apollo-server-express');

// GraphQL type definitions using gql template literal
const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    notes: [Note]
  }

  type Phrase {
    _id: ID!
    text: String!
    translation: String!
    language: String!
    createdAt: String! 
    user: User!
  }
  type Note {
    _id: ID!
    noteText: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  # query to retrieve user by username and list of translations
  type Query {
    getUser(username: String!): User
    getPhrases(language: String!): [Phrase]
    getNotes: [Note]  
    getSingleNote(noteId: ID!): Note  
    me: User
  }
  # mutation to create new user and new translation
  type Mutation {
    addUser(username: String!, email: String!, password: String!): AuthPayload
    createPhrase(text: String!, translation: String!, language: String!): Phrase
    login(email: String!, password: String!): AuthPayload
  }
`;

// export typeDefs for use in Apollo Server
module.exports = typeDefs;
