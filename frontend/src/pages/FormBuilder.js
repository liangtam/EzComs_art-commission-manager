// only artist account can see this
import ShortAnswerQField from '../components/ShortAnsQ';
import MCQuestionField from '../components/MCQuestionField';
import { useEffect, useState } from 'react';

const FormBuilder = () => {
    const [questionFieldIds, setQuestionFieldIds] = useState([]);

    const handleFieldChange = (e, fieldId) => {
        let newList = [...questionFieldIds];
        newList.map((question) => {
            if (question.id === fieldId) {
                question.questionLabel = e.target.value;
            }
        })
        setQuestionFieldIds(newList);
    }

    const handleRemoveField = (e, fieldId) => {
        e.preventDefault();
        let newList = [...questionFieldIds];
        
        console.log('Field id: ' + fieldId);
        
        const newFilteredList = newList.filter((question) => question.id !== fieldId);

        setQuestionFieldIds(newFilteredList);
        console.log('Set new list');
    }

    const handleShortAnswerClick = (e) => {
        e.preventDefault();
        const newShortAnsId = questionFieldIds.length;
        const newQObj = {
            id: newShortAnsId,
            type: "shortAns",
            questionLabel: "",
            questionAns: ""
        }
        setQuestionFieldIds([...questionFieldIds, newQObj]);
    }

    const handleMCClick = (e) => {
        e.preventDefault();
        const newMcQId = "mcQId: " + questionFieldIds.length;
        const newQObj = {
            id: newMcQId,
            type: "mc",
            questionLabel: "",
            questionAns: "",
            optionList: [],
            optionAns: []
        }

        setQuestionFieldIds([...questionFieldIds, newQObj]);

    }

    const handleSaveFormClick = (e) => {
        e.preventDefault();

    }

    const saveForm = (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        //console.log("Question Fields List: " + questionFieldsList);
        console.log(questionFieldIds);
    }, [questionFieldIds])

    return (
        <div className="form-maker">
            <h3>Create an order form for your clients</h3>
            <form onSubmit={saveForm}>
                <h4>Default questions included in form:</h4>
                <li>
                    <ul>Client Name: </ul>
                    <ul>Client Email: </ul>
                    <ul>Order Details: </ul>
                </li>
                <div className="shortanswer_qs">
                    <h4>Your added questions:</h4>

                </div>
                <h2>------------------------------------------------------------</h2>
                <div className="create_qs">
                    <button onClick={handleShortAnswerClick}>Add Short Answer</button>
                    <button onClick={handleMCClick}>Add Multiple Choice</button>
                    {(questionFieldIds.length >= 1) && questionFieldIds.map((questionField) => {
                        if (questionField.type === "shortAns") {
                            return <ShortAnswerQField handleRemoveField={handleRemoveField} handleFieldChange={handleFieldChange} key={questionField.id} fieldId = {questionField.id}/>;
                        }
                        return <MCQuestionField handleRemoveField={handleRemoveField} handleFieldChange={handleFieldChange} key={questionField.id} fieldId = {questionField.id}/>
                    })}
                    <button onClick={handleSaveFormClick}>Save Form</button>

                </div>
            </form>
        </div>

    )

}

export default FormBuilder;