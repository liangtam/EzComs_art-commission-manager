import styles from './CommissionSnippet.module.css';
import { useState, useEffect } from 'react';

const CommissionDetails = ({completedOrder}) => {
    return (
        <div className={styles.commissionSnippet}>
            <div className={styles.clientName}>
                <h4>{completedOrder && completedOrder.clientName}</h4>
            </div>
            <div className={styles.dateReqqed}>
                <h4>{completedOrder && completedOrder.dateReqqed}</h4>
            </div>
            <div className={styles.dateCompleted}>
                <h4>{completedOrder && completedOrder.dateReqqed}</h4>
            </div>
            <div className={styles.price}>
                <h4>{completedOrder && completedOrder.price}</h4>
            </div>
            <div className={styles.reqDetails}>
                {completedOrder && completedOrder.requestDetails}
            </div>
            <button className={styles.viewBtn}>View</button>
            <button className={styles.editBtn}>Edit</button>
            <button className={styles.deleteBtn}>Delete</button>

        </div>
    )
}

export default CommissionDetails;