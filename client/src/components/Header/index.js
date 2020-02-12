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
        <Link to="/" className="title">codemarks</Link>
        <div className="btn-row markOptions">
          <Link to="/popular" className="rounded-btn icon-btn-before popularMarks">Popular marks</Link>
          <Link to="/recent" className="rounded-btn icon-btn-before recentMarks">Recent marks</Link>
          { this.props.authenticated ? <Link to="/mine" className="skyblue rounded-btn icon-btn-before myMarks">My marks</Link> : '' }
          { this.props.authenticated ? <Link to="/newpost" className="lime rounded-btn icon-btn-before newMark">New mark</Link> : '' }
        </div>
        {this.props.authenticated ?
          (<span className="authStatus">Welcome back, {this.props.user.social.github.username}.
              <a className="red rounded-btn icon-btn-after signOut" href="http://localhost:3001/auth/logout">Sign out</a>
           </span>)
            :
          (<span className="authStatus"></span>)
        }
      </div>
    );
  }

}

export default Header;
