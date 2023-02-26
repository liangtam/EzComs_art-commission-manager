const express = require('express');
const router = express.Router();

const { createOrder, getOrders, getOrder, deleteOrder, updateOrder } = require('../controllers/orderController');
const Order = require('../models/clientOrderModel');
// GET all orders
router.get('/', getOrders);

// GET commissions
router.get('/commissions', (req, res) => {
    res.json({mssg: 'get all commissions'});
});

// GET single order
router.get('/:id', getOrder);

// POST new order
router.post('/', createOrder);

// DELETE an order
router.delete('/:id', deleteOrder);

// UPDATE an order
router.patch('/:id', updateOrder);

module.exports = router;