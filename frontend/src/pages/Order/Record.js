import styles from './Record.module.css';
import CommissionSnippet from '../../components/order_components/CommissionSnippet';
import { useState, useEffect, useContext, useReducer} from 'react';
import { messageReducer, ACTION} from '../reducers/messageReducer';
import { OrdersContext } from '../../context/OrdersContext';
import SetActiveFormPopup from '../../components/form_components/SetActiveFormPopup';
import Orders from './Orders';

const Record = () => {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const [selectedID, setSelectedID] = useState('');

    const [state, dispatch] = useReducer( messageReducer, {
        successMessage: "",
        errorMessage: "",
        loadingMessage: ""
    })

    
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
            method: 'DELETE'
        });

        if (response.ok) {
            setOpenPopup(false);
            console.log(`Deleted order ${selectedID}!`);
            removeFromOrderList(selectedID);

        } else {
            console.log(`Error, could not delete order ${selectedID}, ${response.statusText}`);
            dispatch({type: ACTION.ERROR_DELETE});
        }
        setOpenPopup(false);
    }

    const removeFromOrderList = (orderID) => {
        let ordersCopy = [... completedOrders];
        ordersCopy = (completedOrders.filter((order) => order._id !== orderID));
        setCompletedOrders(ordersCopy);

    }

    useEffect(() => {
        findCompletedOrders();
    }, []);

    return (
        <div className={styles.record}>
            {openPopup &&
            <SetActiveFormPopup closePopup={closePopup} yesFunction={handleDeleteOrder}>
                <h3>Are you sure?</h3>
                <p>Are you sure you want to delete this commission? This action cannot be undone.</p>
            </SetActiveFormPopup>}
            <div className={styles.header}>
                <h2>Commission Record</h2>
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

export default Record;