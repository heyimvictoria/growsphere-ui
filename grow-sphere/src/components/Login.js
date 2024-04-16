import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// AuthService for handling login logic.
import AuthService from "../services/AuthService";

// withRouter HOC to access the router props.
import { withRouter } from '../common/WithRouter';

// Validation rule for required fields.
const required = value => {
    if (!value) {
        // Display an alert if the field is empty.
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

// Login component class definition.
class Login extends Component {
    constructor(props) {
        super(props);
        // Binding methods to provide context to 'this'.
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        // Initializing state for the component.
        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    // Handler for username input changes.
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Handler for password input changes.
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    // Function to handle login when the form is submitted.
    handleLogin(e) {
        e.preventDefault();

        // Set loading true to disable the button and clear previous messages.
        this.setState({
            message: "",
            loading: true
        });

        // Trigger form validation.
        this.form.validateAll();

        // Check if there are no validation errors.
        if (this.checkBtn.context._errors.length === 0) {
            // Call the login method from AuthService.
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    // Navigate to profile page and reload the page.
                    this.props.router.navigate("/profile");
                    window.location.reload();
                },
                error => {
                    // Handle errors and display them.
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            // If there are validation errors, stop the loading spinner.
            this.setState({
                loading: false
            });
        }
    }

    // Render method to display the component.
    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">

                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c; // Assign form ref to access in the class.
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]} // Add required validation to the input.
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-secondary btn-block"
                                disabled={this.state.loading} // Disable button during loading.
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span> // Show loading spinner.
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message} // Display any login error messages here.
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }} // This button is used for form validation.
                            ref={c => {
                                this.checkBtn = c; // Assign checkButton ref to access in the class.
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

// Wrap the component with withRouter to inject router props.
export default withRouter(Login);
