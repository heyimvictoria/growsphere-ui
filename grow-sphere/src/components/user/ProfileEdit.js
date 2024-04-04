<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ProfileEdit() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [user, setUser] = useState({
        username: "",
        email: ""
    });

    const { username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, user);
        navigate('/');
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit User Profile</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Username
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Enter your username'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Email
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Enter your email'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
=======
import React, { useState, useEffect } from 'react';

const ProfileEdit = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Add other fields as per your user model
    });
    const [error, setError] = useState(''); // State to handle errors

    useEffect(() => {
        // Populate form with current user data if available
        if (currentUser) {
            setFormData({ name: currentUser.name, email: currentUser.email });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            // Submit updated profile data to backend
            console.log('Updating profile with data:', formData);
            // Placeholder for actual API call
            // const response = await api.updateUserProfile(formData);
            // Check response status and handle accordingly
            // if (response.status !== 200) throw new Error('Failed to update profile');

            // On successful update, you might want to redirect the user or show a success message
        } catch (error) {
            // Handle any errors that occur during the update
            setError(error.message || 'An error occurred while updating your profile.');
        }
    };

    // If currentUser is not provided or null, display a message or redirect
    if (!currentUser) {
        return <div>Please log in to edit your profile.</div>;
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            {error && <p className="error">{error}</p>} {/* Display error message if any */}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                {/* Include other fields as needed */}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
>>>>>>> 8fd289fdb4a150bc6ee45b928198a45b3c7b2931
