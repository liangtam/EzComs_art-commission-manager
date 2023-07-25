import styles from './CommissionSnippet.module.css';
import { useState, useEffect } from 'react';

const CommissionSnippet = ({completedOrder, completedOrderId}) => {

    const handleViewClick = (e) => {

    }

    const handleEditClick = (e) => {
        e.preventDefault();

    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
    }
    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <h4>Client name</h4>
                <h4>Deadline</h4>
                <h4>Completion Date</h4>
                <h4>Price</h4>
                <h4>Image</h4>
            </div>
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
                <div className={styles.buttons}>
                    <button className={styles.viewBtn} onClick={handleViewClick}>View</button>
                    <button className={styles.editBtn} onClick={handleEditClick}>Edit</button>
                    <button className={styles.deleteBtn} onClick={handleDeleteClick}>Delete</button>                
                </div>
            </div>
        </div>
    )
}

export default CommissionSnippet;