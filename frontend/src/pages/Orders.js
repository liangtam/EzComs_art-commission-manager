import { useEffect, useState } from "react";
import OrderDetails from '../components/OrderDetails';

const Orders = () => {
    const [orders, setOrders] = useState(null);
    // [] makes it only fire once
    const fetchOrders = async () => {
        const response = await fetch('/api/orders');
        // to parse the json from the above response into smt we can work w/ 
        const json = await response.json();

        if (response.ok) {
            setOrders(json);
        }
    }

    // the empty array is dependency array. when it's empty, it means this only fires once
    useEffect(() => {
        fetchOrders();
    }, [])

    return (
            <div className="orders">
                {orders && orders.map((order) => {
                    return <OrderDetails key={order._id} order={order}/>
                
            }
                )}
            </div>
    )
};

export default Orders;