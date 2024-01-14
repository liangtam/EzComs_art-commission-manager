import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Orders from './Order/Orders';
import FormBuilder from './Form/FormBuilder';
import Forms from './Form/Forms';
import Navbar from '../components/Navbar';
import ActiveForm from './Form/ActiveForm';
import FormDetails from './Form/FormDetails';
import OrderDetails from './Order/OrderDetails';
import EditOrderDetails from './Order/EditOrderDetails';
import Commissions from './Order/Commissions';
import Login from './Login/Login';


import { QuestionFieldsContext } from '../context/QuestionFieldsContext';
import { FormsContext } from '../context/FormsContext';
import { OrdersContext } from '../context/OrdersContext';

import { useAuthContext } from '../hooks/useAuthContext';
import { OrdersContextProvider } from '../context/OrdersContext';
import { useOrdersContext } from '../hooks';

function MainPage() {
    const [forms, setForms] = useState([]);
    // the current list of questions of the CURRENT form the user is on
    const [questionFieldList, setQuestionFieldList] = useState([]);
    const { user } = useAuthContext();

    // const fetchAllForms = async () => {
    //     if (!user) {
    //         return;
    //     }
    //     const response = await fetch('https://ezcoms.onrender.com/api/forms/', {
    //         headers: {
    //             Authorization: `Bearer ${user.token}`
    //         }
    //     });

    //     const json = await response.json();

    //     if (response.ok) {
    //         setForms(json);
    //         console.log('Fetched all forms in main page! ', json);
    //     }
    // };

    // const fetchAllOrders = async () => {
    //     const response = await fetch('https://ezcoms.onrender.com/api/orders', {
    //         headers: {
    //             Authorization: `Bearer ${user.token}`
    //         }
    //     });

    //     const json = await response.json();

    //     if (response.ok) {
    //         setOrders(json);
    //         console.log('Fetched all orders in main page! ', json);
    //     }
    // };

    // useEffect(() => {
    //     if (user) {
    //         fetchAllForms();
    //         fetchAllOrders();
    //     }
    // }, [user]);

    return (
        <div className="App">
            <BrowserRouter>
                <FormsContext.Provider value={{ forms, setForms }}>
                    <OrdersContextProvider>
                        <QuestionFieldsContext.Provider value={{ setQuestionFieldList, questionFieldList }}>
                            {user && <Navbar />}
                            <div className="pages">
                                <Routes>
                                    {user && (
                                        <>
                                            <Route exact path="/" element={<Dashboard />} />
                                            <Route exact path="/forms" element={<Forms />} />

                                            <Route exact path="/form-builder" element={<FormBuilder />} />
                                            <Route exact path="/forms/:id" element={<FormDetails />} />
                                            <Route exact path="/orders" element={<Orders />} />

                                            <Route exact path="/orders/:id" element={<OrderDetails />} />
                                            <Route exact path="/orders/edit/:id" element={<EditOrderDetails />} />
                                        </>
                                    )}

                                    <Route exact path="/commissions" element={user ? <Commissions /> : <Navigate to="/login"></Navigate>} />
                                    {!user && (
                                        <>
                                            <Route exact path="/" element={<Login />} />
                                            <Route exact path="/login" element={<Login />} />
                                        </>
                                    )}
                                    <Route exact path="/form/:userID" element={<ActiveForm />} />
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
