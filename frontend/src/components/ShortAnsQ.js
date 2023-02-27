import { useState } from "react";

const ShortAnswerQField = ({saveButtonIsClicked, setQuestionInputs, questionInputs}) => {


    const saveInput = (e) => {
        // adds input into the array questionInputs
      //  if (saveButtonIsClicked == true) {
            console.log("Q inputs is: " + questionInputs)
            const newQuestionInputsArr = [...questionInputs];
            newQuestionInputsArr.push(e.target.value);
            setQuestionInputs(newQuestionInputsArr);
        //}
    }

    return (
    <div className="shortanswer-question-field-component">
        <input key='shortanswer-question-field' type='text' placeholder="Question"
        onChange={saveInput}></input>
        <button>Remove</button>        
    </div>
    
    );
}

export default ShortAnswerQField;