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

    useEffect(() => {
        fetchAllForms();
    }, [])

    return (
        <div className="forms">
            {isLoading && "Loading"}
            {forms && forms.map((form) => {
                return <FormSnippet formId={form._id} key={form._id} form={form}/>
            })}
        </div>
    )
}

export default Forms;