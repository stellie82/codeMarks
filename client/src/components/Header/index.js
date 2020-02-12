import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css"

class Header extends Component {

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="header">
        {this.props.location}
        <Link to="/" className="title">codemarks</Link>
        {(this.props.user.social && !this.props.suppressCreateCodemark) ? <Link to="/newpost" className="createPost">createCodemark()</Link> : '' }
        {this.props.user.social ?
          (<span className="authStatus">Welcome back, {this.props.user.social.github.username}.&nbsp;&nbsp;<a href="http://localhost:3001/auth/logout">Sign out.</a></span>)
            :
          (<span className="authStatus"></span>)
        }
      </div>
    );
  }

}

export default Header;
