import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            console.error("Passwords do not match.");
            return;
        }

        try {
            const { email, password } = formData;
            await register({ email, password });
            // Assuming your login function only needs email and password
            const loginResponse = await login({ email, password });
            console.log('Login successful:', loginResponse);
            // Redirect to dashboard upon successful login
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration or login failed:', error);
        }
    };

    return (
        <div className="userform-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </label>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
