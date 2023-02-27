const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// These are completed orders, so clients' commission orders
const orderSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    clientContact: {
        type: String,
        required: true
    },
    requestDetail: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    orderFormAnswers: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateReqqed: {
        type: String,
        required: true
    },

    datePaid: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);