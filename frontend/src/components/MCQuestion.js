import { useEffect, useState } from 'react';
import CreateMCOption from './MCOption';

const CreateMCQuestion = () => {

    const [optList, setOptList] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        const option = CreateMCOption();
        const updatedOptList = [...optList];
        updatedOptList.push(option);
        setOptList(updatedOptList);
        return optList;
    }

    return (
        <div className="mc-question-component">
            <input key="mc-question" type="text" placeholder="Multiple Choice Question"></input>
            <button onClick={handleClick}>Add Option</button>
            {((optList.length >=1) && optList.map((option) => {
                return option;
            }))}
        </div>
    )
}

export default CreateMCQuestion;

