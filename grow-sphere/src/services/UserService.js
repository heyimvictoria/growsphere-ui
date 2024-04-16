// Import the axios library for making HTTP requests
import axios from 'axios';
// Import a utility function to retrieve the authorization header (e.g., JWT token)
import authHeader from './AuthHeader';

// Base URL for all API requests
const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    // Method to retrieve public content accessible without authentication
    getPublicContent() {
        // Axios GET request to 'http://localhost:8080/api/test/all'
        return axios.get(API_URL + 'all');
    }

    // Method to retrieve data meant for logged-in users
    getUserBoard() {
        // Axios GET request to 'http://localhost:8080/api/test/user' with authorization headers
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    // Method to retrieve data meant for moderators
    getModeratorBoard() {
        // Axios GET request to 'http://localhost:8080/api/test/mod' with authorization headers
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    // Method to retrieve data meant for administrators
    getAdminBoard() {
        // Axios GET request to 'http://localhost:8080/api/test/admin' with authorization headers
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

// Export an instance of UserService so it can be imported and used in other parts of the application
export default new UserService();
