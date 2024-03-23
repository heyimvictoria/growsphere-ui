import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/user/Dashboard';
import Home from './components/Home';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //         <Route path="/login" element={<Login />} />
        //         <Route path="/register" element={<Register />} />
        //         <Route path="/dashboard" element={<Dashboard />} />
        //         {/* Define more routes as needed */}
        //     </Routes>
        // </Router>
        <div>
            <NavBar/>
            <Home/>
        </div>
    );
}

export default App;
