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
    fillouts: {
        type: Array,
        required: true
    },

    referenceImages: {
        type: Array,
        required: false
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
    
    dateCompleted: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    artistNotes: {
        type: String,
        required: false
    }
    
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);