const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create a user
router.post('/register', async (req, res) => {

    // check if username exists
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).json({ message: 'Username Exists' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashPassword);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        password: hashPassword
    });

    try {
        const saveduser = await user.save();
        // res.json({ id: saveduser._id });
        res.json(
          {
             statusCode: 201,
             body:{
               message: "new user created"
             }
          }
        );
    } catch (err) {
        res.json({ message: err });
    }
});

// login
router.post('/login', async (req, res) => {

    // check if email exists
    const theUser = await User.findOne({ username: req.body.username });
    if (!theUser) return res.status(400).json({ message: 'Username does not exist' });
    console.log(theUser.password);
    // check password
    const validPass = await bcrypt.compare(req.body.password, theUser.password)

    if (!validPass) return res.status(400).json({ message: 'Password Incorrect' });

    // create and assign token
    const token = jwt.sign({ _id: theUser._id }, process.env.TOKEN_SECRET);

    res.json(
      {
         statusCode: 200,
         body: {
           message: "success",
           accessToken: token
         }
       }
     );
});

module.exports = router;
