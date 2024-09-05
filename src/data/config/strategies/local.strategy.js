import passport  from "passport";
import {Strategy} from 'passport-local';
import debug from 'debug';
const appDebug =debug('app:localStrategy');
export default function localStrategy(){
    passport.use(new Strategy({
        usernameField:'username',
        passwordField:'password'
    },(username, password,done)=>{
        const url =
    'mongodb+srv://hosthabib786:KFxBLECqnNw7e8G0@cluster0.f3zgupx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = 'globomantics';
        (async function validateUser() {
         let client;
         try{
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');
            const db = client.db(dbName);
            const user=await db.collection('users').findOne({username});
            if(user && user.password===password){
                done(null,user);
            }
            else{
                done(null,false);
            }
         }  
         catch(error){
            done(error,false);
         } 
         client.close();
        }())
    }));
}