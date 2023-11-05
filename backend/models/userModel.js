const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static sign up method
// can't be an arrow function since we're using the "this" keyword
userSchema.statics.signUp = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled.');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password too weak.');
    }

    const emailExists = await this.findOne({email});

    if (emailExists) {
        throw Error('Email already in use.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});
    // console.log("Sign up: ", user);

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
    //console.log("here", match);
    
    if (!match) {
        throw Error('Incorrect password.');
    }
    // console.log("Login: ", user);

    return user;
}

module.exports = mongoose.model('User', userSchema);