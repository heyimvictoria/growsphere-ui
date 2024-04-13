<<<<<<< HEAD
// grow-sphere\src\App.js
// noinspection JSCheckFunctionSignatures(?)

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomeComponent from './components/Home';
import AboutComponent from './components/About';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
=======
import Register from "./components/Register";

>>>>>>> db3659be24668061577ead93cadaf627c3977cc7
import './index.css';

function App() {

    return (
<<<<<<< HEAD
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
=======
        <main className="App">
            <Register/>
        </main>
>>>>>>> db3659be24668061577ead93cadaf627c3977cc7
    );
}

export default App;