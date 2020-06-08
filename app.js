const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {tokenAuth} = require('./routes/privateRoutes');
require('dotenv/config');

// middlewares
app.use(cors());
app.use(bodyParser.json());

// import routes
const authRoutes = require('./routes/authenticate')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')

app.use('/', authRoutes);
app.use('/user', tokenAuth, userRoutes);
app.use('/article', tokenAuth, articleRoutes);
//app.use('/article', articleRoutes);

// routes
app.get('/', (req, res) => {
    res.send('Home Page')
});

// connect to db
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('connected to DB')
);

// listen
app.listen(process.env.PORT || 4000);
