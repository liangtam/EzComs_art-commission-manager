import {createContext, useReducer} from 'react';

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

    // every time our state changes, it will be logged to the console
    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

const ACTION = {
    LOGIN: "login",
    LOGOUT: "logout"
}
export {AuthContext, AuthContextProvider, authReducer, ACTION};