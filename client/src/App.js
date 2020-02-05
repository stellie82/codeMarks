import React from "react";
import { Router, Route, Switch } from "react-router";
import PostDetail from "./components/PostDetail"

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

export default App;
