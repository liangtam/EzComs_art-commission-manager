// only artist account can see this
import ShortAnswerQField from '../components/ShortAnsQ';
import MCQuestionField from '../components/MCQuestionField';
import { useEffect, useState } from 'react';

const FormBuilder = () => {
    const [formName, setName] = useState("");
    const [questionFieldList, setQuestionFieldList] = useState([]);
    const [error, setError] = useState(null);

    /*
    EFFECT: sets the name of the form to what is entered in the form name field
    */
    const handleNameFieldChange = (e) => {
        setName(e.target.value);
    }

    /* To be passed into children components: ShortAnsQ and MCQuestionField
    PARAMS: e: event, fieldId: id of the field
    EFFECT: changes the question label of the question field with id fieldId in questionFieldList
    */
    const handleFieldChange = (e, fieldId) => {
        let newList = [...questionFieldList];
        newList.map((question) => {
            if (question.id === fieldId) {
                question.questionLabel = e.target.value;
            }
        })
        setQuestionFieldList(newList);
    }

    /* To be passed into children components: ShortAnsQ and MCQuestionField
    PARAMS: e: event, fieldId: id of the field
    EFFECT: removes the question field with id fieldId from questionFieldList
    */
    const handleRemoveField = (e, fieldId) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        
        //console.log('Field id: ' + fieldId);

        const newFilteredList = newList.filter((question) => question.id !== fieldId);

        setQuestionFieldList(newFilteredList);
        //console.log('Set new list');
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

    /*
    PARAMS: event, id of option field
    EFFECT: changes the value of the option field with that id
    */
    // const handleOptionFieldChange = (e, mcQuestionFieldId, optionFieldId) => {


    // };

    // const handleRemoveOptionField = (e, mcQuestionFieldId, optionFieldId) => {

    // };

    const handleOptionClick = (e, mcQuestionFieldId) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        //console.log("here :3", mcQuestionFieldId);
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].type === "mc" && newList[i].id === mcQuestionFieldId) {
                //console.log("hereee");
                let newOptionObj = {
                    optionId: newList[i].optionList.length,
                    optionLabel: "",
                    optionAns: ""
                }
                //console.log("here");
                newList[i].optionList.push(newOptionObj);
            }
        }
        setQuestionFieldList(newList);
    }

    /* 
    EFFECT: saves the form into database, if valid. Else, throw an error.
    */
    const handleSaveFormClick = async (e) => {
        e.preventDefault();
        let questions = [];
        if (formName === '') {
            setError({error: 'Please provide a name for this form.'});
            <div><text>{error.message}</text></div>
        }

        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].questionLabel !== "") {
                questions.push(questionFieldList[i]);
            }
        }
        const form = {formName, questions};

        // first arg: where we're sending the post request to
        const response = await fetch('http://localhost:4000/api/forms', {
            method: 'POST',
            body: JSON.stringify(form), 
            // to specify that the content type is json
            headers: {
                'Content-Type': 'application/json'
            }

        });

        // parsing our response to json
        const json = await response.json();

        if (response.ok) {
            console.log('New form added!', json);
            // jquery -- find an element with id formName_field and set its value to ''.
            //          So, we're clearing the name field here.
            document.getElementById('formName_field').value='';
            setQuestionFieldList([]);
            setName("");
        } else {
            setError(json.error);
        }

    }

    useEffect(() => {
        //console.log("Question Fields List: " + questionFieldsList);
        console.log(questionFieldList);
    }, [questionFieldList])

    return (
        <div className="form_maker">
            <h3>Create an order form for your clients</h3>
            <form onSubmit={handleSaveFormClick}>
                <h4>Default questions included in form:</h4>
                <li>
                    <ul>Client Name: </ul>
                    <ul>Client Email: </ul>
                    <ul>Order Details: </ul>
                </li>
                <div className="form_name">
                    <h4>Name of form:</h4>
                    <input id="formName_field" type='text' onChange={handleNameFieldChange}></input>

                </div>
                <h2>------------------------------------------------------------</h2>
                <div className="create_qs">
                    <button onClick={handleShortAnswerClick}>Add Short Answer</button>
                    <button onClick={handleMCClick}>Add Multiple Choice</button>
                    {(questionFieldList.length >= 1) && questionFieldList.map((questionField) => {
                        if (questionField.type === "shortAns") {
                            return <ShortAnswerQField handleRemoveField={handleRemoveField} handleFieldChange={handleFieldChange} key={questionField.id} fieldId = {questionField.id}/>;
                        } else if (questionField.type === "mc") {
                            return <MCQuestionField handleOptionClick = {handleOptionClick} handleRemoveField={handleRemoveField} handleFieldChange={handleFieldChange} key={questionField.id} fieldId = {questionField.id}/>;
                        }
                    })}
                </div>
                <button>Submit</button>
            </form>
        </div>

    )

}

export default FormBuilder;