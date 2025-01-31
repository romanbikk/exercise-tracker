const mongoose = require('mongoose');

const excerciseSchema = new mongoose.Schema({
    description: String,
    duration: Number,
    date: Date


});

const Excersice = mongoose.model('Excersice', excerciseSchema);

module.exports = Excersice;


// {
//     username: "fcc_test",
//     description: "test",
//     duration: 60,
//     date: "Mon Jan 01 1990",
//     _id: "5fb5853f734231456ccb3b05"
//   }
  