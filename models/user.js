const mongoose = require('mongoose');

const dateGetter = (date) => date.toDateString();

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        get: dateGetter
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    exercises: [exerciseSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
