import styles from './OrderDetails.module.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponent';
import ImagePreview from '../../components/ImagePreview';

const EditOrderDetails = () => {

    const { id } = useParams();
    const [order, setOrder] = useState('');
    const [fillouts, setFillouts] = useState([]);
    const [clientName, setClientName] = useState('');
    const [requestDetail, setRequestDetail] = useState('');
    const [referenceImages, setReferenceImages] = useState([]);
    const [refImgsToDelete, setRefImgsToDelete] = useState([]);
    const [uploadedReferenceImages, setUploadedReferenceImages] = useState([]);

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
        newOrder.append("clientName", clientName);
        newOrder.append("clientContact", order.clientContact);
        newOrder.append("requestDetail", requestDetail);
        for (let i = 0; i < fillouts.length; i++) {
            newOrder.append("fillouts", JSON.stringify(fillouts[i]));
        }
        for (let i = 0; i < uploadedReferenceImages.length; i++) {
            newOrder.append("uploadedReferenceImages[]", uploadedReferenceImages[i]);
        }
        newOrder.append("price", order.price);
        newOrder.append("dateReqqed", order.dateReqqed);
        newOrder.append("datePaid", order.datePaid);
        newOrder.append("dateCompleted", order.dateCompleted);
        newOrder.append("deadline", order.deadline);
        newOrder.append("editedStatus", order.editedStatus)
        
        // not part of Order schema
        for (let i = 0; i < refImgsToDelete.length; i++) {
            newOrder.append('refImgsToDelete[]', refImgsToDelete[i]);
        }

        const response = await fetch('http://localhost:4000/api/orders/edit/' + id, {
            method: 'PATCH',
            body: newOrder
        });

        if (response.ok) {
            console.log("Updated order! ", newOrder);
            fetchOrder();
        } else {
            console.log("Error: Order was NOT updated :(")
        }

    }

    const handleClientNameChange = (e) => {
        setClientName(e.target.value);
    }

    const handleRequestDetailChange = (e) => {
        setRequestDetail(e.target.value);
    }

    const handleFilloutChange = (e, questionId) => {
        let newFillouts = [...fillouts];
        for (let i = 0; i < newFillouts.length; i++) {
            if (newFillouts[i].id === questionId) {
                newFillouts[i].questionAns = e.target.value;
                break;
            }
        }
        setFillouts(newFillouts);
    }

    const handleDeleteImage = (e, imageURL) => {
        e.preventDefault();
        setReferenceImages(referenceImages.filter((imgURL) => imgURL !== imageURL));
        setRefImgsToDelete([...refImgsToDelete, imageURL])
    }

    const handleDeleteUploadedImage = (e, img) => {
        e.preventDefault();
        setUploadedReferenceImages(uploadedReferenceImages.filter((image) => image !== img));

    }

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        setUploadedReferenceImages(uploadedReferenceImages.concat(files));
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
        const statusRadios = Array.from(document.getElementsByName("statusSelection"));
        console.log("Fetched order's status: ", order.status);
        for (let i = 0; i < statusRadios.length; i++) {
            if (statusRadios[i].id === order.status) {
                statusRadios[i].checked = true;
                break;
            }
        }

        setClientName(order.clientName);
        setReferenceImages(order.referenceImages);
        setRequestDetail(order.requestDetail)
        
    }, [order])

    return (
        <div className={styles.order_details}>
            <h3><strong>Client name: </strong><input type="text" value={clientName} onChange={handleClientNameChange}></input></h3>
            <p><strong>Client contact: </strong>  { order && order.clientContact}</p>
            <p><strong>Request: </strong> <textarea type="text" value={requestDetail} onChange={handleRequestDetailChange}></textarea></p>
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
                            <input type="text" value={question.questionAns} onChange={(e) => handleFilloutChange(e, question.id)}></input>
                            </li>
                        </ul>
                    </div> 
                })}
            </div>
            <div><b>Reference images: </b></div>
            <div className={styles.images}>
                {referenceImages && referenceImages.map((refImgURL) => {
                    return <ImageComponent imageURL={refImgURL} handleDeleteImage={handleDeleteImage}></ImageComponent>;
                } )}
            </div>
            <label>Upload More Reference Images: <input type="file" name="uploadedReferenceImages" accept=".png, .jpg, .jpeg" onChange={handleAddImage} multiple></input></label>
            <br></br>

            <div className={styles.imgPreview}>
                {uploadedReferenceImages && uploadedReferenceImages.map((img) => {
                    return <ImagePreview image={img} handleDeleteImg={handleDeleteUploadedImage}></ImagePreview>
                })}
            </div>

            <div className={styles.buttons}>
                <button className={styles.saveBtn} onClick={handleSave}>Save</button>
                <button className={styles.deleteBtn}>Delete</button>
            </div>

        </div>
    )
}

export default EditOrderDetails;
