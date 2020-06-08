const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    },
    // author: {
    //     type: String,
    //     required: true,
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now()
    }
},
{ timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
