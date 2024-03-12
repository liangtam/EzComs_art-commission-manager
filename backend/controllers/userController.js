
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'}); // first arg is payload, second is secret, third is some options
}
// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);

        const userID = user._id;

        res.status(200).json({username: user.username, email, userID, token});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// signup user

const signUpUser = async (req, res) => {

    const {username, email, password} = req.body;

    try {
        const user = await User.signUp(username, email, password);

        // create a token
        const token = createToken(user._id);
        const userID = user._id;

        // passing the token back to frontend (header, payload, secret all encoded and mushed together into a string, ea item separated via dots)
        res.status(200).json({username, email, userID, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {loginUser, signUpUser};