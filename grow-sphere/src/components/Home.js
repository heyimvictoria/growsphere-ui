import React, { Component } from "react";
import coverPhoto from '../assets/Growspherecoverphoto.jpeg';
import UserService from "../services/UserService";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
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
        return (
            <div>
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
