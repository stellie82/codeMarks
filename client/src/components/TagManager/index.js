import React, { Component } from "react";
import Tag from "../Tag";
import "./style.css";

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
    setTimeout(this.searchForTags, 200);
  };

  renderTagList() {
    return this.state.tagData.map(tag => <Tag tagData={tag} key={tag._id} />);
  }

  renderTagSearchResults() {
    if (!this.state.tagSearchResults || this.state.tagSearchResults.length === 0) {
      return (<span className="noSearchResults">No results</span>);
    } else {
      return this.state.tagSearchResults.map(tag => <Tag tagData={tag} key={tag._id} />);
    }
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
        <div className="filterTags"></div>
        <span className="tagManagerHeader">Tag Search</span>
        <div className="tagSearchContainer">
          <input
            type="text"
            id="tagSearch"
            className="tagSearch"
            autocomplete="off"
            placeholder="Search for tags..."
            ref={this.tagSearchInput}
            onChange={this.handleSearchInput}
          ></input>
          <div className="searchedTags">
            {this.renderTagSearchResults()}
          </div>
        </div>
        <span className="tagManagerHeader">Popular Tags</span>
        <div className="popularTags">{this.renderTagList()}</div>
      </div>
    );
  }
}

export default TagManager;
