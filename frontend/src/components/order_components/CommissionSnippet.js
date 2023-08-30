import { useNavigate } from 'react-router-dom';
import styles from './CommissionSnippet.module.css';
import { useState, useEffect } from 'react';

const CommissionSnippet = ({completedOrder, completedOrderId}) => {

    const navigate = useNavigate();
    const handleViewClick = (e) => {
        e.preventDefault();
        navigate(`/orders/${completedOrderId}`)
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
                <h4>Name</h4>
                <h4>Contact</h4>
                <h4>Completion Date</h4>
                <h4>Price</h4>
                <h4>Image</h4>
            </div>
            <div className={styles.commissionSnippet}>
                <div className={styles.clientName}>
                    <h4>{completedOrder && completedOrder.clientName}</h4>
                </div>
                <div className={styles.clientContact}>
                    <h4>{completedOrder && completedOrder.clientContact}</h4>
                </div>
                <div className={styles.dateCompleted}>
                    <h4>{completedOrder && completedOrder.dateCompleted}</h4>
                </div>
                <div className={styles.price}>
                    <h4>{completedOrder && completedOrder.price}</h4>
                </div>
                <div className={styles.completedArtIcon}>
                    <button><img src='./images/image_icon.png' alt="Art"></img></button>
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