import { useState } from "react";
import CreateMCOption from './MCOption';

const MCQuestionField = ({fieldId, handleFieldChange, handleRemoveField}) => {
    
    const [optList, setOptList] = useState([]);

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
        onChange={(e) => handleFieldChange(e, fieldId)}
        ></input>

        <button onClick={(e) => handleRemoveField(e, fieldId)}>Remove</button>  
        <button onClick={handleOptionClick}>Add Option</button>
        {/* Displaying MC options, if there are any*/}
        {((optList.length >= 1) && optList.map((option) => {
                return option;
        }))}

    </div>
    
    );
}

export default MCQuestionField;