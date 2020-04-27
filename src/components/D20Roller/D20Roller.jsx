import React, { Component } from "react";
import Dice from "./Dice";
import DiceSelector from "./DiceSelector";
import Result from "./Result";
import ResultTable from "./ResultTable";

class D20Roller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diceSet: {
                d4: { count: 0, isActive: false },
                d6: { count: 0, isActive: false },
                d8: { count: 0, isActive: false },
                d10: { count: 0, isActive: false },
                d12: { count: 0, isActive: false },
                d20: { count: 0, isActive: false },
            },
            resultSet: [],
            resultTotal: 0,
        };
    }

    handleDieCountChange = (type, count = null) => {
        let currentDice = { ...this.state.diceSet };
        if (!count) {
            currentDice[type].count = 0;
        } else {
            currentDice[type].count += count;
        }
        this.setState({
            diceSet: currentDice,
        });
    };

    handleAllReset = () => {
        let diceSet = {
            d4: { count: 0 },
            d6: { count: 0 },
            d8: { count: 0 },
            d10: { count: 0 },
            d12: { count: 0 },
            d20: { count: 0 },
        };
        let resultTotal = 0;
        let resultSet = [];
        this.setState({
            diceSet,
            resultTotal,
            resultSet,
        });
    };

    handleDiceSelection = (type, isChecked) => {
        let currentDice = { ...this.state.diceSet };
        if (isChecked) {
            currentDice[type].isActive = true;
        } else {
            currentDice[type].isActive = false;
            currentDice[type].count = 0;
        }
        this.setState({
            currentDice,
        });
    };

    getResult = () => {
        const { diceSet } = this.state;
        const diceTypes = Object.keys(this.state.diceSet);
        let resultTotal = 0;
        let resultSet = [];
        diceTypes.forEach((d) => {
            if (diceSet[d].count !== 0) {
                let dieNumber = parseInt(this.removeFirstCharacter(d), 10);
                for (let i = 0; i < diceSet[d].count; i++) {
                    let currentRoll = this.getRandomInt(dieNumber);
                    resultTotal += currentRoll;
                    // resultSet.push({ [d]: currentRoll });
                    resultSet.push({ dieType: d, currentRoll: currentRoll });
                }
            }
        });
        this.setState({
            resultSet,
            resultTotal,
        });
    };

    removeFirstCharacter = (str) => {
        return str.slice(1);
    };

    getRandomInt = (max) => {
        return Math.floor(Math.random() * max) + 1;
    };

    render() {
        const { diceSet } = this.state;
        const diceTypes = Object.keys(diceSet);
        const diceList = diceTypes
            .filter((d) => {
                return this.state.diceSet[d].isActive;
            })
            .map((d) => (
                <li key={d} id={d} className="list-group-item p-0">
                    <Dice
                        dieType={d}
                        dieCount={this.state.diceSet[d].count}
                        onDieCountChange={this.handleDieCountChange}
                    />
                </li>
            ));
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <div className="container mt-4 border-bottom border-secondary">
                    <h2 className="text-center">D20 Dice Roller</h2>
                </div>

                <div className="container d-flex flex-column justify-content-center align-items-center my-4">
                    <div>
                        <Result text={this.state.resultTotal} />
                    </div>

                    <div>
                        <button
                            className="btn btn-outline-secondary btn-lg mx-2"
                            onClick={this.handleAllReset}
                        >
                            Reset
                        </button>
                        <button
                            className="btn btn-primary btn-lg mx-2"
                            onClick={this.getResult}
                        >
                            Roll!
                        </button>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-12 col-md-6 mb-3">
                        <DiceSelector
                            diceSet={diceSet}
                            onSelectionChange={this.handleDiceSelection}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        {diceList.length === 0 && (
                            <h2 className="text-center border rounded p-3">
                                No dice currently selected!
                            </h2>
                        )}
                        {diceList}
                    </div>
                </div>

                <ResultTable resultSet={this.state.resultSet} />
            </div>
        );
    }
}

export default D20Roller;
