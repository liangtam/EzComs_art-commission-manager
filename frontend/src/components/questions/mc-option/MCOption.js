import { useContext } from 'react';
import { QuestionFieldsContext } from '../../../context';
import styles from '../Question.module.css';
const MCOptionField = ({ optionFieldId, mcQuestionFieldId, labelValue }) => {
    const { questionFieldList, setQuestionFieldList } = useContext(QuestionFieldsContext);

    /* To be passed into child components: MCQuestionField, but is called in MCOptionField
    PARAMS: event, id of option field
    EFFECT: changes the value of the option field with that id
    */
    const handleOptionFieldChange = (e) => {
        e.preventDefault();
        let newList = [...questionFieldList];
        for (let i = 0; i < questionFieldList.length; i++) {
            if (questionFieldList[i].type === 'mc' && questionFieldList[i].id === mcQuestionFieldId) {
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
            if (questionField.type === 'mc' && questionField.id === mcQuestionFieldId) {
                console.log('here');
                questionField.optionList = questionField.optionList.filter((option) => option.optionId !== optionFieldId);
            }
        });
        setQuestionFieldList(newQuestionFieldList);
    };

    return (
        <div className={`${styles.questionContent} flex-row align-items-center gap-2 marb-3`}>
            <input  className="transparentInput turquoiseTransparentInput font-size-2 pad-2 padl-3 w-100 border-box" key="mc_option" type="text" placeholder="Option" onChange={(e) => handleOptionFieldChange(e, mcQuestionFieldId)} value={labelValue}></input>
            <button className="xBtn" onClick={(e) => handleRemoveOptionField(e, mcQuestionFieldId)}>
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

export default MCOptionField;
