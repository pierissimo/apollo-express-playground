const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { find, filter } = require('lodash');
const { mergeTypes } = require('merge-graphql-schemas');
const types = require('./types');

// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
];

const typeDefs = mergeTypes([...types]);

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id }),
    authors: (parent, args, context, info) => {
      return authors;
    }
  },

  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    }
  },

  Author: {
    posts: (author, args, context, info) => filter(posts, { authorId: author.id })
  },

  Post: {
    author: post => find(authors, { id: post.authorId })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 3000 }, () => console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`));
