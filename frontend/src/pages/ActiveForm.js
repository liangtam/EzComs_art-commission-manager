import { QuestionFieldsContext } from '../context/QuestionFieldsContext';
import { FormsContext } from "../context/FormsContext";
import { useContext, useEffect, useState } from 'react';
import styles from './ActiveForm.module.css'


const ActiveForm = () => {
    //const {activeForm, setActiveForm} = useContext(ActiveFormContext);
    const [activeForm, setActiveForm] = useState(null);
    const [clientName, setClientName] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [requestDetail, setRequestDetail] = useState('');
    const [referenceImages, setReferenceImages] = useState([]);
    const [price, setPrice] = useState('');
    const [dateReqqed, setDateReqqed] = useState('');
    const [datePaid, setDatePaid] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('');

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
        if (forms.length == 0) {
            console.log("empty!!!!!");
            //fetchAllForms();
        }
        let form = forms[0];
        // console.log("Form is: ", form)
        // for (let i = 0; i < forms.length; i++) {
        //     if (forms[i].activeStatus === true) {
        //         form = forms[i];
        //     }
        // }

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


    const handleSubmit = (e) => {
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

        const order = {};


    }

    // First, fetch all the forms
    useEffect( () => {
        fetchAllForms(); 
        //setQuestionFieldList(activeForm.questions);
    }, []);

    // Now, after all the forms have been fetched, find the active form
    useEffect(() => {
        //console.log('Forms is now: ', forms)
        findActiveForm()
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
    // Notice we need all these three steps because of how usestate and fetches are asynchronous, so anytime we need to
    // use asynchronous data, we need to make sure it actually fetched properly first.
    return (
        <form className={styles.activeForm}>
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
                <textarea type="text" placeholder="Request details"></textarea>
                </label>
                <label> References:
                    <input type="file" name="images" multiple></input>
                </label>
            </div>
            <button className={styles.submitBtn} onClick={handleSubmit}>yeet</button>
        </form>
    );
};

export default ActiveForm;
