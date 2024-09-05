import express from 'express';
import debug from 'debug';
const appDebug =debug('app:sessionRouter');
import { MongoClient, ObjectId } from'mongodb';
import speakerService from '../services/speakerService.js';
import sessions from '../data/sessions.json' assert{type:'json'};

const sessionsRouter = express.Router();
sessionsRouter.use((req,res,next)=>{
  if(req.user){
    next();
  }
  else{
    res.redirect('/auth/signIn');
  }
});


sessionsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://hosthabib786:KFxBLECqnNw7e8G0@cluster0.f3zgupx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const sessions = await db.collection('sessions').find().toArray();
      res.render('sessions' ,{sessions});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

sessionsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
    'mongodb+srv://hosthabib786:KFxBLECqnNw7e8G0@cluster0.f3zgupx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});
      const speaker=await speakerService.getSpeakerById(session.speakers[0].id);
      session.speaker=session.data;
      res.render('session', {
        session,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
  
});

export default sessionsRouter;
