import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For Bootstrap JavaScript functionality, including tooltips


const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
