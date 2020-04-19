import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import axios from 'axios';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { HarbourResolver } from './resolvers/HarbourResolver';

async function main(): Promise<void> {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [HarbourResolver],
  });
  const server = new ApolloServer({ schema });
  const app = express();
  server.applyMiddleware({ app });

  app.use(bodyParser.json());
  app.use(cors());

  app.get('/search', async function(req: Request, res: Response) {
    const BASE_URL =
      'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const { query } = req.query;
    const GOOGLE_MAPS_SETTINGS = {
      key: process.env.GOOGLE_MAPS_APIKEY,
      language: 'fi',
      region: 'fi',
      query: encodeURI(query),
    };

    const attributes: string = Object.entries(GOOGLE_MAPS_SETTINGS)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const url = `${BASE_URL}?${attributes}`;

    try {
      const resp = await axios.get(url);
      res.json(resp.data.results);
    } catch (e) {
      console.log(e.response.data);
    }
  });

  app.listen({ port: 8888 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:8888${server.graphqlPath}`,
    ),
  );
}

main();
