import { useState } from "react";
import CreateMCOption from './MCOption';

const MCQuestionField = ({setQuestionInputs, questionInputs}) => {
    
    const [optList, setOptList] = useState([]);
    const saveInput = (input) => {
        // adds input into the array questionInputs
        const copyQuestionInputs = [...questionInputs];
        copyQuestionInputs.push(input);
        setQuestionInputs(copyQuestionInputs);
    }

    const handleOptionClick = (e) => {
        e.preventDefault();
        const option = CreateMCOption();
        const updatedOptList = [...optList];
        updatedOptList.push(option);
        setOptList(updatedOptList);
        return optList;
    }

    return (
    <div className="mc-question-field-component">
        <input key='mc-question-field' type='text' placeholder="MC Question"
        onChange={(e) => {
            saveInput(e.target.value);
        }}
        ></input>
        
        <button onClick={handleOptionClick}>Add Option</button>

        {/* Displaying MC options, if there are any*/}
        {((optList.length >= 1) && optList.map((option) => {
                return option;
        }))}
        <button>Remove</button>
        
    </div>
    
    );
}

export default MCQuestionField;