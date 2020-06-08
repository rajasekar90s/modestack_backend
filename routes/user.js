const express = require('express');
const router = express.Router();
const User = require('../models/User');

// validate role post parameters
const reqValidation = (req, res, next) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    next();
}

// check if userID exists
const checkUserId = async (req, res, next) => {
    try {
        const role = await User.findById(req.params.userId);
        if (!role) return res.status(400).json({ message: 'Invalid User' });
    } catch (err) {
        return res.status(400).json({ message: 'Invalid User' });
    }

    next();
}

// get all users
router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

// get a specific user
router.get('/:userId', checkUserId, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

// delete a specific user
router.delete('/:userId', checkUserId, async (req, res) => {
    try {
        const removeduser = await User.remove({_id: req.params.userId});
        res.json(removeduser);
    } catch (err) {
        res.json({ message: err });
    }
});

// update a specific user
router.patch('/:userId', reqValidation, checkUserId, async (req, res) => {
    try {
        const updateduser = await User.updateOne(
            { _id: req.params.userId },
            { $set: {
                name: req.body.name
            }});
        res.json(updateduser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
