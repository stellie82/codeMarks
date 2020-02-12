import React, { Component } from "react";
import { Link } from "react-router-dom";
import Prism from "prismjs";
import "./style.css";
import "./prism.css";

class PreviewCard extends Component {

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <div className="previewCard">
        <pre class="codePreview">
          <code class="language-xml">
            {`
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="16dp"
    android:paddingRight="16dp" >
    <EditText
        android:id="@+id/name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="@string/reminder" />
    <Spinner
        android:id="@+id/dates"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_below="@id/name"
        android:layout_alignParentLeft="true"
        android:layout_toLeftOf="@+id/times" />
    <Spinner
        android:id="@id/times"
        android:layout_width="96dp"
        android:layout_height="wrap_content"
        android:layout_below="@id/name"
        android:layout_alignParentRight="true" />
    <Button
        android:layout_width="96dp"
        android:layout_height="wrap_content"
        android:layout_below="@id/times"
        android:layout_alignParentRight="true"
        android:text="@string/done" />
</RelativeLayout>
            `}
          </code>
        </pre>
        <div className="tagContainer">
          <span className="postTag">Android</span>
          <span className="postTag">XML</span>
          <span className="postTag">UI</span>
        </div>
        <div class="details">
          <span className="title">RelativeLayout</span>
          <span className="description">RelativeLayout is a view group that displays child views in positions relative to their siblings or parent</span>
        </div>
      </div>
    );
  }

}

export default PreviewCard;
