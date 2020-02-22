import React, { Component } from "react";
import "./style.css";

class Tag extends Component {

  state = {};

  componentDidMount() {}

  handleTagClick = () => {
    this.props.tagSelectionEvent(this.props.tagData);
  }

  render() {
    return (
      this.props.tagData ? <span className="postTag" onClick={this.handleTagClick}>{this.props.tagData.name}</span> : ''
    );
  }
}

export default Tag;
