const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Create the express app
const app = express();

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
    'GET',
    'POST',
    'PATCH',
    'DELETE',
    'OPTIONS',
    'PUT'
  );
  next();
});

// Posts GET route
app.get('/api/posts', (req, res) => {
  let posts = [
    { id: 1, title: 'post1', content: 'This came from server' },
    { id: 2, title: 'post2', content: 'This also came from server' }
  ];
  res.status(200).json(posts);
});

// Posts POST route
app.post('/api/posts', (req, res) => {
  let posts = [
    { id: 1, title: 'post1', content: 'This came from server' },
    { id: 2, title: 'post2', content: 'This also came from server' }
  ];
  // for now since we dont have a db, lets just log
  console.log('Post received: ', req.body);
  const post = req.body;
  post.id = 3;
  posts.push(post);
  res.status(201).json({
    message: 'Post added!',
    posts
  });
  // res.status(200).json(posts);
});

module.exports = app;
