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

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProfileEdit from './components/user/ProfileEdit';
import ViewUser from './components/user/ViewUser';
import {ContactForm}from './components/ContactForm';

function App() {
    return (
<<<<<<< HEAD
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //         <Route path="/login" element={<Login />} />
        //         <Route path="/register" element={<Register />} />
        //         <Route path="/dashboard" element={<Dashboard />} />
        //         {/* Define more routes as needed */}
        //     </Routes>
        // </Router>
        <div className='App'>
            <Router>
                <NavBar/>
                <Routes>
                    <Route exact path='/' element={<Home />}/>
                    <Route exact path='/register' element={<Register />}/>
                    <Route exact path='/editUser/:id' element={<ProfileEdit />}/>
                    <Route exact path='/viewUser/:id' element={<ViewUser />}/>
                    <Route exact path='/contact' element={<ContactForm />}/>
                </Routes>

            </Router>
        </div>
=======
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
>>>>>>> 8fd289fdb4a150bc6ee45b928198a45b3c7b2931
    );
}

export default App;
