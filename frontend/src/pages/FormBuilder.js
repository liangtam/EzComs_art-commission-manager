// only artist account can see this
import ShortAnswerQField from '../components/ShortAnsQ';
import MCQuestionField from '../components/MCQuestionField';
import { useEffect, useState } from 'react';

const FormBuilder = () => {
    const [questionFieldsList, setQuestionFieldsList] = useState([]);
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
        let newList = [...questionFieldIds];
        newList.filter((question) => question.id !== fieldId);
        setQuestionFieldIds(newList);
    }

    const handleShortAnswerClick = (e) => {
        e.preventDefault();
        const newShortAnsId = "shortAnsId: " + questionFieldIds.length;
        const newQObj = {
            id: newShortAnsId,
            questionLabel: "",
            questionAns: ""
        }
        setQuestionFieldIds([...questionFieldIds, newQObj]);
        // const shortAnsQ = <ShortAnswerQField handleRemoveField={handleRemoveField} handleFieldChange={handleFieldChange} key={newShortAnsId} fieldId = {newShortAnsId}/>
        // setQuestionFieldsList([...questionFieldsList, shortAnsQ]);
    }

    const handleMCClick = (e) => {
        e.preventDefault();
        const newMcQId = "mcQId: " + questionFieldIds.length;
        const newQObj = {
            id: newMcQId,
            questionLabel: "",
            questionAns: ""
        }
        setQuestionFieldIds([...questionFieldIds, newQObj]);
        // const mcQ = <MCQuestionField handleFieldChange={handleFieldChange} key={newMcQId} fieldId = {newMcQId}/>
        // setQuestionFieldsList([...questionFieldsList, mcQ]);
    }

    const handleSaveFormClick = (e) => {
        e.preventDefault();

    }

    const saveForm = (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        //console.log("Question Fields List: " + questionFieldsList);
        console.log("Question Field IDs: " + questionFieldIds);
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
                        if (questionField.id.includes("shortAnsId: ")) {
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