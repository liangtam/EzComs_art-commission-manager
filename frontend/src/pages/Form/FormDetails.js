import {useState, useEffect, useContext} from 'react';
import ShortAnswerQField from '../../components/question_components/ShortAnsQ';
import {useNavigate, useParams} from 'react-router-dom';
import { QuestionFieldsContext } from '../../context/QuestionFieldsContext';
import { FormsContext } from '../../context/FormsContext';

import styles from './FormDetails.module.css';
import MCQuestionField from '../../components/question_components/MCQuestionField';
import YesNoPopup from '../../components/form_components/YesNoPopup';

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
    const [activeFormReplacementOpenPopup, setActiveFormReplacementOpenPopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

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
        console.log("here")

        if (formName === '') {
            setError({error: 'Please provide a name for this form.'});
            return <div><text>{error.message}</text></div>;
        }

        // making sure there is only one active form at a time by ensuring the active form (if any) is in the beginning of the forms array
        if (wasAlreadyActive) {
            console.log("was already active");
            saveForm();
        } else if (activeStatus === true) {
            console.log("boop")
            if (forms.length > 0) {
                const activeForm = findActiveForm();

                // if (activeForm.activeStatus === true) {
                //     const confirmBox = window.confirm("Setting this form as active makes your current active form inactive. Would you like to set this form to be active instead of the current active form?");

                //     let formsCopy = [...forms];

                //     if (confirmBox === true) {
                //         formsCopy[0].activeStatus = false;
                //         console.log("HERE");
                //         replaceActiveForm(activeForm);
                //         //formsCopy.unshift(updatedForm); // pushes our form to the front of list of form
                //         console.log("got hereee ", form.activeStatus)
                //     } else {
                //         updatedForm = {formName, questions, activeStatus:false};
                //        // formsCopy.push(updatedForm);
                //         setForms(formsCopy);
                //         console.log("got here :000 ", updatedForm)
                //     }
                // }
                if (activeForm.activeStatus === true) {
                    setActiveFormReplacementOpenPopup(true);
                } else {
                    saveForm();
                }
            }
        } else {
            saveForm();
        }
    }

    const saveForm = async () => {

        let questions = [];
        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].questionLabel !== "") {
                questions.push(questionFieldList[i]);
            }
        }

        let updatedForm = {formName, questions:questions, activeStatus};

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

        setActiveFormReplacementOpenPopup(false);
        navigate('/forms');
    }

    const replaceActiveForm = async () => {
        const activeForm = findActiveForm();
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
        setActiveFormReplacementOpenPopup(false);
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
                    { activeFormReplacementOpenPopup && <YesNoPopup
                    yesFunction={(e) => {
                        replaceActiveForm();
                        saveForm();
                    }}
                    closePopup={(e) => setActiveFormReplacementOpenPopup(false)}>
                        <h3>Another Form Is Currently Active</h3>
                        <p>Setting this form as active will make your current active form inactive. Would you like to set this form to be active instead of the current active form?</p>
                    </YesNoPopup>}
            { openDeletePopup &&
            <YesNoPopup yesFunction={handleDelete}
            closePopup={(e) => setOpenDeletePopup(false)}>
                <h3>Are you sure?</h3>
                <p>Are you sure you want to delete this form? This action cannot be undone.</p>
            </YesNoPopup>}
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
            <button onClick={toggleActiveStatus}>Set Active</button>
            <div>{activeStatus? "active" : "inactive"}</div>
            <button className={styles.saveBtn} onClick={handleSaveClick}>Save</button>
            <button onClick={(e) => setOpenDeletePopup(true)}>Delete</button>
        </div>
    )

}

export default FormDetails;