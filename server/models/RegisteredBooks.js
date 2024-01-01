const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registeredBookSchema = new Schema({
    bookId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true, 
        unique: true
    },
    userId: { 
        type: String,
        ref: "User",
        required: true, 
        unique: true
    },
    currentPart: {
        type: Number,
        required: true,
    },
    currentIndex: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = registeredBookSchema;