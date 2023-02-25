const express = require('express');
const Form = require('../models/formModel');
const mongoose = require('mongoose');

// GET single form
const getForm = async(req, res) => {
    const {id} = req.params;

    const form = await Form.findById(id);

    if (!form) {
        return res.status(404).json({error: 'Form does not exist.'});
    }
    res.json({mssg: 'got form'});
};

// GET all forms
const getForms = async(req, res) => {
    // the crea
    const forms = await Form.find({}).sort({createdAt: -1});

    // this means signal everything is ok, and the "forms" is
    //      sending the array as json back to client 
    res.status(200).json(forms);
};

const postForm = async(req, res) => {
    res.json({mssg: 'posted form'});
};

module.exports = {getForm, postForm, getForms};