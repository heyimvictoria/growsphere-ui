import React, { Component } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/AuthService";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import MyPlants from "./components/MyPlants";
import ViewPlant from "./components/ViewPlant";
import EventBus from "./common/EventBus";
import AddPlants from "./components/user/AddPlants";
import ViewMyPlant from "./components/user/ViewMyPlant";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
        EventBus.on("logout", this.logOut);
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
                    <Link to="/" className="navbar-brand">GrowSphere</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/home" className="nav-link">Home</NavLink>
                            </li>
                            {showModeratorBoard && (
                                <li className="nav-item">
                                    <NavLink to="/mod" className="nav-link">Moderator Board</NavLink>
                                </li>
                            )}
                            {showAdminBoard && (
                                <li className="nav-item">
                                    <NavLink to="/admin" className="nav-link">Admin Board</NavLink>
                                </li>
                            )}
                            {currentUser && (
                                <li className="nav-item">
                                    <NavLink to="/user" className="nav-link">User</NavLink>
                                </li>
                            )}
                        </ul>
                        {currentUser ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink to="/profile" className="nav-link">{currentUser.username}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>Log Out</a>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/user" element={<BoardUser />} />
                        <Route path="/mod" element={<BoardModerator />} />
                        <Route path="/admin" element={<BoardAdmin />} />
                        <Route path="/plants" element={<MyPlants />} />
                        <Route path="/add-plants" element={<AddPlants />} />
                        <Route exact path='/my-plant/:id' element={<ViewMyPlant />} />
                        <Route exact path='/plant/:id' element={<ViewPlant />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
