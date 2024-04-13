/*import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/auth';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/register', userData);
        if (response && response.data) {
            return response.data;
        } else {
            throw new Error('Unexpected response from server');
        }
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : error.message || 'Network error';
        console.error("Registration error:", errorMessage);
        throw new Error(errorMessage);
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post('/login', credentials);
        if (response && response.data && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            setAuthToken(response.data.token);
            return response.data;
        } else {
            throw new Error('Unexpected response from server');
        }
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : error.message || 'Network error';
        console.error("Login error:", errorMessage);
        throw new Error(errorMessage);
    }
};

export const logoutUser = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
};

const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

const storedToken = localStorage.getItem('authToken');
if (storedToken) {
    setAuthToken(storedToken);
}

export default {
    registerUser,
    loginUser,
    logoutUser,
    setAuthToken,
};
*/