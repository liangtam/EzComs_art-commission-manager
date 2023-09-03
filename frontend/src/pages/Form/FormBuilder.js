// only artist account can see this
import ShortAnswerQField from '../../components/question_components/ShortAnsQ';
import MCQuestionField from '../../components/question_components/MCQuestionField';
import { useContext, useEffect, useState } from 'react';
import { QuestionFieldsContext } from '../../context/QuestionFieldsContext';
import { FormsContext } from '../../context/FormsContext';
import SetActiveFormPopup from '../../components/form_components/SetActiveFormPopup';

const FormBuilder = () => {
    const [formName, setName] = useState("");
    const {forms, setForms} = useContext(FormsContext);
    const {questionFieldList, setQuestionFieldList} = useContext(QuestionFieldsContext);
    //const [questionFieldList, setQuestionFieldList] = useState([]);
    const [activeStatus, setActiveStatus] = useState(false);
    // list of list of options, each list of options correspond to a multiple choice question in questionFieldList
    //const [optionListsList, setOptionListsList] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
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
        const newShortAnsId = "saq" + questionFieldList.length;
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
        const newMcQId = "mcq" + questionFieldList.length;
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
    const handleSaveFormClick = (e) => {
        e.preventDefault();

        // making sure there is only one active form at a time by ensuring the active form (if any) is in the beginning of the forms array
        if (activeStatus === true) {
            console.log("boop")
            if (forms.length > 0) {
                const activeForm = findActiveForm();

                // if (activeForm.activeStatus === true) {
                //     const confirmBox = window.confirm("Setting this form as active makes your current active form inactive. Would you like to set this form to be active instead of the current active form?");

                //     let formsCopy = [... forms];

                //     if (confirmBox === true) {
                //         formsCopy[0].activeStatus = false;
                //         console.log("HERE");
                //         replaceActiveForm(activeForm);
                //         formsCopy.unshift(form); // pushes our form to the front of list of form
                //         //console.log("got hereee ", form.activeStatus)
                //     } else {
                //         form = {formName, questions, activeStatus: false};
                //         formsCopy.push(form);
                //         setForms(formsCopy);
                //         //console.log("got here :000 ", form)
                //     }
                // }
                if (activeForm.activeStatus === true) {
                    setOpenPopup(true);
                }
            }
        } else {
            saveForm();
        }
    }

    const saveForm = async () => {
        let questions = questionFieldList.filter((question) =>
        question.questionLabel !== "" || (question.type === "mc" && question.optionList.length === 0));
        if (formName === "") {
            setError({error: 'Please provide a name for this form.'});
        }

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].type === "mc") {
                let validOptionList = questions[i].optionList.filter((option) => option.optionLabel !== "");
                questions[i].optionList = validOptionList;
            }
        }
        //console.log('questions: ', questions)

        //questions = questions.filter((question) => question.type !== "mc" && question.optionList.length !== 0);

        let form = {formName, questions, activeStatus};
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
                setOpenPopup(false);
    }

    const replaceActiveForm = async () => {
        //console.log("currActiveForm's status", activeForm.activeStatus);
        const activeForm = findActiveForm();
        const idOfCurrActiveForm = activeForm._id;

        activeForm.activeStatus = false;
        //console.log("forms[0]'s status after replaced: ", forms[0].activeStatus, activeForm.activeStatus);

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
        for (let i = 0; i < forms.length; i++) {
            if (forms[i].activeStatus === true) {
                form = forms[i];
            } 
        }

        return form;
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
            {openPopup &&
                    <SetActiveFormPopup
                    yesFunction={(e) => {
                        replaceActiveForm();
                        saveForm();
                    }}
                    closePopup={(e) => setOpenPopup(false)}>
                        <h3>Another Form Is Currently Active</h3>
                        <p>Setting this form as active will make your current active form inactive. Would you like to set this form to be active instead of the current active form?</p>
                    </SetActiveFormPopup>}
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
                    {/* <QuestionFieldsContext.Provider value={{questionFieldList, setQuestionFieldList}}> */}
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
                    {/* </QuestionFieldsContext.Provider> */}
                </div>
                <button onClick={toggleActive}>Set Active</button>
                <div>{activeStatus? "active" : "inactive"}</div>
                <button type="submit" onClick={handleSaveFormClick}>Submit</button>
            </form>
        </div>

    )

}

export default FormBuilder;