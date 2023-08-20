const express = require('express');
const Order = require('../models/clientOrderModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require ('path');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');


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
    
    //const url = req.protocol + '://' + req.get('host');
        let order = new Order({... req.body});
        order.wipArts = [];
        order.completedArts = [];

        let referenceImages = [];

        if (req.files) {
            /** Old way of image upload: the images were just uploaded to file system**/
            // for (let i = 0; i < req.files.length; i++) {
            //     const path = url + "/images//" + req.files[i].filename;
            //     referenceImages.push(path)
            // }
            // order.referenceImages = referenceImages;

            // Uploading the images to cloudinary, then storing the URLs of the images to the order
            for (let i = 0; i < req.files.length; i++) {
                try {
                    console.log("Req file: ", req.files[i])
                    const cloudResult = await cloudinary.uploader.upload(req.files[i].path);
                    console.log("Cloud result: ", cloudResult);
                    referenceImages.push({imageURL: cloudResult.url,
                                        imageID: cloudResult.public_id});

                    // deleting the image we just uploaded from our file. We wrap it with try catch so that our
                    //      unlinking error doesn't get thrown to the outer try catch. That will be confusing
                    try {
                        fs.unlink(req.files[i].path, (error) => {
                            if (error) {
                                throw error;
                            } else {
                                console.log(`Unlink success! Deleted file: ${req.files[i].path}`);
                            }
                        });
                    } catch (unlinkError) {
                        console.log(`Unlink error: ${unlinkError}`);
                    }                     

                }  catch (error) {
                    console.log("Error uploading img: ", error)
                }  
            }
        }

        //console.log("Post order, req.files: " + req.files);
        console.log("Post order, ref images: " + referenceImages);

        // Setting our order's reference images to the ones we just uploaded
        order.referenceImages = referenceImages;
        

        // Saving the order to backend
        order.save()
        .then((result) => {
            res.status(200).json({
                success: true,
                mssg: "Order added!",
                data: result
            })
        })
        .catch((error) => {
            console.log(`Error saving order: ${error}`);
            res.status(500).json({
                success: false,
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

    // deleting all the reference images from cloudinary
    for (let i = 0; i < refImgs.length; i++) {
        try {
            const cloudResult = await cloudinary.uploader.destroy(refImgs[i].imageID);
            console.log(`Image deleted from cloudinary! ${cloudResult}`);
        } catch (error) {
            console.log(`Error deleting image from cloudinary :( ${error}`);
        }
    }

    // for (let i = 0; i < refImgs.length; i++) {
    //     const refImgPath = "./images/" + refImgs[i].substring(30); // get everything after "http://localhost:4000"
    //     console.log("refImgPath: ", refImgPath);
    //     fs.unlink(refImgPath, (error) => {
    //         if (error) {
    //             console.log("Error deleting image: ", error);
    //         } else {
    //             console.log("Images deleted with order!");
    //         }
    //     })
    // }

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
    //const url = req.protocol + '://' + req.get('host');

    let newlyUploadedCompletedArts = []
    let newlyUploadedWipArts = []

    if (req.files) {
        newlyUploadedCompletedArts = req.files["completedArts[]"];
        newlyUploadedWipArts = req.files["wipArts[]"];
    }

    //PATCH DOESNT WORK FOR MULTIFORM DATA -- NVM THIS JUST APPLIES TO POSTMAN
    let artistFinishedImgs = [];
    let wipImgs = [];

    if (newlyUploadedCompletedArts) {
        for (let i = 0; i < newlyUploadedCompletedArts.length; i++) {
            try {
                const cloudResult = await cloudinary.uploader.upload(newlyUploadedCompletedArts[i].path);
                console.log(`Successfully uploaded completed artwork!`, cloudResult);
                artistFinishedImgs.push({
                    imageID: cloudResult.public_id,
                    imageURL: cloudResult.url
                });

                try {
                    fs.unlink(newlyUploadedCompletedArts[i].path, (error) => {
                        if (error) {
                            throw error;
                        } else {
                            console.log(`Uploaded newly completed art! ${cloudResult}`);
                        }
                    })
                } catch (unlinkError) {
                    console.log("Unlink completed art error: ", unlinkError);
                }
            } catch (error) {
                console.log("Error uploading to cloudinary: ", error);
            }
        }

        const allCompletedArts = alreadyUploadedCompletedArt.concat(artistFinishedImgs);
        newOrder.completedArts = allCompletedArts;
    }

    if (newlyUploadedWipArts) {
        for (let i = 0; i < newlyUploadedWipArts.length; i++) {
            try {
                const cloudResult = await cloudinary.uploader.upload(newlyUploadedWipArts[i].path);
                console.log(`Successfully uploaded WIP artwork!`, cloudResult);
                wipImgs.push({
                    imageID: cloudResult.public_id,
                    imageURL: cloudResult.url
                });

                try {
                    fs.unlink(newlyUploadedCompletedArts[i].path, (error) => {
                        if (error) {
                            //throw error;
                        } else {
                            console.log(`Uploaded new WIP art! ${cloudResult}`);
                        }
                    })
                } catch (unlinkError) {
                    console.log("Unlink WIP art error: ", unlinkError);
                }
            } catch (error) {
                console.log("Error uploading to cloudinary: ", error);
            }
        }
        const allWipImgs = alreadyUploadedWipArt.concat(wipImgs);
        newOrder.wipArts = allWipImgs;
    }

    /* OLD METHOD (uploaded images to file system and thats it. URL is access via localhost) */
    // if (newlyUploadedCompletedArts) {
    //     for (let i = 0; i < newlyUploadedCompletedArts.length; i++) {
    //         const path = url + "/images/artistImages//" + newlyUploadedCompletedArts[i].filename;
    //         artistFinishedImgs.push(path)
    //     }
    //     const allFinishedImgs = alreadyUploadedCompletedArt.concat(artistFinishedImgs);
    //     newOrder.completedArts = allFinishedImgs;
    // }

    // if (newlyUploadedWipArts) {
    //     for (let i = 0; i < newlyUploadedWipArts.length; i++) {
    //         const path = url + '/images/artistImages//' + newlyUploadedWipArts[i].filename;
    //         wipImgs.push(path);
    //     }
    //     const allWipImgs = alreadyUploadedWipArt.concat(wipImgs);
    //     newOrder.wipArts = allWipImgs;
    // }

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

    if (newOrder.editedStatus === false) {
        newOrder.originalUneditedOrder = oldOrder;
        newOrder.editedStatus = true;
    }

    const order = await Order.findByIdAndUpdate({_id: id}, newOrder);

    if (!order) {
        res.status(400).json({error: 'Error: Could not edit order!'});
        console.log('Could not edit order.')
    }

    res.status(200).json({message: 'Successfully edited order!'});

}

module.exports = { postOrder, getOrders, getOrder, deleteOrder, updateOrder, editOrder, getCompletedOrders };