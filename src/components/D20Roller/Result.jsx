import React, { Component } from "react";
import PropTypes from "prop-types";

class Result extends Component {
  render() {
    return (
      <h1 className="display-4">
        Current roll:
        <span className="badge badge-secondary ml-4">{this.props.text}</span>
      </h1>
    );
  }
}

Result.propTypes = {
  text: PropTypes.number.isRequired
};

export default Result;
