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

// get completed orders
const getCompletedOrders = async (req, res) => {
    const completedOrders = await Order.find({status: "Completed"}).sort({createdAt: -1});
    
    res.status(200).json(completedOrders);
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
        const order = new Order({... req.body
        });

        let referenceImages = [];
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const path = url + "/images//" + req.files[i].filename;
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
        
};


// delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot delete order.'});
    }

    const order = await Order.findById({_id: id})

    console.log("order to delete: ", order);
    const refImgs = order.referenceImages;

    for (let i = 0; i < refImgs.length; i++) {
        const refImgPath = "./images/" + refImgs[i].substring(30); // get everything after "http://localhost:4000"
        console.log("refImgPath: ", refImgPath);
        fs.unlink(refImgPath, (error) => {
            if (error) {
                console.log("Error deleting image: ", error);
            } else {
                console.log("Images deleted with order!");
            }
        })
    }

    const orderDelete = await Order.findOneAndDelete({_id: id})

    if (!orderDelete){
        return res.status(404).json({error: 'Cannot delete order.'});
    }

    res.status(200).json(orderDelete);
}
// This is to update an order for the convenience of the artist's workspace while working on the commission
//     You can only add order notes, WIP arts, completed arts, and change the status of the order
const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such order.'});
    };

    const oldOrder = await Order.findById({_id: id});

    let alreadyUploadedCompletedArt = oldOrder.completedArts;
    let alreadyUploadedWipArt = oldOrder.wipArts;

    console.log("Updated order: ", {...req.body});
    const newOrder = {...req.body};
    const url = req.protocol + '://' + req.get('host');

    const newlyUploadedCompletedArts = req.files["completedArts[]"];
    const newlyUploadedWipArts = req.files["wipArts[]"];

    //PATCH DOESNT WORK FOR MULTIFORM DATA -- NVM THIS IS CAP
    let artistFinishedImgs = [];
    let wipImgs = [];
    if (newlyUploadedCompletedArts) {
        for (let i = 0; i < newlyUploadedCompletedArts.length; i++) {
            const path = url + "/images/artistImages//" + newlyUploadedCompletedArts[i].filename;
            artistFinishedImgs.push(path)
        }
        const allFinishedImgs = alreadyUploadedCompletedArt.concat(artistFinishedImgs);
        newOrder.completedArts = allFinishedImgs;
    }

    if (newlyUploadedWipArts) {
        for (let i = 0; i < newlyUploadedWipArts.length; i++) {
            const path = url + '/images/artistImages//' + newlyUploadedWipArts[i].filename;
            wipImgs.push(path);
        }
        const allWipImgs = alreadyUploadedWipArt.concat(wipImgs);
        newOrder.wipArts = allWipImgs;
    }

    const order = await Order.findOneAndUpdate({_id: id}, newOrder);


    if (!order){
        return res.status(404).json({error: 'No such order.'});
    }

    res.status(200).json(order);
    console.log(newOrder);
}

// This is to actually edit the client's order--you can actually change some information on the order
//      You can change the client's name, request details, fillout answers, and reference images.
//      For safety reasons, an original copy of the order will always be available.
const editOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such order.'});
    };

    const oldOrder = await Order.findById({_id: id});

    let newOrder = {
        clientName: req.body.clientName,
        clientContact: req.body.clientContact,
        requestDetail: req.body.requestDetail,
        fillouts: req.body.fillouts,
        price: req.body.price,
        dateReqqed: req.body.dateReqqed,
        datePaid: req.body.datePaid,
        dateCompleted: req.body.dateCompleted,
        deadline: req.body.deadline,
        status: req.body.status,
        wipArts: req.body.status,
        completedArts: req.body.status,
        editedStatus: req.body.editedStatus,
        originalUneditedOrder: req.body.originalUneditedOrder
    }

    let oldRefImgs = new Set(oldOrder.referenceImages);
    let refImgsToDelete = new Set(req.body.refImgsToDelete); // this has all current ref imgs without deleted ones

    for (let i = 0; i < refImgsToDelete.length; i++) {
        const refImgPath = "./images/" + refImgsToDelete[i].substring(30); 
        fs.unlink(refImgPath, (error) => {
            if (error) {
                console.log('Could not delete ' + refImgPath);
            } else {
                console.log('Image ' + refImgPath + ' deleted!');
            }
        });
    }

    let updatedRefImgs = Array.from(oldRefImgs).filter(img => !refImgsToDelete.has(img)); // get rid of all deleted imgs

    let newRefImgs = Array.from(req.files);
    console.log("Req files", req.files);
    const hostURL = req.protocol + '://' + req.get('host');

    let newRefImgsURLs = [];

    if (req.files) {
        for (let i = 0; i < newRefImgs.length; i++) {
            const path = hostURL + '/images//' + newRefImgs[i].filename;
            newRefImgsURLs.push(path);
        }
    }

    newOrder.referenceImages = updatedRefImgs.concat(newRefImgsURLs);

    const order = await Order.findByIdAndUpdate({_id: id}, newOrder);

    if (!order) {
        res.status(400).json({error: 'Error: Could not edit order!'});
        console.log('Could not edit order.')
    }

    res.status(200).json({message: 'Successfully edited order!'});

}

module.exports = { postOrder, getOrders, getOrder, deleteOrder, updateOrder, editOrder, getCompletedOrders };