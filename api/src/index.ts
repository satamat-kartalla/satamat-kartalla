import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { HarbourResolver } from './resolvers/HarbourResolver';
import axios from 'axios';

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [HarbourResolver],
  });
  const server = new ApolloServer({ schema });
  const app = express();
  server.applyMiddleware({ app });

  app.use(bodyParser.json());

  app.get('/search', async function(req: Request, res: Response) {
    const BASE_URL =
      'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const GOOGLE_MAPS_SETTINGS = {
      key: process.env.GOOGLE_MAPS_APIKEY,
      language: 'fi',
      region: 'fi',
      ...req.query,
    };

    const attributes: string = Object.entries(GOOGLE_MAPS_SETTINGS)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const url = `${BASE_URL}?${attributes}`;

    try {
      const resp = await axios.get(url);
      console.log({ resp });
    } catch (e) {
      console.log({ e });
    }
  });

  app.listen({ port: 8888 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:8888${server.graphqlPath}`,
    ),
  );
}

main();
