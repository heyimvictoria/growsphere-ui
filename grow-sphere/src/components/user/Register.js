import React, { useState } from 'react';


const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '', // Optional: for confirming password
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, implement your registration logic, e.g., call to an API
        console.log('Registration data:', formData);
    };

    return (
        <div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
