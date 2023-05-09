const express = require('express');
const router = express.Router();
const {getForm, postForm, getForms, deleteForm, updateForm} = require('../controllers/formController');

// GET the toggled on form

// GET a form
router.get('/:id', getForm);

// DELETE a form
router.delete('/:id', deleteForm);

// UPDATE a form
router.patch('/:id', updateForm);

// POST a form
router.post('/', postForm)

// GET all forms
router.get('/', getForms);




module.exports = router;