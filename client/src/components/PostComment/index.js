import React, { Component } from "react";
import "./style.css";

class PostComment extends Component {
  // TODO: add the mouseenter and mouseleave event hander to pass the "code highlight" events up to the parent PostDetail component

  state = {};

  componentDidMount() {}

  render() {
    console.log(this.props.commentData);
    return (
      this.props.commentData.author ?
        (<div className="commentBox">
          <div className="avatar" style={{
            backgroundImage: (this.props.commentData.author.social ? ("url('" + this.props.commentData.author.social.github.photo + "')") : '')}}></div>
          <span className="commentAuthor">{this.props.commentData.author.social ? this.props.commentData.author.social.github.username : this.props.commentData.author.local.username}</span>
          {this.props.commentData.content}
        </div>)
      :
        ''
    );
  }
}

export default PostComment;
