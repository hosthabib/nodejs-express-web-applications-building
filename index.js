import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { fileURLToPath } from 'url';
import { title } from 'process';
import { assert } from 'console';
const PORT=process.env.PORT || 3000;
const app=express();

//const sessionsRouter = require('./src/routers/sessionsRouter');
import sessionsRouter from './src/routers/sessionsRouter.js';
import adminRouter from './src/routers/adminRouter.js';
import authRouter  from './src/routers/authRouter.js'; 

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:'globomantics'}));

import passportConfig from './src/data/config/passport.js';
passportConfig(app);

app.set('views','./src/views');
app.set('view engine', 'ejs');



app.use('/sessions',sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth',authRouter);

app.get('/',(req,res)=>{
    res.render('index',{title:'Globomantics', data:['a','b','c']});
});

app.listen(PORT,()=>{
    console.log(`listening on port ${chalk.green(PORT)}`);
})
