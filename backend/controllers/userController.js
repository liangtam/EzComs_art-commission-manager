
const User = require('../models/userModel');
// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// signup user

const signUpUser = async (req, res) => {
    res.json({mssg: 'sign up user'})

}

module.exports = {loginUser, signUpUser};