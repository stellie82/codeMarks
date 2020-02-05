import React from "react";
import { Router, Route, Switch } from "react-router";
import PostDetail from "./components/PostDetail"

class App extends Component {

  state = {
    user: false,
  };

  componentDidMount() {
    checkAuthState();
  }

  function checkAuthState() {
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

  function App() {
    return (
      <Router>
        <span>CODEMARKS</span>
        <Switch>
          <Route exact path="/">
            // TODO: add github login button
            <span>tag manager, card block</span>
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
