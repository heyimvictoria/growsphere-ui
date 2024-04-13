// grow-sphere\src\components/Register.js

import React, { useState } from 'react';
import AuthService from '../service/AuthService';

const RegisterComponent = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.register(username, email, password);
            console.log("Registration successful", response.data);
            // Redirect or manage registration success
        } catch (error) {
            setErrorMessage("Registration failed.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default RegisterComponent;
