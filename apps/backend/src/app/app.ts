const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/post');

const mongooseObj = require('mongoose');
mongooseObj
  .connect(
    'mongodb+srv://stack-admin:Mongodb4shawn@7@clusterstack0-xszpj.mongodb.net/mean-post?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connected to mongo db'))
  .catch(() => console.log('Connection failed !'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: 'Post successfully added !'
  });
});

app.get('/posts', (req, res, next) => {
  const posts = [
    {
      id: 1,
      title: 'First post',
      content: 'This is coming from the server 1'
    },
    {
      id: 1,
      title: 'SEcond post',
      content: 'This send post is coming from the server 1'
    },
    {
      id: 1,
      title: 'Third post',
      content: 'This third post is also coming from the server 1'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
