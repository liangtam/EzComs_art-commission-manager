import { useNavigate } from 'react-router-dom';
import styles from './CommissionSnippet.module.css';
import { useState, useEffect } from 'react';


const CommissionSnippet = ({completedOrder, completedOrderId, handleOpenPopup}) => {

    const navigate = useNavigate();
    const [showArtPreview, setShowArtPreview] = useState(false);

    const handleViewClick = (e) => {
        e.preventDefault();
        navigate(`/orders/${completedOrderId}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <h4>Name</h4>
                <h4>Client</h4>
                <h4>Contact</h4>
                <h4>Completion Date</h4>
                <h4>Price</h4>
                <h4>Image</h4>
            </div>
            <div className={styles.commissionSnippet}>
                <div className={styles.orderName}>
                    <h4>{completedOrder && completedOrder.orderName}</h4>
                </div>
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
            </div>
            {showArtPreview && completedOrder && completedOrder.completedArts.length !== 0 && <div className={styles.artPreview}><img src={completedOrder.completedArts[0].imageURL} alt="N/A"></img></div>}
        </div>
    )
}

export default CommissionSnippet;