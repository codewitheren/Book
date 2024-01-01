const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registeredBookSchema = require("./RegisteredBook");

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { type: String, 
        required: true
    },
    email: { type: String, 
        required: true, 
        unique: true
    },
    registeredBooks: [registeredBookSchema],
});
