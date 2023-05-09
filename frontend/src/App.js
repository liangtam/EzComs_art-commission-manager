import { setMaxListeners } from "events";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders';
import FormBuilder from './pages/FormBuilder';
import ManageForms from './pages/ManageForms';
import Navbar from './components/Navbar';
import ActiveForm from "./pages/ActiveForm";
import { FormContext } from './context/FormContext';
import { useState, useContext } from "react";
import FormDetails from "./components/FormDetails";

function App() {

  const [questionFieldList, setQuestionFieldList] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          
          <Route
          exact path="/"
          element={ < Orders />}/>
          <Route
          exact path="/forms"
          element={ < ManageForms /> } />

            <Route
            exact path="/form-builder"
            element={
              <FormContext.Provider value={{questionFieldList, setQuestionFieldList}}>
                < FormBuilder />
              </FormContext.Provider> }/>
            <Route
            exact path="/forms/:id"
            element={
              <FormContext.Provider value={{questionFieldList, setQuestionFieldList}}>
                < FormDetails />
              </FormContext.Provider>
            }/>

          <Route
          exact path="/form"
          element={ < ActiveForm /> } />

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
