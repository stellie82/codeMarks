import React, { Component } from "react";
import "./style.css";

class TagManager extends Component {
  // TODO: add the mouseenter and mouseleave event hander to pass the "code highlight" events up to the parent PostDetail component

  state = {
    tagData: []
  };

  componentDidMount() {
    this.loadTags();
  }

  renderTagList() {
    return this.state.tagData.map(tag => <span>{tag.name}</span>);
  }

  loadTags = () => {
    fetch("http://localhost:3001/api/tags", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ tagData: data });
      });
  };

  render() {
    return <div className="tagList">{this.renderTagList()}</div>;
  }
}

export default TagManager;
