// Import the axios library for making HTTP requests
import axios from "axios";

// Define the base URL for authentication-related API endpoints
const API_URL = "http://localhost:8080/api/auth/";

// Define a class AuthService to handle authentication tasks
class AuthService {
    // Method to handle user login
    login(username, password) {
        // Make a POST request to the 'signin' endpoint with username and password
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                // If the response includes an accessToken, store it in local storage
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                // Return the response data which includes the user details and accessToken
                return response.data;
            });
    }

    // Method to log out the current user
    logout() {
        // Remove the 'user' item from local storage, effectively ending the session
        localStorage.removeItem("user");
    }

    // Method to handle user registration
    register(username, email, password) {
        // Make a POST request to the 'signup' endpoint with username, email, and password
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    // Method to get the currently logged in user's data from local storage
    getCurrentUser() {
        // Retrieve the 'user' item from local storage and parse it from JSON format to an object
        return JSON.parse(localStorage.getItem('user'));
    }
}

// Export an instance of AuthService, ensuring that it can be imported and used in other files
export default new AuthService();
