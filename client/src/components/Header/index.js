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
          <span className="rounded-btn icon-btn-before popularMarks" onClick={this.props.handleViewPopularPosts}>Popular marks</span>
          <span className="rounded-btn icon-btn-before recentMarks" onClick={this.handleViewRecentPosts}>Recent marks</span>
          { this.props.authenticated ? <span to="/mine" className="skyblue rounded-btn icon-btn-before myMarks" onClick={this.handleViewMyPosts}>My marks</span> : '' }
          { this.props.authenticated ? <Link to="/newpost" className="lime rounded-btn icon-btn-before newMark">New mark</Link> : '' }
        </div>
        {this.props.authenticated ?
          (<span className="authStatus">Welcome back, {this.props.user.local.username}.
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
