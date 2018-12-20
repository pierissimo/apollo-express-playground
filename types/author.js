const { gql } = require('apollo-server-express');

module.exports = gql`
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }

  input AuthorInput {
    id: Int
    firstName: String
    lastName: String
    posts: PostInput
    and: [AuthorInput]
    or: [AuthorInput]
  }

  type Query {
    author(id: Int!): Author
    authors(filter: AuthorInput): [Author]
  }
`;
