import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validateInput = (name, value) => {
        let error = '';
        if (name === 'email') {
            const emailRegex = /\S+@\S+\.\S+/;
            if (!value) {
                error = 'Email is required';
            } else if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            }
        } else if (name === 'password') {
            if (!value) {
                error = 'Password is required';
            } else if (value.length < 8) {
                error = 'Password must be at least 8 characters long';
            }
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateInput(name, value);
        setErrors({ ...errors, [name]: error });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate all fields on submit
        const emailError = validateInput('email', formData.email);
        const passwordError = validateInput('password', formData.password);
        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return; // Stop the submission if there are errors
        }
        console.log('Login data:', formData);
        // Perform login here
    };

    return (
        <div className="userform-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                {errors.email && <p className="error">{errors.email}</p>}
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                {errors.password && <p className="error">{errors.password}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
