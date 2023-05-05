import { useState, useEffect } from "react";
import MCOptionField from './MCOption';

const MCQuestionField = ({fieldId, handleOptionClick, handleFieldChange, handleRemoveField}) => {
    
    const [optList, setOptList] = useState([]);

    // params: event, id of option field
    // effect: changes the value of the option field with that id
    const handleOptionFieldChange = (e, optionFieldId) => {
        e.preventDefault();
        let newOptList = [...optList];
        newOptList.map((option) => {
            if (option.optionId === optionFieldId) {
                option.optionLabel = e.target.value;
            }
        })
        setOptList(newOptList);
    };

    // params: e: event,  optionFieldId: id of option field
    // effect: deletes the option field with that id
    const handleRemoveOptionField = (e, optionFieldId) => {
        e.preventDefault();
        console.log(optionFieldId);
        let newOptList = [...optList];
        newOptList = newOptList.filter((option) => option.optionId !== optionFieldId);
        console.log(newOptList);
        setOptList(newOptList);
    };

    // const handleOptionClick = (e) => {
    //     e.preventDefault();
    //     const newOptionObj = {
    //         optionId: optList.length,
    //         optionLabel: "",
    //         optionAns: ""
    //     }
    //     setOptList([...optList, newOptionObj]);
    // };

    useEffect(() => {
        console.log(optList);
    }, [optList]);

    return (
    <div className="mc_question_field_component">
        <input key='mc_question_field' type='text' placeholder="MC Question"
        onChange={(e) => handleFieldChange(e, fieldId)}
        ></input>

        <button onClick={(e) => handleRemoveField(e, fieldId)}>Remove</button>  
        <button onClick={(e) => handleOptionClick(e, fieldId)}>Add Option</button>
        {/* Displaying MC options, if there are any*/}
        {((optList.length >= 1) && optList.map((optionField) => {
                return <MCOptionField optionFieldId={optionField.optionId}
                                      handleOptionFieldChange={handleOptionFieldChange}
                                      handleRemoveOptionField={handleRemoveOptionField}
                                      />;
        }))}

    </div>
    
    );
}

export default MCQuestionField;