import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Hero from "./components/Hero";
import PostDetail from "./components/PostDetail";
import PostComposer from "./components/PostComposer";
import UserProfile from "./components/UserProfile";

class App extends Component {
  state = {
    user: false
  };

  componentDidMount() {
    this.checkAuthState();
    // ...
  }

  checkAuthState() {
    let authFailureString = "Unauthenticated.";
    let authAbnormalString = "Unexpected authentication state.";
    let queryString = "/checkAuthState";
    let queryOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    };
    fetch(queryString, queryOptions)
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
            break;
          case 401:
            throw new Error(authFailureString);
            break;
          default:
            throw new Error(authAbnormalString);
            break;
        }
      })
      .then(userInfo => this.setState({ user: userInfo }))
      .catch(error => this.setState({ user: false }));
  }

  render() {
    return (
      <Router>
        <Switch>

          <Route
            exact
            path="/"
            render={props => (
              <div>
                <span>CODEMARKS</span>
                {props.user ? <Link to="/logout">Sign out</Link> : ''}
                <Hero {...props} />
              </div>
            )}
          />

          <Route
            exact
            path="/login/local"
            render={props => <div>Login form here</div>}
          />

          <Route
            path="/viewpost"
            render={props => (
              <div>
                <PostDetail {...props} />
              </div>
            )}
          />

          <Route
            path="/newpost"
            render={props => (
              <div>
                <PostComposer {...props} />
              </div>
            )}
          />

          <Route
            path="/profile"
            render={props => (
              <div>
                <UserProfile {...props} />
              </div>
            )}
          />

        </Switch>
      </Router>
    );
  }
}

export default App;
