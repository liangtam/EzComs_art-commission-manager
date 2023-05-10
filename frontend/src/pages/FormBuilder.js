// only artist account can see this
import ShortAnswerQField from '../components/ShortAnsQ';
import MCQuestionField from '../components/MCQuestionField';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';


const FormBuilder = () => {
    const [formName, setName] = useState("");
    const {questionFieldList, setQuestionFieldList} = useContext(FormContext);
    //const [questionFieldList, setQuestionFieldList] = useState([]);
    const [activeStatus, setActiveStatus] = useState(false);
    // list of list of options, each list of options correspond to a multiple choice question in questionFieldList
    //const [optionListsList, setOptionListsList] = useState([]);
    const [error, setError] = useState(null);

    /*
    EFFECT: sets the name of the form to what is entered in the form name field
    */
    const handleNameFieldChange = (e) => {
        setName(e.target.value);
    }

    const toggleActive = (e) => {
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

    /* 
    EFFECT: saves the form into database, if valid. Else, throw an error.
    */
    const handleSaveFormClick = async (e) => {
        e.preventDefault();
        let questions = [];
        if (formName === '') {
            setError({error: 'Please provide a name for this form.'});
            return <div><text>{error && error.message}</text></div>;
        }

        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].questionLabel !== "") {
                questions.push(questionFieldList[i]);
            }
        }
        const form = {formName, questions, activeStatus};

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
            setActiveStatus(false);
        } else {
            setError(json.error);
        }

    }

    useEffect(() => {
        //console.log("Question Fields List: " + questionFieldsList);
        console.log(questionFieldList);
    }, [questionFieldList])

    useEffect(() => {
        setQuestionFieldList([]);
    }, [])

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
                    {/* <FormContext.Provider value={{questionFieldList, setQuestionFieldList}}> */}
                        {(questionFieldList.length >= 1) && questionFieldList.map((questionField) => {
                            if (questionField.type === "shortAns") {
                                return <ShortAnswerQField fieldId = {questionField.id}
                                                        //handleRemoveField={handleRemoveField}
                                                        //handleFieldChange={handleFieldChange}
                                                        key={"saq" + questionField.id}/>;
                            } else if (questionField.type === "mc") {
                                return (<MCQuestionField fieldId = {questionField.id}
                                                        //handleOptionClick = {handleOptionClick}
                                                        //handleOptionFieldChange = {handleOptionFieldChange}
                                                        //handleRemoveOptionField = {handleRemoveOptionField}
                                                        //handleRemoveField={handleRemoveField}
                                                        //handleFieldChange={handleFieldChange}
                                                        optList={questionField.optionList}
                                                        key={"mcq" + questionField.id}/>
                                        );
                            }
                        })}
                    {/* </FormContext.Provider> */}
                </div>
                <button onClick={toggleActive}>Set Active</button>
                <button onClick={handleSaveFormClick}>Submit</button>
            </form>
        </div>

    )

}

export default FormBuilder;