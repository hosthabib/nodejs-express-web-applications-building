import express from 'express';
import debug from 'debug';
const appDebug =debug('app:sessionRouter');
import { MongoClient, ObjectId } from'mongodb';
import passport from 'passport';

const authRouter=express.Router();

authRouter.route('/signUp').post((req, res) => {
    const { username, password } = req.body;
    const url =
    'mongodb+srv://hosthabib786:KFxBLECqnNw7e8G0@cluster0.f3zgupx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = 'globomantics';
  
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
  
        const db = client.db(dbName);
        const user = { username, password };
        const results = await db.collection('users').insertOne(user);
        debug(results);
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (error) {
        debug(error);
      }
      //client.close();
    })();
  });
  
authRouter.route('/signIn').get((req,res)=>{
  res.render('signin');
}).post(passport.authenticate('local',{
  successRedirect:'/auth/profile',
  failureMessage:'/'
}))
authRouter.route('/profile').get((req,res)=>{
    res.json(req.user);
});
export default authRouter;