import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_PHRASE = gql`
  mutation createPhrase($text: String!, $translation: String!, $language: String!) {
    createPhrase(text: $text, translation: $translation, language: $language) {
      _id
      text
      translation
      language
    }
  }
`;
