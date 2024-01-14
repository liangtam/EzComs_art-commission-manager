import { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks';

export const OrdersContext = createContext();

export const OrdersContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuthContext();

    // const fetchAllOrders = async () => {
    //     const response = await fetch('https://ezcoms.onrender.com/api/orders/', {
    //         headers: {
    //             Authorization: `Bearer ${user.token}`
    //         }
    //     });

    //     const json = await response.json();

    //     if (response.ok) {
    //         setOrders(json);
    //         console.log('Fetched all orders in main page! ', json);
    //     }
    // };

    // useEffect(() => {
    //     fetchAllOrders();
    // }, []);

    return <OrdersContext.Provider value={{ orders, setOrders }}>{children}</OrdersContext.Provider>;
};
