const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This is the form saved by the artist, i.e. what the client needs to fill out
const formSchema = new Schema({
    formName: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    activeStatus: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('form', formSchema);