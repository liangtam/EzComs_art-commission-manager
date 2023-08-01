import { QuestionFieldsContext } from '../context/QuestionFieldsContext';
import { FormsContext } from "../context/FormsContext";
import { useContext, useEffect, useState } from 'react';
import styles from './ActiveForm.module.css'
import axios from 'axios';

import ImagePreview from '../components/ImagePreview';


const ActiveForm = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [clientName, setClientName] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [requestDetail, setRequestDetail] = useState('');
    const [referenceImages, setReferenceImages] = useState([]);

    const { forms, setForms } = useContext(FormsContext);
    const { questionFieldList, setQuestionFieldList } = useContext(QuestionFieldsContext);

    const fetchAllForms = async () => {
        const response = await fetch('http://localhost:4000/api/forms/');
        const json = await response.json();

        if (response.ok) {
            setForms(json);
            console.log("Form page: Fetched all forms! ", forms);
            findActiveForm();
        }
    };

    const findActiveForm = () => {
        if (forms.length === 0) {
            console.log("empty!!!!!");
        }

        let form = forms[0]; // the active form is always at the front of the list of forms

        setActiveForm(form);

        if (activeForm != null) {
            setQuestionFieldList(activeForm.questions);
            console.log("setQList");  
        }
        return form;
    };

    const handleClientNameChange = (e) => {
        setClientName(e.target.value);
    }

    const handleClientContactChange = (e) => {
        setClientContact(e.target.value);
    }

    const handleRequestDetailChange = (e) => {
        setRequestDetail(e.target.value);
    }

    const handleAnswerFieldChange = (e, questionId) => {
        let questionListCopy = [...questionFieldList];
        for (let i = 0; i < questionListCopy.length; i++) {
            if (questionListCopy[i].id === questionId) {
                questionListCopy[i].questionAns = e.target.value;
                break;
            }
        }
        setQuestionFieldList(questionListCopy);
    }

    const handleImages = (e) => {
        e.preventDefault();
        const files = e.target.files; // NOT AN ARRAY!

        let filesArray = Array.from(files);
        filesArray = referenceImages.concat(filesArray);

        setReferenceImages(filesArray);
    }

    const handleDeleteImg = (e, img) => {
        e.preventDefault();
        const refImgs = referenceImages.filter((image) => image !== img);

        setReferenceImages(refImgs);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let questionListCopy = [...questionFieldList]

        // go through all the multiple choice questions to see what option was selected for them
        for (let i = 0; i < questionListCopy.length; i++) {
            if (questionListCopy[i].type === 'mc') {
                var selectedAns = document.getElementsByName('option' + questionListCopy[i].id);
                for (let j = 0; j < selectedAns.length; j++) {
                    //console.log(selectedAns[j].value)
                    if (selectedAns[j].checked) {
                        questionListCopy[i].questionAns = selectedAns[j].value;
                    }
                }
            }
        }

        setQuestionFieldList(questionListCopy);

        const dateObj = new Date();
        const currDate = `${dateObj.getDate()} / ${dateObj.getMonth() + 1} / ${dateObj.getFullYear()}`;
        const userDeadline = document.getElementById("deadline").value;

        const order = new FormData();

        order.append("clientName", clientName);
        order.append("clientContact", clientContact);
        order.append("requestDetail", requestDetail);
        for (let i = 0; i < questionFieldList.length; i++) {
            order.append("fillouts", JSON.stringify(questionFieldList[i]));
        }
        console.log("Reference images: ", referenceImages);
        for (let i = 0; i < referenceImages.length; i++) {
            order.append("referenceImages[]", referenceImages[i])
        }
        order.append("price", -1);
        order.append("dateReqqed", currDate);
        order.append("datePaid", "To be set");
        order.append("dateCompleted", "To be set");
        order.append("deadline", userDeadline);
        order.append("status", "Not Started Yet");
        order.append("artistNotes", "");
        order.append("wipArts", []);
        order.append("completedArts", []);
        order.append("editedStatus", false);
        order.append("originalUneditedOrder", {});
        

        axios.post('http://localhost:4000/api/orders', order, {

        }).then((res) => {
            console.log(res);
        })

    }

    // First, fetch all the forms
    useEffect( () => {
        fetchAllForms(); 
        //setQuestionFieldList(activeForm.questions);
    }, []);

    // Now, after all the forms have been fetched, find the active form
    useEffect(() => {
        //console.log('Forms is now: ', forms)
        findActiveForm();
    }, [forms])

    // Finally, after you find the active form, populate the question fields list with the active form's questions
    useEffect(() => {
        //console.log('Q LIST is now: ', questionFieldList)
        if (activeForm != null) {
            setQuestionFieldList(activeForm.questions);
            console.log("setQList");  
        }
    }, [activeForm])

    useEffect(() => {
        console.log('Q LIST: ' , questionFieldList);
    }, [questionFieldList])

    useEffect(() => {
        console.log("Ref images: ", referenceImages)
    }, [referenceImages])
    // Notice we need all these three steps because of how usestate and fetches are asynchronous, so anytime we need to
    // use asynchronous data, we need to make sure it actually fetched properly first.
    return (
        <form onSubmit={handleSubmit} className={styles.activeForm} encType="multipart/form-data">
            <div className={styles.formName}>{activeForm && <h2>{activeForm.formName}</h2>}</div>
            <div className={styles.default_questions}>
                <label> Client name: </label>
                <input type="text" placeholder="Name" onChange={handleClientNameChange}></input>
                <label> Client contact: </label>
                <input type="email" placeholder="someone@example.com, or Twitter: @someone, etc." onChange={handleClientContactChange}></input>
            </div>

            <div className={styles.custom_questions}>
            {questionFieldList && questionFieldList.length >= 1 &&
                    questionFieldList.map((question) => {
                        if (question.type === 'shortAns') {
                            return (
                                <div>
                                    <label>{question.questionLabel}: </label>
                                    <input type="text" onChange={(e) => handleAnswerFieldChange(e, question.id)}></input>
                                </div>
                            );
                        } else if (question.type === 'mc') {
                            return (
                                <div> 
                                    <label >{question.questionLabel}: </label>
                                    <div className="options">
                                        {question.optionList.length >= 1 &&
                                        question.optionList.map((option) => {
                                            return (
                                                <label>
                                                    {option.optionLabel}
                                                    <input type="radio" name={"option" + question.id} value={option.optionLabel}></input>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
            <div className={styles.reqDetails}>
                <label> Order details:
                <textarea type="text" placeholder="Request details" onChange={handleRequestDetailChange}></textarea>
                </label>
                <label> References:
                    <input type="file" name="referenceImages" onChange={handleImages} accept=".png, .jpeg, .jpg" multiple></input>
                </label>
                <label>
                    Deadline:
                    <input type="date" id="deadline"></input>
                </label>
            </div>
            <div className={styles.imagePreviews}>
                {referenceImages && referenceImages.map((refImgURL) => {
                    return <ImagePreview image={refImgURL} handleDeleteImg={handleDeleteImg}/>
                })}
            </div>
            <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>yeet</button>
        </form>
    );
};

export default ActiveForm;
