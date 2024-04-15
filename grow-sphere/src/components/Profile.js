import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService"; // Import the AuthService to handle authentication related functionalities.

// Define the Profile class component that extends the base Component class from React.
export default class Profile extends Component {
    constructor(props) {
        super(props);

        // Initialize state variables for this component.
        this.state = {
            redirect: null, // Will store the URL to redirect to if necessary.
            userReady: false, // Indicates if the user data is ready to be displayed.
            currentUser: { username: "" } // Initially, no user data is available.
        };
    }

    componentDidMount() {
        // Retrieve the current user's details from AuthService when the component mounts.
        const currentUser = AuthService.getCurrentUser();

        // If no current user data is found, set a redirect path to the home page.
        if (!currentUser) this.setState({ redirect: "/home" });

        // Update state with the current user's data and set userReady to true to indicate that the data is ready to be displayed.
        this.setState({ currentUser: currentUser, userReady: true });
    }

    render() {
        // Redirect the user if the 'redirect' state is set.
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        const { currentUser } = this.state; // Destructure currentUser from state for easier access.

        // Render the user profile information or a loading placeholder.
        return (
            <div className="container">
                {this.state.userReady ? (
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>{currentUser.username}</strong> Profile
                            </h3>
                        </header>
                        <p>
                            <strong>Token:</strong>{" "}
                            {/* Display the first and last 20 characters of the user's access token. */}
                            {currentUser.accessToken.substring(0, 20)} ...{" "}
                            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                        </p>
                        <p>
                            <strong>Id:</strong>{" "}
                            {currentUser.id} {/* Display the user's id. */}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {currentUser.email} {/* Display the user's email. */}
                        </p>
                        <strong>Authorities:</strong>
                        <ul>
                            {/* Map over the user's roles and display them as list items. */}
                            {currentUser.roles &&
                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}
