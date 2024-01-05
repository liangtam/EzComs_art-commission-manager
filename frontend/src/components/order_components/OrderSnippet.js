import styles from './OrderSnippet.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { OrdersContext } from '../../context/OrdersContext';
import YesNoPopup from '../form_components/YesNoPopup';

const OrderSnippet = ({orderId, order, handleOpenPopup}) => {

    // const handleOpenPopup = (e) => {
    //     e.preventDefault();
    //     setOpenPopup(true);
    // }

    // const closePopup = (e) => {
    //     setOpenPopup(false);
    // }

    
    // const handleDeleteOrder = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch('http://localhost:4000/api/orders/' + orderId, {
    //         method: 'DELETE'
    //     })

    //     if (response.ok) {
    //         console.log("Order deleted!");
    //         navigate('/orders/');
    //         //fetchOrders();
    //     } else {
    //         console.log("Error :( ", response.statusText);
    //     }
    // }

    return (
        <div className={styles.orderContainer}>
            {/* {openPopup &&
            <YesNoPopup closePopup={closePopup} yesFunction={handleDeleteOrder}>
                <h3>Are you sure?</h3>
                <p>Are you sure you want to delete this order? This action cannot be undone.</p>
            </YesNoPopup>} */}
            <Link className={styles.orderSnippet} to={`/orders/${orderId}`}>
                {order && order.orderName &&
                <div className={styles.orderName}>
                    <h4>{order.orderName}</h4>
                </div>}
                <div className={styles.clientName}>
                    Client Name: {order && order.clientName}
                </div>
                {order && order.deadline !== "9999-12-31" &&
                    <div className={styles.deadline}>
                        Deadline: {order.deadline}
                    </div>}

                <div className={styles.price}>
                    Price: {order && order.price}
                </div>
                <div className={styles.orderID}>
                    ID: {order && order._id}
                </div>
            </Link>
            <button className="blueButton deleteBtn" onClick={(e) => handleOpenPopup(e, orderId)}>Delete</button>
        </div>
    )
}

export default OrderSnippet;