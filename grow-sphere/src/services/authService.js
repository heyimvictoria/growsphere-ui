import axios from 'axios';

// Assuming your API's base URL
const API_BASE_URL = 'http://yourapi.com/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Register a new user
export const register = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);
        // Optionally, handle the response, e.g., auto-login or store the user data
        return response.data;
    } catch (error) {
        // Handle errors, e.g., display messages from the server
        throw error.response.data;
    }
};

// Login user
export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        // Store the received token in localStorage or manage the login state
        localStorage.setItem('authToken', response.data.token);
        // Optionally, set the token header for subsequent requests
        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Logout user
export const logout = () => {
    // Remove the token from localStorage and reset the auth state
    localStorage.removeItem('authToken');
    // Optionally, reset the authorization header
    setAuthToken(null);
};

// Utility function to set the Authorization header
export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Automatically set token on page load if it exists
const storedToken = localStorage.getItem('authToken');
if (storedToken) {
    setAuthToken(storedToken);
}

export default {
    register,
    login,
    logout,
    setAuthToken,
};
