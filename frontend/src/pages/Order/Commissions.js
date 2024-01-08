import styles from './Commissions.module.css';
import CommissionSnippet from '../../components/order_components/CommissionSnippet';
import { useState, useEffect, useContext, useReducer } from 'react';
import { orderMessageReducer, ACTION } from '../reducers/orderMessageReducer.js';
import { OrdersContext } from '../../context/OrdersContext';
import YesNoPopup from '../../components/form_components/YesNoPopup';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import artIcon from '../../public/images/image_icon.png';
import noImageIcon from '../../public/images/ezcoms_noimage_head.png';

const Commissions = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [showArtPreview, setShowArtPreview] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const [selectedID, setSelectedID] = useState('');

    const [state, dispatch] = useReducer(orderMessageReducer, {
        successMessage: '',
        errorMessage: '',
        loadingMessage: ''
    });

    const { user } = useAuthContext();
    const navigate = useNavigate();

    //const {orders, setOrders} = useContext(OrdersContext);

    const findCompletedOrders = async () => {
        const response = await fetch('http://localhost:4000/api/orders/completed', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Fetched all completed orders! ', json);
            setCompletedOrders(json);
        } else {
            console.log('Could not fetch completed orders :(');
        }
    };

    const closePopup = (e) => {
        setOpenPopup(false);
    };

    const handleOpenPopup = (e, completedOrderID) => {
        setOpenPopup(true);
        setSelectedID(completedOrderID);
    };

    const handleDeleteOrder = async (e) => {
        // dispatch({type: ACTION.LOADING});
        const response = await fetch('http://localhost:4000/api/orders/' + selectedID, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            setOpenPopup(false);
            console.log(`Deleted order ${selectedID}!`);
            removeFromOrderList(selectedID);
        } else {
            console.log(`Error, could not delete order ${selectedID}, ${response.statusText}`);
            dispatch({ type: ACTION.ERROR_DELETE });
            setTimeout(() => {
                dispatch({ type: ACTION.RESET });
            }, 5000);
        }
        setOpenPopup(false);
    };

    const handleViewClick = (e, completedOrderId) => {
        e.preventDefault();
        navigate(`/orders/${completedOrderId}`);
    };

    const removeFromOrderList = (orderID) => {
        let ordersCopy = [...completedOrders];
        ordersCopy = completedOrders.filter((order) => order._id !== orderID);
        setCompletedOrders(ordersCopy);
    };

    useEffect(() => {
        if (user) {
            findCompletedOrders();
        }
    }, []);

    return (
        <div className={styles.commissionsContainer}>
            {openPopup && (
                <YesNoPopup closePopup={closePopup} yesFunction={handleDeleteOrder}>
                    <h3>Are you sure?</h3>
                    <p>Are you sure you want to delete this commission? This action cannot be undone.</p>
                    {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
                </YesNoPopup>
            )}
            <div className="pageTitle">
                <h1>Commissions</h1>
            </div>
            <div className={styles.commissionsContent}>
                <div className={styles.completedOrders}>
                    {/* <div className={styles.header}>
                        <p>Date</p>
                    </div> */}
                    {completedOrders &&
                        completedOrders.map((completedOrder) => {
                            return (
                                <div className={styles.completedOrderContainer}>
                                    <div className={styles.completedDateContainer}>
                                        <p>{completedOrder && completedOrder.dateCompleted}</p>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.orderNameContainer}>
                                            <p>
                                                {/* <b>Name: </b> */}
                                                {completedOrder && completedOrder.orderName}
                                            </p>
                                        </div>
                                        <div className={styles.orderPrice}>
                                            <p>{completedOrder && completedOrder.price !== -1 ? '$' + completedOrder.price : 'Not set'}</p>
                                        </div>
                                        <div className={styles.completedArtIcon}>
                                            <button
                                                onMouseEnter={(e) => {
                                                    setShowArtPreview(true);
                                                    setSelectedID(completedOrder._id);
                                                }}
                                                onClick={(e) => {
                                                    setShowArtPreview(!showArtPreview);
                                                    setSelectedID(completedOrder._id);
                                                }}
                                                onMouseLeave={(e) => {
                                                    setShowArtPreview(false);
                                                    setSelectedID('');
                                                }}
                                            >
                                                <img src={artIcon} alt="Art"></img>
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.buttons}>
                                        <button className="filledWhiteButton greyHoverButton" onClick={(e) => handleViewClick(e, completedOrder._id)}>
                                            View
                                        </button>
                                        {/* <button className={styles.editBtn} onClick={handleEditClick}>Edit</button> */}
                                        <button className="blueButton deleteBtn" onClick={(e) => handleOpenPopup(e, completedOrder._id)}>
                                            Delete
                                        </button>
                                    </div>
                                    {showArtPreview && completedOrder && completedOrder._id === selectedID && completedOrder.completedArts.length !== 0 && (
                                        <div className={styles.artPreview}>
                                            <img src={completedOrder.completedArts[0].imageURL} alt={noImageIcon}></img>
                                        </div>
                                    )}
                                    {showArtPreview && completedOrder && completedOrder._id === selectedID && completedOrder.completedArts.length === 0 && (
                                        <div className={styles.artPreview}>
                                            <img src={noImageIcon} alt="No Image"></img>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
                {state.errorMessage && <div className="errorMessage">{state.errorMessage}</div>}
                {state.successMessage && <div className="successMessage">{state.successMessage}</div>}
                {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
            </div>
        </div>
    );
};

export default Commissions;
