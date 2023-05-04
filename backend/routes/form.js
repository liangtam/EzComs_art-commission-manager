const express = require('express');
const router = express.Router();
const {getForm, postForm, getForms} = require('../controllers/formController');

// GET the toggled on form

// GET a form
router.get('/:id', getForm);

// POST a form
router.post('/', postForm)

// GET all forms
router.get('/', getForms);



module.exports = router;