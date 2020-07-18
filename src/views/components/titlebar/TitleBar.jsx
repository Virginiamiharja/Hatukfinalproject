import React from "react";

class TitleBar extends React.Component {
  render() {
    return (
      <div
        className="d-flex justify-content-start col-12 p-4 therapist-body"
        style={{ background: "#fc8454" }}
      >
        <h6 className="mb-0">{this.props.title}</h6>
      </div>
    );
  }
}

export default TitleBar;
