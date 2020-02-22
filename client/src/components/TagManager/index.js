import keys from "../../keys_client.js";
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
    setTimeout(this.searchForTags, 200);
  };

  renderSelectedTagsList() {
    if (this.props.selectedTags) {
      return this.props.selectedTags.map(tag => <Tag tagData={tag} key={tag._id} />);
    } else {
      return '';
    }
  }

  renderTagList() {
    return this.state.tagData.map(tag => <Tag tagSelectionEvent={this.props.tagSelectionEvent} tagData={tag} key={tag._id} />);
  }

  renderTagSearchResults() {
    if (!this.state.tagSearchResults || this.state.tagSearchResults.length === 0) {
      return (<span className="noSearchResults">No results</span>);
    } else {
      return this.state.tagSearchResults.map(tag => <Tag tagSelectionEvent={this.props.tagSelectionEvent} tagData={tag} key={tag._id} />);
    }
  }

  loadTags = () => {
    fetch(keys.APP_DOMAIN+"/api/tags/popular", {
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
    fetch(keys.APP_DOMAIN+"/api/tags/searchTag", {
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
        <div className="filterTags">{this.renderSelectedTagsList()}</div>
        <span className="tagManagerHeader">Tag Search</span>
        <div className="tagSearchContainer">
          <input
            type="text"
            id="tagSearch"
            className="tagSearch"
            autoComplete="off"
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
