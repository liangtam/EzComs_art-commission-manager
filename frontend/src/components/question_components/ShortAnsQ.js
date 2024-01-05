import { useContext, useState } from 'react';
import styles from './Question.module.css';
import { QuestionFieldsContext } from '../../context/QuestionFieldsContext';

const ShortAnswerQField = ({ fieldId, labelValue }) => {
    const { questionFieldList, setQuestionFieldList } = useContext(QuestionFieldsContext);

    /* To be passed into children components: ShortAnsQ and MCQuestionField
    PARAMS: e: event, fieldId: id of the field
    EFFECT: removes the question field with id fieldId from questionFieldList
    */
    const handleRemoveField = (e, fieldId) => {
        e.preventDefault();
        let newList = [...questionFieldList];

        //console.log('Field id: ' + fieldId);

        const newFilteredList = newList.filter((question) => question.id !== fieldId);

        setQuestionFieldList(newFilteredList);
        //console.log('Set new list');
    };

    const handleFieldChange = (e, fieldId) => {
        let newList = [...questionFieldList];
        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].id === fieldId) {
                questionFieldList[i].questionLabel = e.target.value;
            }
        }
        setQuestionFieldList(newList);
    };

    return (
        <div className={`${styles.questionContent}`}>
            <input key="shortanswer_question_field" type="text" placeholder="Short Answer Question" value={labelValue} onChange={(e) => handleFieldChange(e, fieldId)} required></input>
            <button className={styles.removeQBtn} onClick={(e) => handleRemoveField(e, fieldId)}>
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
    );
};

export default ShortAnswerQField;
