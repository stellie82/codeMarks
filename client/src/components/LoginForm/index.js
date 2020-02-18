import React, { Component } from "react";
import Axios from "axios";
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
        this.dismissError = this.dismissError.bind(this);
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

        let queryString = "http://localhost:3001/auth/login";
        let userData = { username: this.state.username, password: this.state.password };
        let queryOptions = {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "localhost:3001"
            },
            body: userData
        };

        fetch(queryString, queryOptions)
            .then(response => {
                console.log(response);
            })
    }


    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

    render() {

        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
                    }
                   <label>User Name</label>
                    <input type="text" data-test="username" value={this.state.username} onChange={this.handleChange} />

                    <label>Password</label>
                    <input type="password" data-test="password" value={this.state.password} onChange={this.handleChange} />

                    <input type="submit" value="Log In" data-test="submit" />

                    <Link to="/login/signup">No account yet! Create One</Link>

                    
                </form>
            </div>
        );
    }
}


export default LoginForm;