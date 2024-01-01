const mongoose = require('mongoose');

const BookPartSchema = new mongoose.Schema({
    partNumber: {
        type: Number,
        required: true,
    },
    content: {
        type: [String],
        required: true,
    },
});

module.exports = BookPartSchema;