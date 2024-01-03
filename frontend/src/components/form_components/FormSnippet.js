import {Link} from 'react-router-dom';

import styles from './FormSnippet.module.css'

const FormSnippet = ({formId, form, handleDelete}) => {

    return (
        <div className={styles.formSnippet}>
            <Link className={styles.link}to={`/forms/${formId}`}>
                <div className={styles.formStats}>
                    <div className={styles.title}><h4>{form.formName && form.formName}</h4></div>
                    <div className={styles.numOfQuestions}>Number of questions: {form.questions && form.questions.length}</div>
                    <div className={styles.activeStatus}> {form.activeStatus && <div>Active</div>}</div>
                </div>
                <div className={styles.questionsPreview}>
                    <p>Questions Preview:</p>
                    {form.questions.length !== 0 && form.questions.map((q) => {
                        return <div className={styles.question}>{q.questionLabel}</div>
                    })}
                </div>
            </Link>
            <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, formId)}>Delete</button>
        </div>
    )
}

export default FormSnippet;