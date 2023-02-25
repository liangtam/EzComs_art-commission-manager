const OrderDetails = ({order}) => {
    console.log('in here, ', order)
    return (
        <div className="order-details">
            <h4>{order.clientName}</h4>
            <p><strong>Client contact: </strong>  {order.clientContact}</p>
            <p><strong>Request: </strong> {order.requestSnippet}</p>
            <p><strong>Requested on: </strong> {order.createdAt}</p>
        </div>
    )
}

export default OrderDetails;
