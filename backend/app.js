const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import post model
const PostModel = require('./models/Post')

// Create the express app
const app = express();

// Connect to db
mongoose.connect(`mongodb+srv://transientcw:14623361aZ!aZ@@cluster0-iqevz.mongodb.net/mean-social-app?retryWrites=true&w=majority`, {useNewUrlParser: true}).then(() => {
  console.log('Connected to db!');
}).catch((err) => {
  console.log('Error connecting to db: ', err);
});

// Log it!
app.use(morgan('dev'));

// Parsing
app.use(bodyParser.json());

// Enable CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'DELETE',
    'GET',
    'POST',
    'PATCH',
    'PUT'
  );
  next();
});

// Posts GET route
app.get('/api/posts', (req, res) => {
  PostModel.find().then(posts => {
    res.status(200).json({
      message: 'Posts fetch success',
      posts
    })
  })
});

// Single post GET route
app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  PostModel.findOne({_id: id}).then(post => {
    res.status(201).json({post})
  });
});

// Single PATCH route for updating a post
app.patch('api/posts/', (req, res) => {
  const post = req.body.post;
  PostModel.findByIdAndUpdate(
    {_id: post.id},
    {title: post.title, content: post.content}
  ).then(message => {
    console.log('OPERATION FROM PATCH: ', message);
    res.status(201).json({message});
  })
  .catchError(err => {
    console.log('ERROR: ', err);
    res.status(500).json({err});
  })
});

// Posts POST route
app.post('/api/posts', (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content
  });
  // Keep in mind, the collection used is going to be your model name, plural (Posts) in our case
  post.save().then(
    PostModel.find({}).then((posts) => {
      posts.push(post);
      res.status(200).json({
        message: 'Posts',
        posts: posts
      })
    })
  );
});

// Posts DELETE route
app.delete('/api/posts/:id', (req, res) => {
  PostModel.deleteOne({_id: req.params.id}).then(status => {
    if (status.ok === 1) {
      res.status(201).json({
        message: 'Delete success'
      })
    } else {
      res.status(500).json({
        message: 'Deletion error on server'
      });
    }
  });
});

module.exports = app;
