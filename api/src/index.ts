import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { HarbourResolver } from './resolvers/HarbourResolver';

async function main() {
  await createConnection();
  const schema = await buildSchema({ resolvers: [HarbourResolver] });
  const server = new ApolloServer({ schema });
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
}

main();
