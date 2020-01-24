const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const postsRoutes = require('./routes/posts');


const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://stack-admin:mongodb4vinton@clusterstack0-xszpj.mongodb.net/mean-post?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connected to mongo db'))
  .catch(err => console.log('Connection failed !', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/posts', postsRoutes);


module.exports = app;
