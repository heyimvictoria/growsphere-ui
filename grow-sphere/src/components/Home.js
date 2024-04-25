import React, { Component } from "react";
import coverPhoto from '../assets/Growspherecoverphoto.jpeg';
import UserService from "../services/UserService";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            introText: "Welcome to GrowSphere - Your go-to resource for all things plant care.",
            additionalInfo: "Here at GrowSphere, we provide you with all the tools you need to nurture and grow your garden. Discover our features, read through user testimonials, and stay updated with the latest in plant care."
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({ content: response.data });
            },
            error => {
                this.setState({
                    content: (error.response && error.response.data) || error.message || error.toString()
                });
            }
        );
    }

    render() {
        const { content, introText, additionalInfo } = this.state;
        return (
            <div>
                <section id="cover">
                    <img src={coverPhoto} alt="Cover" className="cover-photo" />
                </section>
                <header className="jumbotron">
                    <h3>{content}</h3>
                    <p>{introText}</p>
                </header>
                <section className="additional-info">
                    <p>{additionalInfo}</p>
                </section>
            </div>
        );
    }
}
