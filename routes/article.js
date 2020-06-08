const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Article = require('../models/Article');

// get all articles
router.get('/list', async (req, res) => {
    try {
        const article = await Article.find().populate('user');
        res.json(article);
    } catch (err) {
        res.json({ message: err });
    }
});

// create an article
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        user: req.user._id
        //author: req.body.author
    });

    try {
        const savedarticle = await article.save();
        res.json({
          statusCode: 201,
          body: {
            message: "new article created"
          }
        });
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
