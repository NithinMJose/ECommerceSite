import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import './App.css';
import Signup from './Components/Login/Signup';
import HomePage from './Components/Pages/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;