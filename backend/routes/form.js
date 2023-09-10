const express = require('express');
const router = express.Router();
const {getForm, postForm, getForms, deleteForm, updateForm} = require('../controllers/formController');
const requireAuth = require('../middleware/requireAuth');

// require authentication for all form routes
router.use(requireAuth); // this middleware will be fired before any of the other routes

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