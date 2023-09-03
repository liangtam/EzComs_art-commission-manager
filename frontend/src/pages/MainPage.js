import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Orders from './Order/Orders';
import FormBuilder from './Form/FormBuilder';
import Forms from './Form/Forms';
import Navbar from '../components/Navbar';
import ActiveForm from './Form/ActiveForm';
import FormDetails from './Form/FormDetails';
import OrderDetails from './Order/OrderDetails';
import EditOrderDetails from './Order/EditOrderDetails';
import Record from './Order/Record';

import { QuestionFieldsContext } from '../context/QuestionFieldsContext';
import { FormsContext } from '../context/FormsContext';
import { OrdersContext } from '../context/OrdersContext';

function MainPage() {
    const [forms, setForms] = useState([]);
    const [orders, setOrders] = useState([]);
    //const [activeForm, setActiveForm] = useState(null);
    // the current list of questions of the CURRENT form the user is on
    const [questionFieldList, setQuestionFieldList] = useState([]);

    const fetchAllForms = async () => {
        const response = await fetch('http://localhost:4000/api/forms/');

        const json = await response.json();

        if (response.ok) {
            setForms(json);
            console.log("Fetched all forms in main page! ", json)
            //findActiveForm();
        }
    };

    const fetchAllOrders = async () => {
        const response = await fetch('http://localhost:4000/api/orders');

        const json = await response.json();

        if (response.ok) {
            setOrders(json);
            console.log("Fetched all orders in main page! ", json);
        }
    }
    
    useEffect(() => {
        fetchAllForms();
        fetchAllOrders();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route exact path="/" element={
                            <OrdersContext.Provider value={{orders, setOrders}}>
                                    <Orders/>
                            </OrdersContext.Provider>
                        } />
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

                        <Route exact path="/form" element={
                        <FormsContext.Provider value={{forms, setForms}}>
                            <QuestionFieldsContext.Provider value={{ questionFieldList, setQuestionFieldList }}>
                                <ActiveForm />
                            </QuestionFieldsContext.Provider>
                        </FormsContext.Provider>
                        } />

                        
                        <Route exact path="/orders" element={
                            <OrdersContext.Provider value={{orders, setOrders}}>
                                <QuestionFieldsContext.Provider value={{questionFieldList, setQuestionFieldList}}>
                                    <Orders/>
                                </QuestionFieldsContext.Provider>
                            </OrdersContext.Provider>
                        } />

                        <Route exact path="/orders/:id" element={
                            <OrdersContext.Provider value={{orders, setOrders}}>
                                <OrderDetails />
                            </OrdersContext.Provider>
                        }/>
                        <Route exact path="/orders/edit/:id" element={
                            <OrdersContext.Provider value={{orders, setOrders}}>
                                <EditOrderDetails />
                            </OrdersContext.Provider>
                        }/>

                        <Route exact path="/record" element={
                            <Record/>
                        }/>

                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default MainPage;
