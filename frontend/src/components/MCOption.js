import { useState, useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";
const MCOptionField = ({optionFieldId, mcQuestionFieldId}) => {
    const { questionFieldList, setQuestionFieldList } = useContext(FormContext);

     /* To be passed into child components: MCQuestionField, but is called in MCOptionField
    PARAMS: event, id of option field
    EFFECT: changes the value of the option field with that id
    */
    const handleOptionFieldChange = (e) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        for (let i = 0; i < questionFieldList.length; i++) {

            if (questionFieldList[i].type === "mc" && questionFieldList[i].id === mcQuestionFieldId) {

                for (let j = 0; j < questionFieldList[i].optionList.length; j++) {
                    if (questionFieldList[i].optionList[j].optionId === optionFieldId) {
                        questionFieldList[i].optionList[j].optionLabel = e.target.value;
                        break;
                    }
                }

                break;
            }

        }

        setQuestionFieldList(newList);
    };

    /* To be passed into child components: MCQuestionField
    PARAMS: event, id of option field
    EFFECT: changes the value of the option field with that id
    */
    const handleRemoveOptionField = (e) => {
        e.preventDefault();
        let newQuestionFieldList = [...questionFieldList];
        newQuestionFieldList.map((questionField) => {
            if (questionField.type === "mc" && questionField.id === mcQuestionFieldId) {
                console.log("here")
                questionField.optionList = questionField.optionList.filter((option) => option.optionId !== optionFieldId);

            }
        })
        setQuestionFieldList(newQuestionFieldList);

    };

    return (
        <div className="mcoption_component">
            <input key="mc_option" type="text" placeholder="Option" onChange={(e) => handleOptionFieldChange(e, mcQuestionFieldId)}></input>
            <button onClick={(e) => handleRemoveOptionField(e, mcQuestionFieldId)}>Remove Option</button>
        </div>
    )
}

export default MCOptionField;