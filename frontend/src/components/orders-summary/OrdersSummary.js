import Line from "../line/Line"

const OrdersSummary = ({numOfOrders, totalOrdersPrice}) => {
    return (
        <div className="flex-col gap-2 radius-2 pad-4 marb-3 w-50" style={{ boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.2)' }}>
        <div className="flex-col">
            <p className="font-weight-700">Number of orders:</p>
            <p className="font-size-5">{numOfOrders}</p>
        </div>
        <Line />
        <div className="flex-col">
            <p>Total orders' prices:</p>
            <p className="font-size-5">{`$${totalOrdersPrice.toFixed(2)}`}</p>
        </div>
    </div>
    )
}

export default OrdersSummary