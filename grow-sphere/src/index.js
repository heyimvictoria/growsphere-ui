<<<<<<< HEAD
// grow-sphere\src\index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Make sure the path is correct

=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

>>>>>>> db3659be24668061577ead93cadaf627c3977cc7
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
