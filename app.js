const express = require('express');
const app = express();
const baseRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('flash');
const cookieSession = require('cookie-session');

//load environment variables into process.env in development mode
if (process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}

//express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({secret: process.env.SECRET_KEY, cookie: {maxAge: 60 * 60 * 1000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport.js')(passport);

//this function protects the /app folder
app.use(function(req, res, next) {
  if (!req.isAuthenticated() && req.path.indexOf('/app') === 0) {
    req.flash('message', 'Please log in again.');
    res.redirect('/');
    return;
  }

  next();
});
app.use(express.static(__dirname + '/public'));

//configure passport first
app.use('/', baseRoutes(passport));

//mongoose configuration
mongoose.set('useCreateIndex', true);

//connect to mongodb, then listen
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log('Connected to mongodb');
  app.listen(3000, () => console.log('App listening'));
});
