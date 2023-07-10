const express = require('express');
const Order = require('../models/clientOrderModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require ('path');
const fs = require('fs');


//redirect to orders page
const redirectToOrders = (req, res) => {
    res.redirect('/orders');
}

// get orders
const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({createdAt: -1});

    res.status(200).json(orders);
}

// get a single order
const getOrder = async(req, res) => {
    const { id } = req.params;

    // to see if the ID is valid (eg. it has to be 12 digits)
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Order does not exist.'});
    }
    const order = await Order.findById(id);

    if (!order) {
        return res.status(400).json({error: 'Order does not exist.'});
    }

    res.status(200).json(order);
}

const postOrder = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
        const order = new Order({
            clientName: req.body.clientName,
            clientContact: req.body.clientContact,
            requestDetail: req.body.requestDetail,
            fillouts: req.body.fillouts,
            price: req.body.price,
            dateReqqed: req.body.dateReqqed,
            datePaid: req.body.datePaid,
            deadline: req.body.deadline,
            status: req.body.status
        });

        let referenceImages = [];
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const path = url + "//images/" + req.files[i].path;
                referenceImages.push(path)
            }
            order.referenceImages = referenceImages;
        }

        console.log(req.files);

        /** YouTube way... not a fan. **/
        // if (req.files) {
        //     let path = '';
        //         req.files.forEach((file) => {
        //             path = path + file.path + ','
        //         })

        //     path = path.substring(0, path.lastIndexOf(","));
        //     order.referenceImages = path;
        // }

        /** old way. no difference except using forEach. Use this if ref.files isn't an array but just a collection **/

        // let referenceImages = [];

        // if (req.files) {
        //     req.files.forEach((file) => {
        //         const path = url + "//images/" + file.filename;
        //         referenceImages.push(path);
        //     })
        //     order.referenceImages = referenceImages;
        // }
        
        order.save()
        .then((response) => {
            res.status(200).json({
                mssg: "Order added!"
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error.message
            })
        });
        
        // old json request
        //console.log("postOrder");
        // const { clientName, clientContact, requestDetail, fillouts, referenceImages, price, dateReqqed, datePaid, deadline, status } = req.body;
        
        //     try {
        //         const order = await Order.create({  clientName, clientContact, requestDetail, fillouts, referenceImages, price, dateReqqed, datePaid, deadline, status });
        //         res.status(200).json(order);
        //     } catch (error) {
        //         console.log(req.body);
        //         res.status(400).json({error: error.message});
        //     }
};


// delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot delete order.'});
    }

    const order = await Order.findOneAndDelete({_id: id})

    if (!order){
        return res.status(404).json({error: 'Cannot delete order.'});
    }

    res.status(200).json(order);
}
// update an order. CONVERT MULTIFORM DATA TO JSON FIRST OR ELSE IT WON'T WORK!
const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such order.'});
    };

    console.log({...req.body});
    const newOrder = {...req.body};

    // PATCH DOESNT WORK FOR MULTIFORM DATA
    // let referenceImages = [];
    // if (req.files) {
    //     for (let i = 0; i < req.files.length; i++) {
    //         const path = url + "//images/" + req.files[i].path;
    //         referenceImages.push(path)
    //     }
    //     newOrder.referenceImages = referenceImages;
    // }

    const order = await Order.findOneAndUpdate({_id: id}, newOrder);


    if (!order){
        return res.status(404).json({error: 'No such order.'});
    }

    res.status(200).json(order);
    console.log(newOrder);
}

module.exports = { postOrder, getOrders, getOrder, deleteOrder, updateOrder };