const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true}
});

const Post = mongoose.model('Post', schema);
module.exports = Post;