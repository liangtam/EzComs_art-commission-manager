// only artist account can see this
import CreateMCQuestion from '../components/MCQuestion';
//import CreateMCOption from '../components/MCOption';
import CreateShortAnswerQuestion from '../components/ShortAnswer';
import { useEffect, useState } from 'react';

const FormManager = () => {
    const [shortAnsList, setShortAnsList] = useState([]);
    const [mcList, setMCList] = useState([]);
    

    const handleShortAnswerClick = (e) => {
        e.preventDefault();
        const shortAnsQuestion = <CreateShortAnswerQuestion/>;
        //clone current shortAnsList array because you can't setShortAnsList(originalarray.push(smt)) since there
        //is a pointer that points to the original array, and updating it points to the same array, so u must
        //replace with entirely new array
        const updatedShortAnsList = [...shortAnsList];
        updatedShortAnsList.push(shortAnsQuestion);
        setShortAnsList(updatedShortAnsList);
    }

    const handleMCClick = (e) => {
        e.preventDefault();
        const mcQuestion = < CreateMCQuestion />
        const updatedMCList = [...mcList];
        updatedMCList.push(mcQuestion);
        setMCList(updatedMCList);
    }

    const handleSaveFormClick = (e) => {
        e.preventDefault();
    }

    const saveForm = (e) => {

    }

    return (
        <div className="form-maker">
            <h3>Create an order form for your clients</h3>
            <form onSubmit={saveForm}>
                <h4>Default questions included in form:</h4>
                <li>
                    <ul>Client Name: </ul>
                    <ul>Client Email: </ul>
                    <ul>Order Details: </ul>
                </li>
                <div className="shortanswer_qs">
                    <h4>Your added questions:</h4>

                </div>
                <h2>------------------------------------------------------------</h2>
                <div className="create_qs">
                    <button onClick={handleShortAnswerClick}>Add Short Answer</button>
                    {(shortAnsList.length >= 1) && shortAnsList.map((shortAnsQuestion) => {
                        return shortAnsQuestion;
                    })}
                    
                    <button onClick={handleMCClick}>Add Multiple Choice</button>
                    {(mcList.length >= 1) && mcList.map((mcQ) => {
                        return mcQ;
                    })}
                    <button onClick={handleSaveFormClick}>Save Form</button>

                </div>
            </form>
        </div>

    )

}

export default FormManager;