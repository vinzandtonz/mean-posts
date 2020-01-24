const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(response => {
    res.status(201).json({
      message: 'Post successfully added !',
      postId: response._id
    });
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      console.log(post);
      if (post) {
        res.status(200).json({
          id: post._id,
          title: post.title,
          content: post.content
        });
      } else {
        res.status(404).json({
          message: 'Post not found !'
        });
      }
    })
})

router.get('', (req, res, next) => {
  Post.find().then(posts => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content
      }))
    });
  });
});



router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({
    _id: req.params.id
  }).then(response => {
    console.log(response);
    res.status(200).json({
      message: '${req.params.id} Deleted successfully'
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({
      _id: req.params.id
    }, post)
    .then((response) => {
      console.log('Updated successfully');
      res.status(200).json({
        message: 'Updated successfully'
      })
    })
});

module.exports = router;
