const MCOptionField = ({optionFieldId, mcQuestionFieldId, handleOptionFieldChange, handleRemoveOptionField}) => {
    return (
        <div className="mcoption_component">
            <input key="mc_option" type="text" placeholder="Option" onChange={(e) => handleOptionFieldChange(e, mcQuestionFieldId, optionFieldId)}></input>
            <button onClick={(e) => handleRemoveOptionField(e, mcQuestionFieldId, optionFieldId)}>Remove Option</button>
        </div>
    )
}

export default MCOptionField;