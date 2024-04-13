// grow-sphere\src\components\user\ProfileEdit.js

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
