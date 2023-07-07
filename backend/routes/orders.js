const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { postOrder, getOrders, getOrder, deleteOrder, updateOrder } = require('../controllers/orderController');

// storage object (disk storage)
const Storage = multer.diskStorage({
    destination:(req, file, cb) => {
        // first arg: error, second: destination
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        console.log(file)
        // first arg: error, second: name of file. we added date to differentiate b/w files with same names
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


// middleware containing the multer object, which contains two objects--storage
//  storage is kinda where the specifications of the files are
const upload = multer({
    storage: Storage
})

// GET commissions
router.get('/commissions', (req, res) => {
    res.json({mssg: 'get all commissions'});
});

// GET single order
router.get('/:id', getOrder);


// DELETE an order
router.delete('/:id', deleteOrder);

// UPDATE an order
router.patch('/:id', updateOrder);

// GET all orders
router.get('/', getOrders);

// POST new order
router.post('/', postOrder);

module.exports = router;