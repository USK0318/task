const connection = require('./connection');
const mongoose = require('mongoose');

const settingsSchema = new connection.Schema({
    theme: {
        type: String,
        required: true,
    },
    profileposition: {
        type: Number,
        default: 1,
    },
    postposition: {
        type: Number,
        default: 2,
    },
    faveposition: {
        type: Number,
        default: 3,
    }
}, {
    timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;