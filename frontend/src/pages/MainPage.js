import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import  Navbar  from '../components/nav-bar/Navbar';
import { Dashboard, Orders, FormBuilder, Forms, ActiveForm, FormDetails, OrderDetails, NotFoundPage, Login, Commissions, EditOrderDetails } from './index.js';

import { QuestionFieldsContext, FormsContext, OrdersContextProvider } from '../context';

import { useAuthContext } from '../hooks';

function MainPage() {
    const [forms, setForms] = useState([]);
    // the current list of questions of the CURRENT form the user is on
    const [questionFieldList, setQuestionFieldList] = useState([]);
    const { user } = useAuthContext();
    const wrapNavbar = (component) => {
        return (
            <>
                <Navbar />
                {component}
            </>
        );
    };

    return (
        <div className="App">
            <BrowserRouter>
                <FormsContext.Provider value={{ forms, setForms }}>
                    <OrdersContextProvider>
                        <QuestionFieldsContext.Provider value={{ setQuestionFieldList, questionFieldList }}>
                            <div className="pages">
                                <Routes>
                                    {user && (
                                        <>
                                            <Route exact path="/" element={wrapNavbar(<Dashboard />)} />
                                            <Route exact path="/forms" element={wrapNavbar(<Forms />)} />

                                            <Route exact path="/form-builder" element={wrapNavbar(<FormBuilder />)} />
                                            <Route exact path="/forms/:id" element={wrapNavbar(<FormDetails />)} />
                                            <Route exact path="/orders" element={wrapNavbar(<Orders />)} />

                                            <Route exact path="/orders/:id" element={wrapNavbar(<OrderDetails />)} />
                                            <Route exact path="/orders/edit/:id" element={wrapNavbar(<EditOrderDetails />)} />
                                            <Route path="/*" element={wrapNavbar(<NotFoundPage />)}></Route>
                                        </>
                                    )}

                                    <Route exact path="/commissions" element={user ? wrapNavbar(<Commissions />) : <Navigate to="/login"></Navigate>} />
                                    {!user && (
                                        <>
                                            <Route exact path="/" element={<Login />} />
                                        </>
                                    )}
                                    <Route exact path="/login" element={<Login />} />

                                    <Route exact path="/form/:userID" element={wrapNavbar(<ActiveForm />)} />
                                    <Route path="/*" element={wrapNavbar(<NotFoundPage />)}></Route>
                                </Routes>
                            </div>
                        </QuestionFieldsContext.Provider>
                    </OrdersContextProvider>
                </FormsContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default MainPage;
