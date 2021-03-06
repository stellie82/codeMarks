import keys from "../../keys_client.js";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";


class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
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

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        let queryString = keys.APP_DOMAIN+"/auth/login";

        let queryOptions = {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": ["localhost:3001","codemarks.com"]
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        };

        fetch(queryString, queryOptions)
            .then(response => {
                console.log(response);
                let queryString = keys.APP_DOMAIN+"/auth/user_data";

                let queryOptions = {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": "localhost:3001"
                    },

                };
                fetch(queryString, queryOptions)
                    .then(response => {
                        window.location.replace(keys.CLIENT_HOME_PAGE_URL);
                    }).catch(this.setState({ error: response.error }));

            })

    }




    render() {

        return (
            <div>
                <div className="loginWrap">
                    <h2 className="mainHeader">Login!</h2>
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

                        <label className="fieldlabel">Password</label>
                        <input className="fieldInput" type="password" data-test="password" name="pswd" value={this.state.password} onChange={this.handlePassChange} />


                        <input className="submitButton" type="submit" value="Log In" data-test="submit" />


                    </form>
                </div>
                <Link to="/user" id="forgot-password-link">Forgot Password?</Link>

                <div className="signup-callout">
                    Need an account?  <Link to="/login/signup" className="linksignUp">Sign up now!</Link>
                </div>
            </div>
        );
    }
}

export default LoginForm;
