import { useNavigate } from 'react-router-dom';
import styles from './CommissionSnippet.module.css';
import { useState } from 'react';


const CommissionSnippet = ({completedOrder, completedOrderId, handleOpenPopup}) => {

    const navigate = useNavigate();
    const [showArtPreview, setShowArtPreview] = useState(false);

    const handleViewClick = (e) => {
        e.preventDefault();
        navigate(`/orders/${completedOrderId}`)
    }

    return (
        <div className={styles.container}>
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