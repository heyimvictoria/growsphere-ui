import React, { Component } from "react";
import coverPhoto from '../assets/Growspherecoverphoto.jpeg';


// Import UserService which is likely to contain API methods for fetching backend data.
import UserService from "../services/UserService";

// Define the Home component by extending Component from React.
export default class Home extends Component {
    constructor(props) {
        super(props); // Initialize the Component's properties by calling the parent's constructor.

        // Setting the initial state of the component with 'content' as an empty string.
        // This state will hold the data fetched from the backend or an error message.
        this.state = {
            content: ""
        };
    }

    // Lifecycle method that runs after the component is mounted to the DOM.
    componentDidMount() {
        // Fetch public content from the backend using a method from UserService.
        UserService.getPublicContent().then(
            response => {
                // Upon successful fetch, set the state 'content' with the data received from the backend.
                this.setState({
                    content: response.data
                });
            },
            error => {
                // If an error occurs during the fetch, set the state 'content' with the error details.
                this.setState({
                    content:
                    // Attempt to extract and set the detailed error message from the response,
                    // or use a more general error message if detailed message isn't available.
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    // Render method returns the JSX that describes what should be rendered on the screen.
    render() {
        return (
            <div>
                {/* Image added as a module import */}
                <section id="cover">
                <img src={coverPhoto} alt="Cover" className="cover-photo" />
                </section>
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}
