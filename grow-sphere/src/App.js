import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/user/Dashboard';
import About from './components/About';
import './index.css';
import {AuthProvider} from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
            <NavBar />
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
