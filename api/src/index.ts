import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { Harbour } from './entity/Harbour';
import { ApolloServer, gql } from 'apollo-server-express';

createConnection().then(connection => {
  const harbourRepository = connection.getRepository(Harbour);

  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  server.applyMiddleware({ app });

  app.use(bodyParser.json());

  /*
  app.get('/harbours', async function(req: Request, res: Response) {
    const users = await harbourRepository.find();
    res.json(users);
  });
  */

  app.listen({ port: 8888 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:8888${server.graphqlPath}`,
    ),
  );
});
