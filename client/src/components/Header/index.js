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
          <span className={`markOption popularMarks ${this.props.displayOptions ? (this.props.displayOptions.popular ? 'selected' : '') : ''}`} onClick={this.props.handleViewPopularPosts}>Popular marks</span>
          <span className={`markOption recentMarks ${this.props.displayOptions ? (this.props.displayOptions.recent ? 'selected' : '') : ''}`} onClick={this.props.handleViewRecentPosts}>Recent marks</span>
          { this.props.authenticated ? <span to="/mine" className={`markOption myMarks ${this.props.displayOptions ? (this.props.displayOptions.mine ? 'selected' : '') : ''}`} onClick={this.handleViewMyPosts}>My marks</span> : '' }
          { this.props.authenticated ? <Link to="/newpost" className="markOption newMark">New mark</Link> : '' }
        </div>
        {this.props.authenticated ?
          (<span className="authStatus">Welcome back, {this.props.user.social.github.username}.
              <a className="red rounded-btn icon-btn-before signOut" href="http://localhost:3001/auth/logout">Sign out</a>
           </span>)
            :
          (<span className="authStatus"></span>)
        }
      </div>
    );
  }

}

export default Header;
