import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import PostDetail from "./components/PostDetail"
import Hero from "./components/Hero"

class App extends Component {

  state = {
    user: false,
  };

  componentDidMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    let authFailureString = 'Unauthenticated.';
    let authAbnormalString = 'Unexpected authentication state.';
    let queryString = '/checkAuthState';
    let queryOptions = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": true
      }
    };
    fetch(queryString, queryOptions)
      .then(response => {
        switch (response.status) {
          case 200: return response.json(); break;
          case 401: throw new Error(authFailureString); break;
          default: throw new Error(authAbnormalString); break;
        }
      })
      .then(userInfo => this.setState({ user: userInfo }) )
      .catch(error => this.setState({ user: false }) );
  }

  render() {
    return (
      <Router>
        <Switch>
          <span>CODEMARKS</span>
          <span>{JSON.stringify(this.state.user)}</span>
          <Route exact path="/">
            <Hero user={this.state.user} />
            <span>tag manager, card block</span>
          </Route>
          <Route exact path="/login/local">
            <span>username: [input here]</span> <br/>
            <span>password: [input here]</span> <br/>
            <span>password: [input here]</span>
          </Route>
          <Route path="/viewpost">
            <PostDetail />
          </Route>
          <Route path="/newpost">
            <span>post composer</span>
          </Route>
          <Route path="/profile">
            <span>user profile</span>
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
