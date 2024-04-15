import React, { Component } from "react";

// Import the UserService to make HTTP requests related to user operations.
import UserService from "../services/UserService";
// Import EventBus to handle global event broadcasting and listening.
import EventBus from "../common/EventBus";

// Define the BoardAdmin component by extending React's Component class.
export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        // Initialize component state with a content property.
        this.state = {
            content: ""
        };
    }

    // componentDidMount is a lifecycle method that runs after the component output has been rendered to the DOM.
    componentDidMount() {
        // Call getAdminBoard method from UserService to fetch admin-specific data.
        UserService.getAdminBoard().then(
            response => {
                // If the request succeeds, update the state with the data received from the server.
                this.setState({
                    content: response.data
                });
            },
            error => {
                // If the request fails, update the state with an error message.
                this.setState({
                    content:
                    // Check if the error response exists and has a message, otherwise use the error's message or convert it to a string.
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                // If the error status is 401 (Unauthorized), dispatch a logout event using EventBus.
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    // Render method to output JSX for the component.
    render() {
        // Return a div with a header and a heading that displays the content state.
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}
