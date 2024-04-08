import { useEffect, useState, useContext, useReducer } from 'react';
import { Line, NoDataPlaceholder, OrderSnippet, OrdersSummary, YesNoPopup } from '../../components';
import styles from './Orders.module.css';
import { orderMessageReducer, ACTION } from '../reducers/orderMessageReducer';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useOrdersContext } from '../../hooks';
import noOrdersImg from '../../assets/images/no_orders.png';
import { PageContainer } from '../../layouts';
import PageContent from '../../layouts/page-container/PageContent';

const Orders = () => {
    const { orders, setOrders } = useOrdersContext();
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [state, dispatch] = useReducer(orderMessageReducer, {});
    const [initLoading, setInitLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [ordersData, setOrdersData] = useState(null);
    const [noMoreOrdersToFetch, setNoMoreOrdersToFetch] = useState(false);

    const { user } = useAuthContext();

    console.log('Orders in orders page: ', orders);
    console.log('Offset: ', offset);

    const resetMessages = () => {
        setTimeout(() => {
            dispatch({ type: ACTION.RESET });
        }, 3000);
    };
    const fetchOrders = async () => {
        if (!user) {
            return;
        }
        dispatch({ type: ACTION.LOADING });
        try {
            // making a call to the backend

            const response = await fetch(`http://localhost:4000/api/orders?offset=${offset}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                // to parse the json from the above response into smt we can work w/
                const ordersJson = await response.json();
                if (Array.isArray(ordersJson) && ordersJson.length === 0) {
                    window.removeEventListener('scroll', handleScroll);
                    setNoMoreOrdersToFetch(true);
                    dispatch({ type: ACTION.RESET });
                    return;
                }
                console.log('ordersJson: ', ordersJson);
                setOrders((prev) => {
                    if (prev === ordersJson) {
                        return prev;
                    }
                    return [...prev, ...ordersJson];
                });
                // console.log('Fetched all forms in orders page! ', json);
            } else {
                throw new Error('Bad response. Could not fetch orders.');
            }
        } catch (err) {
            dispatch({ type: ACTION.ERROR_CUSTOM, payload: err.message });
        }
        dispatch({ type: ACTION.RESET });
    };

    const fetchOrderData = async () => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/user/orders-data/${user.userID}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.ok) {
                const ordersJSONData = await response.json();
                setOrdersData(ordersJSONData);
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            dispatch({ type: ACTION.ERROR_CUSTOM, payload: err.message });
            resetMessages();
            console.log(err);
        }
    };

    const fetchInitialData = async () => {
        setInitLoading(true);
        await fetchOrderData();
        setInitLoading(false);
        console.log('heeeeeeeeeeee');
    };

    const handleOpenPopup = (e, orderId) => {
        e.preventDefault();
        setOpenPopup(true);
        setSelectedOrderId(orderId);
    };

    const closePopup = () => {
        setOpenPopup(false);
    };

    const handleDeleteOrder = async (e, orderId) => {
        e.preventDefault();
        if (!user) {
            return;
        }
        dispatch({ type: ACTION.LOADING });
        const response = await fetch('http://localhost:4000/api/orders/' + orderId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            removeFromOrderList(orderId);
            setSelectedOrderId(null);
            dispatch({ type: ACTION.RESET });
        } else {
            dispatch({ type: ACTION.RESET });
        }
        setOpenPopup(false);
    };

    const removeFromOrderList = (orderId) => {
        let orderListCopy = orders.filter((order) => order._id !== orderId);
        setOrders(orderListCopy);
    };
    const handleScroll = () => {
        if (Math.abs(document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) < 1) {
            setOffset((prevOffset) => prevOffset + 1);
        }
    };

    // the empty array is dependency array. when it's empty, it means this only fires once
    useEffect(() => {
        console.log('fetchOrders');
        fetchOrders();
    }, [offset]);

    useEffect(() => {
        if (user) {
            console.log('fetchInitData');
            fetchInitialData();
        }
    }, [user]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        console.log('mounted');
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <PageContainer>
            <PageContent>
                <div className="pageTitle mart-3">
                    <h1>Orders</h1>
                    <Line />
                </div>
                {!initLoading && ordersData && (
                    <div className="flex-col">
                        <OrdersSummary data={ordersData} className="w-50" />
                        <Line />
                    </div>
                )}
                {!initLoading && !state.errorMessage && (!orders || orders.length === 0) && <NoDataPlaceholder message="You have no orders right now." src={noOrdersImg} />}
                {!initLoading && state.errorMessage && <div className="errorMessage bg-red-100 pad-3 radius-1">{state.errorMessage}</div>}
                {state.successMessage && <div className="successMessage bg-green-100">{state.successMessage}</div>}
                {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
                {openPopup && (
                    <YesNoPopup closePopup={closePopup} yesFunction={(e) => handleDeleteOrder(e, selectedOrderId)}>
                        <h3>Are you sure?</h3>
                        <p>Are you sure you want to delete this order? This action cannot be undone.</p>
                        {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
                    </YesNoPopup>
                )}
                {!initLoading && orders && orders.length > 0 && (
                    <div className={`${styles.orders} w-100`}>
                        {orders.map((order) => {
                            return (
                                <div className={styles.order}>
                                    <OrderSnippet key={order._id} orderId={order._id} order={order} handleOpenPopup={handleOpenPopup} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </PageContent>
        </PageContainer>
    );
};

export default Orders;
