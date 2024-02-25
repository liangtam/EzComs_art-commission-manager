import styles from './OrderDetails.module.css';
import { useState, useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {ImagePreview, ImageComponent, OriginalOrderComponent, YesNoPopup} from '../../components/';
import { orderMessageReducer, ACTION } from '../reducers/orderMessageReducer.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';

import origOrderIcon from '../../assets/images/orig_order_icon.png';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState('');

    const [orderName, setOrderName] = useState('');
    const [fillouts, setFillouts] = useState([]);
    const [status, setStatus] = useState("");
    const [artistNotes, setArtistNotes] = useState('');
    const [price, setPrice] = useState('');
    const [completedArts, setCompletedArts] = useState([]);
    const [uploadedCompletedArts, setUploadedCompletedArts] = useState([]);
    const [wipArts, setWipArts] = useState([]);
    const [uploadedWipArts, setUploadedWipArts] = useState([]);

    const [wipArtsToDelete, setWipArtsToDelete] = useState([]);
    const [completedArtsToDelete, setCompletedArtsToDelete] = useState([]);

    const [showOrigOrder, setShowOrigOrder] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const { user } = useAuthContext();

    const [state, dispatch] = useReducer(orderMessageReducer, {
        successMessage: '',
        errorMessage: '',
        loadingMessage: ''
    });

    // console.log('Wip arts to delete: ', wipArtsToDelete);
    // console.log('Completed arts to delete: ', completedArtsToDelete);

    const fetchOrder = async () => {
        if (!user) {
            return;
        }
        const response = await fetch('http://localhost:4000/api/orders/' + id, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        if (response.ok) {
            const json = await response.json();
            setOrder(json);
            console.log('Fetched order: ', json);
        } else {
            console.log('response not ok');
        }
    };

    const handleSave = async (e) => {
        if (!user) {
            return;
        }

        e.preventDefault();

        dispatch({ type: ACTION.LOADING });

        const dateObj = new Date();
        const currDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;

        let newOrder = new FormData();

        newOrder.append('orderName', orderName);
        newOrder.append('clientName', order.clientName);
        newOrder.append('clientContact', order.clientContact);
        newOrder.append('requestDetail', order.requestDetail);
        for (let i = 0; i < fillouts.length; i++) {
            newOrder.append('fillouts', JSON.stringify(fillouts[i]));
        }
        newOrder.append('referenceImages[]', order.referenceImages);
        newOrder.append('price', price);
        newOrder.append('dateReqqed', order.dateReqqed);
        newOrder.append('datePaid', order.datePaid);

        if (order.status === 'Completed' && status === 'Completed') {
            newOrder.append('dateCompleted', order.dateCompleted);
        } else if (order.status === 'Completed' && status !== 'Completed') {
            newOrder.append('dateCompleted', 'To be set');
        } else if (order.status !== 'Completed' && status === 'Completed') {
            newOrder.append('dateCompleted', currDate);
        } else {
            newOrder.append('dateCompleted', order.dateCompleted);
        }
        newOrder.append('deadline', order.deadline);
        newOrder.append('status', status);
        newOrder.append('artistNotes', artistNotes);
        for (let i = 0; i < uploadedCompletedArts.length; i++) {
            newOrder.append('completedArts[]', uploadedCompletedArts[i]);
        }

        for (let i = 0; i < uploadedWipArts.length; i++) {
            newOrder.append('wipArts[]', uploadedWipArts[i]);
        }
        let origOrder = order.originalUneditedOrder;

        if (order.originalUneditedOrder) {
            // origOrder = JSON.stringify(origOrder);
            console.log('origOrder: ', origOrder);
        }

        newOrder.append('originalUneditedOrder', origOrder);

        console.log('WipArtsToDelete: ', wipArtsToDelete);

        for (let i = 0; i < wipArtsToDelete.length; i++) {
            newOrder.append('wipArtsToDelete[]', JSON.stringify(wipArtsToDelete[i]));
        }
        for (let i = 0; i < completedArtsToDelete.length; i++) {
            newOrder.append('completedArtsToDelete[]', JSON.stringify(completedArtsToDelete[i]));
        }

        newOrder.append('user_id', order.user_id);

        const response = await fetch('http://localhost:4000/api/orders/' + id, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            body: newOrder
        });

        if (response.ok) {
            console.log('Updated order! ', newOrder);
            fetchOrder();
            setUploadedCompletedArts([]);
            setUploadedWipArts([]);
            dispatch({ type: ACTION.SUCCESS_UPDATE });
            setTimeout(() => {
                dispatch({ type: ACTION.RESET });
            }, 3000);
        } else {
            console.log('Error: Order was NOT updated :(');
            dispatch({ type: ACTION.ERROR_UPDATE });
            setTimeout(() => {
                dispatch({ type: ACTION.RESET });
            }, 3000);
        }
    };

    const handleEditButton = (e) => {
        e.preventDefault();

        navigate('/orders/edit/' + id);
    };

    const handleArtistNotesChange = (e) => {
        setArtistNotes(e.target.value);
    };

    const handleCompletedArtChange = (e) => {
        let arts = Array.from(e.target.files);

        setUploadedCompletedArts(uploadedCompletedArts.concat(arts));
    };

    const handleWIPArtChange = (e) => {
        let files = Array.from(e.target.files);

        setUploadedWipArts(uploadedWipArts.concat(files));
    };

    const handleDeletePreviewCompletedImage = (e, image) => {
        e.preventDefault();

        setUploadedCompletedArts(uploadedCompletedArts.filter((img) => img !== image));
    };

    const handleDeleteWipPreviewImage = (e, image) => {
        e.preventDefault();

        setUploadedWipArts(uploadedWipArts.filter((img) => img !== image));
    };

    const handleDeleteCurrentWipArts = (e, imageToDelete) => {
        e.preventDefault();

        setWipArts(wipArts.filter((image) => image !== imageToDelete));
        setWipArtsToDelete([imageToDelete, ...wipArtsToDelete]);
    };

    const handleDeleteCurrentCompletedArts = (e, imageToDelete) => {
        e.preventDefault();

        setCompletedArts(completedArts.filter((image) => image !== imageToDelete));
        setCompletedArtsToDelete([imageToDelete, ...completedArtsToDelete]);
    };

    const handleOpenPopup = (e) => {
        e.preventDefault();
        setOpenPopup(true);
    };

    const closePopup = (e) => {
        setOpenPopup(false);
    };

    const handleDeleteOrder = async (e) => {
        if (!user) {
            return;
        }
        e.preventDefault();
        dispatch({ type: ACTION.LOADING });
        const response = await fetch('http://localhost:4000/api/orders/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            console.log('Order deleted!');
            navigate('/orders/');
        } else {
            console.log('Error :( ', response.statusText);

            dispatch({ type: ACTION.ERROR_DELETE });
            setTimeout(() => {
                dispatch({ type: ACTION.RESET });
            }, 3000);
        }
    };

    const parseArrayItemsToJSON = (arr) => {
        if (!Array.isArray(arr)) {
            console.log('not an array');
            return [];
        }
        let parsedArr = [];
        for (let i = 0; i < arr.length; i++) {
            parsedArr.push(JSON.parse(arr[i]));
            console.log(arr[i]);
        }
        return parsedArr;
    };

    const initializeStates = () => {
        if (!order) {
            return;
        }

        setFillouts(parseArrayItemsToJSON(order.fillouts));
        //console.log("Fillouts: ", parseArrayItemsToJSON(order.fillouts));
        //console.log("Raw fillouts: ", order.fillouts);

        // Checking the radio button with the order's status
        setStatus(order.status);
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
        const artistNoteTextArea = document.getElementById('artistNotes');
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
        console.log('orig: ', order.originalUneditedOrder);

        if (order.wipArts) {
            setWipArts(order.wipArts);
        }

        setOrderName(order.orderName);
        setPrice(order.price);
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        initializeStates();
    }, [order]);

    return (
        <div className={styles.orderDetailsContainer}>
            <div className={styles.orderDetailsContent}>
                {/* <button className={styles.backBtn} onClick={(e) => navigate('/orders/')}>Back</button> */}
                <div className={`${styles.leftSide} radius-2 mid-grey-outline-1 pad-4 border-box`}>
                    <div className="flex-col gap-2 mary-3">
                        <h3>Order name: </h3> <input className="transparentInput pad-3 font-size-2" type="text" value={orderName} onChange={(e) => setOrderName(e.target.value)} placeholder="eg. Bob Thumbnail"></input>
                    </div>
                    <div className={styles.id}>
                        <strong>ID: </strong> {order && order._id}
                    </div>
                    <div className={styles.orderDefaultDetails}>
                        <p>
                            <strong>Client name: </strong>
                            {order && order.clientName}
                        </p>
                        <p>
                            <strong>Client contact: </strong> {order && order.clientContact}
                        </p>
                        <p>
                            <strong>Request: </strong> {order && order.requestDetail}
                        </p>
                        <p>
                            <strong>Requested on: </strong> {order && order.dateReqqed}
                        </p>
                        {order && order.dateCompleted !== 'To be set' && (
                            <p>
                                <strong>Date completed: </strong> {order.dateCompleted}
                            </p>
                        )}
                        {order && order.deadline && (
                            <p>
                                <strong>Deadline:</strong> {order.deadline}
                            </p>
                        )}
                    </div>
                    <div className={styles.status}></div>
                    <div className={styles.fillouts}>
                        <h4>Form fillouts:</h4>
                        <ul>
                            {fillouts &&
                                fillouts.map((question) => {
                                    return (
                                        <div className={styles.question} key={question.id}>
                                            <li>
                                                <b>{question.questionLabel}</b>
                                                <p>{question.questionAns}</p>
                                            </li>
                                        </div>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className={styles.orderDetailsPrice}>
                        <strong>Price: </strong>
                        <input className="transparentInput pad-3 font-size-2" type="number" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                    </div>
                    <div className={styles.status}>
                        <h4>Status:</h4>
                        <select className={styles.selection} value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
                            <option value="Not Started Yet">Not Started Yet</option>
                            <option value="WIP">Work In Progress</option>
                            <option value="Paused">Paused</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <label className={styles.fileInputContainer}>
                        <p>Upload WIP Artwork</p>
                        <input className="chooseFilesInput" type="file" accept=".png, .jpeg, .jpg" name="wipImages" onChange={handleWIPArtChange} multiple></input>
                        <span className="customFileInput">Choose Files</span>
                    </label>

                    <div className={styles.uploadedWipArts}>
                        {uploadedWipArts &&
                            uploadedWipArts.map((uploadedWipArt) => {
                                return <ImagePreview image={uploadedWipArt} handleDeleteImg={handleDeleteWipPreviewImage}></ImagePreview>;
                            })}
                    </div>
                    <div className={styles.artsContainer}>
                        {wipArts.length !== 0 && <h4>WIP Artwork</h4>}
                        <div className={styles.arts}>
                            {wipArts &&
                                wipArts.map((wipArt) => {
                                    return <ImageComponent image={wipArt} handleDeleteImage={handleDeleteCurrentWipArts} />;
                                })}
                        </div>
                    </div>
                    <br></br>
                    <label className={styles.fileInputContainer}>
                        <p>Upload Completed Artwork</p>
                        <input className="chooseFilesInput" type="file" accept=".png, .jpeg, .jpg" name="artistImages" onChange={handleCompletedArtChange} multiple></input>
                        <span className="customFileInput">Choose Files</span>
                    </label>
                    <div className={styles.completedArtworksPreviewUpload}>
                        {uploadedCompletedArts &&
                            uploadedCompletedArts.map((artURL) => {
                                return <ImagePreview image={artURL} handleDeleteImg={handleDeletePreviewCompletedImage}></ImagePreview>;
                            })}
                    </div>
                    <div className={styles.artsContainer}>
                        {completedArts.length !== 0 && <h4>Completed Artwork</h4>}
                        <div className={styles.arts}>
                            {completedArts &&
                                completedArts.map((completedArt) => {
                                    return <ImageComponent image={completedArt} handleDeleteImage={handleDeleteCurrentCompletedArts} />;
                                })}
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.reqDetails}>
                        <p>
                            <b>Request Details:</b>
                        </p>
                        {order && order.requestDetail}
                    </div>
                    <div className={styles.refImagesTitle}>
                        <p>
                            <b>Reference images: </b>
                        </p>
                    </div>
                    <div className={styles.refImages}>
                        {order &&
                            order.referenceImages.map((refImgURL) => {
                                return <img className={styles.refImg} id={refImgURL + order.id} src={refImgURL.imageURL}></img>;
                            })}
                    </div>
                    <div className={styles.orderNotes}>
                        <p>
                            <b>Order notes:</b>
                        </p>
                        <br></br>
                        <textarea
                            className="textArea"
                            placeholder="e.g. Client wants this for commercial use. e.g. Client expedited order for urgent use"
                            name=""
                            id="artistNotes"
                            cols="30"
                            rows="10"
                            onChange={handleArtistNotesChange}
                        ></textarea>
                    </div>

                    {order && order.editedStatus && (
                        <button className={styles.origOrderIcon} onClick={(e) => setShowOrigOrder(!showOrigOrder)}>
                            <img src={origOrderIcon} alt="Show Original Order"></img>
                        </button>
                    )}
                    {showOrigOrder && order && order.originalUneditedOrder && (
                        <div className={styles.origOrder}>
                            <p>Unedited Order: </p>
                            <OriginalOrderComponent
                                origOrder={order.originalUneditedOrder}
                                fillouts={parseArrayItemsToJSON(order.originalUneditedOrder.fillouts)}
                                referenceImages={order.originalUneditedOrder.referenceImages}
                            />
                        </div>
                    )}
                    {state && state.errorMessage && <div className="errorMessage">{state.errorMessage}</div>}
                    {state && state.successMessage && <div className="successMessage">{state.successMessage}</div>}
                    {state && state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
                    <div className={styles.buttons}>
                        <button className="fill-button pad-3 radius-4 font-weight-400" onClick={handleSave}>
                            Save
                        </button>
                        <button className="fill-button pad-3 radius-4  greyHoverButton font-weight-400" onClick={handleEditButton}>
                            Edit
                        </button>
                        <button className="fill-button pad-3 radius-4  deleteBtn font-weight-400 text-light-grey" onClick={handleOpenPopup}>
                            Delete
                        </button>
                    </div>
                </div>

                {openPopup && (
                    <YesNoPopup closePopup={closePopup} yesFunction={handleDeleteOrder}>
                        <h3>Are you sure?</h3>
                        <p>Are you sure you want to delete this order? This action cannot be undone.</p>
                    </YesNoPopup>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;
