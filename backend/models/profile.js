const connection = require('./connection');
const mongoose = require('mongoose');

const profileSchema = new connection.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;