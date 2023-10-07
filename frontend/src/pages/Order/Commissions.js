import styles from './Commissions.module.css';
import CommissionSnippet from '../../components/order_components/CommissionSnippet';
import { useState, useEffect, useContext, useReducer} from 'react';
import { orderMessageReducer, ACTION} from '../reducers/orderMessageReducer.js';
import { OrdersContext } from '../../context/OrdersContext';
import YesNoPopup from '../../components/form_components/YesNoPopup';
import { useAuthContext } from '../../hooks/useAuthContext';

const Commissions = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const [selectedID, setSelectedID] = useState('');

    const [state, dispatch] = useReducer( orderMessageReducer, {
        successMessage: "",
        errorMessage: "",
        loadingMessage: ""
    });

    const {user} = useAuthContext();

    
    //const {orders, setOrders} = useContext(OrdersContext);

    const findCompletedOrders = async () => {
        const response = await fetch('http://localhost:4000/api/orders/completed', {
            headers: {
                'Authorization': `Bearer ${user.token}`

            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log("Fetched all completed orders! ", json);
            setCompletedOrders(json);
        } else {
            console.log("Could not fetch completed orders :(");
        }
    }

    const closePopup = (e) => {
        setOpenPopup(false);
    }

    const handleOpenPopup = (e, completedOrderID) => {
        setOpenPopup(true);
        setSelectedID(completedOrderID);
    }

    const handleDeleteOrder = async (e) => {
        // dispatch({type: ACTION.LOADING});
        const response = await fetch('http://localhost:4000/api/orders/' + selectedID, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            setOpenPopup(false);
            console.log(`Deleted order ${selectedID}!`);
            removeFromOrderList(selectedID);

        } else {
            console.log(`Error, could not delete order ${selectedID}, ${response.statusText}`);
            dispatch({type: ACTION.ERROR_DELETE});
            setTimeout(() => {
                dispatch({type: ACTION.RESET})
            }, 5000);
        }
        setOpenPopup(false);
    }

    const removeFromOrderList = (orderID) => {
        let ordersCopy = [... completedOrders];
        ordersCopy = (completedOrders.filter((order) => order._id !== orderID));
        setCompletedOrders(ordersCopy);

    }

    useEffect(() => {
        if (user) {
            findCompletedOrders();
        }
    }, []);

    return (
        <div className={styles.commissions}>
            {openPopup &&
            <YesNoPopup closePopup={closePopup} yesFunction={handleDeleteOrder}>
                <h3>Are you sure?</h3>
                <p>Are you sure you want to delete this commission? This action cannot be undone.</p>
            </YesNoPopup>}
            <div className={styles.header}>
                <h2>Commissions</h2>
            </div>
            <div className={styles.completedOrders}>
                {completedOrders && completedOrders.map((completedOrder) => {
                    return <div className={styles.completedOrder}>
                        <CommissionSnippet completedOrder={completedOrder} completedOrderId={completedOrder._id} handleOpenPopup = {handleOpenPopup}/>
                    </div>
                })}
            </div>
            {state.errorMessage && <div className={styles.errorMessage}>{state.errorMessage}</div>}
            {state.successMessage && <div className={styles.successMessage}>{state.successMessage}</div>}
            {state.loadingMessage && <div className={styles.loadingMessage}>{state.loadingMessage}</div>}

        </div>
        
    )
}

export default Commissions;