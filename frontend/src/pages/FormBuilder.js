// only artist account can see this
import ShortAnswerQField from '../components/ShortAnsQ';
import MCQuestionField from '../components/MCQuestionField';
//import MCOptionField from './MCOption';
import { useEffect, useState } from 'react';

const FormBuilder = () => {
    const [formName, setName] = useState("");
    const [questionFieldList, setQuestionFieldList] = useState([]);
    // list of list of options, each list of options correspond to a multiple choice question in questionFieldList
    //const [optionListsList, setOptionListsList] = useState([]);
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
        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].id === fieldId) {
                questionFieldList[i].questionLabel = e.target.value;
            }
        }
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

    /* To be passed into child components: MCQuestionField
    PARAMS: e: event, mcQuestionFieldId: id of of the multiple choice question, setOptList: function to set option list of that mc question's component
    EFFECT: changes the value of the option field with that id
    */
    const handleOptionClick = (e, mcQuestionFieldId) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        //console.log("here :3", mcQuestionFieldId);
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].type === "mc" && newList[i].id === mcQuestionFieldId) {
                //console.log("hereee");
                let newOptionObj = {
                    optionId: newList[i].optionList.length,
                    mcQuestionId: mcQuestionFieldId,
                    optionLabel: "",
                    optionAns: ""
                }
                //console.log("here");
                newList[i].optionList.push(newOptionObj);
                //setOptList(newList[i].optionList);

            }
        }
        setQuestionFieldList(newList);
    }

    /* To be passed into child components: MCQuestionField, but is called in MCOptionField
    PARAMS: event, id of option field
    EFFECT: changes the value of the option field with that id
    */
    const handleOptionFieldChange = (e, mcQuestionFieldId, optionFieldId) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        for (let i = 0; i < questionFieldList.length; i++) {

            if (questionFieldList[i].type === "mc" && questionFieldList[i].id === mcQuestionFieldId) {

                for (let j = 0; j < questionFieldList[i].optionList.length; j++) {
                    if (questionFieldList[i].optionList[j].optionId === optionFieldId) {
                        questionFieldList[i].optionList[j].optionLabel = e.target.value;
                        break;
                    }
                }

                break;
            }

        }

        setQuestionFieldList(newList);
    };

    /* To be passed into child components: MCQuestionField
    PARAMS: event, id of option field
    EFFECT: changes the value of the option field with that id
    */
    const handleRemoveOptionField = (e, mcQuestionFieldId, optionFieldId) => {
        e.preventDefault();
        let newQuestionFieldList = [...questionFieldList];
        newQuestionFieldList.map((questionField) => {
            if (questionField.type === "mc" && questionField.id === mcQuestionFieldId) {
                console.log("here")
                questionField.optionList = questionField.optionList.filter((option) => option.optionId !== optionFieldId);

            }
        })
        setQuestionFieldList(newQuestionFieldList);

    };

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
            <form>
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
                            return <ShortAnswerQField fieldId = {questionField.id}
                                                      handleRemoveField={handleRemoveField}
                                                      handleFieldChange={handleFieldChange}
                                                      key={questionField.id}/>;
                        } else if (questionField.type === "mc") {
                            return (<MCQuestionField fieldId = {questionField.id}
                                                    handleOptionClick = {handleOptionClick}
                                                    handleOptionFieldChange = {handleOptionFieldChange}
                                                    handleRemoveOptionField = {handleRemoveOptionField}
                                                    handleRemoveField={handleRemoveField}
                                                    handleFieldChange={handleFieldChange}
                                                    optList={questionField.optionList}
                                                    key={questionField.id}/>
                                    );
                        }
                    })}
                </div>
                <button onClick={handleSaveFormClick}>Submit</button>
            </form>
        </div>

    )

}

export default FormBuilder;