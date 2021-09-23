// typeDefs extends models, enables endpoints to be hit
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: int
    savedBooks: [Book]!
  }

  type Book {
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  // an input allows consistent client side mutations to get a book from a input field

  input bookInfo {
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: bookInfo!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;