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
            referenceImages: req.body.referenceImages,
            fillouts: req.body.fillouts,
            price: req.body.price,
            dateReqqed: req.body.dateReqqed,
            datePaid: req.body.datePaid,
            deadline: req.body.deadline,
            status: req.body.status
        });

        ///let referenceImages = [];
        //const files = await req.files;

        // // my attempt to make sure filename wont be undefined...
        // while (req.files === null) {
        //     for (let i = 0; req.files.length; i++) {
        //     const file = req.files[i];
        //     //console.log(req.files[i].filename)
        //     //if (req.files[i]) {
        //         const filePath = url + '/images/' + file.filename;
        //         referenceImages.push(filePath);
        //     //}
        //     }
        //     break;
        // }
        // if (req.files) {
        //     console.log("true")
        // }

        // works, but idk why forEach works with if(req.files)...
        // if (req.files) {
        //     req.files.forEach((file) => {
        //         const path = url + '/images/' + file.filename;
        //         referenceImages.push(path);
        //     })
        // }

        // order.referenceImages = referenceImages;

        
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
// update an order
const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such order.'});
    };

    const order = await Order.findOneAndUpdate({_id: id}, {
        ...req.body //spreading the property of the req.body object
    } );

    if (!order){
        return res.status(404).json({error: 'No such order.'});
    }

    res.status(200).json(order);
}

module.exports = { postOrder, getOrders, getOrder, deleteOrder, updateOrder };