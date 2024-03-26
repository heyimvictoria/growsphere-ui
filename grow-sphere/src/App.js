import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Make sure to import Routes and Route
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/user/Dashboard';
import About from './components/About'; // Assume you have an About component
import './index.css';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                {/* Add more routes as needed */}
            </Routes>
        </>
    );
}

export default App;
