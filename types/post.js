const { gql } = require('apollo-server-express');

module.exports = gql`
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  input PostInput {
    id: Int
    title: String
    author: AuthorInput
    votes: Int
  }

  type Query {
    posts: [Post]
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost(postId: Int!): Post
  }
`;
