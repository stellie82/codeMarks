import React, { Component } from "react";
import Tag from "../Tag";
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
    return this.state.tagData.map(tag => <Tag tagData={tag} />);
  }

  loadTags = () => {
    fetch("http://localhost:3001/api/tags/popular", {
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
    return (
      <div className="tagManager">
        <span className="tagManagerHeader">Selected Tags</span>
        <div className="filterTags">...</div>
        <span className="tagManagerHeader">Tag Search</span>
        <div className="tagSearchContainer">...</div>
        <span className="tagManagerHeader">Popular Tags</span>
        <div className="popularTags">
          {this.renderTagList()}
        </div>
      </div>
    );
  }
}

export default TagManager;
