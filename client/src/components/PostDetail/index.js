import React, { Component } from "react";
import io from "socket.io-client";
import Prism from "prismjs";
import PostComment from "../PostComment";
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
    this.loadPost().then(this.loadComments());
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentWillUnmount() {
    this.socket.disconnect(true);
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
          // data.content = Prism.highlight(atob(data.content), Prism.languages.javascript, 'javascript');
          data.content = atob(data.content);
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
    this.socket = io.connect({
      query: {
        postKey: this.state.postKey,
        userKey: this.props.user._id
      },
      rejectUnauthorized: false
    });
    this.socket.on('connection', (socket) => { this.setState({ commentsAreRealtime: true }); });
    this.socket.on('disconnect', (socket) => { this.setState({ commentsAreRealtime: false }); });
    this.socket.on('existingComments', (comments) => { this.setState({ postComments: JSON.parse(comments) }); });
    this.socket.on('newComment', (commentData) => {
      this.handleInboundNewComment(JSON.parse(commentData));
    });
  }

  handleInboundNewComment = (commentData) => {
    if (this.state.postHasLoaded) {
      if (this.state.postComments.length > 0) {
        // append this comment to the existing array
        this.setState((existingState) => ({
          postComments: [...existingState.postComments, commentData[0]]
        }));
      } else {
        // this new comment is the first one, so set the array to it
        this.setState({
          postComments: [commentData]
        });
      }
    }
  }

  postNewComment = () => {
    let commentData = {
      content: this.state.commentDraft
    };
    if (this.state.userHighlightStart && this.state.userHighlightEnd) {
      commentData.highlightStart = this.state.userHighlightStart;
      commentData.highlightEnd = this.state.userHighlightEnd;
    }
    this.socket.emit('newCommentRequest', commentData);
  }

  handleCommentDraftChange = (event) => { this.setState({ commentDraft: event.target.value }); }

  renderCommentCompositionBox() {
    if (this.props.user) {
      return (
        <div className="commentComposition">
          <input type="text" onChange={this.handleCommentDraftChange} />
          <span className="btn-rounded" onClick={this.postNewComment} >Publish comment</span>
        </div>
      );
    } else {
      return (<span>Sign in to post a new comment.</span>);
    }
  }

  renderComments() {
    if (this.state.postComments) {
      return this.state.postComments.map(comment => (
        <PostComment commentData={comment} key={comment._id} />
      ));
    } else {
      return (<span>This post has no comments.</span>);
    }
  }

  render() {
    return (
      <div>
        <div className="postHeader">
          <span className="postAuthor">
            <span className="marginLabel">Author</span>
            {this.state.postDetails.author ? (this.state.postDetails.author.social ? this.state.postDetails.author.social.github.username : this.state.postDetails.author.local.username) : ''}
          </span><br/>
          <span className="postTitle">
            <span className="marginLabel">Title</span>
            {this.state.postDetails.title}
          </span><br/>
          <span className="postDescription">
            <span className="marginLabel">Description</span>
            {this.state.postDetails.description}
          </span><br/>
          <span className="marginLabel">JavaScript Code</span>
        </div>
        <div className="postContent">
          <pre className="postCode">
            <code className="language-javascript">{this.state.postDetails.content}</code>
          </pre>
          <div className="postComments">
            <span className="marginLabel">Comments</span>
            {this.renderCommentCompositionBox()}
            <div className="commentsReverser">
              {this.renderComments()}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default PostDetail;
