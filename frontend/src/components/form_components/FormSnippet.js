import { Link, useNavigate } from 'react-router-dom';
import trashIcon from '../../public/images/delete_trash.png';
import editIcon from '../../public/images/edit_icon.png';

import styles from './FormSnippet.module.css';

const FormSnippet = ({ formId, form, handleDelete }) => {
    const nav = useNavigate();
    return (
        <div className={`${styles.formSnippet} flex-col pad-2 h-100 radius-1`}>
            <Link className={`${styles.link} flex-col gap-2 text-dark-grey`} to={`/forms/${formId}`}>
                <div className={`${styles.formStats} flex-col gap-2 pad-3`}>
                    <div className={styles.title}>
                        <h4>{form.formName && form.formName}</h4>
                    </div>
                    <p className='font-size-1'>Number of questions: {form.questions && form.questions.length}</p>
                </div>
                <div className={styles.questionsPreview}>
                    <h4>Form preview:</h4>
                    <ul>
                        {form.questions.length !== 0 && <li>{form.questions[0].questionLabel}</li>}
                        {form.questions[1] !== undefined && <li>{form.questions[1].questionLabel}</li>}
                    </ul>
                    {form.questions.length >= 3 && <p className='dark-grey-outline-1 pad-2 radius-3 font-size-1 w-fit'>Read more</p>}
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
