const mongoose = require('mongoose');
const BookPartSchema = require('./BookPart');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    parts: [BookPartSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Book", BookSchema);