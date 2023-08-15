const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require("../utils/cloudinary");

const { postOrder, getOrders, getOrder, deleteOrder, updateOrder, editOrder, getCompletedOrders } = require('../controllers/orderController');

// storage object (disk storage)
// we first store the image on our computer, then to mongo
const Storage = multer.diskStorage({
    destination:(req, file, cb) => {
        // first arg: error, second: destination
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        //console.log(file)
        // first arg: error, second: name of file. we added date to differentiate b/w files with same names
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const artistStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './images/artistImages');
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});


// middleware containing the multer object, which contains two objects--storage
//  storage is kinda where the specifications of the files are
const upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            console.log("Only jpg or png allowed.");
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 *2
    }
});

const artistUpload = multer({
    storage: artistStorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            console.log("Only jpg or png allowed.");
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 *2
    }
})

// GET all COMPLETED orders
router.get('/completed', getCompletedOrders);

router.patch('/edit/:id', upload.array('uploadedReferenceImages[]'), editOrder);

// GET single order
router.get('/:id', getOrder);


// DELETE an order
router.delete('/:id', deleteOrder);

// UPDATE an order
router.patch('/:id', artistUpload.fields([
    {name: 'completedArts[]'},
    {name: 'wipArts[]'}
    ]), updateOrder);

// GET all orders
router.get('/', getOrders);

// POST new order
router.post('/', upload.array('referenceImages[]', 10), postOrder);

module.exports = router;