import { useEffect, useState } from "react";

const Forms = () => {
    const [forms, setForms] = useState(null);

    const fetchAllForms = async () => {
        const response = await fetch('./api/forms');

        const json = await response.json();

        if (response.ok) {
            setForms(json);
        }
    }

    useEffect(() => {
        fetchAllForms;
    }, [])

    return (
        <div className="forms">
            {forms && forms.map((form) => {
                return <Forms.js key={form.id} form={form}/>
            })}
        </div>
    )
}