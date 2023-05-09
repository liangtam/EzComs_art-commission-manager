import {useState, useEffect, useContext} from 'react';
import ShortAnswerQField from './ShortAnsQ';
import {Link, useParams} from 'react-router-dom';
import { FormContext } from '../context/FormContext';

import styles from './FormDetails.module.css';
import MCQuestionField from './MCQuestionField';

const FormDetails = () => {

    const {id} = useParams();
    const {questionFieldList, setQuestionFieldList} = useContext(FormContext);
    const [form, setForm] = useState(null);

    const fetchForm = async () => {
        const response = await fetch('http://localhost:4000/api/forms/' + id);
        console.log("formId: ", id);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            console.log("Response was ok");
            setForm(json);
            setQuestionFieldList(json.questions);
        }
        // if (form !== null) {
        //     console.log("here");
        //     setQuestionFieldList(form.questions);
        // }
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

        const response = await fetch('http://localhost:4000/api/forms/' + id);
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
                <h4>{form && form.formName}</h4>
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
            <button className={styles.saveBtn} onClick={(e) => handleSaveClick}>Save</button>
        </div>
    )

}

export default FormDetails;