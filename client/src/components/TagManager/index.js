import React, { Component } from "react";
import Tag from "../Tag";
import "./style.css";
import { Link } from "react-router-dom";

class TagManager extends Component {
  // TODO: add the mouseenter and mouseleave event hander to pass the "code highlight" events up to the parent PostDetail component

  state = {
    tagData: [],
    tagSearchResults: []
  };

  componentDidMount() {
    this.loadTags();
  }

  handleSearchInput = event => {
    this.setState({ searchInput: event.target.value.split(" ") });
  };

  renderTagList() {
    return this.state.tagData.map(tag => <Tag tagData={tag} key={tag._id} />);
  }

  renderTagSearchResults() {
    return this.state.tagSearchResults.map(tag => <Tag tagData={tag} />);
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

  searchForTags = () => {
    fetch("http://localhost:3001/api/tags/searchTag", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(this.state.searchInput)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ tagSearchResults: data });
      });
  };

  render() {
    return (
      <div className="tagManager">
        <span className="tagManagerHeader">Selected Tags</span>
        <div className="filterTags"> {this.renderTagSearchResults()}</div>
        <span className="tagManagerHeader">Tag Search</span>
        <div className="tagSearchContainer">
          <input
            type="text"
            id="tagSearch"
            className="tagSearch"
            ref={this.tagSearchInput}
            onChange={this.handleSearchInput}
          ></input>
        </div>

        <div className="btn-row submitSearch">
          <span
            className="lime rounded-btn icon-btn-before publishPost"
            onClick={e => this.searchForTags(e)}
          >
            Search For Tags
          </span>
        </div>

        <span className="tagManagerHeader">Popular Tags</span>
        <div className="popularTags">{this.renderTagList()}</div>
      </div>
    );
  }
}

export default TagManager;
