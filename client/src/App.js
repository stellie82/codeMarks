import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import Hero from "./components/Hero";

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
<<<<<<< HEAD
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <span>codemarks</span>
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
=======
          <Route exact path="/" render={(props) => (
            <div>
              <span>codemarks</span>
              <Hero {...props} />
            </div>
          )} />
          <Route path="/login/local" render={(props) => (
            <div>
              <span>login form here</span>
            </div>
          )} />
          <Route path="/viewpost">
            <PostDetail />
          </Route>
          <Route path="/newpost">
            <span>post composer</span>
          </Route>
          <Route path="/profile">
            <span>user profile</span>
          </Route>
>>>>>>> 09f54e2d2903091fa7b6c3234c20fd7477bcce01
        </Switch>
      </Router>
    );
  }
}

export default App;
