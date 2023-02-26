const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This is a question, with a question label, answers, and if it's MC, list of options
const questionSchema = new Schema({
    questionLabel : {
        type: String,
        required: true
    },

    answers: {
        type: Array,
        required: true
    },

    options: {
        type: Array,
        required: false
    },

    optionAnswers: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('question', questionSchema);