import styles from './OrderDetails.module.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImagePreview from '../../components/ImagePreview';
import ImageComponent from '../../components/ImageComponent';
import OriginalOrderComponent from '../../components/order_components/OriginalOrderComponent';

const OrderDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState('');
    const [fillouts, setFillouts] = useState([]);
    const [status, setStatus] = useState(null);
    const [artistNotes, setArtistNotes] = useState('');
    const [completedArts, setCompletedArts] = useState([]);
    const [uploadedCompletedArts, setUploadedCompletedArts] = useState([]);  
    const [wipArts, setWipArts] = useState([]);
    const [uploadedWipArts, setUploadedWipArts] = useState([]);

    const [wipArtsToDelete, setWipArtsToDelete] = useState([]);
    const [completedArtsToDelete, setCompletedArtsToDelete] = useState([]);

    const [showOrigOrder, setShowOrigOrder] = useState(false);

    // useEffect(() => {
    //     console.log(status)
    // }, [status])

    useEffect(() => {
        console.log("Wip arts to delete: ", wipArtsToDelete)
        console.log("Completed arts to delete: ", completedArtsToDelete)
    }, [wipArtsToDelete, completedArtsToDelete])

    const fetchOrder = async () => {
        const response = await fetch('http://localhost:4000/api/orders/' + id);
        
        if (response.ok) {
            const json = await response.json();
            setOrder(json);
            console.log("Fetched order: ", json);
        } else {
            console.log("response not ok");
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        let newOrder = new FormData();
        newOrder.append("clientName", order.clientName);
        newOrder.append("clientContact", order.clientContact);
        newOrder.append("requestDetail", order.requestDetail);
        for (let i = 0; i < fillouts.length; i++) {
            newOrder.append("fillouts", JSON.stringify(fillouts[i]));
        }
        newOrder.append("referenceImages[]", order.referenceImages)
        newOrder.append("price", order.price);
        newOrder.append("dateReqqed", order.dateReqqed);
        newOrder.append("datePaid", order.datePaid);
        newOrder.append("dateCompleted", order.dateCompleted);
        newOrder.append("deadline", order.deadline);
        newOrder.append("status", status);
        newOrder.append("artistNotes", artistNotes);
        for (let i = 0; i < uploadedCompletedArts.length; i++) {
            newOrder.append("completedArts[]", uploadedCompletedArts[i]);
        }

        for (let i = 0; i < uploadedWipArts.length; i++) {
            newOrder.append("wipArts[]", uploadedWipArts[i]);
        }

        newOrder.append("originalUneditedOrder", order.originalUneditedOrder);

        console.log("WipArtsToDelete: ", wipArtsToDelete);
        // if (wipArtsToDelete.length) {

        // }
        for (let i = 0; i < wipArtsToDelete.length; i++) {
            newOrder.append('wipArtsToDelete[]', JSON.stringify(wipArtsToDelete[i]));
        }
        for (let i = 0; i < completedArtsToDelete.length; i++) {
            newOrder.append('completedArtsToDelete[]', JSON.stringify(completedArtsToDelete[i]));
        }

        const response = await fetch('http://localhost:4000/api/orders/' + id, {
            method: 'PATCH',
            body: newOrder
        });

        if (response.ok) {
            console.log("Updated order! ", newOrder);
            fetchOrder();
            setUploadedCompletedArts([]);
            setUploadedWipArts([]);
        } else {
            console.log("Error: Order was NOT updated :(")
        }

    }

    const handleEditButton = (e) => {        
        e.preventDefault();

        navigate('/orders/edit/' + id);     
    }

    const handleArtistNotesChange = (e) => {
        setArtistNotes(e.target.value);
    }

    const handleCompletedArtChange = (e) => {
        let arts = Array.from(e.target.files);
        
        setUploadedCompletedArts(uploadedCompletedArts.concat(arts));
    }

    const handleWIPArtChange = (e) => {
        let files = Array.from(e.target.files);

        setUploadedWipArts(uploadedWipArts.concat(files));
    }


    const handleDeletePreviewCompletedImage = (e, image) => {
        e.preventDefault();

        setUploadedCompletedArts(uploadedCompletedArts.filter((img) => img !== image));
    }

    const handleDeleteWipPreviewImage = (e, image) => {
        e.preventDefault();

        setUploadedWipArts(uploadedWipArts.filter((img) => img !== image));
    }

    const handleDeleteCurrentWipArts = (e, imageToDelete) => {
        e.preventDefault();

        setWipArts(wipArts.filter((image) => image !== imageToDelete));
        setWipArtsToDelete([imageToDelete, ...wipArtsToDelete]);
    }

    const handleDeleteCurrentCompletedArts = (e, imageToDelete) => {
        e.preventDefault();

        setCompletedArts(completedArts.filter((image) => image !== imageToDelete));
        setCompletedArtsToDelete([imageToDelete, ...completedArtsToDelete]);
    }

    const parseArrayItemsToJSON = (arr) => {
        if (!Array.isArray(arr)) {
            return [];
        }
        let parsedArr = [];
        for (let i = 0; i < fillouts.length; i++) {
            parsedArr.push(JSON.parse(arr[i]));
        }
        return parsedArr;
    }

    useEffect(() => {
        fetchOrder();
    }, []);


    useEffect(() => {
        setFillouts(parseArrayItemsToJSON(order.fillouts));

        // Checking the radio button with the order's status
        setStatus(order.status);
        console.log("Status: ", JSON.stringify(order.status));
        // const statusRadios = Array.from(document.getElementsByName("statusSelection"));
        // console.log("Fetched order's status: ", order.status);
        // for (let i = 0; i < statusRadios.length; i++) {
        //     if (statusRadios[i].id === order.status) {
        //         statusRadios[i].checked = true;
        //         break;
        //     }
        // }
        
        // Filling in the artistNotes textarea with order's artistNotes
        setArtistNotes(order.artistNotes);
        const artistNoteTextArea = document.getElementById("artistNotes");
        artistNoteTextArea.value = order.artistNotes;

        // Show any completed artworks
        // if (order.completedArts) {
        //     let orderCompletedArts = order.completedArts;
        //     console.log("Here: ", Array.isArray(order.completedArts), Array.isArray(orderCompletedArts));
        //     for (let i = 0; i < orderCompletedArts.length; i++) {
        //         orderCompletedArts[i] = JSON.parse(orderCompletedArts[i])
        //     }
        // }
        setCompletedArts(order.completedArts);
        console.log("orig: ", order.originalUneditedOrder);

        if (order.wipArts) {
            setWipArts(order.wipArts);
        }
        
    }, [order]);

    return (
        <div className={styles.order_details}>
            <div className={styles.id}> <strong>ID: </strong> {order && order._id} </div>
            <h3><strong>Client name: </strong>{order && order.clientName}</h3>
            <p><strong>Client contact: </strong>  { order && order.clientContact}</p>
            <p><strong>Request: </strong> {order && order.requestDetail}</p>
            <p><strong>Requested on: </strong> {order && order.dateReqqed}</p>
            <p><strong>Deadline:</strong> {order && order.deadline}</p>
            <div className={styles.status}>
                
            </div>

            <div className={styles.fillouts}>
                <h4>Form fillouts:</h4>
                {fillouts && fillouts.map((question) => {
                    return <div className={styles.question}>
                        <ul>
                            <li><b>{question.questionLabel + ": "}</b>
                                {question.questionAns}
                            </li>
                        </ul>
                    </div> 
                })}
            </div>
            <div><b>Reference images: </b></div>
            <div className={styles.images}>
                {order && order.referenceImages.map((refImgURL) => {
                    return <img className={styles.refImg} id={refImgURL + order.id} src={refImgURL.imageURL}></img>
                } )}
            </div>
            <div className={styles.orderNotes}>
                <b>Order notes:</b>
                <br></br>
                <textarea placeholder="Order notes" name="" id="artistNotes" cols="30" rows="10" onChange={handleArtistNotesChange}></textarea>
            </div>
            <div className={styles.status}>
                <h4>Status:</h4>
                <select value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
                    <option value="Not Started Yet">Not Started Yet</option>
                    <option value="WIP">Work In Progress</option>
                    <option value="Paused">Paused</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>


            <div><h4>WIP Artwork</h4></div>
            <div className={styles.wipArts}>
                {wipArts && wipArts.map((wipArt) => {
                    return <ImageComponent image={wipArt} handleDeleteImage={handleDeleteCurrentWipArts} />
                })}
            </div>
            <br></br>
            <label>Upload WIP Artwork: <input type="file" accept=".png, .jpeg, .jpg" name="wipImages" onChange={handleWIPArtChange} multiple></input></label>
            <div className={styles.uploadedWipArts}>
                {uploadedWipArts && uploadedWipArts.map((uploadedWipArt) => {
                    return <ImagePreview image={uploadedWipArt} handleDeleteImg={handleDeleteWipPreviewImage}></ImagePreview>
                })}
            </div>


            <div className={styles.completedArtworks}>
            <h4>Completed Artwork</h4>
            <br></br>
                {completedArts && completedArts.map((completedArt) => {
                    return <ImageComponent image={completedArt} handleDeleteImage={handleDeleteCurrentCompletedArts} />
                })}
            </div>
            <br></br>
            <label>Upload Completed Artwork <input type="file" accept=".png, .jpeg, .jpg" name="artistImages" onChange={handleCompletedArtChange}multiple></input></label>
            <div className={styles.completedArtworksPreviewUpload}>
                {uploadedCompletedArts && uploadedCompletedArts.map((artURL) => {
                    return <ImagePreview image={artURL} handleDeleteImg={handleDeletePreviewCompletedImage}></ImagePreview>
                })}
            </div>
            {order && order.editedStatus &&
                <button className={styles.origOrderIcon} onClick={(e) => setShowOrigOrder(!showOrigOrder)}><img src='../images/orig_order_icon.png' alt="Show Original Order"></img></button>
            }
            {showOrigOrder && order && order.originalUneditedOrder &&
            <div className={styles.origOrder}><h3>Unedited Order: </h3>
            <OriginalOrderComponent origOrder={order.originalUneditedOrder} fillouts={parseArrayItemsToJSON(order.originalUneditedOrder.fillouts)} referenceImages={order.originalUneditedOrder.referenceImages}/></div>}

            <div className={styles.buttons}>
                <button className={styles.saveBtn} onClick={handleSave}>Save</button>
                <button className={styles.deleteBtn}>Delete</button>
                <button className={styles.editBtn} onClick={handleEditButton}>Edit</button>
            </div>

        </div>
    )
}

export default OrderDetails;
