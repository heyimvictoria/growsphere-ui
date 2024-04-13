// grow-sphere\src\App.js
// noinspection JSCheckFunctionSignatures(?)

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomeComponent from './components/Home';
import AboutComponent from './components/About';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import './index.css';

function App() {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/about" element={<AboutComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
            </Routes>
        </div>
    );
}

export default App;
