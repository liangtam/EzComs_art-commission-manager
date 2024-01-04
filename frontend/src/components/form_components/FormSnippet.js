import { Link } from 'react-router-dom';
import trashIcon from '../../public/images/delete_trash.png';

import styles from './FormSnippet.module.css';

const FormSnippet = ({ formId, form, handleDelete }) => {
    return (
        <div className={styles.formSnippet}>
            <Link className={styles.link} to={`/forms/${formId}`}>
                <div className={styles.formStats}>
                    <div className={styles.title}>
                        <h4>{form.formName && form.formName}</h4>
                    </div>
                    <div className={styles.numOfQuestions}>Number of questions: {form.questions && form.questions.length}</div>
                </div>
                <div className={styles.questionsPreview}>
                    <p>Questions Preview:</p>
                    {form.questions.length !== 0 && <div className={styles.question}>{form.questions[0].questionLabel}</div>}
                    {form.questions[1] !== undefined && <div className={styles.question}>{form.questions[1].questionLabel}</div>}

                </div>
                {form.activeStatus && (
                    <div className={styles.activeStatus}>
                        <b>Active</b>
                    </div>
                )}
            </Link>
            <div className={styles.actions}>
            <img src={trashIcon} alt="Delete" onClick={(e) => handleDelete(e, formId)}></img>
            </div>
        </div>
    );
};

export default FormSnippet;
