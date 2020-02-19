import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class PostComposer extends Component {

  state = {
    title: '',
    description: '',
    content: ''
  };

  constructor(props) {
    super(props);
    this.postTitleInput = React.createRef();
  }

  componentDidMount() {
    this.postTitleInput.current.focus();
  }

  handleTitleChange = (event) => { this.setState({ title: event.target.value }); }
  handleDescriptionChange = (event) => { this.setState({ description: event.target.value }); }
  handleContentChange = (event) => { this.setState({ content: event.target.value }); }

  tryPublishPost() {
    let postData = {
      author: this.props.user._id,
      title: this.state.title,
      description: this.state.description,
      content: btoa(this.state.content)
    }
    console.clear();
    console.log(postData);
    let queryString = "http://localhost:3001/api/posts";
    let queryOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "localhost:3001"
      },
      body: JSON.stringify(postData)
    };
    fetch(queryString, queryOptions)
      .then(response => {
        console.log(response);
      })
    // TODO: call "publishPost" express route here, then using the returned postKey, call:
    // this.props.history.push('/viewpost?key=KEY_HERE')
  }

  render() {
    return (
      <div className="compositionBox">
        <div className="formStyle postAuthorName">
          <span className="formStyleInput postAuthorName">{this.props.user.social ? this.props.user.social.github.username : this.props.user.local.username}</span>
        </div>
        <div className="formStyle postTitleBox">
          <input type="text" name="postTitleBox" className="formStyleInput postTitleBox" ref={this.postTitleInput}  onChange={this.handleTitleChange}></input>
        </div>
        <div className="formStyle descriptionBox">
          <textarea id="descriptionBox" name="descriptionBox" className="formStyleInput descriptionBox" onChange={this.handleDescriptionChange}></textarea>
        </div>
        <div className="formStyle codeBox">
          <textarea id="codeBox" name="codeBox" className="formStyleInput codeBox" onChange={this.handleContentChange}></textarea>
        </div>
        <div className="btn-row submitActions">
          <Link to="/" className="red rounded-btn icon-btn-before cancelPost">Cancel</Link>
          <span className="lime rounded-btn icon-btn-before publishPost" onClick={(e) => this.tryPublishPost(e)}>Publish your mark</span>
        </div>
      </div>
    );
  }

}

export default PostComposer;
