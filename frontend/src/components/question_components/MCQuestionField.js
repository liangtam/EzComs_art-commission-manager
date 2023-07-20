import { useEffect, useContext } from "react";
import MCOptionField from './MCOption';
import { QuestionFieldsContext } from "../../context/QuestionFieldsContext";

const MCQuestionField = ({fieldId, labelValue, optList}) => {
    
    const { questionFieldList, setQuestionFieldList } = useContext(QuestionFieldsContext);

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
        console.log(fieldId);
        const newFilteredList = newList.filter((question) => question.id !== fieldId);
        console.log("here");
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
        value={labelValue}
        required="true"></input>

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
                                      labelValue={optionField.optionLabel}
                                      key = {"option" + optionField.optionId}
                                      />;
        }))}

    </div>
    
    );
}

export default MCQuestionField;