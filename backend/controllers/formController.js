const express = require('express');
const Form = require('../models/formModel');
const mongoose = require('mongoose');
const fs = require('fs');
//import { unlinkSync } from 'node:fs';


const getActiveForm = async(req, res) => {
    const {id} = req.params;
    console.log("id: ", id);

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: "Active form does not exist. ID is not valid."});
    }

    try {
        const activeForm = await Form.find({user_id : id, activeStatus: true});
        
        if (!activeForm) {
            return res.status(404).json({error: "Active form does not exist."});
        }
        res.status(200).json(activeForm);
    } catch (error) {
        console.log(error);
        return res.status(404).json({error: "Error fetching active form."});

    }

}
// GET single form
const getForm = async(req, res) => {
    const {id} = req.params;

    
    if (!mongoose.isValidObjectId(id)){
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
    const user_id = req.user._id;
    // the finds all forms, starting from most recent one
    const forms = await Form.find({user_id: user_id}).sort({activeStatus: -1, createdAt: -1});

    // this means signal everything is ok, and the "forms" is
    //      sending the array as json back to client 
    res.status(200).json(forms);
};

const postForm = async(req, res) => {
    const {formName, questions, activeStatus} = req.body;
    try {
        const user_id = req.user._id;
        const form = await Form.create({formName, questions, activeStatus, user_id});
        res.status(200).json(form);
    } catch {
        res.status(400).json({error: error.message});
    }

    //res.json({mssg: 'posted form'});
};

const deleteForm = async (req, res) => {
    const {id} = req.params;
    console.log("ID: ", id);



    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({error: 'Invalid form ID!'});
    }

    const form = await Form.findByIdAndDelete({_id: id});


    if (!form) {
        return res.status(400).json({error: 'Form not found.'});
    } else {
        return res.status(200).json(form);
    }
};

const updateForm = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error: 'Invalid form ID!'});
    }

    const form = await Form.findOneAndUpdate({_id: id}, {
        ...req.body // spreading the properties of the object, like id, questions, etc.
    });

    if (!form) {
        return res.status(400).json({error: 'Invalid form!'});
    } else {
        return res.status(200).json(form);
    }
};


module.exports = {getForm, postForm, getForms, deleteForm, updateForm, getActiveForm};