import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" }
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            this.setState({ redirect: "/home" });
        } else {
            this.setState({ currentUser: currentUser, userReady: true });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        const { currentUser } = this.state;

        return (
            <div className="container mt-5">
                {this.state.userReady ? (
                    <div className="card user-profile-card">
                        <div className="card-header">
                            <h3><strong>{currentUser.username}</strong>'s Profile</h3>
                        </div>
                        <div className="card-body">
                            {/*<p><strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}...{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</p>*/}
                            <p><strong>Token:</strong> {currentUser["accessToken"]}</p>
                            <p><strong>Id:</strong> {currentUser.id}</p>
                            <p><strong>Email:</strong> {currentUser.email}</p>
                            <div>
                                <strong>Authorities:</strong>
                                <ul>
                                    {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : <p>Loading...</p>}
            </div>
        );
    }
}
