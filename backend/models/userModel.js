const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    totalIncome: {
        type: Number,
        required: true,
        default: 0
    },
    monthlyIncome: {
        type: Number,
        required: true,
        default: 0
    },
    numOfOrders: {
        type: Number,
        required: true,
        default: 0
    },
    numOfCommissions: {
        type: Number,
        required: true,
        default: 0
    },
    monthlyNumOfCommissions: {
        type: Number,
        required: true,
        default: 0
    },
    totalOrdersPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

// static sign up method
// can't be an arrow function since we're using the "this" keyword
userSchema.statics.signUp = async function(username, email, password) {

    // validation
    if (!email || !password || !username) {
        throw Error('All fields must be filled.');
    }

    // if (!validator.isAlphanumericLocales(username)) {
    //     throw Error('Username must be alphanumeric.')
    // }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password too weak.');
    }

    const emailExists = await this.findOne({email});
    const usernameExists = await this.findOne({username});


    if (emailExists) {
        throw Error('Email already in use.');
    }

    if (usernameExists) {
        throw Error('Username unavailable.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({username, email, password: hash});

    return user;
}

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled.');
    }

    const user = await this.findOne({email});

    if (!user) {
        throw Error('No account with this email exists.');
    }

    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
        throw Error('Incorrect password.');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);