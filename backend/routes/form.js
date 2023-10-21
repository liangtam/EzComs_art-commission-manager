const express = require('express');
const router = express.Router();
const {getForm, postForm, getForms, deleteForm, updateForm} = require('../controllers/formController');
const requireAuth = require('../middleware/requireAuth');

// require authentication for all form routes
// router.use(requireAuth); // this middleware will be fired before any of the other routes

// GET a form
router.get('/:id', requireAuth, getForm);

// DELETE a form
router.delete('/:id', requireAuth, deleteForm);

// UPDATE a form
router.patch('/:id', requireAuth, updateForm);

// POST a form
router.post('/', requireAuth, postForm)

// GET all forms
router.get('/', requireAuth, getForms);




module.exports = router;