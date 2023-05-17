import { createContext } from "react";

export const FormsContext = createContext();

export const FormsContextProvider = ({children}) => {
    <FormsContext.Provider>
        {children}
    </FormsContext.Provider>
}