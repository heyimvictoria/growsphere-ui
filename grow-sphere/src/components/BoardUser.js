import React, { Component } from "react";

// Import UserService, which likely contains API calls to fetch user-specific data.
import UserService from "../services/UserService";
// Import EventBus, a utility to handle cross-component communication via events.
import EventBus from "../common/EventBus";

// Define a BoardUser class that extends Component, making it a React component.
export default class BoardUser extends Component {
    constructor(props) {
        super(props);  // Call the parent class's constructor with props.

        // Initialize state with content as an empty string. This state will hold data fetched from an API.
        this.state = {
            content: ""
        };
    }

    // The componentDidMount lifecycle method is called after the component is mounted on the DOM.
    componentDidMount() {
        // Fetch data intended for a regular user via UserService.
        UserService.getUserBoard().then(
            response => {
                // If the request is successful, update the state with the received data.
                this.setState({
                    content: response.data
                });
            },
            error => {
                // If there's an error, set the content state to an error message.
                this.setState({
                    content:
                    // Ternary operator to check and extract the error message from the response or fallback to other error details.
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                // If the error status code is 401 (Unauthorized), dispatch a logout event using EventBus.
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    // The render method returns the JSX that describes the component's UI.
    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    // Display the content stored in the state. This could be user-specific data or an error message.
                    <h3>{this.state.content}</h3>
                    
                </header>
            </div>
        );
    }
}
