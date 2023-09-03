import { useState } from "react";
import styles from './YesNoPopup.module.css';

const YesNoPopup = ({children, yesFunction, closePopup}) => {
    return (
        <div className={styles.popupContainer}>
            <div className={styles.popupContent}>
                { children }
                <div className={styles.confirmationButtons}>
                    <button onClick={yesFunction}>Yes</button>
                    <button className={styles.cancelBtn} onClick={closePopup}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default YesNoPopup;