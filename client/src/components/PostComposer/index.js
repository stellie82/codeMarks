import React, { Component } from "react";
import io from "socket.io-client";
import "./style.css";

class PostComposer extends Component {

  state = { };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  publishPost() {
    // TODO: call "publishPost" express route here, then using the returned postKey, call:
    // this.props.history.push('/viewpost?key=KEY_HERE')
  }

  render() {
    return (
      <div className="compositionBox">
        Author: <span className="postAutherName">{this.props.user.social ? this.props.user.social.github.username : ''}</span>
        Title: <input type="text" name="postDescriptionInput"></input>
        Description: <textarea id="descriptionBox" name="descriptionBox" className="descriptionBox"></textarea>
        Content: <textarea id="codeBox" name="codeBox" className="codeBox"></textarea>
        <input type="submit" value="Publish" />
      </div>
    );
  }

}

export default PostComposer;
