import React, { Component } from "react";
import PropTypes from "prop-types";

class DiceSelector extends Component {
  handleSelectionChange = e => {
    const dieType = e.target.value;
    const dieIsChecked = e.target.checked;
    this.props.onSelectionChange(dieType, dieIsChecked);
  };

  render() {
    const { diceSet } = this.props;
    const diceTypes = Object.keys(diceSet);
    const diceSelectionList = diceTypes.map(d => (
      <div key={d}>
        <input
          type="checkbox"
          name={d}
          value={d}
          onChange={this.handleSelectionChange}
          checked={!!diceSet[d].isActive && "checked"}
          className="mr-2"
        />
        <label>{d}</label>
      </div>
    ));
    return (
      <div className="border rounded p-3">
        <h3 className="mb-3">Which dice would you like to roll?</h3>
        {diceSelectionList}
      </div>
    );
  }
}

DiceSelector.propTypes = {
  diceSet: PropTypes.object.isRequired,
  onSelectionChange: PropTypes.func.isRequired
};

export default DiceSelector;
