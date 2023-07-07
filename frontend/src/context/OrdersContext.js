import { createContext } from "react";

export const OrdersContext = createContext();

export const OrdersContextProvider = ({children}) => {
    <OrdersContext.Provider>
        {children}
    </OrdersContext.Provider>
}