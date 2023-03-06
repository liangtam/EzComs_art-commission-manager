import { useState } from "react";
import styles from './ShortAnsQ.module.css'

const ShortAnswerQField = ({handleRemoveField, fieldId, handleFieldChange}) => {

    return (
    <div className="shortanswer_question_field_component">
        <input key='shortanswer_question_field' type='text' placeholder="Question"
        onChange={(e) => handleFieldChange(e, fieldId)}></input>
        <button onClick={(e) => handleRemoveField(e, fieldId)}>Remove</button>        
    </div>
    
    );
}

export default ShortAnswerQField;