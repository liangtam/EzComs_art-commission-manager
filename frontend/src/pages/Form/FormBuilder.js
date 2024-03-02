// only artist account can see this
import { useContext, useEffect, useReducer, useState } from 'react';
import { QuestionFieldsContext, FormsContext } from '../../context/';
import { YesNoPopup, MCQuestionField, ShortAnswerQField, Box, Line } from '../../components/';
import { formMessageReducer, ACTION } from '../reducers/formMessageReducer';
import styles from './FormBuilder.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { PageContainer } from '../../layouts';

const FormBuilder = () => {
    const [formName, setName] = useState('');
    const { forms } = useContext(FormsContext);
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
            return;
        }
        e.preventDefault();

        // making sure there is only one active form at a time by ensuring the active form (if any) is in the beginning of the forms array
        if (activeStatus === true && forms.length > 0) {
            const activeForm = forms[0];
            if (activeForm.activeStatus === true) {
                // just a safety guard
                setOpenPopup(true);
            } else {
                if (user) {
                    saveForm();
                }
            }
        } else {
            // console.log('Boopity');

            if (user) {
                // console.log('Hey');
                saveForm();
            }
        }
    };

    const saveForm = async () => {
        if (!user) {
            return;
        }
        if (formName === '') {
            dispatch({ type: ACTION.ERROR_CUSTOM, payload: 'Please name your form.' });
            setOpenPopup(false);
            return;
        }
        dispatch({ type: ACTION.LOADING });
        let questions = questionFieldList.filter((question) => question.questionLabel !== '' || (question.type === 'mc' && question.questionLabel !== '' && question.optionList.length !== 0));

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].type === 'mc') {
                let validOptionList = questions[i].optionList.filter((option) => option.optionLabel !== '');
                questions[i].optionList = validOptionList;
            }
        }
        //console.log('questions: ', questions)

        //questions = questions.filter((question) => question.type !== "mc" && question.optionList.length !== 0);

        let form = { formName, questions, activeStatus };
        // console.log('Form: ', form);
        // first arg: where we're sending the post request to
        try {
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
                throw new Error();
            }
        } catch (err) {
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
        <PageContainer>
            {openPopup && (
                <YesNoPopup
                    yesFunction={() => {
                        replaceActiveForm();
                        saveForm();
                    }}
                    closePopup={() => setOpenPopup(false)}
                >
                    <h3>Another Form Is Currently Active</h3>
                    <p>Setting this form as active will make your current active form inactive. Would you like to set this form to be active instead of the current active form?</p>
                </YesNoPopup>
            )}
            <form className={`content-container flex-col gap-2 border-box align-items-center`}>
                <div className="flex-col justify-content-start align-items-start w-100 gap-2">
                    <h1 className="font-size-4 mart-4">Create an order form for your clients </h1>
                    <p>Any active form is public and accessible by anyone to fillout.</p>
                    <Line/>
                </div>
                {state.errorMessage && <div className="errorMessage pad-3 marb-2 radius-1 bg-light-red w-100">{state.errorMessage}</div>}
                {state.successMessage && <div className="successMessage pad-3 marb-2  radius-1 bg-light-green w-100">{state.successMessage}</div>}
                {state.loadingMessage && <div className="loadingMessage pad-3 marb-2 ">{state.loadingMessage}</div>}

                <div className={`${styles.nameAndToggle} w-100`}>
                    <div className={`${styles.formName} flex-col gap-2 font-size-2 w-100`}>
                        <p>Name of form: </p>

                        <input
                            className="transparentInput blueTransparentInput pad-2 padl-3 border-box w-100 font-size-2"
                            id="formName_field"
                            type="text"
                            onChange={handleNameFieldChange}
                            placeholder="Coolest form"
                        ></input>
                    </div>
                    <div className={`${styles.activeStatus} flex-row justify-content-center gap-2 w-100`}>
                        <button className={`${styles.activeStatusBtn} outline-button bg-transparent dark-grey-outline-1 grey-hover font-size-2 radius-3 pad-2 padx-3`} onClick={toggleActive}>
                            Set Active
                        </button>
                        <div className={`${activeStatus ? `${styles.active} font-weight-700` : styles.inactive} outline-button font-size-2 pad-2 padx-3`}>{activeStatus ? 'Active' : 'Inactive'}</div>
                    </div>
                </div>
                {/* <h2>------------------------------------------------------------</h2> */}
                <div className={`${styles.formContent} mary-3 w-100 gap-4`}>
                    <div className={`${styles.sidePanel} flex-col gap-2 marb-3`}>
                        <Box width="100%" minWidth="250px" classNames="border-box">
                            <div className="flex-col gap-2">
                                <h4 className="font-size-2 w-100">Default features:</h4>
                                <ul className={`${styles.defaultFeats} flex-col gap-2`}>
                                    <li>Order Name </li>
                                    <li>Client Name </li>
                                    <li>Client Email </li>
                                    <li>Order Details </li>
                                    <li>Deadline (optional) </li>
                                </ul>
                            </div>
                        </Box>
                        <Box width="100%" minWidth="250px" classNames="border-box">
                            <h4 className="marb-3">Customize</h4>
                            <div className={`${styles.questionButtons} gap-3 justify-content-center text-grey-800 w-100`}>
                                <button className={`outline-button bg-transparent dark-grey-outline-1 mid-grey-hover font-size-2 radius-3 pad-2 padx-3`} onClick={handleShortAnswerClick}>
                                    Add Short Answer
                                </button>
                                <button className={`outline-button bg-transparent dark-grey-outline-1 mid-grey-hover font-size-2 radius-3 pad-2 padx-3`} onClick={handleMCClick}>
                                    Add Multiple Choice
                                </button>
                            </div>
                        </Box>
                    </div>
                    <Box width="100%" classNames="marl-4 border-box">
                        {questionFieldList.length >= 1 ? (
                            <div className="w-100 flex-col">
                                {questionFieldList.map((questionField) => {
                                    if (questionField.type === 'shortAns') {
                                        return (
                                            <div className={`${styles.question} w-100`}>
                                                <ShortAnswerQField fieldId={questionField.id} key={'saq' + questionField.id} />
                                            </div>
                                        );
                                    } else if (questionField.type === 'mc') {
                                        return (
                                            <div className={`${styles.question} w-100`}>
                                                <MCQuestionField fieldId={questionField.id} optList={questionField.optionList} key={'mcq' + questionField.id} />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        ) : (
                            <div className="flex-col gap-2 w-100 align-items-center text-grey-300">
                                <h4>This form has no questions.</h4>
                                <p>Add some questions from the customize panel.</p>
                            </div>
                        )}
                    </Box>
                </div>
                <button className={`${styles.submitBtn} fill-button bg-grey-800 pad-3 font-size-2 radius-1 font-weight-700 text-grey-50 mar-3 w-100`} type="submit" onClick={handleSaveFormClick}>
                    Submit
                </button>
            </form>
        </PageContainer>
    );
};

export default FormBuilder;
