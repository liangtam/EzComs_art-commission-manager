import { useEffect, useState } from "react";
import FormSnippet from '../components/FormSnippet';

const Forms = () => {
    const [forms, setForms] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllForms = async () => {
        const response = await fetch('http://localhost:4000/api/forms/');

        const json = await response.json();

        if (response.ok) {
            setForms(json);
            setIsLoading(false);
        }
    }

    const handleDelete = async (e, formId) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/forms/' + formId, {
            method: 'DELETE'
        })

        if (response.ok) {
            console.log('Form deleted!');
        }
    }

    useEffect(() => {
        fetchAllForms();
    }, [forms])

    return (
        <div className="forms">
            {isLoading && "Loading..."}
            {forms && forms.map((form) => {
                return <FormSnippet formId={form._id} form={form} handleDelete = {handleDelete} key={form._id}/>
            })}
        </div>
    )
}

export default Forms;