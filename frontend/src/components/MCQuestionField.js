import { useState, useEffect, useContext } from "react";
import MCOptionField from './MCOption';
import { FormContext } from "../context/FormContext";

const MCQuestionField = ({fieldId, handleOptionFieldChange, handleRemoveOptionField, optList}) => {
    
    const { questionFieldList, setQuestionFieldList } = useContext(FormContext);

        /* To be passed into child components: MCQuestionField
    PARAMS: e: event, mcQuestionFieldId: id of of the multiple choice question, setOptList: function to set option list of that mc question's component
    EFFECT: changes the value of the option field with that id
    */
    const handleOptionClick = (e) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        //console.log("here :3", mcQuestionFieldId);
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].type === "mc" && newList[i].id === fieldId) {
                //console.log("hereee");
                let newOptionObj = {
                    type: "option",
                    optionId: newList[i].optionList.length,
                    mcQuestionId: fieldId,
                    optionLabel: "",
                    optionAns: ""
                }
                //console.log("here");
                newList[i].optionList.push(newOptionObj);
                //setOptList(newList[i].optionList);

            }
        }
        setQuestionFieldList(newList);
    }

    //const [optList, setOptList] = useState([]);

    // params: event, id of option field
    // effect: changes the value of the option field with that id
    // const handleOptionFieldChange = (e, optionFieldId) => {
    //     e.preventDefault();
    //     let newOptList = [...optList];
    //     newOptList.map((option) => {
    //         if (option.optionId === optionFieldId) {
    //             option.optionLabel = e.target.value;
    //         }
    //     })
    //     setOptList(newOptList);
    // };

    // params: e: event,  optionFieldId: id of option field
    // effect: deletes the option field with that id
    // const handleRemoveOptionField = (e, optionFieldId) => {
    //     e.preventDefault();
    //     console.log(optionFieldId);
    //     let newOptList = [...optList];
    //     newOptList = newOptList.filter((option) => option.optionId !== optionFieldId);
    //     console.log(newOptList);
    //     setOptList(newOptList);
    // };

    // const handleOptionClick = (e) => {
    //     e.preventDefault();
    //     const newOptionObj = {
    //         optionId: optList.length,
    //         optionLabel: "",
    //         optionAns: ""
    //     }
    //     setOptList([...optList, newOptionObj]);
    // };
     /*
    PARAMS: e: event, fieldId: id of the field
    EFFECT: changes the question label of the question field with id fieldId in questionFieldList
    */
    const handleFieldChange = (e) => {
        let newList = [...questionFieldList];
        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].id === fieldId) {
                questionFieldList[i].questionLabel = e.target.value;
            }
        }
        setQuestionFieldList(newList);
    }

    /* 
    PARAMS: e: event, fieldId: id of the field
    EFFECT: removes the question field with id fieldId from questionFieldList
    */
    const handleRemoveField = (e) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        
        //console.log('Field id: ' + fieldId);

        const newFilteredList = newList.filter((question) => question.id !== fieldId);

        setQuestionFieldList(newFilteredList);
        //console.log('Set new list');
    }

    useEffect(() => {
        console.log(optList.length);
        //forceUpdate();
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
                                      mcQuestionFieldId={fieldId}
                                      //handleOptionFieldChange={handleOptionFieldChange}
                                      //handleRemoveOptionField={handleRemoveOptionField}
                                      //optList = {optList}
                                      //setOptList = {setOptList}
                                      key = {"option" + optionField.optionId}
                                      />;
        }))}

    </div>
    
    );
}

export default MCQuestionField;