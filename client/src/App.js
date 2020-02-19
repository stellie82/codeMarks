import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PostDetail from "./components/PostDetail";
import PostComposer from "./components/PostComposer";
import UserProfile from "./components/UserProfile";
import PreviewCard from "./components/PreviewCard";
import TagManager from "./components/TagManager";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import "./style.css";

class App extends Component {

  state = {
    user: false,
    authenticated: false,
    displayOptions: {
      popular: true,
      recent: false,
      mine: false
    },
    postPreviewData: [],
    hidePageContent: false
  };

  hidePageContent = () => {
    return new Promise((resolve, reject) => {
      this.setState({ hidePageContent: true });
      setTimeout(resolve, 200);
    });
  }
  showPageContent = () => {
    return new Promise((resolve, reject) => {
      this.setState({ hidePageContent: false });
      setTimeout(resolve, 200);
    });
  }

  handleViewRecentPosts = async () => {
    fetch("http://localhost:3001/api/posts/recent", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        postPreviewData: data,
        displayOptions: {
          popular: false, recent: true, mine: false
        }
      }))
      .finally(() => {
        // setTimeout(this.showPageContent, 200);
      });
  }

  handleViewPopularPosts = async () => {
    fetch("http://localhost:3001/api/posts/popular", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        postPreviewData: data,
        displayOptions: {
          popular: true, recent: false, mine: false
        }
      }))
      .finally(() => {
        // setTimeout(this.showPageContent, 200);
      });
  };

  handleViewMyPosts = async () => {
    fetch("http://localhost:3001/api/posts/mine", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        postPreviewData: data,
        displayOptions: {
          popular: false, recent: false, mine: true
        }
      }))
      .finally(() => {
        // setTimeout(this.showPageContent, 200);
      });
  };

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
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({ authenticated: true, user: responseJson.user });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
      // .finally(this.handleViewPopularPosts());
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
          case 200: return response.json();
          case 401: throw new Error(authFailureString);
          default: throw new Error(authAbnormalString);
        }
      })
      .then(userInfo => this.setState({ user: userInfo }))
      .catch(error => this.setState({ user: false }));
  }

  renderPreviewCards() {
    if (this.state.postPreviewData && this.state.postPreviewData.length > 0) {
      return this.state.postPreviewData.map(postPreview => (
        <PreviewCard previewData={postPreview} key={postPreview._id} />
      ));
    } else {
      return (<span>There aren't any posts to show here.</span>);
    }
  }

  _handleLogoutClick = () => {
    window.open("http://localhost:3001/auth/logout", "_self");
  };

  _handleSignInClick = () => {
    window.open("http://localhost:3001/auth/github", "_self");
  };

  render() {
    return (
      <Router>
        <Switch>

          <Route exact path="/" render={props => ( <Redirect to="/popular" /> )} />

          <Route
            exact
            path="/popular"
            render={props => (
              <div className="container">
                {this.handleViewPopularPosts() ? '' : ''}
                <Header
                  {...props}
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
                <div className={`pageContent ${this.state.hidePageContent ? 'hidden' : ''}`}>
                  <TagManager />
                  {this.state.authenticated ? '' : <Hero user={this.state.user} /> }
                  <div className="cardBlock">{this.renderPreviewCards()}</div>
                </div>
              </div>
            )}
          />

          <Route
            exact
            path="/recent"
            render={props => (
              <div className="container">
                {this.handleViewRecentPosts() ? '' : ''}
                <Header
                  {...props}
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
                <div className={`pageContent ${this.state.hidePageContent ? 'hidden' : ''}`}>
                  <TagManager />
                  {this.state.authenticated ? '' : <Hero user={this.state.user} /> }
                  <div className="cardBlock">{this.renderPreviewCards()}</div>
                </div>
              </div>
            )}
          />

          <Route
            exact
            path="/mine"
            render={props => (
              <div className="container">
                {this.handleViewMyPosts() ? '' : ''}
                <Header
                  {...props}
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
                <div className={`pageContent ${this.state.hidePageContent ? 'hidden' : ''}`}>
                  <TagManager />
                  {this.state.authenticated ? '' : <Hero user={this.state.user} /> }
                  <div className="cardBlock">{this.renderPreviewCards()}</div>
                </div>
              </div>
            )}
          />

          <Route
            exact
            path="/login/local"
            render={props => <div>Login form here</div>}
            render={props => (
              <div className="container">
                <Header
                  {...props}
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
                <div className="pageContent">
                  <LoginForm {...props} />
                </div>
              </div>
            )}
          />

          <Route
            exact
            path="/login/signup"
            render={props => (
              <div className="container">
                <Header
                  {...props}
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
                <div className="pageContent">
                  <SignUpForm {...props} />
                </div>
              </div>
            )}
          />

          <Route
            path="/viewpost/:postKey"
            render={props => (
              <div className="container">
                <Header
                  {...props}
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
                <div className="pageContent">
                  <PostDetail user={this.state.user} {...props} />
                </div>
              </div>
            )}
          />

          <Route
            path="/newpost"
            render={props => (
              <div className="container">
                <Header
                  {...props}
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
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
