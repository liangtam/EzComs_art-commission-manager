// only artist account can see this
import ShortAnswerQField from '../../components/question_components/ShortAnsQ';
import MCQuestionField from '../../components/question_components/MCQuestionField';
import { useContext, useEffect, useReducer, useState } from 'react';
import { QuestionFieldsContext } from '../../context/QuestionFieldsContext';
import { FormsContext } from '../../context/FormsContext';
import YesNoPopup from '../../components/form_components/YesNoPopup';
import { formMessageReducer, ACTION } from '../reducers/formMessageReducer';
import styles from './FormBuilder.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const FormBuilder = () => {
    const [formName, setName] = useState('');
    const { forms, setForms } = useContext(FormsContext);
    const { questionFieldList, setQuestionFieldList } = useContext(QuestionFieldsContext);
    //const [questionFieldList, setQuestionFieldList] = useState([]);
    const [activeStatus, setActiveStatus] = useState(false);
    // list of list of options, each list of options correspond to a multiple choice question in questionFieldList
    //const [optionListsList, setOptionListsList] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const [state, dispatch] = useReducer(formMessageReducer, {});

    const { user } = useAuthContext();

    /*
    EFFECT: sets the name of the form to what is entered in the form name field
    */
    const handleNameFieldChange = (e) => {
        setName(e.target.value);
    };

    const toggleActive = (e) => {
        e.preventDefault();
        setActiveStatus(!activeStatus);
    };

    /* 
    EFFECT: creates a new short ans question object and adds it to questionFieldList
    */
    const handleShortAnswerClick = (e) => {
        e.preventDefault();
        const newShortAnsId = 'saq' + questionFieldList.length;
        const newQObj = {
            id: newShortAnsId,
            type: 'shortAns',
            questionLabel: '',
            questionAns: ''
        };
        setQuestionFieldList([...questionFieldList, newQObj]);
    };

    /* 
    EFFECT: creates a new multiple choice question object and adds it to questionFieldList
    */
    const handleMCClick = (e) => {
        e.preventDefault();
        const newMcQId = 'mcq' + questionFieldList.length;
        let newQObj = {
            id: newMcQId,
            type: 'mc',
            questionLabel: '',
            questionAns: '',
            optionList: [],
            optionAns: []
        };

        setQuestionFieldList([...questionFieldList, newQObj]);
    };

    /* 
    EFFECT: saves the form into database, if valid. Else, throw an error.
    */
    const handleSaveFormClick = (e) => {
        if (!user) {
            // console.log('Hoi');
            return;
        }
        e.preventDefault();

        // making sure there is only one active form at a time by ensuring the active form (if any) is in the beginning of the forms array
        if (activeStatus === true && forms.length > 0) {
            const activeForm = findActiveForm();
            if (activeForm.activeStatus === true) { // just a safety guard
                setOpenPopup(true);
            } else {
                if (user) {
                    saveForm();
                }
            }
        } else {
            console.log('Boopity');

            if (user) {
                console.log('Hey');
                saveForm();
            }
        }
    };

    const saveForm = async () => {
        if (!user) {
            return;
        }
        dispatch({ type: ACTION.LOADING });
        let questions = questionFieldList.filter((question) => question.questionLabel !== '' || (question.type === 'mc' && question.optionList.length !== 0));
        if (formName === '') {
            return;
        }

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].type === 'mc') {
                let validOptionList = questions[i].optionList.filter((option) => option.optionLabel !== '');
                questions[i].optionList = validOptionList;
            }
        }
        //console.log('questions: ', questions)

        //questions = questions.filter((question) => question.type !== "mc" && question.optionList.length !== 0);

        let form = { formName, questions, activeStatus };
        console.log('Form: ', form);
        // first arg: where we're sending the post request to
        const response = await fetch('http://localhost:4000/api/forms', {
            method: 'POST',
            body: JSON.stringify(form),
            // to specify that the content type is json
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });

        // parsing our response to json
        const json = await response.json();

        if (response.ok) {
            console.log('New form added!', json);
            // jquery -- find an element with id formName_field and set its value to ''.
            //          So, we're clearing the name field here.
            document.getElementById('formName_field').value = '';
            setQuestionFieldList([]);
            setName('');
            setActiveStatus(false);
            dispatch({ type: ACTION.SUCCESS_UPLOAD });
        } else {
            dispatch({ type: ACTION.ERROR_UPLOAD });
        }
        setOpenPopup(false);
        setTimeout(() => {
            dispatch({ type: ACTION.RESET });
        }, 3000);
    };

    const replaceActiveForm = async () => {
        if (!user) {
            return;
        }
        //console.log("currActiveForm's status", activeForm.activeStatus);
        const activeForm = findActiveForm();
        const idOfCurrActiveForm = activeForm._id;

        activeForm.activeStatus = false;
        //console.log("forms[0]'s status after replaced: ", forms[0].activeStatus, activeForm.activeStatus);

        const response = await fetch('http://localhost:4000/api/forms/' + idOfCurrActiveForm, {
            method: 'PATCH',
            body: JSON.stringify(activeForm),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Made the original active form inactive!', json);
        } else {
            console.log('Error replacing active form :(');
        }
    };

    const findActiveForm = () => {
        let form = forms[0];
        for (let i = 0; i < forms.length; i++) {
            if (forms[i].activeStatus === true) {
                form = forms[i];
            }
        }

        return form;
    };

    useEffect(() => {
        //console.log("Question Fields List: " + questionFieldsList);
        console.log(questionFieldList);
    }, [questionFieldList]);

    useEffect(() => {
        setQuestionFieldList([]);
    }, []);

    return (
        <div className={styles.formBuilderContainer}>
            {openPopup && (
                <YesNoPopup
                    yesFunction={(e) => {
                        replaceActiveForm();
                        saveForm();
                    }}
                    closePopup={(e) => setOpenPopup(false)}
                >
                    <h3>Another Form Is Currently Active</h3>
                    <p>Setting this form as active will make your current active form inactive. Would you like to set this form to be active instead of the current active form?</p>
                </YesNoPopup>
            )}
            <h3>Create an order form for your clients</h3>
            <form>
                <h4>Default features included in the form:</h4>
                <ul>
                    <li>Order Name </li>
                    <li>Client Name </li>
                    <li>Client Email </li>
                    <li>Order Details </li>
                    <li>Deadline (optional) </li>
                </ul>
                <div className="form_name">
                    <h4>Name of form:</h4>
                    <input id="formName_field" type="text" onChange={handleNameFieldChange}></input>
                </div>
                <h2>------------------------------------------------------------</h2>
                <div className="create_qs">
                    <button onClick={handleShortAnswerClick}>Add Short Answer</button>
                    <button onClick={handleMCClick}>Add Multiple Choice</button>
                    {questionFieldList.length >= 1 &&
                        questionFieldList.map((questionField) => {
                            if (questionField.type === 'shortAns') {
                                return <ShortAnswerQField fieldId={questionField.id} key={'saq' + questionField.id} />;
                            } else if (questionField.type === 'mc') {
                                return <MCQuestionField fieldId={questionField.id} optList={questionField.optionList} key={'mcq' + questionField.id} />;
                            }
                        })}
                </div>

                {state.errorMessage && <div className={styles.errorMessage}>{state.errorMessage}</div>}
                {state.successMessage && <div className={styles.successMessage}>{state.successMessage}</div>}
                {state.loadingMessage && <div className={styles.loadingMessage}>{state.loadingMessage}</div>}

                <button onClick={toggleActive}>Set Active</button>
                <div>{activeStatus ? 'active' : 'inactive'}</div>
                <button type="submit" onClick={handleSaveFormClick}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormBuilder;
