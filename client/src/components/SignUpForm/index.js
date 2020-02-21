import keys from "../../keys_client.js";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class SignUpForm extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            confirmpassword: '',
            email: '',
            error: '',
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    handleConfirmPassChange(evt) {
        this.setState({
            confirmpassword: evt.target.value,
        });
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.email) {
            return this.setState({ error: 'Email is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        if (!this.state.confirmpassword) {
            return this.setState({ error: 'Confirm Password is required' });
        }

        if (this.state.confirmpassword !== this.state.password) {
            return this.setState({ error: 'Passwords are not matched' });
        }

        let queryString = keys.APP_DOMAIN+"/auth/signup";
        let queryOptions = {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": ["localhost:3001","codemarks.com"]
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        };

        fetch(queryString, queryOptions)
            .then(response => {
                window.location.replace("/login/local");
            })
    }


    render() {

        return (
            <div>
            <div className="signUpWrap">
                <h2 className="mainHeader">Register!</h2>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
                    }
                    <label className="fieldlabel">User Name</label>
                    <input className="fieldInput" type="text" data-test="username" name="username" value={this.state.username} onChange={this.handleChange} />

                    <label className="fieldlabel">Email</label>
                    <input className="fieldInput" type="email" data-test="email" name="email" value={this.state.email} onChange={this.handleChange} />

                    <label className="fieldlabel">Password</label>
                    <input className="fieldInput" type="password" data-test="password" name="pswd" value={this.state.password} onChange={this.handlePassChange} />

                    <label className="fieldlabel">Confirm Password</label>
                    <input className="fieldInput" type="password" data-test="confirmpassword" name="confirmpswd" value={this.state.confirmpassword} onChange={this.handleConfirmPassChange} />



                    <input className="submitButton" type="submit" value="SignUp" data-test="submit" />

                </form>
                </div>
                <div className="login-callout">
                    I already have an account  <Link to="/login/local" className="linkLogIn">Log me in!</Link>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
