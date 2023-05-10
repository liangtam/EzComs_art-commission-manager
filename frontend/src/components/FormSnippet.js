import {Link} from 'react-router-dom';

import styles from './FormSnippet.module.css'

const FormSnippet = ({formId, form, handleDelete}) => {

    return (
        <div className={styles.formSnippet}>
            <Link to={`/forms/${formId}`}>
                <div className={styles.title}><h4>{form.formName && form.formName}</h4></div>
            </Link>
            <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, formId)}>Delete</button>
        </div>
    )
}

export default FormSnippet;