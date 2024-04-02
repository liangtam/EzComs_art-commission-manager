import Line from "../line/Line"

const OrdersSummary = ({data}) => {
    return (
        <div className="flex-col gap-2 radius-2 pad-4 marb-3 " style={{ boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.2)', maxWidth: '300px',}}>
        <div className="flex-col">
            <p>Number of orders:</p>
            <p className="font-size-5 text-turquoise-600">{data.numOfOrders}</p>
        </div>
        <Line />
        <div className="flex-col">
            <p>Total orders' prices:</p>
            <p className="font-size-5">{`$${data.totalOrdersPrice.toFixed(2)}`}</p>
        </div>
    </div>
    )
}

export default OrdersSummary