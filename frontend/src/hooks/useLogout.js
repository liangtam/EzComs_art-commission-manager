import { ACTION } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {

    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('user');dispatch({type: ACTION.LOGOUT});
    }

    return {logout};
}

export {useLogout};