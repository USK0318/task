const connection = require('./connection');
const mongoose = require('mongoose');

const faveSchema = new connection.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Fave = mongoose.model('Fave', faveSchema);

module.exports = Fave;