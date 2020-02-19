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
    let displayOptionsState = {
      popular: this.props.match && (this.props.match.path === '/popular'),
      recent: this.props.match && (this.props.match.path === '/recent'),
      mine: this.props.match && (this.props.match.path === '/mine'),
      newpost: this.props.match && (this.props.match.path === '/newpost')
    };
    return (
      <div className="header">
        <Link to="/" className="title">codemarks</Link>
        <div className="btn-row markOptions">
          <Link to="/popular" className={`markOption popularMarks ${displayOptionsState.popular ? 'selected' : ''}`} >Popular marks</Link>
          <Link to="/recent" className={`markOption recentMarks ${displayOptionsState.recent ? 'selected' : ''}`} >Recent marks</Link>
          { this.props.authenticated ? <Link to="/mine" className={`markOption myMarks ${displayOptionsState.mine ? 'selected' : ''}`} >My marks</Link> : '' }
          { this.props.authenticated ? <Link to="/newpost" className={`markOption newMark ${displayOptionsState.newpost ? 'selected' : ''}`}>New mark</Link> : '' }
        </div>
        {this.props.authenticated ?
          (<span className="authStatus">Welcome back, {this.props.user.social ? this.props.user.social.github.username : this.props.user.local.username}.
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
