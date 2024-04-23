import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Make sure to import Routes and Route
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/user/Dashboard';
import About from './components/About'; // Assume you have an About component
import './index.css';
import  Calendar from './components/user/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For Bootstrap JavaScript functionality, including tooltips



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
                <Route path="/calendar" element={<Calendar />} />

                {/* Add more routes as needed */}
            </Routes>
        </>
    );
}

export default App;
