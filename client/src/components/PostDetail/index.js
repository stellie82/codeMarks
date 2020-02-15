import React, { Component } from "react";
import io from "socket.io-client";
import Prism from "prismjs";
import "./prism.css";
import "./style.css";
import "./prism-dark.css";

class PostDetail extends Component {

  state = {
    postKey: this.props.match.params.postKey,
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
  }

  componentDidMount() {
    this.loadPost(); //.then(this.loadComments());
  }

  loadPost() {
    return new Promise((resolve, reject) => {
      if (this.state.postKey) {
        let queryString = 'http://localhost:3001/api/posts/' + this.state.postKey;
        let queryOptions = {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true }
        };
        fetch(queryString, queryOptions).then(response => {
          return response.json()
        }).then(data => {
          data.content = Prism.highlight(atob(data.content), Prism.languages.javascript, 'javascript');
          this.setState({
            postDetails: data,
            postHasLoaded: true
          })
        });
      } else {
        reject('A valid post ID was not provided.');
      }
    });
  }

  loadComments() {
    this.socket = io.connect({ query: { postKey: this.state.postKey } });
    this.socket.on('connection', (socket) => { this.setState({ commentsAreRealtime: true }); });
    this.socket.on('disconnect', (socket) => { this.setState({ commentsAreRealtime: false }); });
    this.socket.on('existingComments', (comments) => { this.setState({ postComments: comments }); });
    this.socket.on('newComment', this.handleInboundNewComment);
  }

  handleInboundNewComment(commentData) {
    if (this.state.postHasLoaded) {
      if (this.state.postComments.length > 0) {
        // append this comment to the existing array
        this.setState((existingState) => ({
          postComments: [...existingState.postComments, commentData]
        }));
      } else {
        // this new comment is the first one, so set the array to it
        this.setState({
          postComments: [commentData]
        });
      }
    }
  }

  postNewComment(commentText) {
    // TODO: this function should be called by the "submit" button after the user has typed in a new comment
    let commentData = {
      author: this.props.authUser.id,
      text: commentText
    };
    if (this.state.userHighlightStart && this.state.userHighlightEnd) {
      commentData.highlightStart = this.state.userHighlightStart;
      commentData.highlightEnd = this.state.userHighlightEnd;
    }
    this.socket.emit('newCommentRequest', commentData);
  }

  render() {
    return (
      <div>
        <div className="postHeader">
          <span className="postAuthor">Author<br/>{this.state.postDetails.author}</span><br/>
          <span className="postTitle">Title<br/>{this.state.postDetails.title}</span><br/>
          <span className="postDescription">Description<br/>{this.state.postDetails.description}</span><br/>
          <pre>
            <code className="language-javascript" dangerouslySetInnerHTML={{ __html: this.state.postDetails.content }} ></code>
          </pre>
        </div>
        {/*
        {JSON.stringify(this.state.postDetails)}
        // TODO: render the code container on the left, with title-desc-author above
        // TODO: render the comments on the right, with realtime status above and text input for new comments below
        */}
      </div>
    );
  }

}

export default PostDetail;
