import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/user/Dashboard';
import Home from './components/Home';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProfileEdit from './components/user/ProfileEdit';
import ViewUser from './components/user/ViewUser';
import MyPlants from './components/user/MyPlants';
import EditPlant from './components/user/EditPlant';
import ViewPlant from './components/user/ViewPlant';
import AddPlant from './components/user/AddPlant';

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
        <div className='App'>
            <Router>
                <NavBar/>
                <Routes>
                    <Route exact path='/' element={<Home />}/>
                    <Route exact path='/my-plants' element={<MyPlants />}/>
                    <Route exact path='/editPlant/:id' element={<EditPlant />}/>
                    <Route exact path='/viewPlant/:id' element={<ViewPlant />}/>
                    <Route exact path='/add-plant' element={<AddPlant />}/>
                    <Route exact path='/register' element={<Register />}/>
                    <Route exact path='/editUser/:id' element={<ProfileEdit />}/>
                    <Route exact path='/viewUser/:id' element={<ViewUser />}/>
                </Routes>

            </Router>
        </div>
    );
}

export default App;
