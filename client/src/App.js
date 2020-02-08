import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Hero from "./components/Hero";
import PostDetail from "./components/PostDetail";
import PostComposer from "./components/PostComposer";
import UserProfile from "./components/UserProfile";

class App extends Component {
  state = {
    user: false
  };

  state = {
    user: {},
    authenticated: false
  };

  // componentDidMount() {
  //   this.checkAuthState();
  //   // ...
  // }

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:3001/auth/checkAuth", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log("response", response);
          return response.json();
        }
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });

      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
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
      .then(userInfo => this.setState({user: userInfo}))
      .catch(error => this.setState({user: false}));
  }

  _handleLogoutClick = () => {
    window.open("http://localhost:3001/auth/logout", "_self");
    //this.props.handleNotAuthenticated();
  };

  _handleSignInClick = () => {
    window.open("http://localhost:3001/auth/github", "_self");
  };

  render() {
    return (
      <Router>
        <Switch>

          <Route
            exact
            path="/"
            render={props => (
              // Patrick's code ==============================================
              // <div>
              //   <span>CODEMARKS</span>
              //   {props.user ? <Link to="/logout">Sign out</Link> : ''}
              //   <Hero {...props} />
              // </div>
              // =============================================================
              // <div>
              //   <span>CODEMARKS</span>
              //   {props.authenticated ? <button onClick={this._handleLogoutClick}>Sign out</button> : <Hero {...props} />}
              // </div>
              <ul>
                {this.state.authenticated ? (
                  <li onClick={this._handleLogoutClick}>User succesfully logged ! Want to Logout</li>
                ) : (
                    <li onClick={this._handleSignInClick}>LoginWithGitHubb</li>
                  )}
              </ul>
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
