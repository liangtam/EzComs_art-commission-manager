import { useEffect, useState, useContext, useReducer } from 'react';
import OrderSnippet from '../../components/order_components/OrderSnippet';
import { OrdersContext } from '../../context/OrdersContext';
import styles from './Orders.module.css';
import YesNoPopup from '../../components/form_components/YesNoPopup';
import { orderMessageReducer, ACTION } from '../reducers/orderMessageReducer';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useOrdersContext } from '../../hooks';

const Orders = () => {
    const { orders, setOrders } = useOrdersContext();
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [state, dispatch] = useReducer(orderMessageReducer, {});

    const { user } = useAuthContext();
    console.log('orders: ', orders);

    const fetchOrders = async () => {
        if (!user) {
            return;
        }

        // making a call to the backend
        dispatch({ type: ACTION.LOADING });
        const response = await fetch('https://ezcoms.onrender.com/api/orders', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        // to parse the json from the above response into smt we can work w/
        const json = await response.json();

        if (response.ok) {
            setOrders(json);
            console.log('Fetched all forms in orders page! ', json);
            dispatch({ type: ACTION.RESET });
        } else {
            dispatch({ type: ACTION.ERROR_GET_ALL });
            setTimeout(() => {
                dispatch({ type: ACTION.RESET });
            }, 3000);
        }
    };

    const handleOpenPopup = (e, orderId) => {
        e.preventDefault();
        setOpenPopup(true);
        setSelectedOrderId(orderId);
        console.log('here');
    };

    const closePopup = (e) => {
        setOpenPopup(false);
    };

    const handleDeleteOrder = async (e, orderId) => {
        e.preventDefault();
        if (!user) {
            return;
        }
        // console.log(orderId);
        dispatch({ type: ACTION.LOADING });
        const response = await fetch('https://ezcoms.onrender.com/api/orders/' + orderId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            console.log('Order deleted!');
            removeFromOrderList(orderId);
            setSelectedOrderId(null);
            dispatch({ type: ACTION.RESET });

            //fetchOrders();
        } else {
            console.log(`Error deleting order: ${response.statusText}`);
            dispatch({ type: ACTION.RESET });
        }
        setOpenPopup(false);

    };

    const removeFromOrderList = (orderId) => {
        let orderListCopy = orders.filter((order) => order._id !== orderId);
        setOrders(orderListCopy);
    };

    // the empty array is dependency array. when it's empty, it means this only fires once

    useEffect(() => {
        fetchOrders();
        // console.log('fetched orders');
    }, []);

    return (
        <div className={styles.ordersContainer}>
            <div className="pageTitle">
                <h1>Orders</h1>
            </div>
            {!orders || orders.length === 0 && <div className='font-size-2'>You have no orders.</div>}
            {state.errorMessage && <div className="errorMessage">{state.errorMessage}</div>}
            {state.successMessage && <div className="successMessage">{state.successMessage}</div>}
            {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
                {openPopup && (
                    <YesNoPopup closePopup={closePopup} yesFunction={(e, orderId) => handleDeleteOrder(e, selectedOrderId)}>
                        <h3>Are you sure?</h3>
                        <p>Are you sure you want to delete this order? This action cannot be undone.</p>
                        {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
                    </YesNoPopup>
                )}
                <div className={styles.orders}>
                    {orders &&
                        orders.map((order) => {
                            return (
                                <div className={styles.order}>
                                    <OrderSnippet key={order._id} orderId={order._id} order={order} handleOpenPopup={handleOpenPopup} />
                                </div>
                            );
                        })}
                </div>
        </div>
    );
};

export default Orders;
