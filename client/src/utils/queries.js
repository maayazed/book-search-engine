import { gql } from 'graphql-tag';

export const GET_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    thoughts {
      _id
      thoughtText
      createdAt
    }
  }
}
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        description
        bookId
        image
        link
        title
        authors
      }
    }
  }
`;