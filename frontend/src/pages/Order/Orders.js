import { useEffect, useState, useContext, useNavigate} from "react";
import OrderSnippet from '../../components/order_components/OrderSnippet';
import { OrdersContext } from "../../context/OrdersContext";
import styles from "./Orders.module.css"
import YesNoPopup from '../../components/form_components/YesNoPopup';


const Orders = () => {
    const {orders, setOrders} = useContext(OrdersContext);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    
    const fetchOrders = async () => {
        // making a call to the backend
        const response = await fetch('http://localhost:4000/api/orders');
        
        // to parse the json from the above response into smt we can work w/ 
        const json = await response.json();

        if (response.ok) {
            setOrders(json);
            console.log('Fetched all forms in orders page! ', json);
        }
    }

    const handleOpenPopup = (e, orderId) => {
        e.preventDefault();
        setOpenPopup(true);
        setSelectedOrderId(orderId);
        console.log("here")
    }

    const closePopup = (e) => {
        setOpenPopup(false);
    }

    const handleDeleteOrder = async (e, orderId) => {
        e.preventDefault();
        console.log(orderId);
        const response = await fetch('http://localhost:4000/api/orders/' + orderId, {
            method: 'DELETE'
        })

        if (response.ok) {
            console.log("Order deleted!");
            removeFromOrderList(orderId);
            setOpenPopup(false);
            setSelectedOrderId(null);
            //fetchOrders();
        } else {
            console.log(`Error deleting order: ${response.statusText}`);
        }
    }

    const removeFromOrderList = (orderId) => {
        let orderListCopy = orders.filter((order) => order._id !== orderId);
        setOrders(orderListCopy);
    }

    // the empty array is dependency array. when it's empty, it means this only fires once

    useEffect(() => {
        fetchOrders();
        
        console.log("fetched orders");
    }, []);

    return (
        <div className={styles.ordersContainer}>
            {openPopup &&
            <YesNoPopup closePopup={closePopup} yesFunction={(e, orderId) => handleDeleteOrder(e, selectedOrderId)}>
                <h3>Are you sure?</h3>
                <p>Are you sure you want to delete this order? This action cannot be undone.</p>
            </YesNoPopup>}
            <div className={styles.orders}>
                {orders && orders.map((order) => {
                    return <OrderSnippet key={order._id} orderId={order._id} order={order} handleOpenPopup={handleOpenPopup}/>  
                }
                )}
            </div>
        </div>
    )
};

export default Orders;