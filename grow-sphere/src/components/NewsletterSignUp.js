import React, { useState } from 'react';
import axios from 'axios';

function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/newsletter', { email });
            setMessage('Thank you for subscribing!');
            setEmail(''); // Reset the input after successful submission
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
            console.error('Subscription error:', error);
        }
    };

    return (
        <div>
            <h2>Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default NewsletterSignup;
