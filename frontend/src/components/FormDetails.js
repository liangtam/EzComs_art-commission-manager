import {useState, useEffect, useContext} from 'react';
import ShortAnswerQField from './ShortAnsQ';
import {useNavigate, useParams} from 'react-router-dom';
import { QuestionFieldsContext } from '../context/QuestionFieldsContext';
import { FormsContext } from '../context/FormsContext';

import styles from './FormDetails.module.css';
import MCQuestionField from './MCQuestionField';

const FormDetails = () => {

    const {id} = useParams();
    const {questionFieldList, setQuestionFieldList} = useContext(QuestionFieldsContext);

    const {forms, setForms} = useContext(FormsContext);

    const navigate = useNavigate();

    const [formName, setFormName] = useState('');
    const [activeStatus, setActiveStatus] = useState(false);
    const [wasAlreadyActive, setWasAlreadyActive] = useState(false);
    const [form, setForm] = useState(null);
    const [error, setError] = useState(null);

    const fetchForm = async () => {
        const response = await fetch('http://localhost:4000/api/forms/' + id);
        console.log("formId: ", id);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            console.log("Response was ok");
            setForm(json);
            setQuestionFieldList(json.questions);
            setFormName(json.formName);
            setActiveStatus(json.activeStatus);
            if (json.activeStatus) {
                setWasAlreadyActive(true);
            }
        }
        // if (form !== null) {
        //     console.log("here");
        //     setQuestionFieldList(form.questions);
        // }
    }

    const handleNameChange = (e) => {
        e.preventDefault();
        setFormName(e.target.value);
    }

    const toggleActiveStatus = (e) => {
        e.preventDefault();
        setActiveStatus(!activeStatus);
    }
    /* 
    EFFECT: creates a new short ans question object and adds it to questionFieldList
    */
    const handleShortAnswerClick = (e) => {
        e.preventDefault();
        const newShortAnsId = questionFieldList.length;
        const newQObj = {
            id: newShortAnsId,
            type: "shortAns",
            questionLabel: "",
            questionAns: ""
        }
        setQuestionFieldList([...questionFieldList, newQObj]);
    }

    /* 
    EFFECT: creates a new multiple choice question object and adds it to questionFieldList
    */
    const handleMCClick = (e) => {
        e.preventDefault();
        const newMcQId = questionFieldList.length;
        const newQObj = {
            id: newMcQId,
            type: "mc",
            questionLabel: "",
            questionAns: "",
            optionList: [],
            optionAns: []
        }

        setQuestionFieldList([...questionFieldList, newQObj]);

    }

    const handleSaveClick = async (e) => {
        e.preventDefault();
        let questions = [];

        if (formName === '') {
            setError({error: 'Please provide a name for this form.'});
            return <div><text>{error.message}</text></div>;
        }

        // Making sure there is only one active form at a time

        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].questionLabel !== "") {
                questions.push(questionFieldList[i]);
            }
        }

        let updatedForm = {formName, questions:questions, activeStatus};

        // making sure there is only one active form at a time by ensuring the active form (if any) is in the beginning of the forms array
        if (wasAlreadyActive) {
            console.log("was already active");
        } else if (activeStatus === true) {
            console.log("boop")
            if (forms.length > 0) {
                const activeForm = findActiveForm();

                if (activeForm.activeStatus === true) {
                    const confirmBox = window.confirm("Setting this form as active makes your current active form inactive. Would you like to set this form to be active instead of the current active form?");

                    let formsCopy = [...forms];

                    if (confirmBox === true) {
                        formsCopy[0].activeStatus = false;
                        console.log("HERE");
                        replaceActiveForm(activeForm);
                        //formsCopy.unshift(updatedForm); // pushes our form to the front of list of form
                        console.log("got hereee ", form.activeStatus)
                    } else {
                        updatedForm = {formName, questions, activeStatus:false};
                       // formsCopy.push(updatedForm);
                        setForms(formsCopy);
                        console.log("got here :000 ", updatedForm)
                    }
                }
            }
        }
        

        const response = await fetch('http://localhost:4000/api/forms/' + id, {
            method: 'PATCH',
            body: JSON.stringify(updatedForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Form updated!', json);
            setQuestionFieldList(updatedForm.questions);
            setFormName(updatedForm.formName);
            setActiveStatus(updatedForm.activeStatus);
        } else {
            setError(json.error);
        }
    }

    const replaceActiveForm = async (activeForm) => {
        console.log("currActiveForm's status", activeForm.activeStatus);
        const idOfCurrActiveForm = activeForm._id;

        activeForm.activeStatus = false;
        console.log("forms[0]'s status after replaced: ", forms[0].activeStatus, activeForm.activeStatus);

        const response = await fetch('http://localhost:4000/api/forms/' + idOfCurrActiveForm, {
            method: 'PATCH',
            body: JSON.stringify(activeForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log("Made the original active form inactive!", json);
        } else {
            setError(json.error);
        }


    }

    const findActiveForm = () => {
        let form = forms[0];
        // for (let i = 0; i < forms.length; i++) {
        //     if (forms[i].activeStatus === true) {
        //         form = forms[i];
        //     } 
        // }

        return form;
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/forms/' + id, {
            method: 'DELETE',
            'Content-Type': 'application/json'
        })

        if (response.ok) {
            console.log('Form deleted!');
            navigate('/forms');
        }
    }



    useEffect(() => {
        fetchForm();
    }, [])

    useEffect(() => {
        console.log(questionFieldList);
    }, [questionFieldList])

    return (
        <div className={styles.formDetails}>
            <div className={styles.title}>
                <h4>Name: <input type="text" onChange={handleNameChange} value={formName} ></input></h4>
            </div>
            {form && <div className={styles.form_questions}>
                {questionFieldList && questionFieldList.map((question) => {
                    if (question.type === 'shortAns') {
                        return <ShortAnswerQField fieldId = {question.id}
                                                  labelValue = {question.questionLabel}
                                                  key={"saq" + question.id}/>;
                    } else if (question.type === 'mc') {
                        return <MCQuestionField fieldId = {question.id}
                                                labelValue = {question.questionLabel}
                                                optList = {question.optionList}
                                                key={"mcq" + question.id}/>
                    }
                })}
            </div>}
            <button onClick={handleShortAnswerClick}>Add Short Answer Question</button>
            <button onClick={handleMCClick}>Add Multiple Choice</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={toggleActiveStatus}>Set Active</button>
            <div>{activeStatus? "active" : "inactive"}</div>
            <button className={styles.saveBtn} onClick={handleSaveClick}>Save</button>
        </div>
    )

}

export default FormDetails;