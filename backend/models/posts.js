const connection = require('./connection');
const mongoose = require('mongoose');

const postSchema = new connection.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;