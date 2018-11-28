const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//console.log(''+process.env.NODE_ENV);
//link to .env
if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/', routes());

//mongoose configuration
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }).then(() => {
  console.log('Connected to mongodb');
  app.listen(3000, () => console.log('App listening'));
});
