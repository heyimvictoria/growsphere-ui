import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li> {/* Optional, can remove if not using login */}
                <li><Link to="/register">Register</Link></li> {/* Optional, can remove if not using registration */}
                <li><Link to="/dashboard">Dashboard</Link></li> {/* Adjust based on actual content */}
                <li><Link to="/my-plants">My Plants</Link></li> {/* Adjust based on actual content */}
                <li><Link to="/guides">Plant Care Guides</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/profile">Profile</Link></li> {/* Optional, can remove if not using profiles */}
                <li><Link to="/logout">Logout</Link></li> {/* Optional, can remove if not using logout */}
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
