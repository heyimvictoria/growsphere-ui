import React, { Component } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import logo from "./assets/growspherelogo.svg";


import AuthService from "./services/AuthService";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import EventBus from "./common/EventBus";
import AboutComponent from "./components/About";
import Weather from "./components/Weather";

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
                <nav className="navbar navbar-expand-md navbar-dark custom-navbar">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt="GrowSphere Logo"
                             style={{width: "45px", height: "45px", marginRight: "10px"}}/>
                        GrowSphere
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/home" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/weather" className="nav-link">Weather</NavLink>
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

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<AboutComponent/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/weather" element={<Weather/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/user" element={<BoardUser/>}/>
                    <Route path="/mod" element={<BoardModerator/>}/>
                    <Route path="/admin" element={<BoardAdmin/>}/>
                </Routes>

                <footer className="footer-48201">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 pr-md-5">
                                <a href="#" className="footer-site-logo d-block mb-4">
                                    <img src={logo} alt="GrowSphere Logo"
                                         style={{width: "45px", height: "45px", marginRight: "5px"}}/>GrowSphere</a>
                                <p>St. Louis, Missouri</p>
                            </div>
                            <div className="col-md">
                                <ul className="list-unstyled nav-links">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div className="col-md">
                                <ul className="list-unstyled nav-links">
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Garden Gallery</a></li>
                                    <li><a href="#">Weather</a></li>
                                    <li><a href="#">News</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </div>
                            <div className="col-md">
                                <ul className="list-unstyled nav-links">
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12 text-center">
                                <div className="copyright mt-5 pt-5">
                                    <p>
                                        <small>© 2024 GrowSphere. All Rights Reserved.</small><br/>
                                        <small>Final Project for Launchcode's 2024 Liftoff Program.</small><br/>
                                        <small>Created by: <a href="https://github.com/travaughn33">Travaughn Watson</a>, <a href="https://github.com/ZimDman">Ryan Winkler</a>, <a href="https://github.com/stephenmdevine">Stephen Devine</a>, <a href="https://github.com/SamGoessling">Sam
                                            Goessling</a></small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}

export default App;
