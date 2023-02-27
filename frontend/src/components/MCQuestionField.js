import { useState } from "react";
import CreateMCOption from './MCOption';

const MCQuestionField = ({getDataFromQuestionField}) => {
    
    const [optList, setOptList] = useState([]);
    const [questionLabel, setQuestionLabel] = useState("");
    const saveInputToForm = (e) => {
        // adds input into the array questionInputs
        setQuestionLabel(e.target.value);
        getDataFromQuestionField(questionLabel);
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
        onChange={saveInputToForm}
        ></input>
        
        <button onClick={handleOptionClick}>Add Option</button>

        {/* Displaying MC options, if there are any*/}
        {((optList.length >= 1) && optList.map((option) => {
                return option;
        }))}        
    </div>
    
    );
}

export default MCQuestionField;