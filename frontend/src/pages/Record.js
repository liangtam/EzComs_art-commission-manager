import styles from './Record.module.css';
import CommissionSnippet from '../components/order_components/CommissionSnippet';
import { useState, useEffect, useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';

const Record = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    //const {orders, setOrders} = useContext(OrdersContext);

    const findCompletedOrders = async () => {
        const response = await fetch('http://localhost:4000/api/orders/completed');

        const json = await response.json();

        if (response.ok) {
            console.log("Fetched all completed orders! ", json);
            setCompletedOrders(json);
        } else {
            console.log("Could not fetch completed orders :(");
        }
    }

    useEffect(() => {
        findCompletedOrders();
    }, []);

    return (
        <div className={styles.record}>
            <div className={styles.header}>
                <h2>Commission Record</h2>
            </div>
            <div className={styles.completedOrders}>
                {completedOrders && completedOrders.map((completedOrder) => {
                    return <div className={styles.completedOrder}>
                        <CommissionSnippet completedOrder={completedOrder} completedOrderId={completedOrder._id}/>
                    </div>
                })}
            </div>
        </div>
        
    )
}

export default Record;