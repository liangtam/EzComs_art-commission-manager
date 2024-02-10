import { useContext } from 'react';
import { ACTION } from '../context/AuthContext';
import { useAuthContext } from './useAuthContext';
import { FormsContext } from '../context/FormsContext';
import { OrdersContext } from '../context/OrdersContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const { setForms} = useContext(FormsContext);
    const { setOrders} = useContext(OrdersContext);

    const logout = () => {
        dispatch({ type: ACTION.LOGOUT});
        setForms([]);
        setOrders([]);
        localStorage.removeItem('user');

    };

    return { logout };
};
