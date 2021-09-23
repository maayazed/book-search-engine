const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
// token middleware SERVER authorization, allows a user to do stuff with data once confirmed is user
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  server.applyMiddleware({ app, path: '/graphql' });

  await server.start();
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startServer(typeDefs, resolvers);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });