import React, { Component } from "react";
import io from "socket.io-client";

class PostDetail extends Component {

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
    this.paramsQuery = this.useQuery();
    this.setState({ postKey: this.paramsQuery.get('key') });
    this.loadPost().then(this.loadComments());
  }

  useQuery() {
    return new URLSearchParams(this.useLocation().search);
  }

  loadPost() {
    return new Promise((resolve, reject) => {
      if (this.state.postKey) {
        // TODO: replace "apiCall" below with the fetch request
        // apiCall.then(postData => {
        //   this.setState({
        //     postDetails: postData,
        //     postHasLoaded: true
        //   });
        //   resolve();
        // }).catch(error => reject(error));
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

export default PostDetail;
