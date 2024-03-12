const express = require('express');

const router = express.Router();

const {loginUser, signUpUser, updateMonthlyIncome, updateTotalIncome} = require('../controllers/userController');

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signUpUser)

router.patch('/monthlyincome', updateMonthlyIncome);

router.patch('/totalincome', updateTotalIncome)


module.exports = router;