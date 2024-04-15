import React, { Component } from "react";

// Import UserService for API calls related to user roles and permissions.
import UserService from "../services/UserService";
// Import EventBus to facilitate communication between components that are not directly connected.
import EventBus from "../common/EventBus";

// Define the BoardModerator component by extending React's Component class.
export default class BoardModerator extends Component {
    constructor(props) {
        super(props);

        // Initialize the component state with a content property to store data.
        this.state = {
            content: ""
        };
    }

    // componentDidMount is a lifecycle method executed after the component mounts (i.e., after the first render).
    componentDidMount() {
        // Call getModeratorBoard from UserService to fetch data specific to moderators.
        UserService.getModeratorBoard().then(
            response => {
                // If the request is successful, set the content state to the data received.
                this.setState({
                    content: response.data
                });
            },
            error => {
                // Handle errors by setting the state to an appropriate error message.
                this.setState({
                    content:
                    // Extract the error message from the response, or use the error's message, or convert the error object to a string if no specific message is available.
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                // If the error status code is 401 (Unauthorized), dispatch a 'logout' event.
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    // Render method to output JSX for the component.
    render() {
        // The content of the component is wrapped in a div with a class of 'container', and displayed inside a header.
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}
