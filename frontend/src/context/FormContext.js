import { createContext } from 'react';

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {

    return (
        <FormContext.Provider>
            { children }
        </FormContext.Provider>
    )
}