import { useState } from "react";

const ShortAnswerQField = ({fieldId, handleFieldChange, handleRemoveField}) => {

    return (
    <div className="shortanswer-question-field-component">
        <input key='shortanswer-question-field' type='text' placeholder="Question"
        onChange={(e) => handleFieldChange(e, fieldId)}></input>
        <button onClick={(e) => handleRemoveField(e, fieldId)}>Remove</button>        
    </div>
    
    );
}

export default ShortAnswerQField;