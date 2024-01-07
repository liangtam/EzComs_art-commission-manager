import { useEffect, useContext } from 'react';
import MCOptionField from './MCOption';
import { QuestionFieldsContext } from '../../context/QuestionFieldsContext';
import styles from './Question.module.css';

const MCQuestionField = ({ fieldId, labelValue, optList }) => {
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
            if (newList[i].type === 'mc' && newList[i].id === fieldId) {
                //console.log("hereee");
                let newOptionObj = {
                    type: 'option',
                    optionId: newList[i].optionList.length,
                    mcQuestionId: fieldId,
                    optionLabel: '',
                    optionAns: ''
                };
                //console.log("here");
                newList[i].optionList.push(newOptionObj);
                //setOptList(newList[i].optionList);
            }
        }
        setQuestionFieldList(newList);
    };

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
    };

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
        console.log('here');
        setQuestionFieldList(newFilteredList);
        //console.log('Set new list');
    };

    useEffect(() => {
        console.log(optList.length);
        //forceUpdate();
    }, [optList]);

    return (
        <div className={styles.questionContainer}>
            <div className={styles.questionContent}>
            <input className="transparentInput blueTransparentInput" key="mc_question_field" type="text" placeholder="MC Question" onChange={(e) => handleFieldChange(e, fieldId)} value={labelValue} required={true}></input>
            <button className={styles.addOption} onClick={(e) => handleOptionClick(e, fieldId)}>Add Option</button>

            <button className="xBtn" onClick={(e) => handleRemoveField(e, fieldId)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="76" height="77" viewBox="0 0 76 77" fill="none">
                    <path
                        d="M38.2756 76.0469C59.0422 76.0469 75.8771 59.212 75.8771 38.4455C75.8771 17.6787 59.0422 0.843994 38.2756 0.843994C17.5089 0.843994 0.674179 17.6787 0.674179 38.4455C0.674179 59.212 17.5089 76.0469 38.2756 76.0469Z"
                        fill="black"
                    />
                    <path
                        d="M27.6426 49.0809L38.2779 38.4457M38.2779 38.4457L48.9131 27.8104M38.2779 38.4457L27.6426 27.8104M38.2779 38.4457L48.9131 49.0809"
                        stroke="white"
                        stroke-width="5.64022"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
            </div>
            {/* Displaying MC options, if there are any*/}
            {optList.length >= 1 && (
                <div className={styles.optionList}>
                    {optList.map((optionField) => {
                        return (
                            <MCOptionField
                                optionFieldId={optionField.optionId}
                                mcQuestionFieldId={fieldId}
                                //handleOptionFieldChange={handleOptionFieldChange}
                                //handleRemoveOptionField={handleRemoveOptionField}
                                //optList = {optList}
                                //setOptList = {setOptList}
                                labelValue={optionField.optionLabel}
                                key={'option' + optionField.optionId}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MCQuestionField;
