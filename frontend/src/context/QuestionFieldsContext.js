import { createContext } from 'react';

export const QuestionFieldsContext = createContext();

export const QuestionFieldsContextProvider = ({ children }) => {

    return (
        <QuestionFieldsContext.Provider>
            { children }
        </QuestionFieldsContext.Provider>
    )
}