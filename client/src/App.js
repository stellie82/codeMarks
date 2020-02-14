import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PostDetail from "./components/PostDetail";
import PostComposer from "./components/PostComposer";
import UserProfile from "./components/UserProfile";
import PreviewCard from "./components/PreviewCard";
import "./style.css";

class App extends Component {

  state = {
    user: false,
    authenticated: false,
    postPreviewData: []
  };

  handleViewPopularPosts = () => {
    fetch("http://localhost:3001/api/posts", {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true }
    }).then(response => {
      return response.json();
    }).then(data => this.setState({ postPreviewData: data }));
  }

  componentDidMount() {
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
        if (response.status === 200) { return response.json(); }
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({ authenticated: true, user: responseJson.user });
      })
      .catch(error => {
        this.setState({ authenticated: false, error: "Failed to authenticate user" });
      })
      .finally(this.handleViewPopularPosts());
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

  renderPreviewCards() {
    return this.state.postPreviewData.map((postPreview) => <PreviewCard previewData={postPreview} />);
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
              <div className="container">
                <Header authenticated={this.state.authenticated}
                        user={this.state.user}
                        handleViewPopularPosts={this.handleViewPopularPosts}
                        />
                <div className="pageContent">
                  { this.state.authenticated ? '' : <Hero user={this.state.user} /> }
                  <div className="cardBlock">
                    {this.renderPreviewCards()}
                  </div>
                </div>
              </div>
            )}
          />

          <Route
            exact
            path="/login/local"
            render={props => <div>Login form here</div>}
          />

          <Route
            path="/viewpost/:postKey"
            render={props => (
              <div className="container">
                <Header authenticated={this.state.authenticated}
                        user={this.state.user}
                        handleViewPopularPosts={this.handleViewPopularPosts}
                        />
                <div className="pageContent">
                  <PostDetail {...props} />
                </div>
              </div>
            )}
          />

          <Route
            path="/newpost"
            render={props => (
              <div className="container">
                <Header authenticated={this.state.authenticated} user={this.state.user} />
                <div className="pageContent">
                  <PostComposer user={this.state.user} />
                </div>
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
