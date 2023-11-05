import {createContext, useReducer, useEffect} from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type) {
        case 'login':
            return {
                user: action.payload
            };
        case 'logout':
            return {
                user: null
            };
        default:
            return state;
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        async function getUser() {
            const user = await JSON.parse(localStorage.getItem('user')); // the local storage item is a json string
            if (user) {
                dispatch({type: ACTION.LOGIN, payload: user})
            }
        }
        getUser();
    }, []);
    // every time our state changes, it will be logged to the console
    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch, ACTION}}>
            { children }
        </AuthContext.Provider>
    )
}

const ACTION = {
    LOGIN: "login",
    LOGOUT: "logout"
}
export {AuthContext, AuthContextProvider, authReducer, ACTION};