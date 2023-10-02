import { gql } from '@apollo/client';

export const QUERY_PHRASES = gql`
  query getPhrases($language: String!) {
    getPhrases(language: $language) {
      _id
      text
      translation
      createdAt
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      notes {
        _id
        noteText
        createdAt
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      notes {
        _id
        noteText
        createdAt
      }
    }
  }
`;
