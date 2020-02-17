import React, { Component } from "react";
import { Link } from "react-router-dom";
import Prism from "prismjs";
import Tag from "../Tag";
import "./prism.css";
import "./style.css";

class PreviewCard extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  renderTagList() {
    return this.props.previewData.tags.map(tag => (
      <Tag tagData={tag} />
    ));
  }

  render() {
    let highlightedCode = Prism.highlight(atob(this.props.previewData.content), Prism.languages.javascript, 'javascript');
    return (
      <Link to={'/viewpost/' + this.props.previewData._id} className="previewCard">
        <pre className="codePreview">
          <code className="language-javascript" dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
        </pre>
        <div className="tagContainer">{this.renderTagList()}</div>
        <div className="details">
          <span className="title">{this.props.previewData.title}</span>
          <span className="description">{this.props.previewData.description}</span>
        </div>
      </Link>
    );
  }
}

export default PreviewCard;
