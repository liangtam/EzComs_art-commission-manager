import styles from './AlertPopup.module.css';

const AlertPopup = ({children, closePopup}) => {
    return (
        <div className={styles.alertPopupContainer}>
            <div className={styles.alertPopupContent}>
                {children}
                <button className={styles.closePopupBtn} onClick={closePopup}>Close</button>
            </div>
        </div>
    )
}

export default AlertPopup;