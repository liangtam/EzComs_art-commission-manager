import {useState, useEffect, useContext} from 'react';
import ShortAnswerQField from './ShortAnsQ';
import {Link, useParams} from 'react-router-dom';
import { FormContext } from '../context/FormContext';

import styles from './FormDetails.module.css';
import MCQuestionField from './MCQuestionField';

const FormDetails = () => {

    const {id} = useParams();
    const {questionFieldList, setQuestionFieldList} = useContext(FormContext);
    const [formName, setFormName] = useState('');
    const [activeStatus, setActiveStatus] = useState(false);
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
        let newQObj = {
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

        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].questionLabel !== "") {
                questions.push(questionFieldList[i]);
            }
        }

        const updatedForm = {formName, questions:questions, activeStatus};

        const response = await fetch('http://localhost:4000/api/forms/' + id, {
            method: 'PATCH',
            body: JSON.stringify(updatedForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Form updated!', json)
        } else {
            setError(json.error);
        }

        
    }

    const handleDelete = (e) => {

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
                                                  key={question.id}/>;
                    } else if (question.type === 'mc') {
                        return <MCQuestionField fieldId = {"saq"+ question.id}
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
            <button className={styles.saveBtn} onClick={handleSaveClick}>Save</button>
        </div>
    )

}

export default FormDetails;