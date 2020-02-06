import React, { Component } from "react";
import { Link } from "react-router-dom";

class Hero extends Component {

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.props.user ? '' : <Link to="/login/github">Authenticate with GitHub</Link>}
      </div>
    );
    // return 'test';
    // return ({
    //     this.props.user ?
    //     '' : (
    //       <div>
    //         <a href="/login/github">Authenticate with GitHub</a>
    //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //         <Link to="/login/local"/>...alternatively, sign up with a username and password</Link>
    //       </div>
    //     )
    //   });
  }

}

export default Hero;
