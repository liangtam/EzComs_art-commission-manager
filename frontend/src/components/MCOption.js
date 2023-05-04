const MCOptionField = ({optionFieldId, handleOptionFieldChange, handleRemoveOptionField}) => {
    return (
        <div className="mcoption_component">
            <input key="mc-option" type="text" placeholder="Option" onChange={(e) => handleOptionFieldChange(e, optionFieldId)}></input>
            <button onClick={(e) => handleRemoveOptionField(e, optionFieldId)}>Remove Option</button>
        </div>
    )
}

export default MCOptionField;