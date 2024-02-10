import { OrdersContext } from "../../context/OrdersContext";
import { useContext } from "react";

export const useOrdersContext = () => {
    const orderContext = useContext(OrdersContext);

    if (!orderContext) {
        throw Error('useOrderContext must be used inside an OrderContextProvider')
    }

    return orderContext;
}