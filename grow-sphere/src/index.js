import React from "react";
// Import createRoot from react-dom/client for more efficient and improved tree management in React 18+.
import { createRoot } from "react-dom/client";
// Import BrowserRouter, which uses the HTML5 history API to keep your UI in sync with the URL.
import { BrowserRouter } from "react-router-dom";

// Import the main App component, which is the root of your React application.
import App from "./App";
// Import the serviceWorker module to handle service worker registration and configuration.
import * as serviceWorker from "./serviceWorker";

// Get the DOM element with the id 'root', which is the mounting point for the React application.
const container = document.getElementById("root");
// Create a root element using React 18's createRoot API for better concurrency and rendering features.
const root = createRoot(container);

// Render the React application wrapped in BrowserRouter, enabling routing throughout the app.
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// Call the unregister method from serviceWorker to remove any previously installed service workers.
// This is useful in development to ensure fresh updates are served without caching issues.
serviceWorker.unregister();
