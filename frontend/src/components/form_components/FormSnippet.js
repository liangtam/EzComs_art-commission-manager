import { Link, useNavigate } from 'react-router-dom';
import trashIcon from '../../public/images/delete_trash.png';
import editIcon from '../../public/images/edit_icon.png';

import styles from './FormSnippet.module.css';

const FormSnippet = ({ formId, form, handleDelete }) => {
    const nav = useNavigate();
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
                    <p>
                        <b>Form Preview:</b>
                    </p>
                    <ul>
                        {form.questions.length !== 0 && <li>{form.questions[0].questionLabel}</li>}
                        {form.questions[1] !== undefined && <li>{form.questions[1].questionLabel}</li>}
                    </ul>
                    <p>{form.questions.length >= 3 && 'Read more'}</p>
                </div>
            </Link>
            <div className={styles.bottom}>
                {form.activeStatus && (
                    <div className={styles.activeStatus}>
                        <b>Active</b>
                    </div>
                )}
                <div className={styles.actions}>
                    <img src={editIcon} alt="Edit" onClick={(e) => nav(`/forms/${formId}`)}></img>

                    <img src={trashIcon} alt="Delete" onClick={(e) => handleDelete(e, formId)}></img>
                </div>
            </div>
        </div>
    );
};

export default FormSnippet;
