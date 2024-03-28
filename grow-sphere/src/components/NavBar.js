import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder for authentication check. Replace this with actual logic.
// This might involve checking for a token in localStorage, or a global state that tracks the user's authentication status.
const isAuthenticated = () => {
    // Example logic: Check if a user token exists in localStorage
    return Boolean(localStorage.getItem('token'));
};

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {!isAuthenticated() ? (
                    // Links to show when user is not authenticated
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                ) : (
                    // Links to show when user is authenticated
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/my-plants">My Plants</Link></li>
                        <li><Link to="/weather">Weather</Link></li>
                        <li><Link to="/guides">Plant Care Guides</Link></li>
                        <li><Link to="/community">Community</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </>
                )}
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
