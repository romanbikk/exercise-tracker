
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
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
        get: function(_date) {
            return _date.toDateString();
        },
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }},
    { toJSON: { getters: true } 
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;