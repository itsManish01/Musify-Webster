const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
//used for seesion cookie
const session  = require('express-session');
const passport =  require('passport');
const passportLocal = require('./config/passport-local-strategy');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src: './assets/scss', 
  dest: './assets/css',
  // debug: true ,
  outputStyle : 'expanded',
  prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));


app.set('view engine' , 'ejs');
app.set('views'  , './views');
//mongo store is used to store the session cookie in the db
app.use(session({
  name : 'codecial',
  //TODO change secret before deployment int the production mode
  secret : 'blahsomething',
  saveUninitialized:false,
  resave: false,
  cookie:{
    maxAge: (1000*60*100),
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use router 
app.use('/' , require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in runnning the server : ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});

