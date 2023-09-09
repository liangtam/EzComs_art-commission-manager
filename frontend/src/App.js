import React from "react";
import MainPage from "./pages/MainPage";
import { AuthContextProvider } from './context/AuthContext';


function App() {

  return (

    <div className="App">
      <AuthContextProvider>
        <MainPage/>
      </AuthContextProvider>
    </div>
  );
}

export default App;
