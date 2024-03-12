import styles from './Commissions.module.css';
import { YesNoPopup, CommissionSnippet, Line, IncomeSummary, NoDataPlaceholder } from '../../components/';
import { useState, useEffect, useReducer } from 'react';
import { orderMessageReducer, ACTION } from '../reducers/orderMessageReducer.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useNavigate } from 'react-router-dom';
import artIcon from '../../assets/images/image_icon.png';
import noImageIcon from '../../assets/images/ezcoms_noimage_head.png';
import noCommissionsIcon from '../../assets/images/no_commissions.png';
import { PageContainer } from '../../layouts/index.js';

const Commissions = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [showArtPreview, setShowArtPreview] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [incomeData, setIncomeData] = useState(null);

    const [selectedID, setSelectedID] = useState('');

    const [state, dispatch] = useReducer(orderMessageReducer, {
        successMessage: '',
        errorMessage: '',
        loadingMessage: ''
    });

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const fetchCompletedOrders = async () => {
        dispatch({ type: ACTION.LOADING });
        try {
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
                throw new Error('Could not fetch orders');
            }
        } catch (err) {
            dispatch({ type: ACTION.ERROR_GET_ALL });
        }
        setInitLoading(false);
        dispatch({ type: ACTION.RESET });
    };

    const fetchIncomeData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/user/income/${user.userID}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                const incomeDataJson = await response.json();
                setIncomeData(incomeDataJson);
                console.log('h: ', incomeData);
            }

            if (!response.ok) {
                throw new Error('Bad response. Could not fetch income.');
            }
        } catch (error) {
            console.log('Income data error: ', error);
            dispatch({ type: ACTION.ERROR_GENERAL });
        }
    };

    const closePopup = () => {
        setOpenPopup(false);
    };

    const handleOpenPopup = (e, completedOrderID) => {
        setOpenPopup(true);
        setSelectedID(completedOrderID);
    };

    const handleDeleteOrder = async (e) => {
        dispatch({ type: ACTION.LOADING });
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
            fetchCompletedOrders();
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchIncomeData();
        }
    }, [user]);

    return (
        <PageContainer>
            {openPopup && (
                <YesNoPopup closePopup={closePopup} yesFunction={handleDeleteOrder}>
                    <h3>Are you sure?</h3>
                    <p>Are you sure you want to delete this commission? This action cannot be undone.</p>
                    {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
                </YesNoPopup>
            )}
            <div className="pageTitle mart-3">
                <h1>Commissions</h1>
                <Line />
            </div>
            <div className={styles.commissionsContent}>
                {incomeData && (
                    <div className="flex-row gap-3 w-100">
                        <IncomeSummary monthlyIncome={incomeData.monthlyIncome} totalIncome={incomeData.totalIncome} key={'h'} />
                        <IncomeSummary monthlyIncome={incomeData.monthlyIncome} totalIncome={incomeData.totalIncome} key={'hf'} />
                    </div>
                )}
                {!initLoading && (!completedOrders || completedOrders.length === 0) && (
                    <div className="flex-col">
                        <Line/>
                        <NoDataPlaceholder message="You have no commissions at the moment." src={noCommissionsIcon} className='mart-3'/>
                    </div>
                )}

                <div className={styles.completedOrders}>
                    {completedOrders && completedOrders.length > 0 && (
                        <div className={styles.header}>
                            <div className={styles.headerItem}>
                                <p>Date</p>
                            </div>
                            <div className={styles.headerItem}>
                                <p>Order Name</p>
                            </div>
                            <div className={styles.headerItem}>
                                <p>Date Completed</p>
                            </div>
                            <div className={styles.headerItem}>
                                <p>Price</p>
                            </div>
                        </div>
                    )}
                    {completedOrders &&
                        completedOrders.map((completedOrder) => {
                            return (
                                <div className={styles.completedOrderContainer}>
                                    <div className={styles.completedDateContainer}>
                                        <p>{completedOrder && completedOrder.dateCompleted}</p>
                                    </div>
                                    <div className={styles.orderNameContainer}>
                                        <p>
                                            {/* <b>Name: </b> */}
                                            {completedOrder && completedOrder.orderName}
                                        </p>
                                    </div>
                                    <div className={styles.dateReqqed}>
                                        <p>{completedOrder && completedOrder.dateReqqed}</p>
                                    </div>
                                    <div className={styles.orderPrice}>
                                        <p>{completedOrder && completedOrder.price !== -1 ? '$' + completedOrder.price : 'Not set'}</p>
                                    </div>
                                    <div className={styles.completedArtIcon}>
                                        <button
                                            onMouseEnter={() => {
                                                setShowArtPreview(true);
                                                setSelectedID(completedOrder._id);
                                            }}
                                            onClick={() => {
                                                setShowArtPreview(!showArtPreview);
                                                setSelectedID(completedOrder._id);
                                            }}
                                            onMouseLeave={() => {
                                                setShowArtPreview(false);
                                                setSelectedID('');
                                            }}
                                        >
                                            <img src={artIcon} alt="Art"></img>
                                        </button>
                                    </div>
                                    <div className={styles.buttons}>
                                        <button className="filledWhiteButton greyHoverButton font-weight-400" onClick={(e) => handleViewClick(e, completedOrder._id)}>
                                            View
                                        </button>
                                        {/* <button className={styles.editBtn} onClick={handleEditClick}>Edit</button> */}
                                        <button className="blueButton deleteBtn font-weight-400" onClick={(e) => handleOpenPopup(e, completedOrder._id)}>
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
                {state.errorMessage && <div className="errorMessage bg-light-red">{state.errorMessage}</div>}
                {state.successMessage && <div className="successMessage bg-light-green">{state.successMessage}</div>}
                {state.loadingMessage && <div className="loadingMessage">{state.loadingMessage}</div>}
            </div>
        </PageContainer>
    );
};

export default Commissions;
