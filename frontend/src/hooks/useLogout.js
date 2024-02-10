import { useContext } from 'react';
import { ACTION } from '../context/AuthContext';
import { useAuthContext } from './context/useAuthContext';
import { FormsContext } from '../context/FormsContext';
import { OrdersContext } from '../context/OrdersContext';

const useLogout = () => {
    const { dispatch } = useAuthContext();

    const {forms, setForms} = useContext(FormsContext);
    const {orders, setOrders} = useContext(OrdersContext);

    const logout = () => {
        dispatch({ type: ACTION.LOGOUT});
        setForms([]);
        setOrders([]);
        localStorage.removeItem('user');

    };

    return { logout };
};

export { useLogout };
