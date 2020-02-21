import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { Harbour } from './entity/Harbour';

createConnection().then(connection => {
  const harbourRepository = connection.getRepository(Harbour);
  const app = express();

  app.use(bodyParser.json());

  app.get('/harbours', async function(req: Request, res: Response) {
    const users = await harbourRepository.find();
    res.json(users);
  });

  app.listen(8888);
});
