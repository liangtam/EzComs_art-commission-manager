const express = require('express');
const Form = require('../models/formModel');
const mongoose = require('mongoose');

// GET single form
const getForm = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Form does not exist. Invalid ID!'});
    }

    const form = await Form.findById(id);

    if (!form) {
        return res.status(404).json({error: 'Form does not exist.'});
    }
    res.status(200).json(form);
};

// GET all forms
const getForms = async(req, res) => {
    // the finds all forms, starting from most recent one
    const forms = await Form.find({}).sort({createdAt: -1});

    // this means signal everything is ok, and the "forms" is
    //      sending the array as json back to client 
    res.status(200).json(forms);
};

const postForm = async(req, res) => {
    const {formName, questions, activeStatus} = req.body;
    try {
        const form = await Form.create({formName, questions, activeStatus});
        res.status(200).json(form);
    } catch {
        res.status(400).json({error: error.message});
    }

    //res.json({mssg: 'posted form'});
};


module.exports = {getForm, postForm, getForms};