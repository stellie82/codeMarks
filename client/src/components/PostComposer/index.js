import React, { Component } from "react";
import io from "socket.io-client";

class PostComposer extends Component {

  state = {
    postDetails: {},
    postComments: [],
    postHasLoaded: false,
    commentsAreRealtime: false,
    userHighlightStart: -1,
    userHighlightEnd: -1
  };

  constructor(props) {
    super(props);
    this.socket = null;
    this.paramsQuery = null;
  }

  componentDidMount() {

  }

  publishPost() {
    // TODO: call "publishPost" express route here, then using the returned postKey, call:
    // this.props.history.push('/viewpost?key=KEY_HERE')
  }

  render() {
    return (
      <div>
        {this.state.postKey} <br/>
        {'Date: ' + this.state.postDetails.date} <br/>
        {'Author: ' + this.state.postDetails.author} <br/>
        {'Title: ' + this.state.postDetails.title} <br/>
        {'Description: ' + this.state.postDetails.description} <br/>
        {'Votes: ' + this.state.postDetails.votes} <br/>
        {'Content: ' + this.state.postDetails.content} <br/>
        // TODO: render the code container on the left, with title-desc-author above
        // TODO: render the comments on the right, with realtime status above and text input for new comments below
      </div>
    );
  }

}

export default PostComposer;
