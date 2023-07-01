import { QuestionFieldsContext } from '../context/QuestionFieldsContext';
import { FormsContext } from "../context/FormsContext";
import { useContext, useEffect, useState } from 'react';

const ActiveForm = () => {
    //const {activeForm, setActiveForm} = useContext(ActiveFormContext);
    const [activeForm, setActiveForm] = useState(null);
    const {forms, setForms} = useContext(FormsContext);
    const { questionFieldList, setQuestionFieldList } = useContext(QuestionFieldsContext);

    const fetchAllForms = async () => {
        const response = await fetch('http://localhost:4000/api/forms/');
        const json = await response.json();

        if (response.ok) {
            setForms(json);
            console.log("Form page: Fetched all forms! ", forms);
            findActiveForm();
        }
    };

    const findActiveForm = () => {
        if (forms.length == 0) {
            console.log("empty!!!!!");
            //fetchAllForms();
        }
        let form = forms[0];
        console.log("Form is: ", form)
        for (let i = 0; i < forms.length; i++) {
            if (forms[i].activeStatus === true) {
                form = forms[i];
            }
        }

        setActiveForm(form);

        if (activeForm != null) {
            setQuestionFieldList(activeForm.questions);
            console.log("setQList");  
        }
        return form;
    };

    useEffect(() => {
        console.log('Forms is now: ', forms)
        findActiveForm()
    }, [forms])

    useEffect(() => {
        console.log('Q LIST is now: ', questionFieldList)
        if (activeForm != null) {
            setQuestionFieldList(activeForm.questions);
            console.log("setQList");  
        }
    }, [activeForm])

    useEffect( () => {
        fetchAllForms(); 
        //setQuestionFieldList(activeForm.questions);
    }, []);

    return (
        <form className='activeForm'>
            <div className="default-questions">
                <label> Client name: </label>
                <input type="text" placeholder="Name"></input>
                <label> Client contact: </label>
                <input type="text" placeholder="someone@example.com, or Twitter: @someone, etc."></input>
                <label> Client name: </label>
                <textarea type="text" placeholder="Request details"></textarea>
            </div>

            <div className="custom_questions">
            {questionFieldList && questionFieldList.length >= 1 &&
                    questionFieldList.map((question) => {
                        if (question.type === 'shortAns') {
                            return (
                                <div>
                                    <label>{question.questionLabel}: </label>
                                    <input type="text"></input>
                                </div>
                            );
                        } else if (question.type === 'mc') {
                            return (
                                <div>
                                    <label>{question.questionLabel}: </label>
                                    <input type="text"></input>
                                    {question.optionList.length >= 1 &&
                                        question.optionList.map((option) => {
                                            return (
                                                <label>
                                                    {option.optionLabel}
                                                    <input type="checkbox"></input>
                                                </label>
                                            );
                                        })}
                                </div>
                            );
                        }
                    })}
            </div>
        </form>
    );
};

export default ActiveForm;
