import React, { useEffect } from "react";
import { withRouter } from "WithRouter";

// Helper function to decode a JWT token.
const parseJwt = (token) => {
    try {
        // Decodes the payload part of a JWT token from base64 and parses it into an object.
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        // If decoding or parsing fails, return null.
        return null;
    }
};

// A React component that checks if the user's authentication token has expired.
const AuthVerify = (props) => {
    // Access the current location from the router's props, used to re-trigger useEffect when the route changes.
    let location = props.router.location;

    useEffect(() => {
        // Retrieve the user object from localStorage.
        const user = JSON.parse(localStorage.getItem("user"));

        // If a user is stored in localStorage
        if (user) {
            // Decode the JWT access token.
            const decodedJwt = parseJwt(user.accessToken);

            // Check if the token expiration time has passed
            if (decodedJwt.exp * 1000 < Date.now()) {
                // Call the logOut function passed in props if the token has expired.
                props.logOut();
            }
        }
        // The effect depends on the location and will re-run if the location changes.
    }, [location]);

    // This component does not render anything visible.
    return <div></div>;
};

// Enhance the component to include routing context using withRouter HOC (Higher-Order Component).
export default withRouter(AuthVerify);
