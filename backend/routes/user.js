const requireAuth = require('../middleware/requireAuth');

const express = require("express");

const router = express.Router();

const {
  loginUser,
  signUpUser,
  updateMonthlyIncome,
  updateTotalIncome,
  getIncomeData,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signUpUser);

router.patch("/monthlyincome", updateMonthlyIncome);

router.patch("/totalincome", updateTotalIncome);

router.get("/income/:id", requireAuth, getIncomeData);

module.exports = router;
