import { useState, useEffect, useContext, useReducer } from 'react';
import ShortAnswerQField from '../../components/questions/short-ans-question/ShortAnsQ';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionFieldsContext } from '../../context/QuestionFieldsContext';
import { FormsContext } from '../../context/FormsContext';

import styles from './FormBuilder.module.css';
import MCQuestionField from '../../components/questions/mc-question/MCQuestionField';
import YesNoPopup from '../../components/yes-no-popup/YesNoPopup';
import { useAuthContext } from '../../hooks/useAuthContext';
import { formMessageReducer, ACTION } from '../reducers/formMessageReducer';
import Box from '../../components/box/Box';
import { PageContainer } from '../../layouts';

const FormDetails = () => {
    const { id } = useParams();
    const { questionFieldList, setQuestionFieldList } = useContext(QuestionFieldsContext);

    const { forms } = useContext(FormsContext);

    const navigate = useNavigate();

    const [formName, setFormName] = useState('');
    const [activeStatus, setActiveStatus] = useState(false);
    const [wasAlreadyActive, setWasAlreadyActive] = useState(false);
    const [form, setForm] = useState(null);
    const [error, setError] = useState(null);
    const [activeFormReplacementOpenPopup, setActiveFormReplacementOpenPopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    const { user } = useAuthContext();
    const [state, dispatch] = useReducer(formMessageReducer, {});

    const fetchForm = async () => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/api/forms/' + id, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log('formId: ', id);
            const json = await response.json();
            // console.log(json);
            if (response.ok) {
                console.log('Response was ok');
                if (!json || json.length === 0) {
                    setError('No form found.');
                    return;
                }
                setForm(json);
                setQuestionFieldList(json.questions);
                setFormName(json.formName);
                setActiveStatus(json.activeStatus);
                if (json.activeStatus) {
                    setWasAlreadyActive(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
        // if (form !== null) {
        //     console.log("here");
        //     setQuestionFieldList(form.questions);
        // }
    };

    const handleNameChange = (e) => {
        e.preventDefault();
        setFormName(e.target.value);
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
        if (!user) {
            return;
        }
        const newShortAnsId = questionFieldList.length;
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
        const newMcQId = questionFieldList.length;
        const newQObj = {
            id: newMcQId,
            type: 'mc',
            questionLabel: '',
            questionAns: '',
            optionList: [],
            optionAns: []
        };
        setQuestionFieldList([...questionFieldList, newQObj]);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        if (!user) {
            return;
        }
        // console.log('here');

        if (formName === '') {
            setError({ error: 'Please provide a name for this form.' });
            return (
                <div>
                    <text>{error.message}</text>
                </div>
            );
        }

        // making sure there is only one active form at a time by ensuring the active form (if any) is in the beginning of the forms array
        if (wasAlreadyActive) {
            // console.log('was already active');
            saveForm();
        } else if (activeStatus === true) {
            // console.log('boop');
            if (forms.length > 0) {
                const activeForm = findActiveForm();

                // if (activeForm.activeStatus === true) {
                //     const confirmBox = window.confirm("Setting this form as active makes your current active form inactive. Would you like to set this form to be active instead of the current active form?");

                //     let formsCopy = [...forms];

                //     if (confirmBox === true) {
                //         formsCopy[0].activeStatus = false;
                //         console.log("HERE");
                //         replaceActiveForm(activeForm);
                //         //formsCopy.unshift(updatedForm); // pushes our form to the front of list of form
                //         console.log("got hereee ", form.activeStatus)
                //     } else {
                //         updatedForm = {formName, questions, activeStatus:false};
                //        // formsCopy.push(updatedForm);
                //         setForms(formsCopy);
                //         console.log("got here :000 ", updatedForm)
                //     }
                // }
                if (activeForm.activeStatus === true) {
                    setActiveFormReplacementOpenPopup(true);
                } else {
                    saveForm();
                }
            }
        } else {
            saveForm();
        }
    };

    const saveForm = async () => {
        let questions = [];
        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].questionLabel !== '') {
                questions.push(questionFieldList[i]);
            }
        }

        let updatedForm = { formName, questions: questions, activeStatus, user_id: user._id };

        const response = await fetch('http://localhost:4000/api/forms/' + id, {
            method: 'PATCH',
            body: JSON.stringify(updatedForm),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Form updated!', json);
            setQuestionFieldList(updatedForm.questions);
            setFormName(updatedForm.formName);
            setActiveStatus(updatedForm.activeStatus);
        } else {
            setError(json.error);
        }

        setActiveFormReplacementOpenPopup(false);
        navigate('/forms');
    };

    const replaceActiveForm = async () => {
        if (!user) {
            return;
        }
        const activeForm = findActiveForm();
        console.log("currActiveForm's status", activeForm.activeStatus);
        const idOfCurrActiveForm = activeForm._id;

        activeForm.activeStatus = false;
        console.log("forms[0]'s status after replaced: ", forms[0].activeStatus, activeForm.activeStatus);

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
            setError(json.error);
        }
        setActiveFormReplacementOpenPopup(false);
    };

    const findActiveForm = () => {
        let form = forms[0];
        // for (let i = 0; i < forms.length; i++) {
        //     if (forms[i].activeStatus === true) {
        //         form = forms[i];
        //     }
        // }

        return form;
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!user) {
            return;
        }
        console.log('here, ', id);
        try {
            const response = await fetch('http://localhost:4000/api/forms/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                // console.log('Form deleted!');
                navigate('/forms');
            }
        } catch (error) {
            console.log('Error deleting form: ', error);
        }
    };

    useEffect(() => {
        fetchForm();
    }, []);

    useEffect(() => {
        console.log(questionFieldList);
    }, [questionFieldList]);

    return (
        <PageContainer>
            <form className={`content-container flex-col gap-2 border-box align-items-center`}>
                <div className="flex-col justify-content-start align-items-start w-100 gap-2">
                    <h1 className="font-size-4 mart-4">Edit Form</h1>
                    <div className="w-100 bg-grey-100 h-1 mary-3"></div>

                </div>
                {activeFormReplacementOpenPopup && (
                    <YesNoPopup
                        yesFunction={(e) => {
                            replaceActiveForm();
                            saveForm();
                        }}
                        closePopup={(e) => setActiveFormReplacementOpenPopup(false)}
                    >
                        <h3>Another Form Is Currently Active</h3>
                        <p>Setting this form as active will make your current active form inactive. Would you like to set this form to be active instead of the current active form?</p>
                    </YesNoPopup>
                )}
                {openDeletePopup && (
                    <YesNoPopup yesFunction={handleDelete} closePopup={(e) => setOpenDeletePopup(false)}>
                        <h3>Are you sure?</h3>
                        <p>Are you sure you want to delete this form? This action cannot be undone.</p>
                    </YesNoPopup>
                )}

                <div className={`${styles.nameAndToggle} w-100`}>
                    <div className={`${styles.formName} flex-col gap-2 font-size-2 w-100`}>
                        <p>Name of form: </p>

                        <input
                            className="transparentInput blueTransparentInput pad-2 padl-3 border-box w-100 font-size-2"
                            id="formName_field"
                            type="text"
                            onChange={handleNameChange}
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
                                                <ShortAnswerQField fieldId={questionField.id} labelValue={questionField.questionLabel} key={'saq' + questionField.id} />
                                            </div>
                                        );
                                    } else if (questionField.type === 'mc') {
                                        return (
                                            <div className={`${styles.question} w-100`}>
                                                <MCQuestionField
                                                    fieldId={questionField.id}
                                                    labelValue={questionField.questionLabel}
                                                    optList={questionField.optionList}
                                                    key={'mcq' + questionField.id}
                                                />
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

                {state.errorMessage && <div className="errorMessage">{state.errorMessage}</div>}
                {state.successMessage && <div className="successMessage">{state.successMessage}</div>}
                {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}

                <div className={styles.formDetailsBottomButtons}>
                    <button className={`blueButton deleteBtn`} onClick={() => setOpenDeletePopup(true)}>
                        Delete
                    </button>
                    <button className={`blueButton saveBtn`} onClick={handleSaveClick}>
                        Save
                    </button>
                </div>
            </form>
        </PageContainer>
    );
};

export default FormDetails;
