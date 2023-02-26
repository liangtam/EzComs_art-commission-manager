// only artist account can see this
import ShortAnswerQField from '../components/QuestionField';
import MCQuestionField from '../components/MCQuestionField';
import { useEffect, useState } from 'react';

const FormBuilder = () => {
    const [questionFieldsList, setQuestionFieldsList] = useState([]);
    const [questionInputs, setQuestionInputs] = useState([]); 

    const handleShortAnswerClick = (e) => {
        e.preventDefault();
        const question = <ShortAnswerQField setQuestionInputs = {setQuestionInputs} questionInputs = {questionInputs}/>;
        //clone current shortAnsList array because you can't setShortAnsList(originalarray.push(smt)) since there
        //is a pointer that points to the original array, and updating it points to the same array, so u must
        //replace with entirely new array
        const updatedShortAnsList = [...questionFieldsList];
        updatedShortAnsList.push(question);
        setQuestionFieldsList(updatedShortAnsList);
    }

    const handleMCClick = (e) => {
        e.preventDefault();
        const mcQuestion = <MCQuestionField setQuestionInputs = {setQuestionInputs} questionInputs = {questionInputs}/>;

        const updatedQList = [...questionFieldsList];
        updatedQList.push(mcQuestion);
        setQuestionFieldsList(updatedQList);
    }

    const handleSaveFormClick = (e) => {
        e.preventDefault();
        // const questions = [];
        // for (let i = 0; i < shortAnsList.length; i++) {
        //     const {questionLabel, optList, render} = shortAnsList.at[i];
        //     questions.push[questionLabel];
        //     console.log(questions.at[i]);
        // }
        // const newForm = {};
    }

    const saveForm = (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        console.log(questionInputs);
    }, [questionInputs])

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
                    {(questionFieldsList.length >= 1) && questionFieldsList.map((questionField) => {
                        return questionField;
                    })}
                    <button onClick={handleSaveFormClick}>Save Form</button>

                </div>
            </form>
        </div>

    )

}

export default FormBuilder;