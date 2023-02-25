const CreateShortAnswerQuestion = () => {
    
    const questions = [];

    return (
    <div className="shortanswer-question-component">
        <input key='shortanswer-question' type='text' placeholder="Question"
        onChange={(e) => {
            questions.push(e.target.value)
        }}></input>
        <button>Add</button>
    </div>
    );
}

export default CreateShortAnswerQuestion;