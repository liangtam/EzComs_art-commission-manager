import styles from './Record.module.css';
import { useState, useEffect, useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';

const Record = () => {
    const [commissions, setCommissions] = useState([]);
    const {orders, setOrders} = useContext(OrdersContext);

    const findCompleteOrders = () => {

    }
    useEffect(() => {
        findCompletedOrders();
    }, [])
}

export default Record;