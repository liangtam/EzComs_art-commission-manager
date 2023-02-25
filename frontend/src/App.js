import { setMaxListeners } from "events";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders';
import FormBuilder from './pages/FormBuilder';
import Navbar from './components/Navbar';
import Form from "./pages/Form";


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
          exact path="/form/create"
          element={ < FormBuilder /> }/>
          <Route
          exact path="/form"
          element={ < Form /> } />

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
