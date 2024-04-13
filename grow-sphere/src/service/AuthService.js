// grow-sphere\src\service\AuthService.js

import api from '../utility/api'; // Import the centralized Axios instance

const register = (username, email, password) => {
    return api.post('/auth/register', {
        username,
        email,
        password
    });
};

const login = (username, password) => {
    return api.post('/auth/login', {
        username,
        password
    }).then(response => response.data);
};

const logout = () => {
    return Promise.resolve();
};

export default {
    register,
    login,
    logout
};
