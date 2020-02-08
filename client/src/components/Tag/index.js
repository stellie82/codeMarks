import React, { Component } from "react";

class Tag extends Component {
  // TODO: add the mouseenter and mouseleave event hander to pass the "code highlight" events up to the parent PostDetail component

  state = {};

  componentDidMount() {}

  render() {
    return (
      <span>
        // TODO: render a user avatar component on the left, their name on the
        top, and comment text below
        {this.props.postData.name}
      </span>
    );
  }
}

export default Tag;
