import { createContext } from "react";

const FormsContext = createContext();

const FORM_ACTION = {
    GET_ALL_FORMS: "getAllForms",
    DELETE_FORM: "deleteForm",
    GET_ONE_FORM: "getOneForm"
}

const formReducer = (state, action) => {
    switch(action.type) {
        case 'getAllForms': {

        }
    }
}

const FormsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(formReducer, []);
    
    
    return (
    <FormsContext.Provider value={{...state, dispatch, FORM_ACTION}}>
        {children}
    </FormsContext.Provider>
    )
}

export {FormsContextProvider, FormsContext};