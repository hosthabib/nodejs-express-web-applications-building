  //import chalk  from 'chalk';
  //import { greenBright } from 'chalk';
import express from 'express';
import debug from 'debug';
const appDebug =debug('app:adminRouter');
import { MongoClient } from'mongodb';
import sessions from '../data/sessions.json' assert{type:'json'};

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://hosthabib786:KFxBLECqnNw7e8G0@cluster0.f3zgupx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const response = await db.collection('sessions').insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

export default adminRouter;
