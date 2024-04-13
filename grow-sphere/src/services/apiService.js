import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://yourapi.com/api',
    headers: {
        'Content-Type': 'application/json',
        // The Authorization header will be set with an interceptor or within specific calls
    },
});

export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        // Set token right after a successful login and before returning response data
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data : 'Network error';
        throw errorMessage;
    }
};

// Function to handle registration
export const register = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data : 'Network error';
        throw errorMessage;
    }
};

// Optionally, you can set up an interceptor for attaching the token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    login,
    register,
};
