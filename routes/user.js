const express = require('express');
const User = require('./models/User'); 
const router = express.Router();

router.post('/users', async (req, res)=> {
    const {username} = req.body;
    try {
        const user = new User();
        await user.save({username});
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
})

router.post('/users/:userId/exercises', async (req, res) => {
    const { title, description, duration } = req.body;

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newExercise = {
            title,
            description,
            duration,
        };

        user.exercises.push(newExercise);
        await user.save();

        res.status(201).json({...newExercise, _id: user._id, username: user.username});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Получение всех упражнений пользователя
router.get('/users/:userId/logs', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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
