import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './Orders';
import FormBuilder from './FormBuilder';
import Forms from './Forms';
import Navbar from '../components/Navbar';
import ActiveForm from './ActiveForm';
import { QuestionFieldsContext } from '../context/QuestionFieldsContext';
import { useState, useContext } from 'react';
import FormDetails from '../components/FormDetails';
import { FormsContext } from '../context/FormsContext';

function MainPage() {
    const [forms, setForms] = useState([]);
    // the current list of questions of the CURRENT form the user is on
    const [questionFieldList, setQuestionFieldList] = useState([]);

    const fetchAllForms = async () => {
        const response = await fetch('http://localhost:4000/api/forms/');

        const json = await response.json();

        if (response.ok) {
            setForms(json);
        }
    };

    useEffect(() => {
        fetchAllForms();
    }, [forms]);

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route exact path="/" element={<Orders />} />
                        <Route
                            exact
                            path="/forms"
                            element={
                                <FormsContext.Provider value={{ forms, setForms }}>
                                    <Forms />
                                </FormsContext.Provider>
                            }
                        />

                        <Route
                            exact
                            path="/form-builder"
                            element={
                                <FormsContext.Provider value={{ forms, setForms }}>
                                    <QuestionFieldsContext.Provider value={{ questionFieldList, setQuestionFieldList }}>
                                        <FormBuilder />
                                    </QuestionFieldsContext.Provider>
                                </FormsContext.Provider>
                            }
                        />
                        <Route
                            exact
                            path="/forms/:id"
                            element={
                                <FormsContext.Provider value={{ forms, setForms }}>
                                    <QuestionFieldsContext.Provider value={{ questionFieldList, setQuestionFieldList }}>
                                        <FormDetails />
                                    </QuestionFieldsContext.Provider>
                                </FormsContext.Provider>
                            }
                        />

                        <Route exact path="/form" element={<ActiveForm />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default MainPage;
