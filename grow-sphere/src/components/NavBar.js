import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/my-plants">My Plants</Link></li>
                <li><Link to="/weather">Weather</Link></li>
                <li><Link to="/guides">Plant Care Guides</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}