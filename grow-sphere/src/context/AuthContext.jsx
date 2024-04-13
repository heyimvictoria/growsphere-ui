// Create an AuthContext
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    const login = (token) => {
        setAuthToken(token);
        // Optionally set the token for your Axios instance here
    };

    const logout = () => {
        setAuthToken(null);
        // Clear token from Axios headers if set
    };

    const value = {
        authToken,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
