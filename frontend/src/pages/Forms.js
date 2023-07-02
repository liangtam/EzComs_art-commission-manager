import { useContext, useEffect, useState } from "react";
import FormSnippet from '../components/FormSnippet';
import { FormsContext } from "../context/FormsContext";
import styles from './Forms.module.css'


const Forms = () => {
    const {forms, setForms} = useContext(FormsContext);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllForms = async () => {
        const response = await fetch('http://localhost:4000/api/forms/');

        const json = await response.json();

        if (response.ok) {
            setForms(json);
            console.log('forms in all forms pg: ', forms);
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
            fetchAllForms();
        }
    }

    useEffect(() => {
        fetchAllForms();
        console.log('fetched');
    }, [])

    return (
        <div className={styles.forms}>
            {isLoading && "Loading..."}
            {forms && forms.map((form) => {
                return <FormSnippet formId={form._id} form={form} handleDelete = {handleDelete} key={form._id}/>
            })}
        </div>
    )
}

export default Forms;