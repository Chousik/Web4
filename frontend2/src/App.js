import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import React from "react";
import RegisterPage from "./component/RegistrPage";
import MainPage from "./component/MainPages";

function App() {
  return (
      <Router>
                 <Routes>
                     <Route path="/register" element={<RegisterPage/>}/>
                     <Route path="/login" element={<LoginPage/>}/>
                     <Route path="/main" element={<MainPage />} />
                 </Routes>
      </Router>
  );
}

export default App;
