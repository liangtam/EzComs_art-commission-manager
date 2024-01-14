import styles from './OrderSnippet.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { OrdersContext } from '../../context/OrdersContext';
import YesNoPopup from '../form_components/YesNoPopup';
import trashIcon from '../../public/images/delete_trash.png';
import editIcon from '../../public/images/edit_icon.png';

const OrderSnippet = ({orderId, order, handleOpenPopup}) => {
    const nav = useNavigate();
    // const handleOpenPopup = (e) => {
    //     e.preventDefault();
    //     setOpenPopup(true);
    // }

    // const closePopup = (e) => {
    //     setOpenPopup(false);
    // }

    
    // const handleDeleteOrder = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch('https://ezcoms.onrender.com/api/orders/' + orderId, {
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
                    Price: {order && order.price !== -1 ? order.price : "Not set"}
                </div>
                <div className={styles.orderID}>
                    ID: {order && order._id}
                </div>
            </Link>
            <div className={styles.actions}>
                    <img src={editIcon} alt="Edit" onClick={(e) => nav(`/orders/edit/${orderId}`)}></img>

                    <img src={trashIcon} alt="Delete" onClick={(e) => handleOpenPopup(e, orderId)}></img>
                </div>
        </div>
    )
}

export default OrderSnippet;