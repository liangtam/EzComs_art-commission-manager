import styles from './OrderSnippet.module.css'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { OrdersContext } from '../../context/OrdersContext';

const OrderSnippet = ({orderId, order, handleOrderDelete}) => {

    return (
        <div className={styles.orderSnippet}>
            <Link className={styles.link} to={`/orders/${orderId}`}>
                <div className={styles.clientName}>
                    <h4>{order && order.clientName}</h4>
                </div>
                <div className={styles.deadline}>
                    Deadline: {order && order.deadline}
                </div>
                <div className={styles.price}>
                    Price: {order && order.price}
                </div>
            </Link>
            <button className={styles.deleteBtn} onClick={handleOrderDelete}>Delete</button>
        </div>
    )
}

export default OrderSnippet;