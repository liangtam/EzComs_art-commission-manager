const Form = () => {
    return (
        <form>
            <div className="default-questions">
                <label> Client name: </label>
                <input type="text" placeholder="Name"></input>
                <label> Client contact: </label>
                <input type="text" placeholder="someone@example.com, or Twitter: @someone, etc."></input>
                <label> Client name: </label>
                <textarea type="text" placeholder="Request details"></textarea>
            </div>
        </form>
    )
}

export default Form;