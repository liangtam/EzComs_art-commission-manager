const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This is the form saved by the artist, i.e. what the client needs to fill out
const formSchema = new Schema({
    shortAnswerQuestions: {
        type: Array
    },
    shortAnswerAnswers: {
        type: Array
    },
    mcQuestions: {
        type: Array
    },

    mcAnswers: {
        type: Array
    }
});

module.exports = mongoose.model('form', formSchema);