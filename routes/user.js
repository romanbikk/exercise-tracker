const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user'); 
const Exercise = require('../models/exercise');
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
        const user = await User.findById(userId).populate('log');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const excerciseData = {
            description,
            duration,
            date: date ? new Date(date): new Date(),
            userId
        };

        const newExercise = await Exercise.create(excerciseData);
        user.log.push(newExercise);
        await user.save();
        res.status(201).json({
            description,
            duration: newExercise.duration,
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
        const {from, to, limit} = req.query;
        const {userId} = req.params;
        console.log('from', from)
        console.log('to', to)
        console.log('limit', limit);

        const match = from ? {date: { $gte: from, $lte: to }} : {}

        const user = await User.findById(userId).populate({
            path: 'log',
            model: 'Exercise',
            select:'description duration date -_id',
            match,
            options: {
                limit: limit
            },
            strictPopulate: false
        });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        let log; 
        if (user && user.log) {
            log = user.log.map((el) => {
                return {
                    description: el.description,
                    duration: el.duration,
                    date: el.date
                } 
            });
        }

        const response = {
            _id: user._id.toString(),
            username: user.username,
            count: log.length,
            log,
      };

      console.log('response', response);

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
