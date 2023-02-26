import { useState } from "react";
import CreateMCOption from './MCOption';

const CreateQuestion = ({isMCQuestion}) => {
    
    const [questionLabel, setQuestionLabel] = useState('');
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
    <div className="shortanswer-question-component">
        <input key='shortanswer-question' type='text' placeholder="Question"
        onChange={(e) => {
            setQuestionLabel(e.target.value);
        }}></input>
        <button>Add</button>
        
        {/* Only show the "add options button" if this question is a MC question */}
        {isMCQuestion && <button onClick={handleOptionClick}>Add Option</button>}

        {/* Displaying MC options, if there are any*/}
        {((optList.length >=1) && optList.map((option) => {
                return option;
        }))}
        
    </div>
    
    );
}

export default CreateQuestion;