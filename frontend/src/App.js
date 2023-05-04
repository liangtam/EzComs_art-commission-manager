import { setMaxListeners } from "events";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders';
import FormBuilder from './pages/FormBuilder';
import Navbar from './components/Navbar';
import ActiveForm from "./pages/ActiveForm";


function App() {
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
          exact path="/form-builder"
          element={ < FormBuilder /> }/>
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
