import { useState } from "react";

const ShortAnswerQField = ({setQuestionInputs, questionInputs}) => {


    const saveInput = (input) => {
        // adds input into the array questionInputs
        const copyQuestionInputs = [...questionInputs];
        copyQuestionInputs.push(input);
        setQuestionInputs(copyQuestionInputs);
    }

    return (
    <div className="shortanswer-question-field-component">
        <input key='shortanswer-question-field' type='text' placeholder="Question"
        onChange={(e) => {
            saveInput(e.target.value);
        }}></input>
        <button>Remove</button>        
    </div>
    
    );
}

export default ShortAnswerQField;