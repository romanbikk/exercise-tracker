const express = require('express');
const User = require('../models/user'); 
const Excercise = require('../models/excercise');
const router = express.Router();

router.post('/users', async (req, res)=> {
    const {username} = req.body;
    try {
        console.log('username', username);
        const user = new User({username});
        await user.save();
        res.status(201).json({username: user.username, _id: user._id});
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
})

router.post('/users/:userId/exercises', async (req, res) => {
    const { date, description, duration } = req.body;
    const {userId} = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const excerciseData = {
            description,
            duration,
            date: new Date(date),
            userId
        };

        const newExercise = new Exercise(excerciseData);
        await newExercise.save();
        res.status(201).json({
            ...excerciseData, 
            _id: user._id, 
            username: user.username,
            date: newExercise.date
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({ message: error.message });

    }
})

router.get('/users/:userId/logs', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const excercises = await Excercise.find()

        res.json(
            {
            username: user.username,
            count: user.exercises.length,
            _id: user._id,
            log: user.exercises
          }
          );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
