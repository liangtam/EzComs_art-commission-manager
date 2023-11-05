import { useContext, useEffect, useState, useReducer } from "react";
import FormSnippet from "../../components/form_components/FormSnippet";
import { FormsContext } from "../../context/FormsContext";
import styles from './Forms.module.css'
import { formMessageReducer, ACTION } from "../reducers/formMessageReducer";
import YesNoPopup from "../../components/form_components/YesNoPopup";
import { useAuthContext } from "../../hooks/useAuthContext";


const Forms = () => {
    const {forms, setForms} = useContext(FormsContext);
    const [selectedID, setSelectedID] = useState('');
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [state, dispatch] = useReducer(formMessageReducer, {});

    const {user} = useAuthContext();

    const fetchAllForms = async () => {
        if (!user) {
            return;
        }
        dispatch({type: ACTION.LOADING});
        const response = await fetch('http://localhost:4000/api/forms/', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            setForms(json);
            console.log('forms in all forms pg: ', forms);
            dispatch({type: ACTION.RESET});
        } else {
            dispatch({type: ACTION.ERROR_GET_ALL});
        }
        setOpenDeletePopup(false);
    }

    const handleOpenDeletePopup = (e, selectedID) => {
        setOpenDeletePopup(true);
        setSelectedID(selectedID);
    }

    const handleDelete = async (e) => {
        if (!user) {
            return;
        }
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/forms/' + selectedID, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if (response.ok) {
            console.log('Form deleted!');
            await fetchAllForms();
            dispatch({type: ACTION.SUCCESS_DELETE});
            setTimeout(() => {
                dispatch({type: ACTION.RESET})
            }, 3000)
        }
        setOpenDeletePopup(false);
    }

    useEffect(() => {
        if (user) {
            fetchAllForms();
        }
        console.log('fetched');
    }, [user])

    return (
        <div className={styles.formsContainer}>
            {state.errorMessage && <div className={styles.errorMessage}>{state.errorMessage}</div>}
            {state.successMessage && <div className={styles.successMessage}>{state.successMessage}</div>}
            {state.loadingMessage && <div className={styles.loadingMessage}>{state.loadingMessage}</div>}
            <div className={styles.forms}>
            {openDeletePopup &&
            <YesNoPopup yesFunction={handleDelete} closePopup={(e) => setOpenDeletePopup(false)}>
                <h3>Are you sure?</h3>
                <p>Are you sure you want to delete this form? This action cannot be undone.</p>
            </YesNoPopup>}
            {forms && forms.map((form) => {
                return <FormSnippet formId={form._id} form={form} handleDelete = {handleOpenDeletePopup} key={form._id}/>
            })}
        </div>
        </div>

    )
}

export default Forms;