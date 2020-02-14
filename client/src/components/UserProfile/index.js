import React, { Component } from "react";

class UserProfile extends Component {
  // TODO: add the mouseenter and mouseleave event hander to pass the "code highlight" events up to the parent PostDetail component

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  Greeting(props) {
    const provider = this.props.user.provider;

    if (provider === "github") {
      return <h1>You are logged in with your Github account</h1>;
    } else if (provider === "local") {
      return <h1>You are logged in with your CODEMARKS account</h1>;
    }
  }

  render() {
    return <div>{this.Greeting()}</div>;
  }
}

export default UserProfile;
