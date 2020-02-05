import React, { Component } from "react";
import PropTypes from "prop-types";

class Dice extends Component {
  getBadgeClasses() {
    let classes = "badge m-2 p-3 badge-";
    classes += this.props.dieCount === 0 ? "warning" : "primary";
    return classes;
  }

  getDecrementButton() {
    let decButton;
    if (this.props.dieCount > 0) {
      decButton = (
        <button
          className="btn btn-secondary btn-sm"
          onClick={this.handleCountChange}
          value="-1"
        >
          -1
        </button>
      );
    } else {
      decButton = (
        <button className="btn btn-secondary btn-sm" disabled>
          -1
        </button>
      );
    }
    return decButton;
  }

  getZeroButton() {
    let zeroButton;
    if (this.props.dieCount > 0) {
      zeroButton = (
        <button
          className="btn btn-secondary btn-sm mr-2"
          onClick={this.handleCountChange}
          value="0"
        >
          Reset
        </button>
      );
    } else {
      zeroButton = (
        <button className="btn btn-secondary btn-sm mr-2" disabled>
          Reset
        </button>
      );
    }
    return zeroButton;
  }

  handleCountChange = e => {
    let changeValue = parseInt(e.currentTarget.value);
    if (changeValue === 0) {
      this.props.onDieCountChange(this.props.dieType);
    } else {
      this.props.onDieCountChange(this.props.dieType, changeValue);
    }
  };

  render() {
    return (
      <div className="d-flex flex-row justify-content-center align-items-center align-self-center">
        {this.getZeroButton()}
        {this.getDecrementButton()}
        <h2 className="mt-2 p-2">
          <span className={this.getBadgeClasses()}>
            {this.props.dieCount}
            {this.props.dieType}
          </span>
        </h2>
        <button
          className="btn btn-secondary btn-sm"
          onClick={this.handleCountChange}
          value="1"
        >
          +1
        </button>
      </div>
    );
  }
}

Dice.propTypes = {
  dieType: PropTypes.string.isRequired,
  dieCount: PropTypes.number.isRequired,
  onDieCountChange: PropTypes.func.isRequired
};

export default Dice;
