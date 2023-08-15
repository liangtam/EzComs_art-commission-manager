import styles from './OrderDetails.module.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImagePreview from '../../components/ImagePreview';
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

    const selectStatus = (e) => {
        setStatus(e.target.value);
        console.log("Status selected: ", e.target.value);
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


    const handleDeleteImage = (e, image) => {
        e.preventDefault();

        setUploadedCompletedArts(uploadedCompletedArts.filter((img) => img !== image));
    }

    const handleDeleteWipImage = (e, image) => {
        e.preventDefault();

        setUploadedWipArts(uploadedWipArts.filter((img) => img !== image));
    }

    useEffect(() => {
        fetchOrder();
    }, []);


    useEffect(() => {
        let questions = [];
        if (Array.isArray(order.fillouts)) {
            for (let i = 0; i < order.fillouts.length; i++) {
                // need to parse JSON stringified object back into an object
                console.log("question before parse: ", order.fillouts[i]);
                let question = JSON.parse(order.fillouts[i]);
                console.log("question after parse: ", question);
                questions.push(question);
            }
        }
        setFillouts(questions);

        // Checking the radio button with the order's status
        setStatus(order.status);
        const statusRadios = Array.from(document.getElementsByName("statusSelection"));
        console.log("Fetched order's status: ", order.status);
        for (let i = 0; i < statusRadios.length; i++) {
            if (statusRadios[i].id === order.status) {
                statusRadios[i].checked = true;
                break;
            }
        }
        
        // Filling in the artistNotes textarea with order's artistNotes
        setArtistNotes(order.artistNotes);
        const artistNoteTextArea = document.getElementById("artistNotes");
        artistNoteTextArea.value = order.artistNotes;

        // Show any completed artworks
        setCompletedArts(order.completedArts);

        if (order.wipArts) {
            setWipArts(order.wipArts);
        }
        
    }, [order])

    return (
        <div className={styles.order_details}>
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
                    return <img className={styles.refImg} id={refImgURL + order.id} src={refImgURL}></img>
                } )}
            </div>
            <div className={styles.orderNotes}>
                <b>Order notes:</b>
                <br></br>
                <textarea placeholder="Order notes" name="" id="artistNotes" cols="30" rows="10" onChange={handleArtistNotesChange}></textarea>
            </div>
            <div className={styles.status}>
                <h4>Status:</h4>
                <ul>
                    <li><label><input type="radio" name="statusSelection" id="Not Started Yet" value="Not Started Yet" onChange={selectStatus}></input>Not Started Yet</label></li>
                    <li><label><input type="radio" name="statusSelection" id="WIP" value="WIP" onChange={selectStatus}></input>WIP</label></li>
                    <li><label><input type="radio" name="statusSelection" id="Paused" value="Paused" onChange={selectStatus}></input>Paused</label></li>
                    <li><label><input type="radio" name="statusSelection" id="Completed" value="Completed" onChange={selectStatus}></input>Completed</label></li>
                </ul>
            </div>


            <div><h4>WIP Artwork</h4></div>
            <div className={styles.wipArts}>
                {wipArts && wipArts.map((wipArt) => {
                    return <img className={styles.wipArt} src={wipArt}></img>
                })}
            </div>
            <br></br>
            <label>Upload WIP Artwork: <input type="file" accept=".png, .jpeg, .jpg" name="wipImages" onChange={handleWIPArtChange} multiple></input></label>
            <div className={styles.uploadedWipArts}>
                {uploadedWipArts && uploadedWipArts.map((uploadedWipArt) => {
                    return <ImagePreview image={uploadedWipArt} handleDeleteImg={handleDeleteWipImage}></ImagePreview>
                })}
            </div>


            <div className={styles.completedArtworks}>
            <h4>Completed Artwork</h4>
            <br></br>
                {completedArts && completedArts.map((completedArt) => {
                    return <img className={styles.completedArt} src={completedArt}></img>
                })}
            </div>
            <br></br>
            <label>Upload Completed Artwork <input type="file" accept=".png, .jpeg, .jpg" name="artistImages" onChange={handleCompletedArtChange}multiple></input></label>
            <div className={styles.completedArtworksPreviewUpload}>
                {uploadedCompletedArts && uploadedCompletedArts.map((artURL) => {
                    return <ImagePreview image={artURL} handleDeleteImg={handleDeleteImage}></ImagePreview>
                })}
            </div>

            <div className={styles.buttons}>
                <button className={styles.saveBtn} onClick={handleSave}>Save</button>
                <button className={styles.deleteBtn}>Delete</button>
                <button className={styles.editBtn} onClick={handleEditButton}>Edit</button>
            </div>

        </div>
    )
}

export default OrderDetails;
