import React, { Component } from "react";
import "./style.css";

class Tag extends Component {

  state = {};

  componentDidMount() {}

  render() {
    return (
      this.props.tagData ? <span class="postTag">{this.props.tagData.name}</span> : ''
    );
  }
}

export default Tag;
